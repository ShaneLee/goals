const utils = require('../src/utils')

describe('Tags to array', () => {
  it('should return a list from a comma separated string of tags', () => {
    expect(utils.tagsToArray('Goal, Other Tag')).toEqual(['Goal', 'Other Tag'])      
  })
  
  it('should ignore spaces after commas when there are not more tags', () => {
    expect(utils.tagsToArray('Goal, ')).toEqual(['Goal'])      
  })

  it('should return an empty list when there are no tags', () => {
    expect(utils.tagsToArray('')).toEqual([])      
  })

  it('should return an empty list when it is passed a null value', () => {
    expect(utils.tagsToArray(null)).toEqual([])
  })
})

describe('Date formatter', () => {
  it('should correctly format dates', () => {
    expect(utils.dateFormatter([{
      'due_date': new Date('2020-07-04 00:00:00'),
      'time_submitted': new Date('2020-07-31 00:00:00'), 
      'time_completed': new Date('2020-07-09 00:00:00')}]))
    .toEqual([{
      'due_date': 'Sat Jul 04 2020',
      'time_submitted': 'Fri Jul 31 2020',
      'time_completed': 'Thu Jul 09 2020'}])
  })

  it('should return an empty string when the date is not found', () => {
    expect(utils.dateFormatter([{}])).toEqual([{'due_date': '', 'time_submitted': '', 'time_completed': ''}])
  })
})
