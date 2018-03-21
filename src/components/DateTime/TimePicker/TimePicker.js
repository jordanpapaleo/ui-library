import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import injectSheet from 'react-jss'
import debounce from '../../../../utils/debounce'
import {validateMoment} from '../datetimeUtils'
import { jssStyles } from './timePicker.jss'

@injectSheet(jssStyles)
export default class TimePicker extends Component {
  static propTypes = {
    cb: PropTypes.func,
    date: PropTypes.instanceOf(Date),
    maxDate: PropTypes.instanceOf(Date),
    minDate: PropTypes.instanceOf(Date),
    sheet: PropTypes.object.isRequired
  }

  state = {
    date: validateMoment(this.props.date, false),
    maxDate: validateMoment(this.props.maxDate, true),
    minDate: validateMoment(this.props.minDate, true)
  }

  componentWillMount () {
    const state = this.deconstructDate(this.state.date)
    this.setState(state)
  }

  componentWillReceiveProps (nextProps) {
    const newState = {}

    Object.keys(nextProps).forEach((key) => {
      if (!(nextProps[key] instanceof Date)) { return }
      newState[key] = moment(nextProps[key])
    })

    this.setState(newState, () => {
      const state = this.deconstructDate(this.state.date)
      this.setState(state)
    })
  }

  returnTime = (date) => {
    const {cb} = this.props
    if (cb instanceof Function) {
      cb(this.state.date.toDate())
    }
  }

  // Extracts time properties from a moment
  deconstructDate (date) {
    const minutes = date.minute()
    let hours = date.hour()
    let period = (hours >= 12) ? 'pm' : 'am'

    if (hours > 12) {
      hours = hours - 12
    } else if (hours === 0) {
      hours = 12
    }

    return {
      period,
      hours: (hours < 10) ? `0${hours}` : `${hours}`,
      minutes: (minutes < 10) ? `0${minutes}` : `${minutes}`
    }
  }

  // Turns time properties into a moment
  constructDate (hours, minutes, period) {
    const {date} = this.state
    const newDate = moment(date)

    let tempHours = ~~hours
    if (period.toLowerCase() === 'pm') {
      tempHours = (tempHours === 12) ? tempHours : tempHours + 12
    } else {
      tempHours = (tempHours === 12) ? 0 : tempHours
    }

    newDate
      .hours(tempHours)
      .minutes(minutes)

    return newDate
  }

  handleTimeChange = ({target}) => {
    let {name, value} = target

    // Do not allow more than 2 characters for a time value
    if (value.length > 2) return

    const {name: validName, value: validValue} = this.validateChanges(name, value)
    this.setState({[validName]: validValue}, debounce(() => {
      const validState = this.validateState()
      this.setState(validState, () => {
        this.returnTime(this.state.date)
      })
    }, 750))
  }

  // Runs regular expressions to ensure valid values are supplied
  validateChanges (name, value) {
    // Only run tests if there is a value
    // allowing values to be an empty string
    if (value !== '') {
      if (name === 'hours') {
        const intHours = parseInt(value)
        if (isNaN(intHours) || intHours < 0 || intHours > 12) {
          value = '00'
        }
      } else if (name === 'minutes') {
        const intMinutes = parseInt(value)
        if (isNaN(intMinutes) || intMinutes < 0 || intMinutes > 59) {
          value = '00'
        }
      } else if (name === 'period') {
        // AM || PM check
        if (value.length === 1) {
          const regex = new RegExp('[PApa]')
          if (!regex.test(value)) {
            value = 'a'
          }
        } else if (value.length === 2) {
          const regex = new RegExp('[PApa]+[mM]')
          if (!regex.test(value)) {
            value = 'am'
          }
        }
      }
    }

    return {name, value}
  }

  // Ensures the new time falls with possible min and max dates
  validateState () {
    const {hours, minutes, period, minDate, maxDate} = this.state
    const validState = {
      date: this.constructDate(hours, minutes, period)
    }

    const isBeforeMin = validState.date.isBefore(minDate)
    const isAfterMax = validState.date.isAfter(maxDate)

    if (isBeforeMin || isAfterMax) {
      validState.date = (isBeforeMin) ? moment(minDate) : moment(maxDate)
      const {hours, minutes, period} = this.deconstructDate(validState.date)
      validState.hours = hours
      validState.minutes = minutes
      validState.period = period
    }

    return validState
  }

  render () {
    const {sheet: {classes}} = this.props
    const {hours, minutes, period} = this.state

    return (
      <div className={classes.container}>
        <span className={`fa fa-clock-o ${classes.icon}`}></span>
        <input
          className={classes.input}
          name="hours"
          onChange={this.handleTimeChange.bind(this)}
          onClick={() => { this.elHour.select() }}
          ref={el => { this.elHour = el }}
          type="text"
          value={hours}
        />:
        <input
          className={classes.minuteInput}
          name="minutes"
          onChange={this.handleTimeChange.bind(this)}
          onClick={() => { this.elMinute.select() }}
          ref={el => { this.elMinute = el }}
          type="text"
          value={minutes}
        />
        <input
          className={classes.input}
          name="period"
          onChange={this.handleTimeChange.bind(this)}
          onClick={() => { this.elPeriod.select() }}
          ref={el => { this.elPeriod = el }}
          type="text"
          value={period}
        />
      </div>
    )
  }
}
