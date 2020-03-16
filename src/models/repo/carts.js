
const Cart = require('../cart')
const { map, omit } = require('ramda')
// .eager('activities').joinRelation('activities');
module.exports = {
  list: (id_user) => {
    return Cart.query().where({ id_user })
  },
  get: (id_product, id_user) => {
    return Cart.query().where({ id_user, id_product }).first()
  },
  create: (body, cart) => {
    return Cart.query().insert(body)
      .then((cart) => Cart.query().where({ id: cart.id }).first())
  },
  update: (body, cart) => {
    return Cart.query().where({ id: cart.id }).patch({ quantity: cart.quantity + body.quantity })
      .then(() => Cart.query().where({ id: cart.id }).first())
  },
  //cancella tutti i carts con gli id passati e crea i carts(passato come parametro l'array completo)
  delete_and_create: (carts) => {
    return Cart.query().insertWithRelated(map(omit(['id']))(carts))
  }
}