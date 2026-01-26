import * as fs from 'node:fs/promises'
import { beforeEach, describe, expect, it, test } from 'vitest'
import * as dayOne from './index'

const pathPrefix = './day-1'

describe('Day 1: Secret entrance - Sample dataset', async () => {
    const dataRaw = await fs.readFile(`${pathPrefix}/sample.txt`)
    const data = dataRaw.toString()
    let lines: string[] = []

    beforeEach(async () => {
        lines = dayOne.parse(data)
    })

    it('should solve part 1', () => {
        const result = dayOne.partOne(lines)

        expect(result).toEqual(3)
    })

    it('should solve part 2', () => {
        const result = dayOne.partTwo(lines)

        expect(result).toEqual(6)
    })
})

describe('Day 1: Secret entrance - Input dataset', async () => {
    const dataRaw = await fs.readFile(`${pathPrefix}/input.txt`)
    const data = dataRaw.toString()
    let lines: string[] = []

    beforeEach(async () => {
        lines = dayOne.parse(data)
    })

    it('should solve part 1', () => {
        const result = dayOne.partOne(lines)

        expect(result).toEqual(1147)
    })

    it('should solve part 2', () => {
        const result = dayOne.partTwo(lines)

        expect(result).toEqual(6789)
    })
})
