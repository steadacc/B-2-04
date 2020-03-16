const { exists, reject_with_409 } = require('../../utilities/errors_code')
const { ifElse, identity } = require('ramda')
const Product = require('../product')

module.exports = {
  check_quantity: (id, quantity, cart) => {
    const query = Product.query()

    return query.where({ id }).first()
      .then(ifElse(exists, identity, reject_with_409))
      .then(() => {
        if(cart){
          return Product.query().where('quantity', '>=', quantity + cart.quantity).first()
        }
        return Product.query().where('quantity', '>=', quantity).first()
      })
      .then(ifElse(exists, identity, reject_with_409))
  },
}