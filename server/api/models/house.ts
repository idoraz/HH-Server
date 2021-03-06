import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

const Schema = mongoose.Schema;

export interface IHouseModel extends mongoose.Document {
    auctionNumber: string; // Auction Number
    address: string[];
    attorneyName: string;
    auctionID: string;
    checks: {
        svs: boolean;
        '3129': boolean;
        ok: boolean;
    };
    contactEmail: string;
    coords: {
        latitude: string;
        longitude: string;
    };
    cost: number;
    costTax: number;
    defendantName: string;
    docketNumber: string;
    isBank: boolean;
    isDuplicate: boolean;
    isFC: boolean;
    isPP: boolean;
    firmName: string;
    judgment: number;
    municipality: string;
    parcelId: number;
    plaintiffName: string;
    ppDate: Date;
    reasonForPP: string;
    saleType: string; //TODO: use enum
    saleDate: Date;
    saleStatus: string; //TODO: use enum
    zillowData: {
        apn: string;
        bath: number;
        coords: {
            latitude: string;
            longitude: string;
        };
        lastSoldDate: Date;
        lastSoldPrice: number;
        lastZillowUpdate: Date;
        lenderName: string;
        rooms: number;
        sqft: number;
        taxAssessment: number;
        unpaidBalance: number;
        yearBuilt: number;
        zillowAddress: string;
        zillowEstimate: number;
        zillowRentalEstimate: number;
        zillowID: string;
        zillowLink: string;
    };
    zillowInvalid: boolean;
}

const schema = new Schema({
    auctionNumber: String, // Auction Number
    address: [String],
    attorneyName: String,
    auctionID: String,
    checks: {
        svs: Boolean,
        '3129': Boolean,
        ok: Boolean
    },
    contactEmail: String,
    coords: {
        latitude: String,
        longitude: String
    },
    cost: Number,
    costTax: Number,
    defendantName: String,
    docketNumber: String,
    isBank: Boolean,
    isDuplicate: Boolean,
    isFC: Boolean,
    isPP: Boolean,
    firmName: String,
    judgment: Number,
    municipality: String,
    parcelId: Number,
    plaintiffName: String,
    ppDate: Date,
    reasonForPP: String,
    saleType: String, //TODO: use enum
    saleDate: Date,
    saleStatus: String, //TODO: use enum
    zillowData: {
        apn: String,
        bath: Number,
        coords: {
            latitude: String,
            longitude: String
        },
        lastSoldDate: Date,
        lastSoldPrice: Number,
        lastZillowUpdate: Date,
        lenderName: String,
        rooms: Number,
        sqft: Number,
        taxAssessment: Number,
        unpaidBalance: Number,
        yearBuilt: Number,
        zillowAddress: String,
        zillowEstimate: Number,
        zillowRentalEstimate: Number,
        zillowID: String,
        zillowLink: String
    },
    zillowInvalid: Boolean
});

schema.plugin(timestamps);
export const House = mongoose.model<IHouseModel>('House', schema);
