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