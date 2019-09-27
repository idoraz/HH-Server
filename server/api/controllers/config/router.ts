import express from 'express';
import controller from './controller'
export default express.Router()
    .post('/', controller.create)
    .get('/', controller.all)
    .get('/:id', controller.byId)
    .get('/:key', controller.byKey)
    .patch('/:id', controller.patch)
    .delete('/:id', controller.remove)