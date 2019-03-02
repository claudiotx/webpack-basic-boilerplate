import {Observable} from 'rxjs';

const numbersObservable = Observable.from([1,2,3]);

numbersObservable
  .map( x => x/2)
  .filter (x => x!== 1)
  .subscribe({
    next: function next(x){
      console.log(x);
    },
    error: function error (err) {},
    complete: function complete () {
      console.log('complete');
    }
  });
