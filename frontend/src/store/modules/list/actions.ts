import Axios from 'axios';
import store, { apiVersion } from '@/store';

const actions = {
  async isListExist({ commit }: any): Promise<void> {
    const { data } = await Axios.get(`${apiVersion}/list/exist`, {
      withCredentials: true,
    });
    commit('IS_LIST_EXIST', data.isExist);
  },
  async createNewList({ commit }: any, listName: string): Promise<void> {
    const res = await Axios.post(
      `${apiVersion}/list`,
      { listName },
      {
        withCredentials: true,
      }
    );
    if (res.status === 201) {
      commit('CREATE_NEW_LIST', true);
      store.dispatch('list/getList');
    }
  },
  async closeList({ commit }: any): Promise<void> {
    const res = await Axios.delete(`${apiVersion}/list`, {
      withCredentials: true,
    });
    if (res.status === 200) {
      commit('CLOSE_LIST', false);
    }
  },
  async getList({ commit }: any): Promise<void> {
    const { data } = await Axios.get(`${apiVersion}/list`, {
      withCredentials: true,
    });
    commit('GET_LIST', data);
  },
  async addNewEntry({ commit }: any, entry: any): Promise<boolean> {
    const res = await Axios.post(`${apiVersion}/list/entry`, entry, {
      withCredentials: true,
    });
    if (res.status === 201) {
      store.dispatch('list/getList');
      return true;
    }
    return false;
  },
  async nextEntry({ commit }: any, isDone: boolean): Promise<boolean> {
    const res = await Axios.post(
      `${apiVersion}/list/next`,
      {
        isPreviousEntryDone: isDone,
      },
      { withCredentials: true }
    );
    if (res.status === 200) {
      store.dispatch('list/getList');
      return true;
    }
    return false;
  },
};

export { actions };
