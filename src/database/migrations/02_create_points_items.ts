import Knex from  'knex';

export async function up(knex: Knex) {
// CRIAR A TABELA - primeiro parametro é a table e na sequencia as colunas e tipos (uma dict)
return knex.schema.createTable('point_items', table => {
    table.increments('id').primary();

    table.integer('point_id')
        .notNullable()
        .references('id')
        .inTable('points');

    table.integer('item_id')
        .notNullable()
        .references('id')
        .inTable('items');
});
}


export async function down(knex: Knex) {
// VOLTAR ATRAS (DELETAR)
return knex.schema.dropTable('point_items')

}
