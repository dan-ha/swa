import { interval } from 'rxjs';
import { ajax } from 'rxjs/ajax'
import { concatMap, map } from 'rxjs/operators';

const dispatcher = (store) => {

  const INTERVAL_MS = 3000
  const poll_url = url => interval(INTERVAL_MS).pipe(concatMap(() => ajax.getJSON(url)))
  const log = x => { console.log(x); return x }
  let observable

  return async ({ type, ...params }) => {
    switch (type) {
      case 'warnings':
        store({ type, ...params })
        break
      case 'update':
        store({ type, ...params })
        break
      case 'severity':
        store({ type, ...params })
        break
      case 'subscribe':
        // fetch warnings
        let res = await fetch('http://localhost:8080/warnings/').then(res => res.json());
        let time = res.time
        let warnings = res.warnings
        store({ type: 'warnings', warnings })
        store({ type: 'updates', updates: [] })

        // poll updates
        observable = poll_url(`http://localhost:8080/warnings/since/${time}`)
          .pipe(map(log))
          .subscribe(resp => {
            let updates = resp.warnings
            store({ type: 'updates', updates })
          }
          )
        break
      case 'unsubscribe':
        observable.unsubscribe()
        break
      default:
        break;
    }
  }
}

export default dispatcher
