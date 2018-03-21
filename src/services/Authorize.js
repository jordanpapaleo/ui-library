import React, {Component} from 'react'
import store from 'services/store'
import get from 'lodash/get'

export const authorize = (requiredRoles) => (AuthComponent) => {
  class Authorize extends Component {
    render () {
      const authorized = getAuth(requiredRoles)
      return (authorized)
        ? <AuthComponent {...this.props} />
        : null
    }
  }

  return Authorize
}

export function getAuth (requiredRoles = []) {
  let authorized = false
  const state = store.getState()
  const roles = get(state, 'app.session.user.roles')

  if (roles) {
    for (var i = 0, k = requiredRoles.length; i < k; i++) {
      if (roles.indexOf(requiredRoles[i]) !== -1) {
        authorized = true
        break
      }
    }
  }

  return authorized
}
