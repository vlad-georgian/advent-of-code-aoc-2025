import { isOperation } from './shared.ts'

// Method: Straightforward O(n*m)
export function partOne(lines: string[]): number {
    if (!lines?.length) {
        throw new Error('No cephalopod math lines provided')
    }

    const lastLine = lines[lines.length - 1]!
    const columnLength = lastLine.length

    let results: number = 0
    let columnStart = 0

    /*
     * Iterates over the last line. If the next character is an operation, then the column end was found.
     * Once the column has been established, go over each line and do the math operation requested.
     */
    for (let charIndex = 0; charIndex < columnLength; charIndex++) {
        // Find the column end
        if (charIndex !== columnLength - 1 && lastLine[charIndex + 1] === ' ') {
            continue
        }

        // Take into account the separating column; except the last set of numbers because they don't have a separator
        const columnEnd = charIndex - (charIndex === columnLength - 1 ? 0 : 1)

        // Find the operation
        const operation = lastLine[columnStart]

        if (!isOperation(operation)) {
            throw new Error(`Invalid operation: ${operation}`)
        }

        // Perform the operation with the cell values
        let columnResult = operation === '*' ? 1 : 0

        for (let lineIndex = 0; lineIndex < lines.length - 1; lineIndex++) {
            let columnNumber = Number(lines[lineIndex]!.slice(columnStart, columnEnd + 1))

            switch (operation) {
                case '+':
                    columnResult += columnNumber
                    break
                case '-':
                    columnResult -= columnNumber
                    break
                case '*':
                    columnResult *= columnNumber
                    break
            }
        }

        results += columnResult

        // Update limits for next column
        columnStart = charIndex + 1
    }

    return results
}
