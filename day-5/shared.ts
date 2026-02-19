export function parseRanges(rangesRaw: string) {
    if (!rangesRaw) {
        return []
    }

    // Creates an array of tuples shaped like [ [start,end], ...]
    return rangesRaw.split('\r\n').map((range: string): [number, number] => {
        let parts = range.split('-')
        return [Number(parts[0]), Number(parts[1])]
    })
}
