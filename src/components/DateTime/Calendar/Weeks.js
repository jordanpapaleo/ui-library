import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import Week from './Week'
import injectSheet from 'react-jss'
import { jssStyles } from './calendar.jss'

@injectSheet(jssStyles)
export default class Weeks extends Component {
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
    visibleDate: PropTypes.instanceOf(moment)
  }

  render () {
    const {
      changeDate,
      date,
      events,
      maxDate,
      minDate,
      showToday,
      visibleDate,
      sheet: {classes}} = this.props
    const currentMonthMoment = moment([visibleDate.year(), visibleDate.month()])
    const currentEndOfMonthMoment = moment(currentMonthMoment).endOf('month')

    let weeksStartDates = []

    // If start of month is not on Sunday
    if (currentMonthMoment.day() !== 0) {
      const lastMonthMoment = moment(currentMonthMoment).subtract(1, 'month')
      const lastEndOfMonthMoment = moment(lastMonthMoment).endOf('month')
      const lastStartMoment = moment(lastEndOfMonthMoment).subtract(currentMonthMoment.day() - 1, 'days')
      const lastDayLastWeek = moment(lastStartMoment).add(34, 'day')

      weeksStartDates = [
        lastStartMoment,
        moment(lastStartMoment).add(7, 'day'),
        moment(lastStartMoment).add(14, 'day'),
        moment(lastStartMoment).add(21, 'day'),
        moment(lastStartMoment).add(28, 'day')
      ]

      if (currentEndOfMonthMoment.isAfter(lastDayLastWeek)) {
        weeksStartDates.push(moment(lastStartMoment).add(35, 'day'))
      }
    } else {
      weeksStartDates = [
        currentMonthMoment,
        moment(currentMonthMoment).add(7, 'day'),
        moment(currentMonthMoment).add(14, 'day'),
        moment(currentMonthMoment).add(21, 'day'),
        moment(currentMonthMoment).add(28, 'day')
      ]
    }

    return (
      <div className={classes.weeks}>
        {weeksStartDates.map((startDate) => {
          return (
            <Week
              changeDate={changeDate}
              date={date}
              events={events}
              key={startDate}
              maxDate={maxDate}
              minDate={minDate}
              showToday={showToday}
              startDate={startDate}
              visibleDate={visibleDate}
            />
          )
        })}
      </div>
    )
  }
}
