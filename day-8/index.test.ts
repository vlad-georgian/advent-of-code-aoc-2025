import * as fs from 'node:fs/promises'
import { beforeEach, describe, expect, it } from 'vitest'

import { partOne as partOneBruteOptimized } from './brute-force-optimized/part-one.ts'
import { partTwo as partTwoBruteOptimized } from './brute-force-optimized/part-two.ts'
import { partOne as partOneBrute } from './brute-force/part-one.ts'
import { partTwo as partTwoBrute } from './brute-force/part-two.ts'
import { partOne as partOneDisjointSet } from './disjoint-set/part-one.ts'
import { partTwo as partTwoDisjointSet } from './disjoint-set/part-two.ts'
import * as dayEightHarness from './index.ts'

const pathPrefix = './day-8'

describe('Day 8: Playground - Sample dataset', async () => {
    const dataRaw = await fs.readFile(`datasets/${pathPrefix}/sample.txt`)
    const data = dataRaw.toString()
    let lines: string[] = []

    beforeEach(async () => {
        lines = dayEightHarness.parse(data)
    })

    it('should solve part 1 using the brute force approach', () => {
        const result = partOneBrute(lines, 10, 3)

        expect(result).toEqual(40)
    })

    it('should solve part 1 using the optimized brute force approach', () => {
        const result = partOneBruteOptimized(lines, 10, 3)

        expect(result).toEqual(40)
    })

    it('should solve part 1 using the disjoint set approach', () => {
        const result = partOneDisjointSet(lines, 10, 3)

        expect(result).toEqual(40)
    })

    it('should solve part 2 using the brute force approach', () => {
        const result = partTwoBrute(lines)

        expect(result).toEqual(25272)
    })

    it('should solve part 2 using the optimized brute force approach', () => {
        const result = partTwoBruteOptimized(lines)

        expect(result).toEqual(25272)
    })

    it('should solve part 2 using the disjoint set approach', () => {
        const result = partTwoDisjointSet(lines)

        expect(result).toEqual(25272)
    })
})

describe('Day 8: Playground - Input dataset', async () => {
    const dataRaw = await fs.readFile(`datasets/${pathPrefix}/input.txt`)
    const data = dataRaw.toString()
    let lines: string[] = []

    beforeEach(async () => {
        lines = dayEightHarness.parse(data)
    })

    it('should solve part 1 using the brute force approach', () => {
        const result = dayEightBrute.partOne(lines, 1000, 3)

        expect(result).toEqual(50568)
    })

    it('should solve part 1 using the optimized brute force approach', () => {
        const result = dayEightBruteOptimized.partOne(lines, 1000, 3)

        expect(result).toEqual(50568)
    })

    it('should solve part 1 using the disjoint set approach', () => {
        const result = dayEightDisjointSet.partOne(lines, 1000, 3)

        expect(result).toEqual(50568)
    })

    it('should solve part 2 using the brute force approach', () => {
        const result = dayEightBrute.partTwo(lines)

        expect(result).toEqual(36045012)
    })

    it('should solve part 2 using the optimized brute force approach', () => {
        const result = dayEightBruteOptimized.partTwo(lines)

        expect(result).toEqual(36045012)
    })

    it('should solve part 2 using the disjoint set approach', () => {
        const result = dayEightDisjointSet.partTwo(lines)

        expect(result).toEqual(36045012)
    })
})
