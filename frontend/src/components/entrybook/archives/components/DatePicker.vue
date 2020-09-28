<template>
  <div>
    <v-col>
      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        persistent
        width="290px"
      >
        <template
          v-slot:activator="{ on, attrs }"
          class="flex-row-center-center"
        >
          <v-text-field
            v-model="date"
            label="Pick Date"
            prepend-icon="mdi-calendar-outline"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
          <v-btn text color="primary" @click="getListByDate">OK</v-btn>
        </v-date-picker>
      </v-dialog>
    </v-col>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "DatePicker",
  data() {
    return {
      date:
        localStorage.getItem("date") || new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false
    };
  },
  async created() {
    await this.getArchivedListMetadata(this.date);
  },
  methods: {
    ...mapActions("entrybook", ["getArchivedListMetadata"]),
    async getListByDate() {
      localStorage.setItem("date", this.date);
      this.$refs.dialog.save(this.date);
      await this.getArchivedListMetadata(this.date);
    }
  },
  watch: {
    date(newValue, oldValue) {
      localStorage.setItem("date", this.date);
    }
  }
};
</script>

<style>
</style>