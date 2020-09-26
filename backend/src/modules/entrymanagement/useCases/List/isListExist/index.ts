import { listRepo } from '../../../repos';
import { IsListExist } from './IsListExist';
import { IsListExistController } from './IsListExistController';

const isListExist = new IsListExist(listRepo);
const isListExistController = new IsListExistController(isListExist);

export { isListExistController };
