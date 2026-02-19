import type { WorkerRequest, WorkerResponse } from './shared.ts'

import { partTwo } from './part-two.ts'

/*
 * This is not relevant to the solution - can be ignored
 * It's a worker thread that calls the part 2 solution that involves using the Z3 lib.
 * It is needed under Bun, because Z3 errors out due to some WASM support issues and would
 * otherwise cause the main thread to halt
 */
process.on('message', async (msg: WorkerRequest) => {
    if (!msg || msg.type !== 'run') return
    try {
        const result = await partTwo(msg.data)
        const response: WorkerResponse = { type: 'success', data: result }
        process.send?.(response)

        process.exit(0)
    } catch (err: any) {
        const response: WorkerResponse = { type: 'error', message: err?.message ?? String(err) }
        process.send?.(response)
        process.exit(1)
    }
})
