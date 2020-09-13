<template>
  <Loading v-if="pageLoading" />
  <div v-else>
    <v-row
      v-if="isCreated"
      class="flex-row-center-center"
      style="padding: 0px 5px;"
    >
      <v-col
        cols="12"
        xl="6"
        lg="6"
        md="12"
        sm="12"
        class="flex-row-center-center"
        style="padding-bottom: 0px;"
      >
        <v-row>
          <v-col
            cols="12"
            xl="12"
            lg="12"
            md="12"
            sm="12"
            class="flex-column-center-center"
          >
            <v-row class="flex-row-around-center">
              <GreetingCard doctor="Adsule" />
              <DashCard
                cardName="Patients"
                :stat="stats.total"
                icon="mdi-account-group"
              />
              <DashCard
                cardName="Current"
                :stat="stats.current"
                icon="mdi-account"
              />
            </v-row>
          </v-col>
        </v-row>
      </v-col>

      <!-- <v-col
      cols="12"
      xl="6"
      lg="6"
      md="12"
      sm="12"
      class="flex-row-center-center"
      style="padding-top: 0px;"
    >
      <v-row>
        <v-col
          cols="12"
          xl="12"
          lg="12"
          md="12"
          sm="12"
          class="flex-column-center-center"
        >
          <v-col
            cols="12"
            xl="12"
            lg="12"
            md="12"
            sm="12"
            style="padding: 0px 0px;"
          >
            <div style="padding: 5px 0px;">
              <h1>Patients</h1>
            </div>
          </v-col>
          <v-row v-if="isCreated" class="flex-row-around-center card">
            <List
              v-for="(patient, index) in list"
              :key="index"
              :index="index"
              :patient="patient"
            />
          </v-row>
        </v-col>
      </v-row>
    </v-col> -->
      <NextEntryDialog v-if="FAB" />
      <NewEntryDialog v-if="FAB" />
      <Snackbar />
    </v-row>
    <v-row v-else class="flex-row-center-center" style="height: 80vh;">
      <div class="flex-column-center-center">
        <v-icon>mdi-alert-circle</v-icon>
        <p>Create new entrybook</p>
      </div>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import DashCard from './components/DashCard';
import GreetingCard from './components/GreetingCard';
import Loading from '../ui/Loading';
import NewEntryDialog from '../ui/NewEntryDialog';
import NextEntryDialog from '../ui/NextEntryDialog';
import Snackbar from '../ui/Snackbar';
import { routerMixin } from '../../mixins/routerMixin';

export default {
  name: 'Dashboard',
  mixins: [routerMixin],
  components: {
    DashCard,
    GreetingCard,
    NextEntryDialog,
    NewEntryDialog,
    Snackbar,

    Loading,
  },
  created() {
    let timer = null;
    window.addEventListener(
      'scroll',
      () => {
        this.hideFAB();
        if (timer !== null) {
          clearTimeout(timer);
        }
        timer = setTimeout(this.showFAB, 500);
      },
      false
    );
    this.updateAppBar(true);
    this.$store.commit('UPDATE_BOTTOM_NAV', 'dashboard');
  },
  async mounted() {
    this.pageLoading = true;
    await this.isEntryBookExist();
    if (this.isCreated) {
      await this.getEntryBook();
    }
    this.pageLoading = false;
  },
  data() {
    return {
      FAB: true,
      doctor: 'Adsule',
      pageLoading: false,
      list: [
        { name: 'saud chougle' },
        { name: 'sami chougle' },
        { name: 'sanober chougle' },
      ],
    };
  },
  computed: {
    ...mapState('entrybook', ['stats', 'isCreated']),
  },
  methods: {
    ...mapActions('entrybook', ['isEntryBookExist', 'getEntryBook']),
    myWatcher() {
      this.$store.subscribe('entrybook/GET_ENTRYBOOK', (mutation, state) => {
        console.log(state);
      });
    },
    hideFAB() {
      this.FAB = false;
    },
    showFAB() {
      this.FAB = true;
    },
  },
};
</script>

<style scoped>
.stats-container,
.list-container {
  padding: 0px !important;
}
</style>
