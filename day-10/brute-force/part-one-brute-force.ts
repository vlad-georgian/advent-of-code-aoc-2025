import { parseButtons, parseIndicator, type PartOneMachine, type DayTenResult } from '../shared.ts'

// Method: brute force all combinations of buttons
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

    // Brute force approach (n*2^m); using a bit mask to toggle which buttons to choose
    let buttonPressesTotal = 0
    let iterations = 0
    let cacheHits = 0

    for (const { indicator, buttons } of machines) {
        const cache: Map<number, number> = new Map()
        let buttonPressesMin: number | undefined

        for (let buttonsMask = 0; buttonsMask < 1 << buttons.length; buttonsMask++) {
            let result = 0
            let buttonPressesCurrent = 0

            for (let buttonIndex = 0; buttonIndex < buttons.length; buttonIndex++) {
                iterations++

                // Use the mask to toggle buttons on or off
                if (!(buttonsMask & (1 << buttonIndex))) {
                    continue
                }

                result ^= buttons[buttonIndex]!
                buttonPressesCurrent++

                if (!cache.has(result)) {
                    cache.set(result, buttonPressesCurrent)
                } else if (buttonPressesMin && cache.get(result)! > buttonPressesMin) {
                    cacheHits++
                    break
                }
            }

            if (result !== indicator) {
                continue
            }

            buttonPressesMin = !buttonPressesMin ? buttonPressesCurrent : Math.min(buttonPressesMin, buttonPressesCurrent)
        }

        if (!buttonPressesMin) {
            throw new Error(`No solution found for indicator ${indicator} with buttons: ${buttons.join(',')}`)
        }

        buttonPressesTotal += buttonPressesMin
    }

    return { result: buttonPressesTotal, iterations, cacheHits }
}
