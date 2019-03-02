'use strict';
import { Subject } from 'rxjs/Rx';
import Styles from './styles/index.scss';
// import {App1} from './app_one';
// import {App2} from './app_two';
import { Receiver } from './receiver';
import { Emitter } from './emitter';

// (() => {
//     console.info('Ecosystem running');
//     const app1 = new App1;
//     const app2 = new App2;
// })();

(()=> {
    console.info('Ecosystem running');
    const receiver = new Receiver();
    const emitter = new Emitter();
})();