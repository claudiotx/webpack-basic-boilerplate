import xs from 'xstream';
import { run } from '@cycle/run';
import { div,h2, button, p } from '@cycle/dom';

function CycleCounter (sources) {
    const action$ = xs.merge(
        sources.DOM.select('.decrement').events('click').map(ev => -1),
        sources.DOM.select('.increment').events('click').map(ev => +1)
    );
    // .reduce() for streams
    // seed 0 as starting value, following seed values are summed with the accumulate (current)
    const count$ = action$.fold((accumulate, seed) => accumulate + seed, 0);

    const vdom$ = count$.map(count =>
        div([
            h2('Counter App'),
            button('.decrement', 'Decrement'),
            button('.increment', 'Increment'),
            p('Counter: ' + count)
        ])
    );
    return {
        DOM: vdom$
    }
}

export { CycleCounter };