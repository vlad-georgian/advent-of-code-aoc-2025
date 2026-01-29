import * as fs from 'node:fs/promises';
import { beforeEach, describe, expect, it, test } from 'vitest';

import * as dayFive from './index';

const pathPrefix = './day-5';

describe('Day 5: Cafeteria - Sample dataset', async () => {
    const dataRaw = await fs.readFile(`${pathPrefix}/sample.txt`);
    const data = dataRaw.toString();
    let parts: string[] = [];

    beforeEach(async () => {
        parts = dayFive.parse(data);
    });

    it('should solve part 1', () => {
        const result = dayFive.partOne(parts);

        expect(result).toEqual(3);
    });

    it('should solve part 2', () => {
        const result = dayFive.partTwo(parts);

        expect(result).toEqual(14);
    });
});

describe('Day 5: Cafeteria - Input dataset', async () => {
    const dataRaw = await fs.readFile(`${pathPrefix}/input.txt`);
    const data = dataRaw.toString();
    let parts: string[] = [];

    beforeEach(async () => {
        parts = dayFive.parse(data);
    });

    it('should solve part 1', () => {
        const result = dayFive.partOne(parts);

        expect(result).toEqual(896);
    });

    it('should solve part 2', () => {
        const result = dayFive.partTwo(parts);

        expect(result).toEqual(346240317247002);
    });
});
