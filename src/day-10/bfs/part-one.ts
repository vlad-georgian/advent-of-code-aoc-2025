import { parseButtons, parseIndicator, type DayTenResult, type PartOneMachine } from '../shared.ts'

/*
 * Method: BFS over a graph where:
 * - nodes = are all the possible light combos
 * - edge = a single button press
 */
export function partOne(lines: string[]): DayTenResult {
    if (!lines?.length) {
        throw new Error('No data provided')
    }

    const machines: PartOneMachine[] = []

    // Parse stage
    for (const line of lines) {
        const parts = line.split(' ')

        if (!parts?.length) {
            throw new Error(`Invalid line: ${line}`)
        }

        const indicator = parseIndicator(parts[0]!)
        const buttons = parseButtons(parts.slice(1, -1))

        machines.push({ indicator, buttons })
    }

    let buttonPressesTotal = 0
    let iterations = 0
    let cacheHits = 0

    for (const { indicator, buttons } of machines) {
        // BFS implementation
        let buttonPressesMin: number | undefined
        const visited = new Set([0]) // Stores each possible light combo, starting from 0
        const queue: { result: number; presses: number }[] = [{ result: 0, presses: 0 }] // TODO: use a deque to further improve perf

        while (queue.length) {
            const { result, presses } = queue.shift()!

            if (result === indicator) {
                // Stop when the first solution is found; all other solutions will require the same or more button presses
                buttonPressesMin = presses
                break
            }

            for (const button of buttons) {
                const resultWithButton = result ^ button
                iterations++

                if (visited.has(resultWithButton)) {
                    cacheHits++
                    continue
                }

                visited.add(resultWithButton)
                queue.push({ result: resultWithButton, presses: presses + 1 })
            }
        }

        if (!buttonPressesMin) {
            throw new Error(`No solution found for indicator ${indicator} with buttons: ${buttons.join(',')}`)
        }

        buttonPressesTotal += buttonPressesMin
    }

    return { result: buttonPressesTotal, iterations, cacheHits }
}
