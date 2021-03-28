import axios from 'axios';

import { IHouseModel } from './../models/house';

export class BridgeService {
    async getHouseZillowData(house: IHouseModel): Promise<Array<any>> {
        if (house && house.address && house.address.length && house.address.length > 0) {
            const requests: Array<Promise<any>> = [
                axios.get(
                    `${process.env.BRIDGE_API_ZESTIMATE_DOMAIN}?access_token=${process.env.BRIDGE_API_ACCESS_TOKEN}&address=${house.address[0]}`
                ),
                axios.get(
                    `${process.env.BRIDGE_API_PARCEL_DOMAIN}?access_token=${process.env.BRIDGE_API_ACCESS_TOKEN}&address=${house.address[0]}`
                ),
                axios.get(
                    `${process.env.BRIDGE_API_TRANSACTION_DOMAIN}/?access_token=${process.env.BRIDGE_API_ACCESS_TOKEN}&address=${house.address[0]}`
                )
            ];
            return Promise.all(requests);
        }

        return undefined;
    }
}

export default new BridgeService();
