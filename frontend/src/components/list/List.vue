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
            <Table :items="allEntries" />
          </v-tab-item>
          <v-tab-item value="done">
            <Table :items="doneEntries" />
          </v-tab-item>
          <v-tab-item value="undone">
            <Table :items="undoneEntries" />
          </v-tab-item>
        </v-tabs>
      </v-col>
      <NextEntryDialog v-if="FAB" />
      <NewEntryDialog v-if="FAB" />
      <Snackbar />
    </v-row>
    <NoList v-else />
    <BottomNav />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Loading from "../ui/Loading";
import Snackbar from "../ui/popups/Snackbar";
import Table from "../ui/Table";
import NextEntryDialog from "../ui/dialogs/NextEntryDialog";
import NewEntryDialog from "../ui/dialogs/NewEntryDialog";
import NoList from "../ui/NoList";

import { routerMixin } from "../../mixins/routerMixin";
import { userProfileMixin } from "../../mixins/user/userProfileMixin";
import { fabMixin } from "../../mixins/ui/fabMixin";
import AppNav from "../ui/navs/AppNav";
import BottomNav from "../ui/navs/BottomNav";
import Drawer from "../ui/Drawer";
import { tabsMixin } from "../../mixins/ui/tabsMixin";

export default {
  name: "List",
  mixins: [routerMixin, userProfileMixin, fabMixin, tabsMixin],
  components: {
    AppNav,
    BottomNav,
    Loading,
    NextEntryDialog,
    NewEntryDialog,
    NoList,
    Snackbar,
    Drawer,
    Table
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
      prevIcon: false,
      nextIcon: false,
      left: true,
      tabs: ["all", "done", "undone"]
    };
  },
  computed: {
    ...mapGetters("list", [
      "allEntries",
      "doneEntries",
      "undoneEntries",
      "isCreated"
    ])
  },

  methods: {
    ...mapActions("list", ["isListExist", "getList"]),
    ...mapActions("ui", ["updateBottomNav"])
  }
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
