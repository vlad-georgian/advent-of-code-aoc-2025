import * as fs from 'node:fs/promises';

import * as dayOne from './day-1';
import * as dayTwo from './day-2';
import * as dayThree from './day-3';
import * as dayFour from './day-4';
import * as dayFive from './day-5';
import * as daySix from './day-6';
import * as daySeven from './day-7';

type Solution = {
    solve: (data: string) => Generator<(string | number)[], (string | number)[]>;
};
const solutions: Solution[] = [dayOne, dayTwo, dayThree, dayFour, dayFive, daySix, daySeven];

// Check against sample data
async function solve(inputFileName: string) {
    if (!inputFileName?.length) {
        throw new Error('No input file specified!');
    }

    performance.mark(inputFileName);

    for (const [index, solution] of solutions.entries()) {
        performance.mark('solution');

        const dataRaw = await fs.readFile(`./day-${index + 1}/${inputFileName}.txt`);
        const data = dataRaw.toString();
        const solutions = solution.solve(data);

        while (true) {
            performance.mark('solution-start');

            const result = solutions.next();
            const deltaSolution = performance.measure('solution', 'solution-start');

            const [day, resultType, resultValue, ...rest] = result.value;
            console.log(`${day} -> ${resultType}: ${resultValue} ${(rest || []).join(' ')} in ${deltaSolution.duration}ms`);

            if (result.done) {
                break;
            }
        }
    }

    const deltaSet = performance.measure('set', inputFileName);

    console.log(`Time(with input processing): ${deltaSet.duration}ms`);
}

performance.mark('all');

const separator = Array.from({ length: 80 }).fill('-').join('');

await solve('sample');
console.log(`\r\n${separator}`);
await solve('input');
console.log(`\r\n${separator}`);

const deltaAll = performance.measure('set', 'all');
console.log(`\r\nTime(total): ${deltaAll.duration}ms`);
