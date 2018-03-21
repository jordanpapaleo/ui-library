import React from 'react'
import PropTypes from 'prop-types'

const Tag = ({value, color, size}) => {
  const styles = {
    borderColor: `${color} transparent transparent transparent`,
    borderStyle: 'solid',
    borderWidth: `${size}px ${size}px 0 0`,
    height: 0,
    width: 0
  }

  const styles2 = {
    color: 'white',
    fontSize: size / 3.5,
    left: -size / 3.5,
    position: 'relative',
    textAlign: 'center',
    top: -size / 3.5,
    transform: 'rotateZ(-45deg)',
    transformOrigin: '0 0',
    width: `${Math.sqrt((size * size) * 2)}px`
  }

  return (
    <div className='tag-component'>
      <div style={styles} />
      <div style={styles2}>{value}</div>
    </div>
  )
}

Tag.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  value: PropTypes.any
}

export default Tag
