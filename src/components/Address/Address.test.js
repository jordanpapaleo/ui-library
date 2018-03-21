import React from 'react'
import ReactDOM from 'react-dom'
import Address from './Address'

describe('Address', () => {
  it('renders without crashing', () => {
    const address = {
      street: '123 Sesame Street',
      city: 'New York',
      state: 'NY',
      zipcode: '12345-6789'
    }

    const div = document.createElement('div')

    ReactDOM.render(<Address address={address} />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
