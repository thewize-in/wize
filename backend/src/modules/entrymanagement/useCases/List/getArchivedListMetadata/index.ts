import { archiveListRepo } from '../../../repos';
import { GetArchivedListMetadataController } from './GetArchivedListMetadataController';

const getArchivedListMetadataController = new GetArchivedListMetadataController(
  archiveListRepo
);

export { getArchivedListMetadataController };
