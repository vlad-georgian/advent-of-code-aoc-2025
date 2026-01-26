import * as fs from 'node:fs/promises'
import { beforeEach, describe, expect, it, test } from 'vitest'
import * as dayTwo from './index'

const pathPrefix = './day-2'

describe('Day 2: Gift shop - Sample dataset', async () => {
    const dataRaw = await fs.readFile(`${pathPrefix}/sample.txt`)
    const data = dataRaw.toString()
    let lines: string[] = []

    beforeEach(async () => {
        lines = dayTwo.parse(data)
    })

    it('should solve part 1', () => {
        const result = dayTwo.partOne(lines)

        expect(result).toEqual(1227775554)
    })

    it('should solve part 2', () => {
        const result = dayTwo.partTwo(lines)

        expect(result).toEqual(4174379265)
    })
})

describe('Day 2: Gift shop - Input dataset', async () => {
    const dataRaw = await fs.readFile(`${pathPrefix}/input.txt`)
    const data = dataRaw.toString()
    let lines: string[] = []

    beforeEach(async () => {
        lines = dayTwo.parse(data)
    })

    it('should solve part 1', () => {
        const result = dayTwo.partOne(lines)

        expect(result).toEqual(19386344315)
    })

    it('should solve part 2', () => {
        const result = dayTwo.partTwo(lines)

        expect(result).toEqual(34421651192)
    })
})
