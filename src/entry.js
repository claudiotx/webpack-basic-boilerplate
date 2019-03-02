import xs from 'xstream';
import { run } from '@cycle/run';
import { div, makeDOMDriver } from '@cycle/dom';
import { makeHTTPDriver } from '@cycle/http';
import {timeDriver, TimeSource} from '@cycle/time';

import { makeLogDriver } from './drivers/log_driver';
import { makeAppsPoolDriver } from './drivers/apps_pool_driver';

import { CycleCounter } from './cycle_counter';
import { CycleJson } from './cycle_json';
import { CycleSlider } from './cycle_slider';
import { CycleBmi } from './cycle_bmi';
import { CycleClock } from './cycle_clock';
import { CycleSprocket } from './cycle_sprocket';
import { CycleList } from './cycle_list';
import { OnionMain } from './cycle_onion';

// ---------------------------------
//          CycleSprocket
// ---------------------------------
const appsPool = {
  pool: [],
  start: (listener) => {
    appsPool.listener = listener;
  },
  addApp: (app) => {
    appsPool.pool.push(app);
    appsPool.listener.next(app);
  },
  stop: () => {
    appsPool.pool = [];
  }
}

const sprocket = run(CycleSprocket, {
  DOM: makeDOMDriver('#sprocket'),
  pool: makeAppsPoolDriver(appsPool)
});


// ---------------------------------
//              Apps
// ---------------------------------
// const bmiApp = run(CycleBmi, {
//   DOM: makeDOMDriver('#bmi'),
//   HTTP: makeHTTPDriver()
// });
// appsPool.addApp({name: 'bmiApp', app: bmiApp});

// const jsonApp = run(CycleJson, {
//   DOM: makeDOMDriver('#printer'),
//   HTTP: makeHTTPDriver()
// });
// appsPool.addApp({name: 'jsonApp', app: jsonApp});

// const cpanelApp = run(CycleCounter, {
//   DOM: makeDOMDriver('#counter'),
//   HTTP: makeHTTPDriver()
// });


const clockApp = run(CycleClock, {
  DOM: makeDOMDriver('#clock'),
  Time: timeDriver
});
appsPool.addApp({name: 'clockApp', app: clockApp});

const listApp = run(CycleList,{
  DOM: makeDOMDriver('#list')
});
appsPool.addApp({name: 'listApp', app: listApp});


const onionApp = run(OnionMain,{
  DOM: makeDOMDriver('#onion')
});


// let counterApp = new CycleCounter();
// let cycleSlider = new CycleSlider();

// let jsonApp = new CycleJson();

// Simulate Destroy Sequence
// setTimeout(()=>{
//     jsonApp.destroy();
// },2000);

// setTimeout(()=>{
//     jsonApp = new CycleJson();
// },3000);

// setTimeout(()=>{
//     jsonApp.destroy();
// },3000);
