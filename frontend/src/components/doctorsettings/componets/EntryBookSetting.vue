<template>
  <v-row>
    <v-col cols="12" class="flex-row-center-center">
      <v-row v-if="!isCreated" class="flex-row-start-center">
        <v-col cols="4" class="col-container">
          <v-btn
            color="primary"
            medium
            v-on:click="createEntryBook"
            :loading="loading"
            outlined
          >Create</v-btn>
        </v-col>
        <v-col cols="5">
          <span>Entrybook</span>
        </v-col>
      </v-row>
      <v-row v-else class="flex-row-start-center">
        <v-col cols="4" class="col-container">
          <v-btn
            color="error"
            medium
            v-on:click="deleteEntryBook"
            :loading="loading"
            outlined
          >Delete</v-btn>
        </v-col>
        <v-col cols="5">
          <span>Entrybook</span>
        </v-col>
      </v-row>
    </v-col>
    <Snackbar />
  </v-row>
</template>

<script>
import "../../../assets/styles/colors.css";
import { mapGetters, mapActions } from "vuex";
import Snackbar from "../../ui/Snackbar";
export default {
  name: "EntryBookSetting",
  components: {
    Snackbar
  },
  data() {
    return {
      loading: false
    };
  },
  async mounted() {
    await this.isEntryBookExist();
  },
  computed: {
    ...mapGetters("entrybook", ["isCreated"])
  },
  methods: {
    ...mapActions("entrybook", [
      "createNewEntryBook",
      "deleteCreatedEntryBook",
      "isEntryBookExist"
    ]),
    ...mapActions(["displaySnackbarForFailure", "displaySnackbarForSuccess"]),
    async createEntryBook() {
      this.loading = true;
      await this.createNewEntryBook();
      this.displaySnackbarForSuccess("Entrybook Created");
      this.loading = false;
    },
    async deleteEntryBook() {
      this.loading = true;
      await this.deleteCreatedEntryBook();
      this.displaySnackbarForSuccess("Entrybook Deleted");
      this.loading = false;
    }
  }
};
</script>

<style scoped>
</style>
