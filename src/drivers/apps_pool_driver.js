import {adapt} from '@cycle/run/lib/adapt';
import xs from 'xstream';
/* Source Driver: Apps Pool
  Factory function to interface with a passed state option array
  which will keep track of all apps.
 */
function makeAppsPoolDriver(appsPool) {
  function poolDriver(outgoing$) {
    const appsPool$ = xs.createWithMemory(appsPool);
    return adapt(appsPool$);
  }

  return poolDriver;
}

export { makeAppsPoolDriver };