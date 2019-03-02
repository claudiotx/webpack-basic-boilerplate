import xs from 'xstream';
import { div, h2, h, p, ul } from '@cycle/dom';

const remove = (array, appToRemove) => {
    array.splice(array.findIndex(matchesEl), 1);
    function matchesEl(el) {
        return el.name === appToRemove.name;
    }
}

const CycleAppsList = sources => {
    // xs.merge - merge multiple streams together, emitting events from all of them concurrently.
    const intent = () => xs.merge(
        sources.DOM.select('button').events('click')
            .map(evt => evt.target.previousElementSibling.innerText.trim())
    )
    // On Every Intent (from sort click stream), sort and return a new list
    const model = actions$ => {
        const sortedList$ = actions$
            .map((appName) => list => {
                list.map((poolApp)=>{
                    if(appName === poolApp.name){
                        poolApp.app(); // call dispose function over the app -- MOVE OUT
                    }
                });
                return list;
            });

        const state$ = sources.props$
            .map(initialState =>
                xs.merge(sortedList$)
                    .fold((state, action) => action(state), initialState)
            ).flatten();
        return state$;
    }

    // View (receives a new sorted list, i.e. new state)
    const view = state$ =>
        state$
            .map(shops => {
                const shopsNodes$ = shops.map(shop => {
                    const props$ = xs.of(shop) // create a stream from a shop and emit
                    const source = {
                        DOM: sources.DOM,
                        props$
                    };
                    const vdom$ = source.props$
                        .map(app =>
                            h('li', [
                                h('span', `${app.name}`),
                                h('button', 'x')
                            ]))

                    return vdom$
                });

                // Combines multiple input streams together to return a stream whose events are arrays that collect the latest events from each input stream.
                return xs.combine(...shopsNodes$)
                    .map(nodes => div([
                        h2(['Cycle Sprocket (Ecosystem Apps)']),
                        ul(nodes)
                    ]))

            })
            .flatten();

    const vdom$ = view(model(intent()));
    return {
        DOM: vdom$
    }
}

function CycleSprocket(sources) {
    const domSources$ = sources.DOM;
    const poolSource$ = sources.pool;
    const pool$ = poolSource$.fold((acc, curr) => [...acc, curr], []);

    const model = () => {
        const apps$ = pool$;
        return apps$
    }

    const view = state$ => {
        const listSources = {
            DOM: domSources$,
            props$: state$
        };
        const shopsList = CycleAppsList(listSources)
        return shopsList.DOM
            .map(listDom => div([listDom]))
    }
    const vdom$ = view(model());
    return {
        DOM: vdom$
    }
}

export { CycleSprocket };