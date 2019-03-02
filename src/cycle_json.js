import xs from 'xstream';
import { div, h2 } from '@cycle/dom';
/*
    HTTP Stream Sample
    Opens a HTTP Stream, maps data and renders to DOM
*/
function CycleJson(sources) {
    // HTTP Request Stream (request the URL every 1s)
    const request$ = xs.periodic(5000)
        .mapTo({
            url: 'http://localhost:3000',
            category: 'api'
        });

    // Stream Reader (update DOM on every request)
    const vdom$ = sources.HTTP.select('api')
        .flatten()
        .map(res => res.body)
        // default value
        .startWith({
            number: 0
        })
        .map(res =>
            div([
                h2('.label', `Random number from server: ${res.number}`)
            ])
        );

    // Return drivers to sink
    return {
        DOM: vdom$,
        HTTP: request$
    }
}

export { CycleJson };