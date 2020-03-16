const { compose, equals, path } = require('ramda')

const is_role_user = compose(equals('ROLE_USER'), path(['user', 'role']))

const if_is_not_role_user_403 = (req, res, next) => {
  // SE IL ROLE È ROLE_USER
  if (!is_role_user(req)) {
    // ASSOCIA A STATUS ACTIVE
    return res.status(403).json({ message: 'Forbidden' })
  }

  return next()
}
// se l'utente passato come user_id(nei parametri dell'url) non è role visitor ritorna 405
const if_is_not_role_visitor_merge_user_405 = (req, res, next) => {

  return get_user(req.params.id_user)
    .then((user) => {
      if (user.role != 'ROLE_VISITOR') {
        return res.status(405).json({ message: 'Method not allowed' })
      }

      return next()
    })
    .catch(() => res.status(405).json({ message: '' }))
}


module.exports = {
  if_is_not_role_user_403,
  if_is_not_role_visitor_merge_user_405
}
