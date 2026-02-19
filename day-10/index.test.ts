import * as fs from 'node:fs/promises'
import { beforeEach, describe, expect, it } from 'vitest'

import { partOne as dayTenPartOneBFS } from './bfs/part-one.ts'
import { partOne as dayTenPartOneBrute } from './brute-force/part-one-brute-force.ts'
import * as dayTenHarness from './index.ts'
import { partTwo as dayTenPartTwo } from './z3/part-two.ts'

const pathPrefix = './day-10'

describe('Day 10: Factory - Sample dataset', async () => {
    const dataRaw = await fs.readFile(`datasets/${pathPrefix}/sample.txt`)
    const data = dataRaw.toString()
    let lines: string[] = []

    beforeEach(async () => {
        lines = dayTenHarness.parse(data)
    })

    it('should solve part 1 using the brute force approach', () => {
        const { result } = dayTenPartOneBrute(lines)

        expect(result).toEqual(7)
    })

    it('should solve part 1 using the BFS approach', () => {
        const { result } = dayTenPartOneBFS(lines)

        expect(result).toEqual(7)
    })

    it('should solve part 2 using the raycast approach', async () => {
        const result = await dayTenPartTwo(lines)

        expect(result).toEqual(33)
    })
})

describe('Day 10: Factory - Input dataset', async () => {
    const dataRaw = await fs.readFile(`datasets/${pathPrefix}/input.txt`)
    const data = dataRaw.toString()
    let lines: string[] = []

    beforeEach(async () => {
        lines = dayTenHarness.parse(data)
    })

    it('should solve part 1 using the brute force approach', () => {
        const { result } = dayTenPartOneBrute(lines)

        expect(result).toEqual(452)
    })

    it('should solve part 1 using the BFS approach', () => {
        const { result } = dayTenPartOneBFS(lines)

        expect(result).toEqual(452)
    })

    it('should solve part 2 using the raycast approach', async () => {
        const result = await dayTenPartTwo(lines)

        expect(result).toEqual(17424)
    })
})
