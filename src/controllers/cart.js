const { compose, bind, tap, prop, assoc, identity, ifElse, curry } = require('ramda')

const input = require('../input-filters/carts')
const error = require('../views/error')
const view = require('../views/cart')
const repo = require('../models/repo/carts')
const repo_product = require('../models/repo/products')
// AUTH
const auth = require('@wdalmut/mini-auth')
const token = require('@wdalmut/token-auth')
const me = require('../microservices/auth')

const {
  if_is_not_role_user_403,
  if_is_not_role_visitor_merge_user_405
} = require('../auth')

const { exists } = require('../utilities/errors_code')
const { create, update, merge_carts } = require('../utilities/carts')

const post_cart = (req, res) => {
  req.user = { id: 2, role: 'ROLE_USER' }
  const body = assoc('id_user', req.user.id, req.body)

  repo.get(req.body.id_product, req.user.id)
    .then((cart) => repo_product.check_quantity(req.body.id_product, req.body.quantity, cart))
    .then(() => repo.get(req.body.id_product, req.user.id))
    .then((cart) => ifElse(exists, update(res, body), create(res, body))(cart))
    .catch(error.generic(res))
}

const merge_cart = (req, res) => {

  Promise.all(
    [
      repo.list(req.params.id_user), // list cart dell'utente passato come id nei paramentri
      repo.list(req.user.id) // list cart dell'utente corrente
    ])
    .then(([carts_other_user, carts_user]) => merge_carts(carts_user, carts_other_user))
    .then((carts) => repo.delete_and_create(carts))
    .then(compose(bind(res.json, res), view.many))
    .catch(error.generic(res))
}

let carts = require('express').Router()

carts.post('/',
  auth(token(me)),
  input.validate_create_cart_input,
  post_cart
)

carts.post('/merge/:id_user',
  (req, res, next) => { req.user = { id: 1, role: 'ROLE_USER' }; return next() },
  auth(token(me)),
  if_is_not_role_user_403,
  if_is_not_role_visitor_merge_user_405,
  merge_cart
)

module.exports = carts
