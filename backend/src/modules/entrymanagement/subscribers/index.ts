import { AfterDoctorCreated } from './AfterDoctorCreated';

import { createEntryBook } from '../useCases/EntryBook/createEntryBook';

new AfterDoctorCreated(createEntryBook);
