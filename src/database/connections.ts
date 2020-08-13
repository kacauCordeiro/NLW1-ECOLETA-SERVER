import knex from 'knex';
import path from 'path';



const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'databasedefault.sqlite')
    },
    useNullAsDefault: true,
});

export default connection;

// Migrations são controles de versão do banco de dados knex 
// Points (Nome, Imagem, E-mail, Número, Endereço, latitude, longitude, número, cidade, estado)
// Itens (Titulo, Image)
// Muitos para Muitos (N-N)
// Point_itens (id point e id item)
