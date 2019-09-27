import ConfigService from '../../services/config.service';
import { Request, Response, NextFunction } from 'express';
import * as HttpStatus from 'http-status-codes';

export class Controller {

    async all(req: Request, res: Response, next: NextFunction) {
        try {

            const docs = await ConfigService.all();
            return res.status(HttpStatus.OK).json(docs);
        }
        catch (err) {
            return next(err);
        }
    }

    async byId(req: Request, res: Response, next: NextFunction) {
        try {
            const doc = await ConfigService.byId(req.params.id);
            return res.status(HttpStatus.OK).json(doc);
        }
        catch (err) {
            return next(err);
        }
    }

    async byKey(req: Request, res: Response, next: NextFunction) {
        try {
            const doc = await ConfigService.byId(req.params.key);
            return res.status(HttpStatus.OK).json(doc);
        }
        catch (err) {
            return next(err);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const doc = await ConfigService.create(req.body);
            return res.status(HttpStatus.CREATED).location(`/api/v1/examples/${doc._id}`).json(doc);
        }
        catch (err) {
            return next(err);
        }
    }

    async patch(req: Request, res: Response, next: NextFunction) {
        try {
            const doc = await ConfigService.patch(req.params.id, req.body);
            return res.status(HttpStatus.OK).location(`/api/v1/examples/${doc._id}`).json(doc);
        }
        catch (err) {
            return next(err);
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const doc = await ConfigService.remove(req.params.id);
            return res.status(HttpStatus.NO_CONTENT).send();
        }
        catch (err) {
            return next(err);
        }
    }

}

export default new Controller();
