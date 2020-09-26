<template>
  <v-dialog v-model="dialog" max-width="350">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        class="btn-float-1"
        color="primary"
        fab
        medium
        :loading="loading"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-form ref="form" v-model="valid" :lazy-validation="lazy">
      <v-card>
        <v-card-title class="headline">New Entry</v-card-title>
        <v-card-text>
          <v-container class="v-container">
            <v-row regular>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  label="Name*"
                  type="text"
                  v-model="name"
                  :rules="nameRules"
                  :required="true"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="phone"
                  label="Phone"
                  type="number"
                  :counter="10"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  label="Address"
                  type="text"
                  v-model="address"
                ></v-text-field>
              </v-col>
            </v-row>
            <small>*indicates required field</small>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Close</v-btn
          >
          <v-btn
            color="blue darken-1"
            text
            primary
            :disabled="!valid"
            @click="createEntry"
            >Create</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { buttonMixin } from '../../mixins/ui/buttonMixin';
export default {
  name: 'NewEntryDialog',
  mixins: [buttonMixin],

  data() {
    return {
      valid: true,
      lazy: false,
      name: '',
      phone: '',
      address: '',
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => (v && v.length >= 4) || 'Name must be greater than 3 characters',
      ],

      disabled: true,
    };
  },
  computed: {
    ...mapGetters('list', ['isCreated']),
    dialog: {
      get() {
        return this.$store.getters['ui/dialog'];
      },
      set(value) {
        this.$store.commit('ui/UPDATE_DIALOG', value);
      },
    },
  },
  methods: {
    ...mapActions('list', ['addNewEntry', 'getList']),
    ...mapActions('ui', [
      'displaySnackbarForFailure',
      'displaySnackbarForSuccess',
    ]),
    async createEntry() {
      this.validate();
      if (this.valid) {
        this.loading = true;
        const res = await this.addNewEntry({
          name: this.name,
          address: this.address || '',
          phone: this.phone || '',
        });

        this.loading = false;
        if (res) {
          [this.name, this.address, this.phone] = ['', '', ''];
          this.dialog = false;
          this.displaySnackbarForSuccess('NEW ENTRY ADDED');
        }
      }
    },
    trimAll(string) {
      return string.split(' ').join('');
    },
    validate() {
      this.$refs.form.validate();
    },
  },
};
</script>

<style scoped>
.btn-float-1 {
  position: fixed;
  bottom: 90px;
  right: 1rem;
  transition: ease-in-out 0.5s;
}
</style>
