import mongoose from 'mongoose';
import { authConfig } from '../../../../config/authConfig';
import { Result } from '../../../../core/logic/Result';

export function startDatabase() {
  try {
    mongoose.connect(authConfig.databaseConnectionUrl, {
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
