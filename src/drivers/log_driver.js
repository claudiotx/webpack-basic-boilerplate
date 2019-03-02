function makeLogDriver (msg$) {
    msg$.addListener({
        next: msg => console.log(msg)
    })
}

export { makeLogDriver };