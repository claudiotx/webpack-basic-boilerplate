/*
    What is RxJS?
    Any callback is represented as a Collection with operations, maps and filter, etc.

    Types of Callback:
        Sync Callback
        Async Callbacks
        Promises Callbacks
        NodeJS Streams Callbacks (data, error, done)

     Basically Observables and Observers are Wrapper objects around callbacks.

     An Observer is observing something that is observable.
*/

function map(transformFn){
  const inputObservable = this;
  const outputObservable = createObservable(function giveMeData(outputObserver){
    inputObservable.subscribe({
      next: function(x){
        const y = transformFn(x);
        outputObserver.next(y);
      },
      error: e => outputObserver.error(e),
      complete: e => outputObserver.complete(e)
    })
  });
  return outputObservable;
}

function filter(conditionFn){
  const inputObservable = this;
  const outputObservable = createObservable(function giveMeData(outputObserver){
    inputObservable.subscribe({
      next: function(x){
        if(conditionFn(x)){
          outputObserver.next(x);
        }
      },
      error: e => outputObserver.error(e),
      complete: e => outputObserver.complete(e)
    })
  });
  return outputObservable;
}

function delay(time){
  const inputObservable = this;
  const outputObservable = createObservable(function giveMeData(outputObserver){
    inputObservable.subscribe({
      next: function(x){
        setTimeout(function() {
          outputObserver.next(x);
        }, time);
      },
      error: e => outputObserver.error(e),
      complete: e => outputObserver.complete(e)
    })
  });
  return outputObservable;
}


function createObservable(subscribe){
  return {
      subscribe: subscribe,
      map: map,
      filter: filter,
      delay: delay
  }
}

const arrayObservable = createObservable( function giveMeData(ob){
  [1,2,3].forEach(ob.next);
  ob.complete();
});

const clickObservable = createObservable( function evtFromDOM(ob){
  document.addEventListener('click',ob.next);
});


// Callbacks
const observer = {
    next: function nextCallback(data){
        console.log(data);
    },

    error: function errorCallback(err){

    },

    complete: function completeCallback(){
        console.log('complete');
    }
}

arrayObservable
.map( x => x/2)
.filter (x => x!== 1)
.subscribe(observer);

// Run in a browser
// clickObservable
// .map( ev => ev.clientX)
// .filter (x => x < 2000)
// .delay(2000)
// .subscribe(observer);

