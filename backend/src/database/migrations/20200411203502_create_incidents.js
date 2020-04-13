
exports.up = function (knex) {
    return knex.schema.createTable('incidents', function (table) {
        table.increments()
        table.string('title').notNullable()
        table.string('description').notNullable()
        table.decimal('value').notNullable()

        // relacionamento com a ong que criou esse incident
        table.string('ong_id').notNullable()

        // criação da chave estrangeira (toda vez que um "ong_id" for cadastrado precisa ser um id que esteja cadastrado dentro da tabela ong, campo id, que sejam iguais)
        table.foreign('ong_id').references('id').inTable('ongs')

    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('incidents')
};
