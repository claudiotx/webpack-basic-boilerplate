import xs from 'xstream';
import { div, h2, h3 } from '@cycle/dom';
import isolate from '@cycle/isolate';
import { CycleSlider } from './cycle_slider';
import { CycleJson } from './cycle_json';

function CycleBmi(sources) {

    // JSON Loader
    // --------------------------------------------------------------------
    const jsonProps$ = xs.of({
        interval: 5000
    });
    const jsonSources = { DOM: sources.DOM, HTTP: sources.HTTP, props: jsonProps$ };
    const json = isolate(CycleJson)(jsonSources);
    const jsonVdom$ = json.DOM;
    const jsonRequest$ = json.HTTP;


    // Slider 1 (Height)
    // --------------------------------------------------------------------
    const propsHeight$ = xs.of({
        label: 'Height', unit: 'cm', min: 150, value: 170, max: 190
    });
    const heightSources = { DOM: sources.DOM, props: propsHeight$ };
    const heightSlider = isolate(CycleSlider)(heightSources); //auto generate a CSS class for isolation - not referentially transparent.
    const heightSliderVdom$ = heightSlider.DOM;


    // Slider 2 (Weight)
    // --------------------------------------------------------------------
    const propsWeight$ = xs.of({
        label: 'Weight', unit: 'kg', min: 40, value: 70, max: 140
    });
    const weightSources = { DOM: sources.DOM, props: propsWeight$ };
    const weightSlider = isolate(CycleSlider)(weightSources); //auto generate a CSS class for isolation - not referentially transparent.
    const weightSliderVdom$ = weightSlider.DOM;

    // Main Sink (combining child DOM sinks and a sink value outputed bu the Height Slider)
    // --------------------------------------------------------------------
    const heightSiderValue$ = heightSlider.value;
    const weightSiderValue$ = weightSlider.value;

    const bmi$ = xs.combine(weightSiderValue$, heightSiderValue$)
     .map(([weight, height]) => {
       const heightMeters = height * 0.01;
       const bmi = Math.round(weight / (heightMeters * heightMeters));
       return bmi;
     })
     .remember();

    const vdom$ = xs.combine(bmi$, jsonVdom$, heightSliderVdom$, weightSliderVdom$)
        .map(([bmi, jsonVdom, heightVdom, weightVdom]) =>
            div([
                h2('BMI Meter'),
                heightVdom,
                weightVdom,
                h3(`BMI is ${bmi}`),
                div({
                    style: {
                        backgroundColor: '#58D3D8',
                        width: String(2 * bmi) + 'px',
                        height: String(2 * bmi) + 'px',
                        borderRadius: String(bmi) + 'px'
                    }
                }),
                jsonVdom
            ])
        );

    return {
        DOM: vdom$,
        HTTP: jsonRequest$
    };
}

export { CycleBmi };