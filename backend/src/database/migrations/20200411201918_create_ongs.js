// Anotação: ele vai criar o "table.string('id').primary()" propositalmente pois nós mesmos vamos gerar pois para a ONG fazer login ela usará o id para fazer o login na aplicação (é um id de 1, 2, 3 etc não é muito seguro)

exports.up = function(knex) {
  return knex.schema.createTable('ongs', function(table) {
    table.string('id').primary()
    table.string('name').notNullable()
    table.string('email').notNullable()
    table.string('whatsapp').notNullable()
    table.string('city').notNullable()
    table.string('uf', 2).notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('ongs')
};
