const { Model } = require('objection')

const config = require('config')
const knex = require('knex')(config.db)

Model.knex(knex)

class Cart extends Model {
  static get tableName() {
    return 'carts'
  }

  static get idColumn() {
    return 'id'
  }

  static get relationMappings() {
    const product = require('./product')
    return {
      activities: {
        relation: Model.BelongsToOneRelation,
        modelClass: product,
        join: {
          from: 'carts.product_id',
          to: 'products.id'
        }
      }
    }
  }
}

module.exports = Cart