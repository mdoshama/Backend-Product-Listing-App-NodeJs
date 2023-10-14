
import { notFound} from "@hapi/boom";
import {db} from "./database";

export const getListingRoute = {
    method: 'GET',
    path:'/api/listings/{id}',
    handler: async (req, h) => {
        const id = req.params.id;
        const { results }= await db.query('SELECT * FROM listings where id = ?', [id])
        if(!results) throw notFound(`Listing does not exist with id ${id}`)
        return results
    }
}