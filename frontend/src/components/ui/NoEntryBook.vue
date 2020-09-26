<template>
  <v-row class="flex-row-center-center y-center">
    <div class="flex-column-center-center">
      <div>
        <v-btn
          text
          color="primary"
          outlined
          large
          :loading="loading"
          v-on:click="createNewList"
          >Create new list</v-btn
        >
      </div>
    </div>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex';
import { buttonMixin } from '../../mixins/ui/buttonMixin';
export default {
  name: 'NoEntryBook',
  mixins: [buttonMixin],
  methods: {
    ...mapActions('ui', ['displaySnackbarForSuccess']),
    ...mapActions('list', ['createNewList']),
    async createEntryBook() {
      this.loading = true;
      await this.createNewList();
      this.displaySnackbarForSuccess('LIST CREATED');
      this.loading = false;
    },
  },
};
</script>
