import * as fs from 'node:fs/promises'
import { beforeEach, describe, expect, it } from 'vitest'

import * as dayThreeHarness from './index.ts'
import { partOne } from './part-one.ts'
import { partTwoBrute } from './part-two-brute.ts'
import { partTwoWindow } from './part-two-window.ts'

const pathPrefix = './datasets/day-3'

describe('Day 3: Lobby - Sample dataset', async () => {
    const dataRaw = await fs.readFile(`datasets/${pathPrefix}/sample.txt`)
    const data = dataRaw.toString()
    let lines: string[] = []

    beforeEach(async () => {
        lines = dayThreeHarness.parse(data)
    })

    it('should solve part 1', () => {
        const result = partOne(lines)

        expect(result).toEqual(357)
    })

    it('should solve part 2 using the brute force approach', () => {
        const result = partTwoBrute(lines)

        expect(result).toEqual(3121910778619)
    })

    it('should solve part 2 using the sliding window approach', () => {
        const result = partTwoWindow(lines)

        expect(result).toEqual(3121910778619)
    })
})

describe('Day 3: Lobby - Input dataset', async () => {
    const dataRaw = await fs.readFile(`datasets/${pathPrefix}/input.txt`)
    const data = dataRaw.toString()
    let lines: string[] = []

    beforeEach(async () => {
        lines = dayThreeHarness.parse(data)
    })

    it('should solve part 1', () => {
        const result = partOne(lines)

        expect(result).toEqual(16973)
    })

    it('should solve part 2 using the brute force approach', () => {
        const result = partTwoBrute(lines)

        expect(result).toEqual(168027167146027)
    })

    it('should solve part 2 using the sliding window approach', () => {
        const result = partTwoWindow(lines)

        expect(result).toEqual(168027167146027)
    })
})
