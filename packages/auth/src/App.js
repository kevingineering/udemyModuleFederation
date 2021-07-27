import React from 'react'
import { Switch, Route, Router } from 'react-router-dom'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'

import Signin from './components/Signin'
import Signup from './components/Signup'

// helps keep classnames legitimately different - see notes on CSS Scoping
const generateClassName = createGenerateClassName({
  productionPrefix: 'auth'
})

const App = ({ history, onSignIn }) => {
  return (
    <div>
      {/* Ensures that generated styles are different between MFEs */}
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <Switch>
            <Route path='/auth/signin'>
              <Signin onSignIn={onSignIn} />
            </Route>
            <Route path='/auth/signup'>
              <Signup onSignIn={onSignIn} />
            </Route>
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  )
}

export default App
