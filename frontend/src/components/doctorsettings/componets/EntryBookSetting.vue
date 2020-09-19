<template>
  <v-row>
    <v-col cols="12" class="flex-row-center-center">
      <v-row v-if="!isCreated" class="flex-row-start-center">
        <v-col cols="12" class="col-container">
          <v-btn
            text
            color="primary"
            large
            :loading="loading"
            outlined
            v-on:click="createEntryBook"
            >Create new entrybook</v-btn
          >
        </v-col>
      </v-row>
      <v-row v-else class="flex-row-start-center">
        <v-col cols="12" class="col-container">
          <v-btn
            text
            color="error"
            large
            :loading="loading"
            outlined
            @click.stop="dialog = true"
            >Delete Entrybook</v-btn
          >
        </v-col>
        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-title class="headline">Are you sure?</v-card-title>

            <v-card-text>
              Once you delete a entrybook, there is no going back. Please be
              certain.
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="darken-1" text @click="dialog = false"
                >Cancel</v-btn
              >

              <v-btn color="darken-1" text @click="deleteEntryBook">Yes</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-col>
    <Snackbar />
  </v-row>
</template>

<script>
import "../../../assets/styles/colors.css";
import { mapGetters, mapActions } from "vuex";
import Snackbar from "../../ui/Snackbar";
import { buttonMixin } from "../../../mixins/ui/buttonMixin";
export default {
  name: "EntryBookSetting",
  mixins: [buttonMixin],
  components: {
    Snackbar
  },

  async mounted() {
    await this.isEntryBookExist();
  },
  computed: {
    ...mapGetters("entrybook", ["isCreated"])
  },
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    ...mapActions("entrybook", [
      "createNewEntryBook",
      "deleteCreatedEntryBook",
      "isEntryBookExist"
    ]),
    ...mapActions("ui", [
      "displaySnackbarForFailure",
      "displaySnackbarForSuccess"
    ]),
    async createEntryBook() {
      this.loading = true;
      await this.createNewEntryBook();
      this.displaySnackbarForSuccess("ENTRYBOOK CREATED");
      this.loading = false;
    },
    async deleteEntryBook() {
      this.dialog = false;
      this.loading = true;
      await this.deleteCreatedEntryBook();
      this.displaySnackbarForSuccess("ENTRYBOOK DELETED");
      this.loading = false;
    }
  }
};
</script>

<style scoped></style>
