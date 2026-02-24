import * as dayOne from './day-1/index.ts'
import * as dayTwo from './day-2/index.ts'
import * as dayThree from './day-3/index.ts'
import * as dayFour from './day-4/index.ts'
import * as dayFive from './day-5/index.ts'
import * as daySix from './day-6/index.ts'
import * as daySeven from './day-7/index.ts'
import * as dayEight from './day-8/index.ts'
import * as dayNine from './day-9/index.ts'
import * as dayTen from './day-10/index.ts'
import { dayElevenPartOne, dayElevenPartTwo } from './day-11/index.ts'
import * as dayTwelve from './day-12/index.ts'

export type Dataset = 'sample' | 'input'
export const datasetsRootPath = 'datasets/'
type SolutionOutput = (string | number)[]
type GeneratorOutput = AsyncGenerator<SolutionOutput | never, SolutionOutput> | Generator<SolutionOutput | never, SolutionOutput>
type Solution = {
    solve: (data: string, optimal?: boolean, dataset?: Dataset) => GeneratorOutput
}
export type SolutionMetadata = { dataset?: string; day: number; solution: Solution }

export const solutions: { [key in Dataset]: SolutionMetadata[] } = {
    sample: [
        { solution: dayOne, day: 1 },
        { solution: dayTwo, day: 2 },
        { solution: dayThree, day: 3 },
        { solution: dayFour, day: 4 },
        { solution: dayFive, day: 5 },
        { solution: daySix, day: 6 },
        { solution: daySeven, day: 7 },
        { solution: dayEight, day: 8 },
        { solution: dayNine, day: 9 },
        { solution: dayTen, day: 10 },
        { solution: dayElevenPartOne, day: 11, dataset: 'sample-p1' },
        { solution: dayElevenPartTwo, day: 11, dataset: 'sample-p2' },
        { solution: dayTwelve, day: 12 },
    ],
    input: [
        { solution: dayOne, day: 1 },
        { solution: dayTwo, day: 2 },
        { solution: dayThree, day: 3 },
        { solution: dayFour, day: 4 },
        { solution: dayFive, day: 5 },
        { solution: daySix, day: 6 },
        { solution: daySeven, day: 7 },
        { solution: dayEight, day: 8 },
        { solution: dayNine, day: 9 },
        { solution: dayTen, day: 10 },
        { solution: dayElevenPartOne, day: 11 },
        { solution: dayElevenPartTwo, day: 11 },
        { solution: dayTwelve, day: 12 },
    ],
}
