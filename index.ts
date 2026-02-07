import * as fs from 'node:fs/promises'

import * as dayOne from './day-1/index.js'
import * as dayTwo from './day-2/index.js'
import * as dayThree from './day-3/index.js'
import * as dayFour from './day-4/index.js'
import * as dayFive from './day-5/index.js'
import * as daySix from './day-6/index.js'
import * as daySeven from './day-7/index.js'
import * as dayEight from './day-8/index.js'
import * as dayNine from './day-9/index.js'

type Solution = {
    solve: (data: string, dataset?: Dataset) => Generator<(string | number)[], (string | number)[]>
}
type Dataset = 'sample' | 'input'
const solutions: Solution[] = [dayOne, dayTwo, dayThree, dayFour, dayFive, daySix, daySeven, dayEight, dayNine]

// Check against sample data
async function solve(dataset: Dataset) {
    if (!dataset?.length) {
        throw new Error('No input file specified!')
    }

    performance.mark(dataset)

    for (const [index, solution] of solutions.entries()) {
        performance.mark('solution')

        const dataRaw = await fs.readFile(`./day-${index + 1}/${dataset}.txt`)
        const data = dataRaw.toString()
        const solutions = solution.solve(data, dataset)

        while (true) {
            performance.mark('solution-start')

            const result = solutions.next()
            const deltaSolution = performance.measure('solution', 'solution-start')

            const [day, resultType, resultValue, ...rest] = result.value
            const restCombined = !rest?.length ? '' : (rest || []).join(' ') + ' '

            console.log(`${day} -> ${resultType}: ${resultValue} ${restCombined}in ${deltaSolution.duration}ms`)

            if (result.done) {
                break
            }
        }
    }

    const deltaSet = performance.measure('set', dataset)

    console.log(`Time(with input processing): ${deltaSet.duration}ms`)
}

performance.mark('all')

const separator = Array.from({ length: 80 }).fill('-').join('')

await solve('sample')
console.log(`\r\n${separator}`)
await solve('input')
console.log(`\r\n${separator}`)

const deltaAll = performance.measure('set', 'all')
console.log(`\r\nTime(total): ${deltaAll.duration}ms`)
