<template>
  <Loading v-if="pageLoading" />

  <v-row v-else class="flex-row-center-center">
    <v-col cols="12" xl="6" lg="6" md="12" sm="12" xm="12" class="flex-column-center-center">
      <v-tabs
        v-model="tab"
        :centered="centered"
        :grow="grow"
        :vertical="vertical"
        :icons-and-text="icons"
        flat
      >
        <v-tab v-for="i in tabs" :key="i" :href="`#${i}`">{{ i }}</v-tab>

        <v-tab-item value="all">
          <PatientListTable :list="allPatients" />
        </v-tab-item>
        <v-tab-item value="done">
          <PatientListTable :list="donePatients" />
        </v-tab-item>
        <v-tab-item value="notdone">
          <PatientListTable :list="undonePatients" />
        </v-tab-item>
      </v-tabs>
    </v-col>
    <NextEntryDialog v-if="FAB" />
    <NewEntryDialog v-if="FAB" />
    <Snackbar />
  </v-row>
</template>

<script>
import Axios from "axios";
import { mapGetters, mapActions } from "vuex";
import Loading from "../ui/Loading";
import Snackbar from "../ui/Snackbar";
import PatientListTable from "./components/PatientListTable";
import NextEntryDialog from "../ui/NextEntryDialog";
import NewEntryDialog from "../ui/NewEntryDialog";

export default {
  name: "PatientList",
  components: {
    Loading,
    PatientListTable,
    NextEntryDialog,
    NewEntryDialog,
    Snackbar
  },
  created() {
    let timer = null;
    window.addEventListener(
      "scroll",
      () => {
        this.hideFAB();
        if (timer !== null) {
          clearTimeout(timer);
        }
        timer = setTimeout(this.showFAB, 500);
      },
      false
    );
  },
  async mounted() {
    this.pageLoading = true;
    await this.isEntryBookExist();
    if (this.isCreated) {
      await this.getEntryBook();
    }
    this.pageLoading = false;
  },

  data() {
    return {
      FAB: true,
      pageLoading: false,
      tab: null,
      icons: false,
      centered: false,
      grow: true,
      vertical: false,
      prevIcon: false,
      nextIcon: false,
      left: true,
      tabs: ["all", "done", "notdone"]
    };
  },
  computed: {
    ...mapGetters("entrybook", [
      "allPatients",
      "donePatients",
      "undonePatients",
      "isCreated"
    ])
  },
  methods: {
    ...mapActions("entrybook", ["isEntryBookExist", "getEntryBook"]),
    hideFAB() {
      this.FAB = false;
    },
    showFAB() {
      this.FAB = true;
    }
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
