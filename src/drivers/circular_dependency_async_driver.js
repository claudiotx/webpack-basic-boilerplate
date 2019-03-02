export function makeDHTDriver(): Driver<Stream<Request>, Stream<SensorInformation>> {
  return function DHTDriver(request$) {
    const source$ = request$.map(({ gpio }) => createDHTStream(gpio)).flatten()
    source$.addListener({})
    return adapt(source$)
  }
}