<template>
  <v-dialog v-model="dialog" max-width="350">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        class="btn-float-2"
        color="primary"
        fab
        medium
        :loading="loading"
      >
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </template>
    <v-card class="flex-column-start-center">
      <v-card-title>
        <span class="headline">Done</span>
      </v-card-title>
      <v-card-text class="flex-row-start-center">
        <v-row>
          <v-radio-group v-model="isDone" row>
            <v-radio label="Yes" :value="yes"></v-radio>
            <v-radio label="No" :value="no"></v-radio>
          </v-radio-group>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="this.callNextEntry"
          >Next</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import '../../assets/styles/colors.css';
import { mapActions } from 'vuex';
import { buttonMixin } from '../../mixins/ui/buttonMixin';
export default {
  name: 'NextEntryDialog',
  mixins: [buttonMixin],
  data() {
    return {
      dialog: false,
      yes: true,
      no: false,
      isDone: true,
    };
  },
  methods: {
    ...mapActions('entrybook', ['nextEntry', 'getEntryBook']),
    ...mapActions(['displaySnackbarForInfo', 'displaySnackbarForSuccess']),
    async callNextEntry() {
      this.loading = true;
      const res = await this.nextEntry(this.isDone);
      if (res) {
        this.loading = false;
        this.displaySnackbarForSuccess('Entry Updated');
      } else {
        this.loading = false;
        this.displaySnackbarForInfo('No more entries.');
      }
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
.next-entry-container {
  border: 1px solid var(--outline-color) !important;
  border-radius: 9px;
  background-color: #fff;
  padding: 0px;
}
.main-container {
  padding: 0px 12px;
}
.v-card__text {
  padding: 0px 12px !important;
}
.row {
  padding: 16px 10px !important;
}
.btn-float-2 {
  position: fixed;
  right: 10px;
  bottom: 160px;
  transition: ease-in-out 0.5s;
}
</style>
