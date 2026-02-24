import { fork } from 'node:child_process'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import type { WorkerResponse } from './shared.ts'

// Helper method that runs the part 2 solution in a separate worker thread
export async function runPartTwoTask(data: string[]): Promise<string | number> {
    return new Promise((resolve, reject) => {
        const filename = fileURLToPath(import.meta.url)
        const directory = dirname(filename)
        const child = fork(path.resolve(directory, 'isolation-worker.js'), {
            // Everything set to 'ignore' to avoid console spam
            stdio: ['ignore', 'ignore', 'ignore', 'ipc'],
        })

        child.on('message', (message: WorkerResponse) => {
            if (message && message.type === 'success') {
                return resolve(message.data)
            }

            if (message && message.type === 'error') {
                return reject(new Error(message.message))
            }

            reject(new Error('Unexpected child message'))
        })

        child.on('error', (err) => {
            reject(err)
        })

        child.on('exit', (code, signal) => {
            if (code === 0) return
            reject(new Error(`Worker closed (code=${code} signal=${signal})`))
        })

        // send payload to child to start work
        child.send({ type: 'run', data })
    })
}
