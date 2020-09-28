<template>
  <div>
    <GoBack name="Saved List" />
    <v-row class="flex-row-center-center">
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
            <Table :items="archivedList.allEntries" />
          </v-tab-item>
          <v-tab-item value="done">
            <Table :items="archivedList.doneEntries" />
          </v-tab-item>
          <v-tab-item value="undone">
            <Table :items="archivedList.undoneEntries" />
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Loading from "../../ui/Loading";
import GoBack from "../../ui/navs/GoBack";
import Table from "../../ui/Table";
import { tabsMixin } from "../../../mixins/ui/tabsMixin";
export default {
  name: "ArchivedList",
  mixins: [tabsMixin],
  components: {
    GoBack,
    Table,
    Loading
  },
  async created() {
    this.pageLoading = true;
    await this.getArchivedList(this.$route.params.id);
    this.pageLoading = false;
  },
  data() {
    return {
      pageLoading: false,
      tabs: ["all", "done", "undone"]
    };
  },
  methods: {
    ...mapActions("entrybook", ["getArchivedList"])
  },
  computed: {
    ...mapGetters("entrybook", ["archivedList"])
  }
};
</script>

<style>
</style>