import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface IConfigModel extends mongoose.Document {
    key: string;
    value: any;
};

const schema = new Schema({
    key: String,
    value: Schema.Types.Mixed
});

export const Config = mongoose.model<IConfigModel>("Config", schema);