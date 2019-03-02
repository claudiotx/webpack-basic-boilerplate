import SuperEventEmitter from './super_event_emitter';
class Emitter {
    constructor(){
        console.info('emitter running');
        this.subscribeToEventEmitterDataChannel();
    }
    subscribeToEventEmitterDataChannel(){
        const subscription = SuperEventEmitter.listen('data', function (data) {
            console.log('ping received data: ' + data);
        });

        SuperEventEmitter.emit('data', 'foo');
        SuperEventEmitter.emit('xpto', 'dummy information on xpto channel');

        // Destroy the subscription
        subscription.unsubscribe();
        SuperEventEmitter.emit('data', 'a bit more data on data channel');

        // Channel permanently closed (all subscriptions cleared)
        SuperEventEmitter.close('data');

        SuperEventEmitter.emit('data', 'even a bit more data on data channel');
        SuperEventEmitter.emit('xpto', 'more dummy information on xpto channel');
    }
}

export { Emitter };