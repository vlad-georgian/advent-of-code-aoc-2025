import * as fs from 'node:fs/promises'
import { beforeEach, describe, expect, it } from 'vitest'

import { datasetsRootPath } from '../dataset.ts'
import * as daySevenHarness from './index.ts'
import { partOne } from './part-one.ts'
import { partTwo } from './part-two.ts'

const datasetPath = `${datasetsRootPath}/day-7`

describe('Day 7: Laboratories - Sample dataset', async () => {
    const dataRaw = await fs.readFile(`${datasetPath}/sample.txt`)
    const data = dataRaw.toString()
    let lines: string[] = []

    beforeEach(async () => {
        lines = daySevenHarness.parse(data)
    })

    it('should solve part 1', () => {
        const { result } = partOne(lines)

        expect(result).toEqual(21)
    })

    it('should solve part 2', () => {
        const { result } = partTwo(lines)

        expect(result).toEqual(40)
    })
})

describe('Day 7: Laboratories - Input dataset', async () => {
    const dataRaw = await fs.readFile(`${datasetPath}/input.txt`)
    const data = dataRaw.toString()
    let lines: string[] = []

    beforeEach(async () => {
        lines = daySevenHarness.parse(data)
    })

    it('should solve part 1', () => {
        const { result } = partOne(lines)

        expect(result).toEqual(1594)
    })

    it('should solve part 2', () => {
        const { result } = partTwo(lines)

        expect(result).toEqual(15650261281478)
    })
})
