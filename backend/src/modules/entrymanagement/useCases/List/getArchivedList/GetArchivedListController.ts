import { BaseController } from '../../../../../shared/infra/BaseController';
import { IArchiveListRepo } from '../../../repos/ListRepos/ArchiveListRepo';

export class GetArchivedListController extends BaseController {
  private archiveListRepo: IArchiveListRepo;
  constructor(archiveListRepo: IArchiveListRepo) {
    super();
    this.archiveListRepo = archiveListRepo;
  }
  async executeImpl(): Promise<any> {
    const bookId = this.request.session['user']['id'];
    const listId = this.request.params.listid;

    const result = await (
      await this.archiveListRepo.getArchivedList(bookId, listId)
    ).getValue();

    if (!result) return this.ok(this.response, 'archived list not found');
    return this.ok(this.response, result);
  }
}
