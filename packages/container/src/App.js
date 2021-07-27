import React, { Suspense, lazy, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'
import Progress from './components/Progress'

// lazy load components into file
const MarketingLazy = lazy(() => import('./components/MarketingApp'))
const AuthLazy = lazy(() => import('./components/AuthApp'))

// helps keep classnames legitimately different - see notes on CSS Scoping
const generateClassName = createGenerateClassName({
  productionPrefix: 'container'
})

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false)
  return (
    // Ensures that generated styles are different between MFEs
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <div>
          <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path='/auth' component={AuthLazy}>
                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path='/' component={MarketingLazy} />
            </Switch>
          </Suspense>
        </div>
      </BrowserRouter>
    </StylesProvider>
  )
}

export default App
