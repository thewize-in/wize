<template>
  <div>
    <AppNav />
    <Drawer />
    <v-row v-if="isCreated" class="flex-row-center-center">
      <Loading v-if="pageLoading" />
      <v-col
        v-else
        cols="12"
        xl="6"
        lg="6"
        md="12"
        sm="12"
        class="flex-column-center-center"
      >
        <v-tabs
          v-model="tab"
          :centered="centered"
          :grow="grow"
          :vertical="vertical"
          :icons-and-text="icons"
          flat
        >
          <v-tab flat v-for="i in tabs" :key="i" :href="`#${i}`">{{ i }}</v-tab>

          <v-tab-item value="all">
            <EntryTable :list="allEntries" />
          </v-tab-item>
          <v-tab-item value="done">
            <EntryTable :list="doneEntries" />
          </v-tab-item>
          <v-tab-item value="undone">
            <EntryTable :list="undoneEntries" />
          </v-tab-item>
        </v-tabs>
      </v-col>
      <NextEntryDialog v-if="FAB" />
      <NewEntryDialog v-if="FAB" />
      <Snackbar />
    </v-row>
    <NoEntryBook v-else />
    <BottomNav />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Loading from '../ui/Loading';
import Snackbar from '../ui/Snackbar';
import EntryTable from './components/EntryTable';
import NextEntryDialog from '../ui/NextEntryDialog';
import NewEntryDialog from '../ui/NewEntryDialog';
import NoEntryBook from '../ui/NoEntryBook';

import { routerMixin } from '../../mixins/routerMixin';
import { userProfileMixin } from '../../mixins/user/userProfileMixin';
import { fabMixin } from '../../mixins/ui/fabMixin';
import AppNav from '../ui/AppNav';
import BottomNav from '../ui/BottomNav';
import Drawer from '../ui/Drawer';

export default {
  name: 'List',
  mixins: [routerMixin, userProfileMixin, fabMixin],
  components: {
    AppNav,
    BottomNav,
    Loading,
    EntryTable,
    NextEntryDialog,
    NewEntryDialog,
    NoEntryBook,
    Snackbar,
    Drawer,
  },
  async created() {
    this.pageLoading = true;
    await this.isListExist();
    if (this.isCreated) {
      await this.getList();
    }
    this.pageLoading = false;
    this.updateBottomNav(1);
  },

  data() {
    return {
      pageLoading: false,
      tab: null,
      icons: false,
      centered: false,
      grow: true,
      vertical: false,
      prevIcon: false,
      nextIcon: false,
      left: true,
      tabs: ['all', 'done', 'undone'],
    };
  },
  computed: {
    ...mapGetters('list', [
      'allEntries',
      'doneEntries',
      'undoneEntries',
      'isCreated',
    ]),
  },

  methods: {
    ...mapActions('list', ['isListExist', 'getList']),
    ...mapActions('ui', ['updateBottomNav']),
  },
};
</script>

<style scoped>
.v-tabs {
  padding: 0px !important;
  margin: 0px 0px !important;
  width: 100%;
}
.v-tab {
  padding: 0px !important;
}
</style>
