import express from 'express';
import controller from './controller'
export default express.Router()
    .post('/', controller.create)
    .post('/saveHouses', controller.saveHouses)
    .get('/', controller.all)
    .get('/:auctionNumber', controller.byId)
    .patch('/:id', controller.patch)
    .delete('/:id', controller.remove)
    .get('/getHouses/:auctionID', controller.getHouses)
    .post('/downloadMap', controller.downloadMap);