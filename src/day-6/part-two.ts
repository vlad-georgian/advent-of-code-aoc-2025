import { isOperation } from './shared.ts'

// Method: First part + an extra loop to compute cells. O(n*m)
export function partTwo(lines: string[]): number {
    if (!lines?.length) {
        throw new Error('No cephalopod math lines provided')
    }

    const lastLine = lines[lines.length - 1]!
    const columnLength = lastLine.length

    let results: number = 0
    let columnStart = 0

    // Exactly like part 1, but now we also do an extra step to compute the cell values
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

        // Build all the cell values according to cephalopod math
        let columnNumbers: number[] = Array.from<number>({
            length: columnEnd - columnStart + 1,
        })

        for (let lineIndex = 0; lineIndex < lines.length - 1; lineIndex++) {
            const line = lines[lineIndex]!
            for (let columnCharIndex = columnStart; columnCharIndex <= columnEnd; columnCharIndex++) {
                if (line[columnCharIndex] === ' ') {
                    continue
                }

                let columnDigit = Number(line[columnCharIndex])
                const columnNumberIndex = columnCharIndex - columnStart

                columnNumbers[columnNumberIndex] = (columnNumbers[columnNumberIndex] || 0) * 10 + columnDigit
            }
        }

        // Perform the operation
        const columnResult = columnNumbers.reduce((partialResult, value, index) => {
            // No need to perform an operation if we don't have a number yet
            if (!index) {
                return value
            }

            switch (operation) {
                case '+':
                    partialResult += value
                    break
                case '-':
                    partialResult -= value
                    break
                case '*':
                    partialResult *= value
                    break
            }

            return partialResult
        })

        results += columnResult

        // Update limits for next column
        columnStart = charIndex + 1
    }

    return results
}
