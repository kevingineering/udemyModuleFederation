import React, { useRef, useEffect } from 'react'
import { mount } from 'marketing/MarketingApp'
import { useHistory } from 'react-router-dom'

export default () => {
  const ref = useRef(null)
  const history = useHistory()

  useEffect(() => {
    console.log(ref.current)
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      // location object provided by history in MFEs has pathname key-value pair
      onNavigate: ({ pathname: nextPathname }) => {
        // because sub app tells container when things change and container tells sub app, we check for changes to prevent infinite loop
        if (history.location.pathname !== nextPathname) {
          // navigate to new path
          history.push(nextPathname)
        }
      }
    })

    // tell sub app the container had a navigation event
    history.listen(onParentNavigate)
  }, [])

  return <div ref={ref} />
}
