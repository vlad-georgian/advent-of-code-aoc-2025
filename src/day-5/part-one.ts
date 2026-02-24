import { parseRanges } from './shared.ts'

function parseIngredients(ingredientsRaw: string) {
    return ingredientsRaw.split('\r\n').map(Number)
}

// Method: Brute force check all ranges for an ingredient. O(n*m)
export function partOne(data: string[]) {
    if (!data || !data[0] || !data[1]) {
        throw new Error('Invalid input data provided!')
    }

    // Parsing stage
    const freshRanges = parseRanges(data[0])
    const ingredients = parseIngredients(data[1])

    if (!ingredients?.length || !freshRanges?.length) {
        return 0
    }

    let freshCount = 0

    for (const ingredient of ingredients) {
        let fresh = false

        for (const freshRange of freshRanges) {
            if (ingredient < freshRange[0] || ingredient > freshRange[1]) {
                continue
            }

            fresh = true
            break
        }

        if (!fresh) {
            continue
        }

        freshCount++
    }

    return freshCount
}
