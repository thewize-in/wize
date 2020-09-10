import Axios from 'axios';

const actions = {
  async isEntryBookExist({ commit }: any): Promise<void> {
    const { data } = await Axios.get('/patiententrybook/exist', {
      withCredentials: true,
    });
    commit('IS_ENTRYBOOK_EXIST', data.isExist);
  },
  async createNewEntryBook({ commit }: any): Promise<void> {
    const res = await Axios.post('/patiententrybook', null, {
      withCredentials: true,
    });
    if (res.status === 201) {
      commit('CREATE_NEW_ENTRYBOOK', true);
    }
  },
  async deleteCreatedEntryBook({ commit }: any): Promise<void> {
    const res = await Axios.delete('/patiententrybook', {
      withCredentials: true,
    });
    if (res.status === 200) {
      commit('DELETE_CREATED_ENTRYBOOK', false);
    }
  },
  async getEntryBook({ commit }: any): Promise<void> {
    const { data } = await Axios.get('/patiententrybook', {
      withCredentials: true,
    });
    commit('GET_ENTRYBOOK', data);
  },
  async createNewEntry({ commit }: any, entry: any): Promise<void> {
    await Axios.post('/patiententrybook/entry', entry, {
      withCredentials: true,
    });
  },
  async nextEntry({ commit }: any, isDone: boolean): Promise<void> {
    const response = await Axios.post(
      '/patiententrybook/next',
      {
        isPreviousEntryDone: isDone,
      },
      { withCredentials: true }
    );
    console.log(response);
  },
};

export { actions };
