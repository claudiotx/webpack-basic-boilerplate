// injectable_service.js
// --------------------------------------------------------------
import { Subject } from 'rxjs/Rx';
// import Rx from 'rxjs/Rx';
/*
    ES7 Observable spec, the API has changed for observables.
    onNext -> next
    onError -> error
    onCompleted -> complete
*/
class InjectableService {
    constructor(){
        this._subject = new Subject();
        this.startEmitting();
        this.autoStop();
        console.info('injectable service created');
    }
    getObservable(){
        return this._subject;
    }
    startEmitting(){
        setInterval(()=>{
            this._subject.next('foo');
        },2000);
    }
    autoStop(){
        setTimeout(()=>{
            console.warn('Stream terminated');
            this._subject.complete();
            this._subject.next('bar');
        },7000);
    }
}
const singleton = new InjectableService();
export default singleton;

// app1.js
// --------------------------------------------------------------
import InjectableService from './injectable_service';
class App1 {
    constructor(){
        console.info('App1 running');
        this._observable = InjectableService.getObservable();
        const subscription = this._observable.subscribe((data) => {
            console.log('App 1 Subscribed and its consuming data: ' + data);
        });

        // Auto unsubscribe
        setTimeout(()=>{
            subscription.unsubscribe();
        },5000);
    }
}
export { App1 };

// app2.js
// --------------------------------------------------------------
import InjectableService from './injectable_service';
class App2 {
    constructor(){
        console.info('App2 running');
        this._observable = InjectableService.getObservable();
        const subscription = this._observable.subscribe((data) => {
            console.log('App 2 Subscribed and its consuming data: ' + data);
        });
    }
}
export { App2 };

// entry.js
// --------------------------------------------------------------
'use strict';
import { Subject } from 'rxjs/Rx';
import Styles from './styles/index.scss';
import {App1} from './app_one';
import {App2} from './app_two';

(() => {
    console.info('Ecosystem running');
    const app1 = new App1;
    const app2 = new App2;
})();