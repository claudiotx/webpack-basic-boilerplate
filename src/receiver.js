import SuperEventEmitter from './super_event_emitter';

class Receiver {
    constructor(){
        console.info('receiver running');
        this.subscribeToEventEmitterDataChannel();
        this.subscribeToEventEmitterXptoChannel();
    }
    subscribeToEventEmitterDataChannel(){
        const subscription = SuperEventEmitter.listen('data', function (data) {
            console.log('receiver received on data channel: ' + data);
        });
    }
    subscribeToEventEmitterXptoChannel(){
        const subscription = SuperEventEmitter.listen('xpto', function (data) {
            console.log('receiver received on xpto channel: ' + data);
        });
    }

}
export { Receiver };