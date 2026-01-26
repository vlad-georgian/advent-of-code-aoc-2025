import * as fs from 'node:fs/promises'
import { beforeEach, describe, expect, it, test } from 'vitest'
import * as dayFour from './index'

const pathPrefix = './day-4'

describe('Day 4: Printing department - Sample dataset', async () => {
    const dataRaw = await fs.readFile(`${pathPrefix}/sample.txt`)
    const data = dataRaw.toString()
    let diagram: string[][] = []

    beforeEach(async () => {
        diagram = dayFour.parse(data)
    })

    it('should solve part 1', () => {
        const result = dayFour.partOne(diagram)

        expect(result).toEqual(13)
    })

    it('should solve part 2', () => {
        const result = dayFour.partTwo(diagram)

        expect(result).toEqual(43)
    })
})

describe('Day 4: Printing department - Input dataset', async () => {
    const dataRaw = await fs.readFile(`${pathPrefix}/input.txt`)
    const data = dataRaw.toString()
    let diagram: string[][] = []

    beforeEach(async () => {
        diagram = dayFour.parse(data)
    })

    it('should solve part 1', () => {
        const result = dayFour.partOne(diagram)

        expect(result).toEqual(1533)
    })

    it('should solve part 2', () => {
        const result = dayFour.partTwo(diagram)

        expect(result).toEqual(9206)
    })
})
