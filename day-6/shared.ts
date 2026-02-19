type Operation = '*' | '+' | '-'

export function isOperation(operationRaw: string | undefined): operationRaw is Operation {
    return operationRaw === '+' || operationRaw === '-' || operationRaw === '*'
}
