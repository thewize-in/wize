import { apiVersion } from '@/store';
import Axios from 'axios';

const actions = {
  async getArchivedListMetadata({ commit }: any, date: string): Promise<void> {
    const res = await Axios.post(
      `${apiVersion}/list/archivedlist`,
      { date },
      {
        withCredentials: true,
      }
    );

    if (res.status === 200) {
      commit('GET_ARCHIVED_LIST_METADATA', res.data);
    }
  },
  async getArchivedList({ commit }: any, id: string): Promise<void> {
    const res = await Axios.get(`${apiVersion}/list/archivedlist/${id}`, {
      withCredentials: true,
    });

    if (res.status === 200) {
      commit('GET_ARCHIVED_LIST', res.data);
    }
  },
};

export { actions };
