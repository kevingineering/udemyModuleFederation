import React from 'react'
import ReactDOM from 'react-dom'
import { createMemoryHistory, createBrowserHistory } from 'history'
import App from './App'

// Mount function to start up the app
const mount = (element, { onNavigate, defaultHistory, initialPath, onSignIn }) => {
  // History for use with routing - only have default history if in isolation
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath]
    })

  // Event listener calls function if not in isolation
  if (onNavigate) {
    history.listen(onNavigate)
  }

  ReactDOM.render(<App history={history} onSignIn={onSignIn} />, element)

  return {
    onParentNavigate({ pathname: nextPathname }) {
      if (history.location.pathname !== nextPathname) {
        history.push(nextPathname)
      }
    }
  }
}

// If in dev and therefore isolation, call mount immediately
if (process.env.NODE_ENV === 'development') {
  const element = document.getElementById('dev-auth')
  if (element) {
    // if in isolation, uses browser history - allows us to see navigation which wouldn't be possible with memory history
    mount(element, { defaultHistory: createBrowserHistory() })
  }
}

// Export mount function so it is available if running through container
// Don't export a react component because container shouldn't assume a framework - also, changing framework would break interface
export { mount }
