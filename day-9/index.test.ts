import * as fs from 'node:fs/promises'
import { beforeEach, describe, expect, it, test } from 'vitest'

import * as dayNineBrute from './brute-force.js'
import * as dayNine from './index.js'
import * as dayNineRaycast from './raycast.js'

const pathPrefix = './day-9'

describe('Day 9: Movie theater - Sample dataset', async () => {
    const dataRaw = await fs.readFile(`${pathPrefix}/sample.txt`)
    const data = dataRaw.toString()
    let lines: string[] = []

    beforeEach(async () => {
        lines = dayNine.parse(data)
    })

    it('should solve part 1 using the brute force approach', () => {
        const result = dayNineBrute.partOne(lines)

        expect(result).toEqual(50)
    })

    it('should solve part 2 using the brute force approach', () => {
        const result = dayNineBrute.partTwo(lines)

        expect(result).toEqual(24)
    })

    it('should solve part 2 using the raycast approach', () => {
        const result = dayNineRaycast.partTwo(lines)

        expect(result).toEqual(24)
    })
})

describe('Day 7: Laboratories - Input dataset', async () => {
    const dataRaw = await fs.readFile(`${pathPrefix}/input.txt`)
    const data = dataRaw.toString()
    let lines: string[] = []

    beforeEach(async () => {
        lines = dayNine.parse(data)
    })

    it('should solve part 1 using the brute force approach', () => {
        const result = dayNineBrute.partOne(lines)

        expect(result).toEqual(4752484112)
    })

    it('should solve part 2 using the brute force approach', () => {
        const result = dayNineBrute.partTwo(lines)

        expect(result).toEqual(1465767840)
    })

    it('should solve part 2 using the raycast approach', () => {
        const result = dayNineRaycast.partTwo(lines)

        expect(result).toEqual(1465767840)
    })
})
