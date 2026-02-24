type PartOneResult = {
    result: number
    mask: Map<string, string>
}

/*
 * Method: Straightforward approach. O(n*m)
 * The mask usage is optional here - it prevents the original array from getting modified
 */
export function partOne(lines: string[]): PartOneResult {
    if (!lines?.length) {
        throw new Error('No diagram provided')
    }

    let total = 0
    const columnCount = lines[0]!.length
    const mask: Map<string, string> = new Map()

    // Helper method that ensure the mask values override the initial data
    const getCellValue = (rowIndex: number, columnIndex: number): string => {
        const key = `${rowIndex}:${columnIndex}`
        return mask.has(key) ? mask.get(key)! : lines[rowIndex]![columnIndex]!
    }

    for (let rowIndex = 1; rowIndex < lines.length; rowIndex++) {
        for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
            // Only continue if we're below a "|" or "S"
            if (!['S', '|'].includes(getCellValue(rowIndex - 1, columnIndex))) {
                continue
            }

            // If we're at a "^", update the columns on the side
            if (getCellValue(rowIndex, columnIndex) === '^') {
                total++

                if (columnIndex > 0) {
                    mask.set(`${rowIndex}:${columnIndex - 1}`, '|')
                }

                if (columnIndex < columnCount - 1) {
                    mask.set(`${rowIndex}:${columnIndex + 1}`, '|')
                }

                continue
            }

            // Since we're below a "|" or "S", update the current cell to also be "|"
            mask.set(`${rowIndex}:${columnIndex}`, '|')
        }
    }

    // Uncomment to visualize the result
    /*
    for (let rowIndex = 1; rowIndex < lines.length; rowIndex++) {
        let rowContents = '';

        for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
            rowContents += getCellValue(rowIndex, columnIndex);
        }
    }
    */

    // A tuple is returned here because the mask is also needed for part 2
    return { result: total, mask }
}
