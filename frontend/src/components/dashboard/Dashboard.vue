<template>
  <div>
    <AppNav />
    <Drawer />
    <v-row v-if="isCreated" class="flex-row-center-center" style="padding: 0px 5px;">
      <Loading v-if="pageLoading" />
      <v-col
        v-else
        cols="12"
        xl="6"
        lg="6"
        md="12"
        sm="12"
        class="flex-row-center-center"
        style="padding-bottom: 0px;"
      >
        <v-row>
          <v-col cols="12" xl="12" lg="12" md="12" sm="12" class="flex-column-center-center">
            <v-row class="flex-row-around-center">
              <GreetingCard :doctor="profile.displayName" />
              <DashCard cardName="Total" :stat="stats.total" icon="mdi-account-group" />
              <DashCard cardName="Current" :stat="stats.current" icon="mdi-account" />
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <NextEntryDialog v-if="FAB" />
      <NewEntryDialog v-if="FAB" />
      <Snackbar />
    </v-row>
    <NoEntryBook v-else />
    <BottomNav />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import DashCard from "./components/DashCard";
import GreetingCard from "./components/GreetingCard";
import Loading from "../ui/Loading";
import NewEntryDialog from "../ui/NewEntryDialog";
import NextEntryDialog from "../ui/NextEntryDialog";
import Snackbar from "../ui/Snackbar";
import NoEntryBook from "../ui/NoEntryBook";
import { routerMixin } from "../../mixins/routerMixin";
import { userProfileMixin } from "../../mixins/user/userProfileMixin";
import { fabMixin } from "../../mixins/ui/fabMixin";
import AppNav from "../ui/AppNav";
import BottomNav from "../ui/BottomNav";
import Drawer from "../ui/Drawer";
export default {
  name: "Dashboard",
  mixins: [routerMixin, userProfileMixin, fabMixin],
  components: {
    AppNav,
    BottomNav,
    DashCard,
    GreetingCard,
    NextEntryDialog,
    NewEntryDialog,
    Snackbar,
    NoEntryBook,
    Loading,
    Drawer
  },
  async created() {
    this.pageLoading = true;

    await this.isEntryBookExist();
    if (this.isCreated) {
      await this.getEntryBook();
    }
    this.pageLoading = false;
    this.updateBottomNav(0);
  },
  data() {
    return {
      pageLoading: false
    };
  },
  computed: {
    ...mapState("entrybook", ["stats", "isCreated"]),
    ...mapGetters("user", ["profile"])
  },
  methods: {
    ...mapActions("entrybook", ["isEntryBookExist", "getEntryBook"]),
    ...mapActions("ui", ["updateBottomNav"])
  }
};
</script>

<style scoped>
.stats-container,
.list-container {
  padding: 0px !important;
}
</style>
