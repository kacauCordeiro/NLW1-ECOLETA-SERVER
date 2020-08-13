// Recursos: Node.js, JavaScript e TypeScript Linguagens de Programação
// Recurso: Insomnia: Teste de requests API 
// Para rodar e executar o node: npm e npx (ts-node para entender TypeScript)
// Rota: Endereço completo da requisição
// Recurso: Qual entidade estamos acessando no sistema
// GET: Requisição feita pelo navegador para acessar a rota/entidade | Uma ou N infos do back-end
// POST: Envio de informação para rota/entidade back-end
// PUT: Atualizar informação rota/entidade back-end
// DELETE: Remover informação do back-end
// Request Param: São parametros que vem na própria rota que servem para identificar uma entidade e um recurso (usuário especifico) OBRIGATÓRIO
// Query Param: Servem para filtrar, pagimação ...
// Request body: Corpo da Requisição. Parametros para criação e atualização.
// Qual banco utiizar? Sqlite. Porque? Sem necessidade de instalação, escreve em arquivo local.
// Knex.js - Recurso para banco de dados (Escreve comandos SQL em JavaScript)
// knex('table') where('coluna1','coluna2').select('*') - Migração de banco com query builder


app.get('/users',(request, response) => {
    // Log do console
    console.log('Listagem de usuários');

    //Parametro de filtro
    const search = String(request.query.search);

    //IF ternário Parametro de Filtro
    const filreredUsers = search ? users.filter(user => user.includes(search)) : users ;

    // Return json users
    //return response.json(users);
    // Return json usuários filtrados por query param
    return response.json(filreredUsers);
    

});

app.get('/users',(request, response) => {
    console.log('Listagem de usuários');

   return response.json(users);

});

app.get('/users/:id',(request, response) => {
    const id = Number(request.params.id);

    const user = users[id]

    return response.json(user);

});

app.post('/users',(request, response) => {
    const data = request.body;

    const user = {
        name: data.name,
        email: data.email
    }

    // const user = {
    //     name: 'kauane',
    //     email: 'kauanecordeiro.ck@gmail.com'
    // }

    return response.json(user);
});

Rodar comandos alias: 
 ex run :npm rum knex:migrate
 name elias: knex:migrate


 // Rota para cadastrar pontos de coleto | items que o ponto de coleta aceita (Relacionamento)

routes.post('/points', async (request, response) => {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items
    } = request.body
    

    //transactions - Usado para criar interdependência dos inserts 
    const trx = await knex.transaction();
    //Substitui o knex pelo trx

    // Insert ids

    const insertedIds = await trx('points').insert({
      image: 'image-fake',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf
    })

    // Captura id do registro inserido
    const point_id = insertedIds[0];
    // Cria Relacionamento
    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id,
      };
    })

    await trx('point_items').insert(pointItems)

    return response.json({ success: true })
})