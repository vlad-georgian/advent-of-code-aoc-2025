import * as fs from 'node:fs/promises'
import { beforeEach, describe, expect, it, test } from 'vitest'

import * as dayEightBruteOptimized from './brute-force-optimized.js'
import * as dayEightBrute from './brute-force.js'
import * as dayEightDisjointSet from './disjoint-set.js'
import * as dayEight from './index.js'

const pathPrefix = './day-8'

describe('Day 8: Playground - Sample dataset', async () => {
    const dataRaw = await fs.readFile(`${pathPrefix}/sample.txt`)
    const data = dataRaw.toString()
    let lines: string[] = []

    beforeEach(async () => {
        lines = dayEight.parse(data)
    })

    it('should solve part 1 using the brute force approach', () => {
        const result = dayEightBrute.partOne(lines, 10, 3)

        expect(result).toEqual(40)
    })

    it('should solve part 1 using the optimized brute force approach', () => {
        const result = dayEightBruteOptimized.partOne(lines, 10, 3)

        expect(result).toEqual(40)
    })

    it('should solve part 1 using the disjoint set approach', () => {
        const result = dayEightDisjointSet.partOne(lines, 10, 3)

        expect(result).toEqual(40)
    })

    it('should solve part 2 using the brute force approach', () => {
        const result = dayEightBrute.partTwo(lines)

        expect(result).toEqual(25272)
    })

    it('should solve part 2 using the optimized brute force approach', () => {
        const result = dayEightBruteOptimized.partTwo(lines)

        expect(result).toEqual(25272)
    })

    it('should solve part 2 using the disjoint set approach', () => {
        const result = dayEightDisjointSet.partTwo(lines)

        expect(result).toEqual(25272)
    })
})

describe('Day 8: Playground - Input dataset', async () => {
    const dataRaw = await fs.readFile(`${pathPrefix}/input.txt`)
    const data = dataRaw.toString()
    let lines: string[] = []

    beforeEach(async () => {
        lines = dayEight.parse(data)
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
