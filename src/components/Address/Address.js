import React, {Component, Children} from 'react'
import PropTypes from 'prop-types'
const NO_DATA = '--'

function titleCase (str = NO_DATA) {
  str = str.replace(/\s+/g, ' ')
  str = str.replace(/\s+$/, '')

  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.replace(word[0], word[0].toUpperCase()))
    .join(' ')
}

export default class Address extends Component {
  static propTypes = {
    address: PropTypes.shape({
      city: PropTypes.string,
      state: PropTypes.string,
      street: PropTypes.string,
      unitNumber: PropTypes.string,
      zipcode: PropTypes.string
    }).isRequired,
    children: PropTypes.any,
    twoLines: PropTypes.bool
  }

  static Street = ({address, twoLines, style}) => {
    const {street, unit} = address
    return <span style={style}>{street}{unit}{twoLines ? <br /> : ', '}</span>
  }

  static CityStateZip = ({address, style}) => {
    const {city, state, zip} = address
    return <span style={style}>{city}, {state} {zip}</span>
  }

  render () {
    const {address, twoLines, children} = this.props
    const street = titleCase(address.street)
    const unit = address.unitNumber ? ` ${titleCase(address.unitNumber)}` : ''
    const city = titleCase(address.city)
    const state = (address.state && address.state.length) ? address.state.toUpperCase() : NO_DATA
    const zip = (address.zipcode && address.zipcode.length) ? address.zipcode.substr(0, 5) : NO_DATA

    return children
      ? (
        <span className='address-component'>
          {Children.map(children, (child) => React.cloneElement(child, {
            style: child.props.style,
            address: {street, unit, city, state, zip},
            twoLines
          }))}
        </span>
      )
      : (
        <span className='address-component'>
          <Address.Street address={{street, unit, city, state, zip}} twoLines={twoLines} />
          <Address.CityStateZip address={{street, unit, city, state, zip}} />
        </span>
      )
  }
}
