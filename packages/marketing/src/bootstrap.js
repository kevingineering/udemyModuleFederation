import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// Mount function to start up the app
const mount = (element) => {
  ReactDOM.render(<App />, element)
}

// If in dev and therefore isolation, call mount immediately
if (process.env.NODE_ENV === 'development') {
  const element = document.getElementById('dev-marketing')
  if (element) {
    mount(element)
  }
}

// Export mount function so it is available if running through container
// Don't export a react component because container shouldn't assume a framework - also, changing framework would break interface
export { mount }
