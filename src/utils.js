const moment = require('moment')

const utils = module.exports = {}

const dateFormat = (date) => moment(date).format('ddd, MMM, d, YYYY') 

utils.tagsToArray = (tags) => {
  return !tags ? [] : tags.trim().split(', ').filter(tag => tag).map(tag => tag.replace(',', '')) 
}

utils.dateFormatter = (rows) => {
  return rows.map(row => {
    row.due_date = dateFormat(row.due_date) 
    row.time_submitted = dateFormat(row.time_submitted) 
    row.time_completed = dateFormat(row.time_completed) 
    return row
    })
}


