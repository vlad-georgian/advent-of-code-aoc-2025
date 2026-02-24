import * as fs from 'node:fs/promises'

import { datasetsRootPath, solutions, type Dataset } from './dataset.ts'

type SolutionFilters = {
    days?: number[]
    optimal: boolean
}
const optimalArgKeyword = 'optimal'

async function initialize() {
    const args = process.argv.splice(2)
    const filterArgIndex = args.findIndex((arg) => arg === '--filter')

    let requestedFilters: string[] = []

    // If someone uses "--filter" with actual values, then store them
    if (filterArgIndex !== -1 && filterArgIndex !== args.length - 1) {
        requestedFilters = args[filterArgIndex + 1]!.split(',')
    }

    return await solveDatasets(requestedFilters)
}

async function solveDatasets(filters?: string[]) {
    const separator = Array.from({ length: 80 }).fill('-').join('')
    const filtersProcessed = processFilters(filters)

    performance.mark('all')

    console.info('==Sample dataset:==\r\n')
    await solve('sample', filtersProcessed)
    console.info(`\r\n${separator}`)

    console.info('==Input dataset:==\r\n')
    await solve('input', filtersProcessed)
    console.info(`\r\n${separator}`)

    const deltaAll = performance.measure('set', 'all')
    console.info(`\r\nTime(total): ${deltaAll.duration.toFixed(2)}ms`)
}

function processFilters(filtersRaw?: string[]): SolutionFilters {
    const filters: SolutionFilters = {
        days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        optimal: false,
    }

    if (!filtersRaw?.length) {
        return filters
    }

    const optimalKeywordIndex = filtersRaw.indexOf(optimalArgKeyword)
    let daysRaw = filtersRaw

    // Filter: "optimal"
    if (optimalKeywordIndex !== -1) {
        filters.optimal = true
    }

    // Filter: days as numbers
    daysRaw = filtersRaw.filter((_item, index) => index !== optimalKeywordIndex)
    const daysProcessed = daysRaw.map(Number)

    // If no days were specified in the filter, then the user wants to see all the days
    if (daysProcessed.length) {
        filters.days = daysProcessed
    }

    return filters
}

async function solve(dataset: Dataset, filters: SolutionFilters) {
    if (!dataset?.length) {
        throw new Error('No input file specified!')
    }

    let solutionsActive = solutions[dataset]

    if (filters.days?.length) {
        solutionsActive = solutionsActive.filter(({ day }) => filters.days!.includes(day))
    }

    performance.mark(dataset)

    for (const solutionMetadata of solutionsActive) {
        performance.mark('solution')

        const dataRaw = await fs.readFile(`${datasetsRootPath}/day-${solutionMetadata.day}/${solutionMetadata.dataset || dataset}.txt`)
        const data = dataRaw.toString()
        const solutions = solutionMetadata.solution.solve(data, filters.optimal, dataset)

        while (true) {
            performance.mark('solution-start')

            const resultRaw = solutions.next()
            const result = resultRaw instanceof Promise ? await resultRaw : resultRaw
            let deltaSolution = performance.measure('solution', 'solution-start')

            const [day, resultType, resultValue, ...rest] = result.value
            const restCombined = !rest?.length ? '' : (rest || []).join(' ') + ' '

            console.info(`${day} -> ${resultType}: ${resultValue} ${restCombined}in ${deltaSolution.duration.toFixed(2)}ms`)

            if (result.done) {
                break
            }
        }
    }

    const deltaSet = performance.measure('set', dataset)

    console.info(`Time(with input processing): ${deltaSet.duration.toFixed(2)}ms`)
}

await initialize()
