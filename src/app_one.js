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