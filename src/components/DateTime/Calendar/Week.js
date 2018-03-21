import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import moment from 'moment'
import injectSheet from 'react-jss'
import { jssStyles } from './calendar.jss'

@injectSheet(jssStyles)
export default class Week extends Component {
  static propTypes = {
    changeDate: PropTypes.func.isRequired,
    date: PropTypes.instanceOf(moment),
    events: PropTypes.arrayOf(PropTypes.shape({
      color: PropTypes.string,
      date: PropTypes.instanceOf(Date).isRequired,
      label: PropTypes.string
    })),
    maxDate: PropTypes.instanceOf(moment),
    minDate: PropTypes.instanceOf(moment),
    sheet: PropTypes.object,
    showToday: PropTypes.bool,
    startDate: PropTypes.instanceOf(moment),
    visibleDate: PropTypes.instanceOf(moment)
  }

  changeDate = (day, isOutofBounds) => {
    if (isOutofBounds) { return }
    const {changeDate, date} = this.props
    day.hours(date.hours())
    day.minutes(date.minutes())
    day.seconds(0)
    changeDate(day)
  }

  matchEvents (date, events) {
    return events.filter((event) => {
      return (date.format('YYYYMMDD') === moment(event.date).format('YYYYMMDD'))
    })
  }

  render () {
    const {
      date,
      events,
      maxDate,
      minDate,
      showToday,
      startDate,
      visibleDate,
      sheet: { classes }} = this.props
    const days = []
    const today = moment()

    let i = 0
    do {
      const day = moment(startDate).add(i, 'day')
      const isToday = (day.format('MMDDYYY') === today.format('MMDDYYY'))
      const isSelected = (day.format('MMDDYYY') === date.format('MMDDYYY'))
      const isSameMonth = (day.month() === visibleDate.month())
      let isOutofBounds = false

      if (!isToday) {
        if (minDate && day.isBefore(minDate) || maxDate && day.isAfter(maxDate)) {
          isOutofBounds = true
        }
      }

      const dayEvents = this.matchEvents(day, events)
      const eventAttrs = {}
      if (dayEvents.length) {
        eventAttrs.style = {
          borderColor: dayEvents[0].color
        }

        eventAttrs.title = dayEvents[0].label
      }

      days.push(
        <span key={day} className={classnames('day', classes.day, {
          'event': (Object.keys(eventAttrs).length),
          'other-month': !isSameMonth,
          'outof-bounds': isOutofBounds,
          'selected': isSelected,
          'today': (isToday && showToday)
        })} {...eventAttrs} onClick={this.changeDate.bind(this, day, isOutofBounds)}>{day.date()}</span>
      )
      i++
    } while (i < 7)

    return (
      <div>{ days }</div>
    )
  }
}
