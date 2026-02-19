export type PartOneMachine = {
    indicator: number
    buttons: number[]
    joltages?: number[]
}

export type DayTenResult = {
    result: number
    iterations: number
    cacheHits: number
}

export function parseIndicator(indicatorRaw: string): number {
    const matches = indicatorRaw.match(/\[(?<indicators>[.#]+)\]/)
    if (!matches?.groups?.['indicators']) {
        throw new Error(`Failed to parse indicator: ${indicatorRaw}`)
    }

    let representation = 0

    for (const [index, char] of [...matches.groups['indicators']].entries()) {
        if (char === '.') {
            continue
        }

        representation += 1 << index
    }

    return representation
}

export function parseButtons(buttonsSetsRaw: string[]): number[] {
    if (!buttonsSetsRaw?.length) {
        throw new Error('No buttons provided')
    }

    const buttonRepresentations = []

    for (let setIndex = 0; setIndex < buttonsSetsRaw.length; setIndex++) {
        if (!buttonsSetsRaw[setIndex]) {
            throw new Error(`Failed to parse button set: ${buttonsSetsRaw.join(',')}`)
        }
        const matches = buttonsSetsRaw[setIndex]!.match(/\((?<buttons>[\d,]+)\)/)

        if (!matches?.groups?.['buttons']) {
            throw new Error(`Failed to parse buttons: ${buttonsSetsRaw[setIndex]}`)
        }

        // Convert the button combos to a bit mask
        const representation = matches.groups['buttons'].split(',').reduce((result, button): number => result | (1 << Number(button)), 0)

        buttonRepresentations.push(representation)
    }

    return buttonRepresentations
}
