// super_event_emitter.js
// --------------------------------------------------------------
import { Subject } from 'rxjs/Rx';

class SuperEventEmitter {
    constructor(){
        console.info('SuperEventEmitter running...');
        this.subjects = {};
    }
    emit (name, data) {
        console.warn('SuperEventEmitter > Emitting ...', name);
        const fnName = this.createName(name);
        this.subjects[fnName] || (this.subjects[fnName] = new Subject());
        this.subjects[fnName].next(data);
    }
    listen (name, handler) {
        console.warn('SuperEventEmitter > listener attached ...', name);
        var fnName = this.createName(name);
        this.subjects[fnName] || (this.subjects[fnName] = new Subject());
        return this.subjects[fnName].subscribe(handler);
    }
    close (name) {
        var subjects = this.subjects;
        const channel = this.subjects[this.getName(name)];
        if(channel){
            console.warn('SuperEventEmitter > Channel closed ...', name);
            channel.complete();
        }
    }
    createName (name){
        return '$' + name;
    }
    getName (name){
        return '$' + name;
    }
};

const singleton = new SuperEventEmitter();
export default singleton;

// emitter.js
// --------------------------------------------------------------
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

// receiver.js
// --------------------------------------------------------------
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