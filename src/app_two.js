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