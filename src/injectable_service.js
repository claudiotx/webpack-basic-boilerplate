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