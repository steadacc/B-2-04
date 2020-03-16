const { map, pick, compose } = require('ramda')

const fields = ['id', 'id_user', 'id_product', 'quantity']

module.exports = {
  one: compose(pick(fields)),
  many: map(compose(pick(fields))),
}
