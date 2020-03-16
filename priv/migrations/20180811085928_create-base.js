
exports.up = function (knex, Promise) {
  return knex.schema.createTable('products', function (t) {
    t.charset('utf8')
    t.collate('utf8_general_ci')
    t.increments('id').unsigned().primary()
    t.string('name').notNull()
    t.integer('price').notNull()
    t.integer('quantity').notNull()
  })
}

exports.down = function (knex, Promise) {
}
