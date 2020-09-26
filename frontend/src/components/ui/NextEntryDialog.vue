<template>
  <v-row>
    <v-btn
      v-if="stats.total >= 1 && stats.current >= 1"
      class="btn-float-2"
      color="primary"
      fab
      medium
      :loading="loading"
      @click="validateBeforeNextEntry"
    >
      <v-icon>mdi-arrow-right</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" max-width="350">
      <v-card class="flex-column-start-center">
        <v-card-title class="headline"
          >Entry number {{ stats.current }} Done?</v-card-title
        >
        <v-card-text class="flex-row-start-center">
          <v-row>
            <v-radio-group v-model="isDone" row>
              <v-radio label="Yes" :value="yes" medium></v-radio>
              <v-radio label="No" :value="no" medium></v-radio>
            </v-radio-group>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="callNextEntry">Next</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import { buttonMixin } from '../../mixins/ui/buttonMixin';
import { nextEntryMixin } from '../../mixins/ui/nextEntryMixin';

export default {
  name: 'NextEntryDialog',
  mixins: [buttonMixin, nextEntryMixin],
  data() {
    return {
      dialog: false,
      yes: true,
      no: false,
      isDone: true,
    };
  },
  computed: {
    ...mapGetters('list', [
      'stats',
      'allEntries',
      'doneEntries',
      'undoneEntries',
    ]),
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
  right: 1rem;
  bottom: 160px;
  transition: ease-in-out 0.5s;
}
</style>
