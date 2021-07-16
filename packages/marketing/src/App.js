import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'

import Landing from './components/Landing'
import Pricing from './components/Pricing'

// helps keep classnames legitimately different - see notes on CSS Scoping
const generateClassName = createGenerateClassName({
  productionPrefix: 'marketing'
})

const App = () => {
  return (
    <div>
      {/* Ensures that generated styles are different between MFEs */}
      <StylesProvider generateClassName={generateClassName}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/pricing' component={Pricing} />
            <Route path='/' component={Landing} />
          </Switch>
        </BrowserRouter>
      </StylesProvider>
    </div>
  )
}

export default App
