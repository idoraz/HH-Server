import { IHouseModel, House } from './../../models/house';
import HousesService from '../../services/houses.service';
import { Request, Response, NextFunction } from 'express';
import * as HttpStatus from 'http-status-codes';

export class Controller {
    async all(req: Request, res: Response, next: NextFunction) {
        try {
            const docs = await HousesService.all();
            return res.status(HttpStatus.OK).json(docs);
        } catch (err) {
            return next(err);
        }
    }

    async byId(req: Request, res: Response, next: NextFunction) {
        try {
            const doc = await HousesService.byId(req.params.auctionNumber);
            return res.status(HttpStatus.OK).json(doc);
        } catch (err) {
            return next(err);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const doc = await HousesService.create(req.body);
            return res
                .status(HttpStatus.CREATED)
                .location(`/api/v1/houses/${doc._id}`)
                .json(doc);
        } catch (err) {
            return next(err);
        }
    }

    async patch(req: Request, res: Response, next: NextFunction) {
        try {
            const doc = await HousesService.patch(
                req.params.auctionNumber,
                req.body
            );
            return res
                .status(HttpStatus.OK)
                .location(`/api/v1/houses/${doc._id}`)
                .json(doc);
        } catch (err) {
            return next(err);
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const doc = await HousesService.remove(req.params.auctionNumber);
            return res.status(HttpStatus.NO_CONTENT).send();
        } catch (err) {
            return next(err);
        }
    }

    async getHouses(req: Request, res: Response, next: NextFunction) {
        try {
            const houses = await HousesService.getHouses();
            return res.status(HttpStatus.OK).json(houses);
        } catch (err) {
            return next(err);
        }
    }

    async saveHouses(req: Request, res: Response, next: NextFunction) {
        try {
            HousesService.updateHouses(req.body.houses as IHouseModel[])
                .then(houses => {
                    return houses;
                })
                .catch(error => {
                    console.log(`Failed to update houses!`);
                    console.log(error.message);
                    return [];
                });
        } catch (error) {
            return next(error);
        }
    }
}

export default new Controller();
