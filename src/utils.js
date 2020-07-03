const utils = module.exports = {}

utils.tagsToArray = (tags) => {
  return !tags ? [] : tags.trim().split(', ').filter(tag => tag).map(tag => tag.replace(',', '')) 
}

