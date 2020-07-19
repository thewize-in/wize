require('dotenv').config();
import mongoose from 'mongoose';
import { Result } from '../../../../core/logic/Result';

export function startDatabase(connectionUrl: string) {
    try {
        mongoose.connect(connectionUrl, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        console.log('Database started:.:.:.');
    } catch (err) {
        Result.fail(err);
    }
}
