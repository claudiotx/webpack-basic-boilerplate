import xs from 'xstream';
import { div, h2, button, p } from '@cycle/dom';

function CycleClock(sources) {

    const count$ = xs.merge(
        sources.DOM.select('.reset').events('click').map(ev => 0),
        sources.Time.periodic(1000).map(i => i + 1).startWith(0)
    );

    const vdom$ = count$.map(count =>
        div([
            h2('Timer App'),
            button('.reset', 'Reset'),
            p('Timer: ' + count)
        ])
    );

    // Debug
    // count$.addListener({
    //     next: (x) => console.log(x),
    //     error: () => {},
    //     complete: () => {}
    // });

    return {
        DOM: vdom$
    }
}

export { CycleClock };