import xs from 'xstream';
import { run } from '@cycle/run';
import { div, input, span } from '@cycle/dom';
function CycleSlider (sources) {
    const props$ = sources.props;
    const domSource = sources.DOM;

    const newValue$ = domSource
        .select('.slider')
        .events('input')
        .map(ev => ev.target.value);

    const state$ = props$
        .map(props => newValue$
            .map(val => {
                return ({
                    label: props.label,
                    unit: props.unit,
                    min: props.min,
                    value: val,
                    max: props.max
                })}
            )
            .startWith(props)
        )
        .flatten()
        .remember();

    // On Each State Change
    const vdom$ = state$
        .map(state =>
            div('.labeled-slider', [
                span('.label',
                    state.label + ' ' + state.value + state.unit
                ),
                input('.slider', {
                    attrs: { type: 'range', min: state.min, max: state.max, value: state.value }
                })
            ])
        );

    // Output
    const sinks = {
        DOM: vdom$,
        value: state$.map(state => state.value) // only important when the parent of the component is not a driver, but another component
    };
    return sinks;
}

export { CycleSlider };