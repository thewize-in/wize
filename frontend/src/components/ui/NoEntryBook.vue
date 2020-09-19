<template>
  <v-row class="flex-row-center-center">
    <div class="flex-column-center-center">
      <div>
        <v-btn
          text
          color="primary"
          outlined
          large
          :loading="loading"
          v-on:click="createEntryBook"
          >Create new entrybook</v-btn
        >
      </div>
    </div>
  </v-row>
</template>

<script>
import { mapActions } from "vuex";
import { buttonMixin } from "../../mixins/ui/buttonMixin";
export default {
  name: "NoEntryBook",
  mixins: [buttonMixin],
  methods: {
    ...mapActions("ui", ["displaySnackbarForSuccess"]),
    ...mapActions("entrybook", ["createNewEntryBook"]),
    async createEntryBook() {
      this.loading = true;
      await this.createNewEntryBook();
      this.displaySnackbarForSuccess("ENTRYBOOK CREATED");
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.row {
  height: 80vh !important;
}
</style>
