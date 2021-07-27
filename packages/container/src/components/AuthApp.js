import React, { useRef, useEffect } from 'react'
import { mount } from 'auth/AuthApp'
import { useHistory } from 'react-router-dom'

export default ({ onSignIn }) => {
  const ref = useRef(null)
  const history = useHistory()

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      // location object provided by history in MFEs has pathname key-value pair
      onNavigate: ({ pathname: nextPathname }) => {
        // because sub app tells container when things change and container tells sub app, we check for changes to prevent infinite loop
        if (history.location.pathname !== nextPathname) {
          // navigate to new path
          history.push(nextPathname)
        }
      },
      // called when user logs in or signs up
      onSignIn
    })

    // tell sub app the container had a navigation event
    history.listen(onParentNavigate)
  }, [])

  return <div ref={ref} />
}
