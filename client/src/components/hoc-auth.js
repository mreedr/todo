import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

const authWrapper = (WrappedComponent) => {
  return (props) => {
    const jwtToken = useSelector(state => state.tokenReducer.jwtToken)
    if (jwtToken) return <WrappedComponent {...props} />
    return <Redirect to="/login" />
  }
}

export default authWrapper
