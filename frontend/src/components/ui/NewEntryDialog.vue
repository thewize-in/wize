<template>
  <v-dialog v-model="dialog" max-width="350">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" class="btn-float-1" color="primary" fab medium>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">New Entry</span>
      </v-card-title>
      <v-card-text>
        <v-container class="v-container">
          <v-row regular>
            <v-col cols="12" sm="12" md="12">
              <v-text-field label="Name*" type="text" required v-model="name"></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                label="Phone"
                type="number"
                :counter="10"
                :rules="phoneRule"
                v-model="phone"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-text-field label="Address" type="text" v-model="address"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        <v-btn
          color="blue darken-1"
          text
          primary
          @click="createEntry"
          :disabled="trimAll(name).length<4?true:false"
        >Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "NewEntryDialog",
  data() {
    return {
      name: "",
      phone: "",
      address: "",
      phoneRule: [v => v.length <= 10 || "Number must be 10 digit"],
      disabled: true
    };
  },
  computed: {
    ...mapGetters("entrybook", ["isCreated"]),
    dialog: {
      get() {
        return this.$store.state.dialog;
      },
      set(value) {
        this.$store.commit("UPDATE_DIALOG", value);
      }
    }
  },
  methods: {
    ...mapActions("entrybook", ["createNewEntry", "getEntryBook"]),
    ...mapActions(["displaySnackbarForFailure", "displaySnackbarForSuccess"]),
    async createEntry() {
      await this.createNewEntry({
        name: this.name,
        address: this.address || "",
        phone: this.address || ""
      });
      await this.getEntryBook();
      this.displaySnackbarForSuccess("Entry Created");
      this.dialog = false;
    },
    trimAll(string) {
      return string.split(" ").join("");
    }
  }
};
</script>

<style scoped>
.btn-float-1 {
  position: fixed;
  right: 10px;
  bottom: 90px;
}
</style>
