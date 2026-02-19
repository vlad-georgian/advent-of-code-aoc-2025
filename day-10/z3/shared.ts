export type WorkerRequest = {
    type: string
    data: string[]
}
export type WorkerResponse = WorkerMessageSuccess | WorkerMessageError
type WorkerMessageSuccess = {
    type: 'success'
    data: number
}

type WorkerMessageError = {
    type: 'error'
    message: string
}
