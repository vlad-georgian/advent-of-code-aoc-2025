import * as fs from 'node:fs/promises';
import { beforeEach, describe, expect, it, test } from 'vitest';

import * as daySix from './index';

const pathPrefix = './day-6';

describe('Day 6: Trash compactor - Sample dataset', async () => {
    const dataRaw = await fs.readFile(`${pathPrefix}/sample.txt`);
    const data = dataRaw.toString();
    let parts: string[] = [];

    beforeEach(async () => {
        parts = daySix.parse(data);
    });

    it('should solve part 1', () => {
        const result = daySix.partOne(parts);

        expect(result).toEqual(4277556);
    });

    it('should solve part 2', () => {
        const result = daySix.partTwo(parts);

        expect(result).toEqual(3263827);
    });
});

describe('Day 6: Trash compactor - Input dataset', async () => {
    const dataRaw = await fs.readFile(`${pathPrefix}/input.txt`);
    const data = dataRaw.toString();
    let parts: string[] = [];

    beforeEach(async () => {
        parts = daySix.parse(data);
    });

    it('should solve part 1', () => {
        const result = daySix.partOne(parts);

        expect(result).toEqual(6503327062445);
    });

    it('should solve part 2', () => {
        const result = daySix.partTwo(parts);

        expect(result).toEqual(9640641878593);
    });
});
