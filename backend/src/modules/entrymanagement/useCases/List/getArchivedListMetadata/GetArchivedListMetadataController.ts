import { BaseController } from '../../../../../shared/infra/BaseController';
import { IArchiveListRepo } from '../../../repos/ListRepos/ArchiveListRepo';

export class GetArchivedListMetadataController extends BaseController {
  private archiveListRepo: IArchiveListRepo;
  constructor(archiveListRepo: IArchiveListRepo) {
    super();
    this.archiveListRepo = archiveListRepo;
  }
  async executeImpl(): Promise<any> {
    const id = this.request.session['user']['id'];
    const date = this.request.body['date'];
    const result = await this.archiveListRepo.getArchivedListMetadata(id, date);

    if (!result.getValue()) return this.notFound('list not found');

    return this.ok(this.response, result.getValue());
  }
}
