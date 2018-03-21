import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import DateTimePicker from '../DateTimePicker'
import {validateMoment} from '../datetimeUtils'
import { jssStyles } from './dateRange.jss'

@injectSheet(jssStyles)
export default class DateRange extends Component {
  static propTypes = {
    cb: PropTypes.func,
    endCalEvents: PropTypes.arrayOf(PropTypes.shape({
      color: PropTypes.string,
      date: PropTypes.instanceOf(Date).isRequired,
      label: PropTypes.string
    })),
    endDate: PropTypes.instanceOf(Date),
    maxDate: PropTypes.instanceOf(Date),
    minDate: PropTypes.instanceOf(Date),
    sheet: PropTypes.object.isRequired,
    showToday: PropTypes.bool,
    startCalEvents: PropTypes.arrayOf(PropTypes.shape({
      color: PropTypes.string,
      date: PropTypes.instanceOf(Date).isRequired,
      label: PropTypes.string
    })),
    startDate: PropTypes.instanceOf(Date)
  }

  static defaultProps = {
    endCalEvents: [],
    startCalEvents: [],
    showToday: false
  }

  state = {
    endDate: validateMoment(this.props.endDate, false),
    endCalEvents: this.props.endCalEvents,
    maxDate: validateMoment(this.props.maxDate, true),
    minDate: validateMoment(this.props.minDate, true),
    startDate: validateMoment(this.props.startDate, false),
    startCalEvents: this.props.startCalEvents
  }

  componentWillReceiveProps (nextProps) {
    const newState = {}

    Object.keys(nextProps).forEach((key) => {
      if (!(nextProps[key] instanceof Date)) { return }
      newState[key] = moment(nextProps[key])
    })

    this.setState(newState)
  }

  returnRange (startDate, endDate) {
    const {cb} = this.props
    if (cb instanceof Function) {
      cb({
        startDate: startDate.toDate(),
        endDate: endDate.toDate()
      })
    }
  }

  handleRangeChange = (type, date) => {
    const {startDate, endDate, minDate, maxDate, endCalEvents, startCalEvents} = this.state
    const newState = { [type]: moment(date) }

    // Ensure the ranges are within a optional min and max limits
    const isBeforeMin = newState[type].isBefore(minDate)
    const isAfterMax = newState[type].isAfter(maxDate)

    // Ensure the dates do not cross and then make sure the updated dates are within in the limits
    if (type === 'startDate') {
      if (isBeforeMin) {
        newState.startDate = moment(minDate)
      }

      if (newState.startDate.isAfter(endDate)) {
        if (isAfterMax) {
          newState.startDate = moment(maxDate).subtract(1, 'minute')
          newState.endDate = moment(maxDate)
        } else {
          newState.endDate = moment(newState.startDate).add(1, 'minute')

          if (newState.endDate.isAfter(maxDate)) {
            newState.startDate = moment(maxDate).subtract(1, 'minute')
            newState.endDate = moment(maxDate)
          }
        }
      }
    } else if (type === 'endDate') {
      if (isAfterMax) {
        newState.endDate = moment(maxDate)
      }

      if (newState.endDate.isBefore(startDate)) {
        if (isBeforeMin) {
          newState.startDate = moment(minDate)
          newState.endDate = moment(minDate).add(1, 'minute')
        } else {
          newState.startDate = moment(newState[type]).subtract(1, 'minute')

          if (newState.startDate.isBefore(minDate)) {
            newState.startDate = moment(minDate)
            newState.endDate = moment(minDate).add(1, 'minute')
          }
        }
      }
    }

    // TODO I need to figure out how to handle an array of events
    // and only update the correct event with the state change
    if (type === 'startDate') {
      newState.endCalEvents = endCalEvents.map((calEvent) => {
        return {
          ...calEvent,
          date: newState.startDate.toDate()
        }
      })
    } else if (type === 'endDate') {
      newState.startCalEvents = startCalEvents.map((calEvent) => {
        return {
          ...calEvent,
          date: newState.endDate.toDate()
        }
      })
    }

    this.setState(newState, () => {
      this.returnRange(this.state.startDate, this.state.endDate)
    })
  }

  render () {
    const {
      endCalEvents,
      showToday,
      startCalEvents,
      sheet: { classes }
    } = this.props
    const {
      endDate,
      maxDate,
      minDate,
      startDate
    } = this.state

    return (
      <div>
        <div className={classnames('datepicker-from', classes.datePicker)}>
          <label><strong>From:</strong></label>
          <DateTimePicker
            cb={this.handleRangeChange.bind(this, 'startDate')}
            date={startDate.toDate()}
            events={startCalEvents}
            maxDate={(maxDate) ? maxDate.toDate() : null}
            minDate={(minDate) ? minDate.toDate() : null}
            showToday={showToday}
          />
        </div>
        <div className={classnames('datepicker-to', classes.datePicker)}>
          <label><strong>To:</strong></label>
          <DateTimePicker
            cb={this.handleRangeChange.bind(this, 'endDate')}
            date={endDate.toDate()}
            events={endCalEvents}
            maxDate={(maxDate) ? maxDate.toDate() : null}
            minDate={(minDate) ? minDate.toDate() : null}
            showToday={showToday}
          />
        </div>
      </div>
    )
  }
}
