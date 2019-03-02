import xs from 'xstream';
import debounce from 'xstream/extra/debounce'
import { div, h2, h, button } from '@cycle/dom';

function BannerApp(sources) {

    // Stream metrics
    const metricClick$ = sources.DOM.select('.button').events('click')
        .compose(debounce(500))
        .map((e) => {
            return {
                x: e.clientX,
                y: e.clientX,
                action: 'click'
            };
        });

    const metricOver$ = sources.DOM.select('.container').events('mousemove')
        .compose(debounce(500))
        .map((e) => {
            return {
                x: e.clientX,
                y: e.clientX,
                action: 'over'
            };
        });

    const getConfig$ = xs.of(
        {
            url: 'http://localhost:1111/data',
            category: 'api',
        }
    );


    const sendAllMetrics$ = xs.merge(metricClick$, metricOver$)
        .compose(debounce(500))
        .map((e) => {
            return {
                url: `http://localhost:2222/metrics/?action=${e.action},x=${e.x},y=${e.y}`,
                category: 'metrics',
                method: 'GET',
                headers: { 'accept': 'image/webp,image/apng,image/*,*/*;q=0.8' }
            };
        });

    const agregatedHttps$ = xs.merge(sendAllMetrics$,getConfig$);

    const vdom$ = sources.HTTP.select('api')
        .flatten()
        .remember()
        .map(res => res.body)
        .map(result =>
            div('.container',
                { style: {
                    'background-image': `url(${result.imageUrl})`,
                    'width': '350px',
                    'height': '150px',
                    } },
                [
                    button('.button', result.buttonText)
                ])
        );

    return {
        DOM: vdom$,
        HTTP: agregatedHttps$
    };
}

export { BannerApp };