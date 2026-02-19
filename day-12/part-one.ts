type Present = {
    area: number
    rectangle: number
    shape: string[]
}

type Region = {
    width: number
    height: number
    presents: number[]
}

/*
 * Method: Basic sanity checks, O(n*m)
 * Day 12 is more of a meme problem. For the provided inputs, it is enough to check 2 conditions:
 * - if the cumulative surface(#) of the packages exceeds the region, then there is NO solution
 * - if the cumulative containing rectangles of the packages can fit in the region, then that is the the solution
 * Turns out all the regions can be solved using these sanity checks...
 * A <<real>> solution would require a ridiculous amount of time to run; 2D packing is NP-hard
 */
export function partOne(parts: string[]): number {
    if (!parts?.length) {
        throw new Error('No data provided')
    }

    performance.mark('p1-start')

    // Process the regions
    const regions: Region[] = []
    const regionsRaw = parts.pop()!.split('\r\n')

    if (!regionsRaw?.length) {
        throw new Error('No regions found')
    }

    for (const regionRaw of regionsRaw) {
        const regionParts = regionRaw.split('\r\n')

        for (const regionPart of regionParts) {
            const matches = regionPart.match(/^(?<width>\d+)x(?<height>\d+):\s(?<presents>[\d\s]+)$/)

            if (!matches?.groups?.['width']) {
                throw new Error(`Failed to identify region height for: ${regionRaw}`)
            }

            if (!matches?.groups?.['height']) {
                throw new Error(`Failed to identify region width for: ${regionRaw}`)
            }

            if (!matches?.groups?.['presents']) {
                throw new Error(`Failed to identify presents for: ${regionRaw}`)
            }

            regions.push({
                width: Number(matches.groups['width']),
                height: Number(matches.groups['height']),
                presents: matches.groups['presents'].split(' ').map(Number),
            })
        }
    }

    // Process the presents
    const presents: Present[] = []

    for (const presentPart of parts) {
        const lines = presentPart.split('\r\n')
        lines.shift()

        let area: number = 0
        let width: number = 0

        for (const line of lines) {
            width = Math.max(width, line.trim().length)
            area += line.match(/#/g)?.length || 0
        }

        presents.push({
            area,
            rectangle: width * lines.length,
            shape: lines,
        })
    }

    // Process the regions
    let regionsResolved = 0

    for (const region of regions) {
        let presentsRectangle = 0
        let presentsArea = 0

        for (const [presentIndex, presentCount] of region.presents.entries()) {
            if (!presentCount) {
                continue
            }

            presentsRectangle += presents[presentIndex]!.rectangle * presentCount
            presentsArea += presents[presentIndex]!.area * presentCount
        }

        const regionRectangle = region.height * region.width

        // 1. Check against the computed cumulative containing rectangle (for the presents)
        if (presentsRectangle <= regionRectangle) {
            regionsResolved++
            continue
        }

        // 2. Check against guaranteed area overflow for the presents
        if (presentsArea > regionRectangle) {
            continue
        }

        // IF you are using their provided input, you shouldn't be able to get here
        throw new Error('2D packing algorithm not implemented! This is EXPECTED on the sample input.')
    }

    return regionsResolved
}
