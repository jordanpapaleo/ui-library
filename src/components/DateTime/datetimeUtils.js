import moment from 'moment'

export function validateMoment (date, allowNull) {
  let validatedMoment = null

  if (date) {
    validatedMoment = moment(date)
  } else {
    if (!allowNull) {
      validatedMoment = moment(new Date())
    }
  }

  return validatedMoment
}
