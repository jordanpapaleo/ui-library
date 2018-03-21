import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import injectSheet from 'react-jss'
import Calendar from '../Calendar'
import TimePicker from '../TimePicker'
import Input from '../../Input'
import {validateMoment} from '../datetimeUtils'
import { jssStyles } from './dateTimePicker.jss'

@injectSheet(jssStyles)
export default class DateTimePicker extends Component {
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
    visible: false
  }

  componentWillReceiveProps (nextProps) {
    const newState = {}

    Object.keys(nextProps).forEach((key) => {
      if ((nextProps[key] instanceof Date)) {
        newState[key] = moment(nextProps[key])
      } else if (key === 'events') {
        newState.events = nextProps.events
      }
    })

    this.setState(newState)
  }

  returnDate (mDate) {
    const {cb} = this.props
    if (cb instanceof Function) {
      cb(mDate.toDate())
    }
  }

  handleDateChange = (newDate) => {
    const {maxDate, minDate} = this.state
    let date = moment(newDate)

    if (date.isAfter(maxDate)) {
      date = moment(maxDate)
    } else if (date.isBefore(minDate)) {
      date = moment(minDate)
    }

    this.setState({ date }, () => {
      this.returnDate(this.state.date)
    })
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render () {
    const {sheet: {classes}} = this.props
    const {
      date,
      events,
      maxDate,
      minDate,
      showToday,
      visible
    } = this.state

    return (
      <div>
        <button className="btn btn-calendar pull-left" type="button" onClick={this.toggleVisibility}>
          <span className="fa fa-calendar" />
        </button>
        <Input
          attrs={{ disabled: 'disabled' }}
          cb={this.changeDate}
          classes={classes.dateDisplay}
          value={`${date.format('MMM DD YYYY, h:mm a')}`}
        />
        {visible &&
          <TimePicker
            cb={this.handleDateChange}
            date={date.toDate()}
            maxDate={(maxDate) ? maxDate.toDate() : null}
            minDate={(minDate) ? minDate.toDate() : null}
          />
        }
        {visible &&
          <Calendar
            cb={this.handleDateChange}
            date={date.toDate()}
            events={events}
            maxDate={(maxDate) ? maxDate.toDate() : null}
            minDate={(minDate) ? minDate.toDate() : null}
            showToday={showToday}
          />
        }
      </div>
    )
  }
}
