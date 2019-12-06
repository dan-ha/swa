import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import model from './model.js'
import view from './view.js'
import store from './store.js'
import dispatcher from './dispatcher.js'

function init() {
  const theModel = model()
  let renderer = dom => ReactDOM.render(dom, document.getElementById('root'))
  let theDispatcher
  const theView = view(() => theDispatcher)
  const theStore = store(theModel, theView, renderer)
  theDispatcher = dispatcher(theStore)
  renderer(theView(theModel))

  theDispatcher({type: 'subscribe'})
}

init()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
