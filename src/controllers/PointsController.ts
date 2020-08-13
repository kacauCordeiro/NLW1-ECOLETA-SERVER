import knex from '../database/connections';
import { Request, Response} from 'express';


class PointsController {
    async index(request: Request, response: Response) {

        const {city, uf, items } = request.query;
        console.log(city, uf, items ); 

        const parsedItems = String(items)
            .split(',').map(item => Number(item.trim()));

        const points = await knex('points')
        .join('point_items', 'points.id', '=', 'point_items.point_id')
        //.whereIn('point_items.item_id', parsedItems)
        //.where('city', String(city))
        // .where('uf', String(uf))
        .distinct()
        .groupBy('points.id')
        .select('*');

        const serializedPoints = points.map(point => {
            return {
              ...point,
              image_url: `http://localhost:8010/uploads/${point.image}`,
            };
          });
      
          return response.json(serializedPoints);
        }

    async show(request: Request, response: Response) {
        const {id} = request.params;

        const point = await knex('points').where('id',id).first();

        if (!point){
            return response.status(400).json({message: 'Point not found'})
        }

        const serializedPoint = {
            ...point,
            image_url: `http://localhost:8010/uploads/${point.image}`,
          };

        // SELECT * FROM items JOIN point_items ON items.id = point items.id WHERE point_itens.point_id =  {id}

        const items = await knex('items')
        .join('point_items','items.id', '=', 'point_items.item_id')
        .where('point_items.point_id', id)
        .select('items.title');

       // return response.json(point);
        return response.json({point: serializedPoint, items});
    }

    async create(request: Request, response: Response) {

        // TODOS OS PARÂMETROS DA REQUEST
        const {
          name,
          email,
          whatsapp,
          latitude,
          longitude,
          city,
          uf,
          endereco_completo,
          items,
        } = request.body;
    
        //transactions - Usado para criar interdependência dos inserts 
        const trx = await knex.transaction();
        //Substitui o knex pelo trx
    
        // INSERT IDS
        // POINT ISERTED 
        const point = {
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            endereco_completo
            };

        console.log(point);
    
        const insertedIds = await trx('points').insert(point);
    
        // Captura id do registro inserido
        const point_id = insertedIds[0];
        // Cria Relacionamento
        const pointItems = items
      .split(',')
      .map((item: string) => Number(item.trim()))
      .map((item_id: number) => {
        return {
          item_id,
          point_id,
        };
      });
    
      await trx('point_items').insert(pointItems);

      await trx.commit();
  
      return response.json({
        id: point_id,
        ...point,
      });
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
    
        const point = await knex('points').where('id', id).delete();
    
        if (!point) {
          return response.status(400).json({ message: 'Point not found.' });
        }
    
        return response.json({ msg: 'successfully deleted' });
      }
    }
    
export default PointsController;
