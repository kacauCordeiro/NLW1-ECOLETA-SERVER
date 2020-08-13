import knex from '../database/connections';
import { Request, Response} from 'express';

class ItemsController{

     async index(request: Request, response: Response){
        const items = await knex('items').select('*')
      
        const serializedItems = items.map(item => {
          return {
            id: item.id,
            title: item.title,
            image_url: `http://localhost:8010/uploads/${item.image}`,
          };
        });

        return response.json(serializedItems);
    }
}

export default ItemsController;