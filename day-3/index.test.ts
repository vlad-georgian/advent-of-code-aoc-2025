import * as fs from 'node:fs/promises';
import { beforeEach, describe, expect, it, test } from 'vitest';

import * as dayThree from './index';

const pathPrefix = './day-3';

describe('Day 3: Lobby - Sample dataset', async () => {
    const dataRaw = await fs.readFile(`${pathPrefix}/sample.txt`);
    const data = dataRaw.toString();
    let lines: string[] = [];

    beforeEach(async () => {
        lines = dayThree.parse(data);
    });

    it('should solve part 1', () => {
        const result = dayThree.partOne(lines);

        expect(result).toEqual(357);
    });

    it('should solve part 2 using the brute force approach', () => {
        const result = dayThree.partTwoBrute(lines);

        expect(result).toEqual(3121910778619);
    });

    it('should solve part 2 using the sliding window approach', () => {
        const result = dayThree.partTwoWindow(lines);

        expect(result).toEqual(3121910778619);
    });
});

describe('Day 3: Lobby - Input dataset', async () => {
    const dataRaw = await fs.readFile(`${pathPrefix}/input.txt`);
    const data = dataRaw.toString();
    let lines: string[] = [];

    beforeEach(async () => {
        lines = dayThree.parse(data);
    });

    it('should solve part 1', () => {
        const result = dayThree.partOne(lines);

        expect(result).toEqual(16973);
    });

    it('should solve part 2 using the brute force approach', () => {
        const result = dayThree.partTwoBrute(lines);

        expect(result).toEqual(168027167146027);
    });

    it('should solve part 2 using the sliding window approach', () => {
        const result = dayThree.partTwoWindow(lines);

        expect(result).toEqual(168027167146027);
    });
});
