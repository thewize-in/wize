<template>
  <v-row>
    <v-col cols="12" class="flex-row-start-center">
      <v-row v-if="!isCreated" class="flex-row-start-center">
        <v-col cols="3" class="col-container">
          <v-btn depressed color="primary" small v-on:click="createEntryBook">Create</v-btn>
        </v-col>

        <v-col cols="6" class="col-container">
          <span>New Entrybook</span>
        </v-col>
      </v-row>
      <v-row v-else class="flex-row-start-center">
        <v-col cols="3" class="col-container">
          <v-btn depressed color="error" small v-on:click="deleteEntryBook">Delete</v-btn>
        </v-col>

        <v-col cols="6" class="col-container">
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
import { Component, Vue } from "vue-property-decorator";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "EntryBookSetting",
  data() {
    return {
      snackbar: false,
      text: "",
      timeout: 6000,
      color: ""
    };
  },
  computed: {
    ...mapGetters("entrybook", ["isCreated"])
  },
  methods: {
    ...mapActions("entrybook", [
      "createNewEntryBook",
      "deleteCreatedEntryBook"
    ]),
    createEntryBook() {
      this.createNewEntryBook();
      this.displaySnackbar(true, "Entrybook Created", "success");
    },
    deleteEntryBook() {
      this.displaySnackbar(true, "Entrybook Deleted", "success");
      this.deleteCreatedEntryBook();
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
