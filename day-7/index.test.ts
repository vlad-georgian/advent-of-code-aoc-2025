import * as fs from 'node:fs/promises';
import { beforeEach, describe, expect, it, test } from 'vitest';

import * as daySeven from './index';

const pathPrefix = './day-7';

describe('Day 7: Laboratories - Sample dataset', async () => {
    const dataRaw = await fs.readFile(`${pathPrefix}/sample.txt`);
    const data = dataRaw.toString();
    let lines: string[] = [];

    beforeEach(async () => {
        lines = daySeven.parse(data);
    });

    it('should solve part 1', () => {
        const result = daySeven.partOne(lines);

        expect(result).toEqual(21);
    });

    it('should solve part 2', () => {
        const result = daySeven.partTwo(lines);

        expect(result).toEqual(40);
    });
});

describe('Day 7: Laboratories - Input dataset', async () => {
    const dataRaw = await fs.readFile(`${pathPrefix}/input.txt`);
    const data = dataRaw.toString();
    let lines: string[] = [];

    beforeEach(async () => {
        lines = daySeven.parse(data);
    });

    it('should solve part 1', () => {
        const result = daySeven.partOne(lines);

        expect(result).toEqual(1594);
    });

    it('should solve part 2', () => {
        const result = daySeven.partTwo(lines);

        expect(result).toEqual(15650261281478);
    });
});
