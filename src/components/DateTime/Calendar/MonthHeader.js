import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import classnames from 'classnames'
import injectSheet from 'react-jss'
import { jssStyles } from './calendar.jss'

@injectSheet(jssStyles)
export default class MonthHeader extends Component {
  static propTypes = {
    date: PropTypes.instanceOf(moment),
    cb: PropTypes.func.isRequired,
    sheet: PropTypes.object.isRequired
  }

  previousMonth = () => {
    const {date, cb} = this.props
    const m = moment(date)
    const previousMonth = m.subtract(1, 'month')
    cb(previousMonth)
  }

  nextMonth = () => {
    const {date, cb} = this.props
    const m = moment(date)
    const nextMonth = m.add(1, 'month')
    cb(nextMonth)
  }

  render () {
    const {date, sheet: { classes }} = this.props
    const monthYear = moment(date).format('MMMM YYYY')

    return (
      <div className={classnames('month-header', 'clearfix', classes.monthHeader)}>
        <button className={classnames('btn', 'btn-link', 'pull-left', classes.monthButton)} type="button" onClick={this.previousMonth}>{String.fromCharCode(9664)}</button>
        <button className={classnames('btn', 'btn-link', 'pull-right', classes.monthButton)} type="button" onClick={this.nextMonth}>{String.fromCharCode(9654)}</button>
        <h4 className={classes.calendarTitle}>{monthYear}</h4>
      </div>
    )
  }
}
