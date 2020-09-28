<template>
  <v-row>
    <v-col cols="12" class="flex-row-center-center">
      <v-row v-if="!isCreated" class="flex-row-start-center">
        <v-col cols="12" class="col-container">
          <CreateNewListDialog />
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
            >Close List</v-btn
          >
        </v-col>
        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-title class="headline">Are you sure?</v-card-title>

            <v-card-text>
              Once you close a list, you won't be able to add new entries to it.
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="darken-1" text @click="dialog = false"
                >Cancel</v-btn
              >

              <v-btn color="error" text @click="closeCurrentList"
                >Yes,Close</v-btn
              >
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
import CreateNewListDialog from "../../ui/dialogs/CreateNewListDialog";
import Snackbar from "../../ui/popups/Snackbar";
import { buttonMixin } from "../../../mixins/ui/buttonMixin";
export default {
  name: "EntryBookSetting",
  mixins: [buttonMixin],
  components: {
    Snackbar,
    CreateNewListDialog
  },

  async mounted() {
    await this.isListExist();
  },
  computed: {
    ...mapGetters("list", ["isCreated"])
  },
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    ...mapActions("list", ["createNewList", "closeList", "isListExist"]),
    ...mapActions("ui", [
      "displaySnackbarForFailure",
      "displaySnackbarForSuccess"
    ]),
    async closeCurrentList() {
      this.dialog = false;
      this.loading = true;
      await this.closeList();
      this.displaySnackbarForSuccess("LIST CLOSED");
      this.loading = false;
    }
  }
};
</script>

<style scoped></style>
