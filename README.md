# Advent of Code 2025 - Typescript

Check the challenges for each day [here](https://adventofcode.com/2025) and copy over you own input data if needed.

Each day is resolved in a separate directory with its own set of tests and input data. For some parts I've included multiple solutions. I tried to keep the usage of magic/hidden loops to a minimum.

No external or runtime specific imports are used. You can run this in your preferred JS runtime. Check [gotchas and known issues](#gotchas-and-known-issues) below.

## Running the solutions

To run each solution for both the sample and provided input data, with metrics

```
bun start
```

Alternatively you can use the runtime specific variants:

```
bun start:bun
npm start:node
```

The `--filter` parameter can narrow down the solutions:

- specific days: `bun start:bun -- --filter=7,8,9`
- only optimal solutions: `bun start -- --filter=optimal`
- both: `npm run start:node -- --filter=6,10,optimal`

## Test the solutions

Testing is done using `vitest`.
To check all solutions against the expected answers run

```
bun run test
node test
```

## Gotchas and Known Issues

> For **day 6**, it's important that you do NOT trim the lines in the input file, since those extra spaces are important. Your IDE settings might attempt to do that automatically on save.

> With the exception of **day 10**, all solutions are standalone and runtime agnostic. Currently, day 10 uses an external Z3 SAT/SMT solver library and which encounters a WASM-related error under _Bun_ (v1.3.9). Run the script under _Node_ instead to get the expected result (`npm run start:node`)

> The official input for **day 12** doesn't actually require a complete solution in order to compute the result. As such, you'll only find the relevant sanity checks inside. I haven't included a real 2D packing algorithm (NP-hard).
