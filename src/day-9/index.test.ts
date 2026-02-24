import * as fs from 'node:fs/promises'
import { beforeEach, describe, expect, it } from 'vitest'

import { datasetsRootPath } from '../dataset.ts'
import { partOne as partOneBrute } from './brute-force/part-one.ts'
import { partTwo as partTwoBrute } from './brute-force/part-two.ts'
import * as dayNineHarness from './index.ts'
import { partTwo as partTwoRaycast } from './raycast/part-two.ts'

const datasetPath = `${datasetsRootPath}/day-9`

describe('Day 9: Movie theater - Sample dataset', async () => {
    const dataRaw = await fs.readFile(`${datasetPath}/sample.txt`)
    const data = dataRaw.toString()
    let lines: string[] = []

    beforeEach(async () => {
        lines = dayNineHarness.parse(data)
    })

    it('should solve part 1 using the brute force approach', () => {
        const result = partOneBrute(lines)

        expect(result).toEqual(50)
    })

    it('should solve part 2 using the brute force approach', () => {
        const result = partTwoBrute(lines)

        expect(result).toEqual(24)
    })

    it('should solve part 2 using the raycast approach', () => {
        const result = partTwoRaycast(lines)

        expect(result).toEqual(24)
    })
})

describe('Day 9: Movie theater - Input dataset', async () => {
    const dataRaw = await fs.readFile(`${datasetPath}/input.txt`)
    const data = dataRaw.toString()
    let lines: string[] = []

    beforeEach(async () => {
        lines = dayNineHarness.parse(data)
    })

    it('should solve part 1 using the brute force approach', () => {
        const result = partOneBrute(lines)

        expect(result).toEqual(4752484112)
    })

    it('should solve part 2 using the brute force approach', () => {
        const result = partTwoBrute(lines)

        expect(result).toEqual(1465767840)
    })

    it('should solve part 2 using the raycast approach', () => {
        const result = partTwoRaycast(lines)

        expect(result).toEqual(1465767840)
    })
})
