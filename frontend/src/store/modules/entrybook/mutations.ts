const mutations = {
  GET_ARCHIVED_LIST_METADATA(state: any, value: any) {
    state.archivedListMetadata = value;
  },
  GET_ARCHIVED_LIST(state: any, value: any) {
    state.archivedList = value;
  },
};

export { mutations };
