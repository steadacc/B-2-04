
exports.up = function (knex, Promise) {
    return knex.schema.createTable('carts', function (t) {
      t.charset('utf8')
      t.collate('utf8_general_ci')
      t.increments('id').unsigned().primary()
      t.integer('id_user').notNull()
      t.integer('id_product').unsigned().notNull();
      t.foreign('id_product').references('products.id');
      t.integer('quantity').notNull()
    })
  }
  
  exports.down = function (knex, Promise) {
  }
  