<template>
  <v-dialog v-model="dialog" max-width="250px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" text color="primary" medium outlined>
        Create New List
      </v-btn>
    </template>
    <v-form ref="form" v-model="valid">
      <v-card class="mx-auto">
        <v-card-title class="headline">Create New List</v-card-title>
        <v-card-text>
          <v-text-field
            label="List name"
            type="text"
            v-model="name"
            :rules="nameRules"
            :required="true"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Cancel</v-btn
          >
          <v-btn
            text
            color="primary"
            :disabled="!valid"
            @click="createList"
            :loading="loading"
            >Create</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "CreateNewListDialog",
  data() {
    return {
      dialog: false,
      valid: true,
      name: "",
      nameRules: [v => !!v || "List name is required"],
      disabled: true,
      loading: false
    };
  },
  methods: {
    ...mapActions("list", ["createNewList"]),
    ...mapActions("ui", ["displaySnackbarForSuccess"]),
    async createList() {
      this.loading = true;
      await this.createNewList(this.name);
      this.dialog = false;
      this.name = "";
      this.displaySnackbarForSuccess("LIST CREATED");
      this.loading = false;
    }
  }
};
</script>

<style>
</style>