import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import MarketingApp from './components/MarketingApp'
import Header from './components/Header'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'

// helps keep classnames legitimately different - see notes on CSS Scoping
const generateClassName = createGenerateClassName({
  productionPrefix: 'container'
})

const App = () => {
  return (
    // Ensures that generated styles are different between MFEs
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <div>
          <Header />
          <MarketingApp />
        </div>
      </BrowserRouter>
    </StylesProvider>
  )
}

export default App
