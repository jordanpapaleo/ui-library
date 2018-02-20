import React from 'react'
import ReactDOM from 'react-dom'
import Address from './Address'

describe('Address', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Address />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
