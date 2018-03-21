import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import injectSheet from 'react-jss'
import { jssStyles } from './calendar.jss'
import { WEEKDAYS } from './calendarConstants'
import {validateMoment} from '../datetimeUtils'
import MonthHeader from './MonthHeader'
import Weeks from './Weeks'

/*
 * Calendar is a publicly used interface so its input type is a JS Dates
 * The Weeks, Week, etc is not public so it can continue to use Moment Dates
 */

@injectSheet(jssStyles)
export default class Calendar extends Component {
  static propTypes = {
    cb: PropTypes.func,
    date: PropTypes.instanceOf(Date),
    events: PropTypes.arrayOf(PropTypes.shape({
      color: PropTypes.string,
      date: PropTypes.instanceOf(Date).isRequired,
      label: PropTypes.string
    })),
    maxDate: PropTypes.instanceOf(Date),
    minDate: PropTypes.instanceOf(Date),
    sheet: PropTypes.object.isRequired,
    showToday: PropTypes.bool
  }

  static defaultProps = {
    events: [],
    showToday: false
  }

  state = {
    date: validateMoment(this.props.date, false),
    events: this.props.events,
    maxDate: validateMoment(this.props.maxDate, true),
    minDate: validateMoment(this.props.minDate, true),
    visibleDate: validateMoment(this.props.date, false)
  }

  componentWillReceiveProps (nextProps) {
    const newState = {}

    Object.keys(nextProps).forEach((key) => {
      if ((nextProps[key] instanceof Date)) {
        if (this.shouldUpdateDate(nextProps[key], this.state[key])) {
          newState[key] = moment(nextProps[key])
        }
      } else if (key === 'events') {
        newState.events = nextProps.events
      }
    })

    this.setState(newState)
  }

  returnDate (date) {
    const {cb} = this.props
    if (cb && cb instanceof Function) {
      cb(date.toDate())
    }
  }

  // newVal is JSDate and oldVal is a moment
  shouldUpdateDate (newVal, oldVal) {
    let shouldUpdate = false

    if (newVal) {
      if (!oldVal) {
        shouldUpdate = true
      } else if (newVal.toJSON() !== oldVal.toJSON()) {
        shouldUpdate = true
      }
    }

    return shouldUpdate
  }

  handleVisibleDateChange = (visibleDate) => {
    this.setState({ visibleDate: visibleDate })
  }

  handleDateChange = (date) => {
    this.setState({ date }, () => {
      this.returnDate(this.state.date)
    })
  }

  render () {
    const {showToday, sheet: { classes }} = this.props
    const {
      date,
      events,
      maxDate,
      minDate,
      visibleDate
    } = this.state

    return (
      <div className={classes.calendar}>
        <MonthHeader date={visibleDate} cb={this.handleVisibleDateChange} />

        <div className='week-header'>
          {WEEKDAYS.map((day) => {
            return <span key={day} className={classes.weekDay}>{day}</span>
          })}
        </div>

        <Weeks
          changeDate={this.handleDateChange}
          date={date}
          events={events}
          maxDate={maxDate}
          minDate={minDate}
          showToday={showToday}
          visibleDate={visibleDate}
        />
      </div>
    )
  }
}
