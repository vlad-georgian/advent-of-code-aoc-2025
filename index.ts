import * as fs from 'node:fs/promises'
import * as dayOne from './day-1'
import * as dayTwo from './day-2'
import * as dayThree from './day-3'
import * as dayFour from './day-4'

type Solution = {
    solve: (data: string) => Generator<[ string, string, number ]>
}
const solutions: Solution[] = [ dayOne, dayTwo, dayThree, dayFour ]

// Check against sample data
async function solve(inputFileName: string) {
    if (!inputFileName?.length) {
        throw new Error('No input file specified!')
    }

    console.log(`\r\n'${inputFileName}' dataset:\r\n`)

    performance.mark(inputFileName)

    for (const [ index, solution ] of solutions.entries()) {
        performance.mark('solution')

        console.log('file', `./day-${index + 1}/${inputFileName}.txt`)
        const dataRaw = await fs.readFile(`./day-${index + 1}/${inputFileName}.txt`)
        const data = dataRaw.toString()
        const solutions = solution.solve(data)

        while (true) {
            performance.mark('solution-start')

            const result = solutions.next()
            const deltaSolution = performance.measure('solution', 'solution-start')

            console.log(`${result.value[ 0 ]} -> ${result.value[ 1 ]}: ${result.value[ 2 ]} in ${deltaSolution.duration}ms`)

            if (result.done) {
                break
            }
        }
    }

    const deltaSet = performance.measure('set', inputFileName)

    console.log(`Time(with input processing): ${deltaSet.duration}ms`)
}

performance.mark('all')

await solve('sample')
console.log(`\r\n${new Array(80).fill('-').join('')}`)
await solve('input')

const deltaAll = performance.measure('set', 'all')
console.log(`\r\n${new Array(80).fill('-').join('')}`)
console.log(`\r\nTime(total): ${deltaAll.duration}ms`)
