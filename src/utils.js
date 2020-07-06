const moment = require('moment')

const utils = module.exports = {}

const dateFormat = (date) => {
  const year = moment().year().toString()
  return date ? date.toString().split(year)[0] + year : ''
}

utils.tagsToArray = (tags) => {
  return !tags ? [] : tags.trim().split(', ').filter(tag => tag).map(tag => tag.replace(',', '')) 
}

utils.dateFormatter = (rows) => {
  return rows.map(row => {
    row.due_date = dateFormat(row.due_date) 
    row.time_submitted = dateFormat(row.time_submitted) 
    row.time_completed = dateFormat(row.time_completed) 
    row.sql_due_date = row.due_date
    return row
    })
}

utils.formatMySqlTimestamp = (date) => moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD  HH:mm:ss.000')

utils.reqToGoal = (req) => req.body

utils.plusDays = (goal) => { 
  goal.due_date = moment(goal.sql_due_date).add(goal.recurring_days, 'days').format('YYYY-MM-DD  HH:mm:ss.000')
  return goal
}
