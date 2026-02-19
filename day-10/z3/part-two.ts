import { type Arith, init } from 'z3-solver'

type PartTwoMachine = {
    buttons: number[][]
    joltages: number[]
}

/*
 * Method: Gave up and used an external SAT/SMT solver
 * !!! Currently only works with Node; Bun will throw errors due to some WASM incompatibilities
 *
 * Traditional methods did not work for my input:
 *  - BFS takes exponential time/memory
 *  - This great suggestion (https://www.reddit.com/r/adventofcode/comments/1pk87hl/2025_day_10_part_2_bifurcate_your_way_to_victory/) unfortunately fails to find some of the optimal buttons:
 */
export async function partTwo(lines: string[]): Promise<number> {
    if (!lines) {
        throw new Error('No tiles provided')
    }

    const machines: PartTwoMachine[] = []

    // Parse stage
    for (const line of lines) {
        const parts = line.split(' ')

        if (!parts?.length) {
            throw new Error(`Invalid line: ${line}`)
        }

        const buttonMatches = [...line.matchAll(/\((.*?)\)/g)]
        const targetMatch = line.match(/\{(.*?)\}/)!

        // For part 2, buttons are stored as raw arrays of affected lights instead of bit mask
        const buttons = buttonMatches.map((match) => match[1].split(',').map((x) => parseInt(x, 10)))
        const target = targetMatch[1].split(',').map((x) => parseInt(x, 10))

        machines.push({ buttons, joltages: target })
    }

    let total = 0
    const { Context } = await init()

    // For each machine, build the linear equations and use Z3 to optimize 'em
    for (const machine of machines) {
        const { Optimize, Int, Sum, Eq } = Context('main')
        const optimizer = new Optimize()

        // Create the corresponding variable for each button
        const buttonVariables: Arith<'main'>[] = []

        for (let index = 0; index < machine.buttons.length; index++) {
            const buttonPress = Int.const(`x${index}`)

            // No negative presses shenanigans
            optimizer.add(buttonPress.ge(Int.val(0)))

            buttonVariables.push(buttonPress)
        }

        // Build the expression for each joltage and add it to the system
        for (const [joltageIndex, joltage] of machine.joltages.entries()) {
            // Build a list of buttons that affect the joltage
            const relevantButtons = buttonVariables.filter((_variable, variableIndex) => machine.buttons[variableIndex]!.includes(joltageIndex))

            if (!relevantButtons.length) {
                continue
            }

            // Z3 types might be broken; they don't allow the array to be passed directly, hence this ugly hack
            const [first, ...rest] = relevantButtons
            const sum = Sum(first!, ...rest)

            // Create an expression using the joltage and computed list of buttons
            optimizer.add(Eq(sum, Int.val(joltage)))
        }

        // Add the final expression to ensure we get the min total
        const [first, ...rest] = buttonVariables
        const totalPresses = Sum(first!, ...rest)

        // Math magic
        optimizer.minimize(totalPresses)

        if ((await optimizer.check()) !== 'sat') {
            throw new Error(`No solution found for joltage ${machine.joltages} using buttons: ${machine.buttons}`)
        }

        const model = optimizer.model()
        // This "number" conversion might not be sound; docs are pretty bad on explaining proper usage here
        const sum = buttonVariables.reduce((sum, value) => sum + Number(model.eval(value)), 0)

        total += sum
    }

    return total
}
