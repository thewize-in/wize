import Axios from 'axios';
import store, { apiVersion } from '@/store';

const actions = {
  async isEntryBookExist({ commit }: any): Promise<void> {
    const { data } = await Axios.get(`${apiVersion}/entrybook/exist`, {
      withCredentials: true,
    });
    commit('IS_ENTRYBOOK_EXIST', data.isExist);
  },
  async createNewEntryBook({ commit }: any): Promise<void> {
    const res = await Axios.post(`${apiVersion}/entrybook`, null, {
      withCredentials: true,
    });
    if (res.status === 201) {
      commit('CREATE_NEW_ENTRYBOOK', true);
      store.dispatch('entrybook/getEntryBook');
    }
  },
  async deleteCreatedEntryBook({ commit }: any): Promise<void> {
    const res = await Axios.delete(`${apiVersion}/entrybook`, {
      withCredentials: true,
    });
    if (res.status === 200) {
      commit('DELETE_CREATED_ENTRYBOOK', false);
      store.dispatch('entrybook/getEntryBook');
    }
  },
  async getEntryBook({ commit }: any): Promise<void> {
    const { data } = await Axios.get(`${apiVersion}/entrybook`, {
      withCredentials: true,
    });
    commit('GET_ENTRYBOOK', data);
  },
  async createNewEntry({ commit }: any, entry: any): Promise<boolean> {
    const res = await Axios.post(`${apiVersion}/entrybook/entry`, entry, {
      withCredentials: true,
    });
    if (res.status === 201) {
      store.dispatch('entrybook/getEntryBook');
      return true;
    }
    return false;
  },
  async nextEntry({ commit }: any, isDone: boolean): Promise<boolean> {
    const res = await Axios.post(
      `${apiVersion}/entrybook/next`,
      {
        isPreviousEntryDone: isDone,
      },
      { withCredentials: true }
    );
    if (res.status === 200) {
      store.dispatch('entrybook/getEntryBook');
      return true;
    }
    return false;
  },
};

export { actions };
