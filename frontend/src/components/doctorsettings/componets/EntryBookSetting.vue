<template>
  <v-row>
    <v-col cols="12" class="flex-row-start-center">
      <v-row v-if="!isCreated" class="flex-row-start-center">
        <v-col cols="4" class="col-container">
          <v-btn
            depressed
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
            depressed
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
    <v-snackbar v-model="snackbar" :color="color" :timeout="timeout">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>

<script>
import "../../../assets/styles/colors.css";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "EntryBookSetting",
  data() {
    return {
      loading: false,
      snackbar: false,
      text: "",
      timeout: 6000,
      color: ""
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
    async createEntryBook() {
      this.loading = true;
      await this.createNewEntryBook();
      this.loading = false;
      this.displaySnackbar(true, "Entrybook Created", "success");
    },
    async deleteEntryBook() {
      this.loading = true;
      await this.deleteCreatedEntryBook();
      this.loading = false;
      this.displaySnackbar(true, "Entrybook Deleted", "success");
    },
    displaySnackbar(show, text, color) {
      this.snackbar = show;
      this.text = text;
      this.color = color;
    }
  }
};
</script>

<style scoped>
.col-container {
  padding: 10px 0px !important;
}
</style>
