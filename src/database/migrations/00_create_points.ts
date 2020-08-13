import Knex from  'knex';

export async function up(knex: Knex) {
// CRIAR A TABELA - primeiro parametro é a table e na sequencia as colunas e tipos (uma dict)
return knex.schema.createTable('points', table => {
    table.increments('id').primary();
    table.string('image').notNullable();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.decimal('latitude').notNullable();
    table.decimal('longitude').notNullable();
    table.string('city').notNullable();
    table.string('uf',2).notNullable();
    table.string('endereco_completo').notNullable();
});
}


export async function down(knex: Knex) {
// VOLTAR ATRAS (DELETAR)
return knex.schema.dropTable('points')

}
