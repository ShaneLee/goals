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

