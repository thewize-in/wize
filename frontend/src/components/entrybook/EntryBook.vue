<template>
  <Loading v-if="pageLoading" />
  <v-row v-else>
    <v-col v-if="isCreated" class="main-entrybook-container">
      <v-row class="flex-row-center-center">
        <PatientListTable v-if="selected === 'undone'" :list="undonePatients" />
        <PatientListTable v-else-if="selected === 'done'" :list="donePatients" />
        <PatientListTable v-else :list="allPatients" />
      </v-row>
    </v-col>
    <v-col v-else class="main-entry-container flex-column-center-center">
      <v-row class="flex-column-center-center">
        <img src="../../assets/images/alert.svg" width="35" height="35" alt />
        <h4>Create new entrybook</h4>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import "../../assets/styles/colors.css";
import Loading from "../ui/Loading.vue";
import PatientListTable from "./components/PatientListTable.vue";
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  name: "EntryBook",
  components: {
    PatientListTable,
    Loading
  },
  data() {
    return {
      pageLoading: false
    };
  },
  async mounted() {
    this.pageLoading = true;
    await this.isEntryBookExist();
    if (this.isCreated) {
      await this.getEntryBook();
    }
    this.pageLoading = false;
  },
  computed: {
    ...mapGetters("entrybook", [
      "stats",
      "allPatients",
      "donePatients",
      "undonePatients",
      "isCreated"
    ]),
    ...mapGetters(["selected"])
  },
  methods: {
    ...mapActions("entrybook", ["isEntryBookExist", "getEntryBook"])
  }
};
</script>

<style scoped>
.main-entrybook-container {
  padding: 0px !important;
}
.entrybook-stats-container,
.entrybook-list-container,
.entrybook-next-container {
  background-color: var(--main-container);
}
h4 {
  text-align: center;
  color: var(--light-text-color);
}
</style>
