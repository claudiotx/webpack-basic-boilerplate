import xs from 'xstream'
import {button, div, h2, ul, li, p} from '@cycle/dom'

const fakeData = [
  {
    name: 'Online Shop 1',
    sales: 90,
    products: [
      {
        id: 0,
        name: 'Wine'
      },
      {
        id: 1,
        name: 'Beer'
      }
    ]
  },
  {
    name: 'Online Shop 2',
    sales: 60,
    products: [
      {
        id: 0,
        name: 'Cheese'
      },
      {
        id: 1,
        name: 'Chourizo'
      }
    ]
  }
]

const CycleShops = sources => {
  const vdom$ = sources.props$
    .map(shop => li(`${shop.name} - ${shop.sales}`));
  return {
    DOM: vdom$
  }
}

const CycleShopsList = sources => {
  // Assign the sort button to an action object
  // xs.merge - merge multiple streams together, emitting events from all of them concurrently.
  const intent = () => xs.merge(
    sources.DOM.select('#sortList').events('click')
      .mapTo({type: 'list/sort'})
  )
  // On Every Intent (from sort click stream), sort and return a new list
  const model = actions$ => {
    console.warn('action happened', actions$);
    const sortedList$ = actions$
      .map(action => action.type === 'list/sort')
      .map(() => state => state.sort((a, b) => a.sales - b.sales));

      const state$ = sources.props$
      .map(initialState =>
        xs.merge(sortedList$)
          .fold((state, action) => action(state), initialState)
      ).flatten();
      return state$;
  }

  // View (receives a new sorted list, i.e. new state)
  const view = state$ =>
    state$
      .map(shops => {
        const shopsNodes$ = shops.map(shop => {
          const props$ = xs.of(shop) // create a stream from a shop and emit
          const source = {
            DOM: sources.DOM,
            props$
          };
          const cycleShops = CycleShops(source)
          return cycleShops.DOM
        });

        // Combines multiple input streams together to return a stream whose events are arrays that collect the latest events from each input stream.
        return xs.combine(...shopsNodes$)
          .map(nodes => div([
            h2(['Cycle List']),
            button('#sortList', 'sort list'),
            ul(nodes)
          ]))
      })
      .flatten();

  const vdom$ = view(model(intent()));
  return {
    DOM: vdom$
  }
}

// CycleList App
function CycleList (sources) {
  // transform the static array into a stream and emit
  const model = () => {
    const teams$ = xs.of(fakeData)
    return teams$
  }
  // receive the stream of data and send it over to the child App (CycleShopsList)
  const view = state$ => {
    const listSources = {
      DOM: sources.DOM,
      props$: state$
    };
    const shopsList = CycleShopsList(listSources)
    return shopsList.DOM
      .map(shopsListDOM => div([shopsListDOM]))
  }
  const vdom$ = view(model())
  return {
    DOM: vdom$
  }
}

export { CycleList };