<template>
  <v-row style="padding:0px !important;">
    <v-data-table
      :headers="headers"
      :items="list"
      :search="search"
      :items-per-page="itemsPerPage"
      height="height"
      class="table"
    >
      <template v-slot:top>
        <v-row class="d-flex">
          <v-col cols="12" class="flex-row-center-center">
            <StatsCard :stats="stats" />
          </v-col>
          <v-col cols="12" xl="5" lg="12" md="12" sm="12" xm="12">
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" hide-details></v-text-field>
          </v-col>

          <v-col cols="12" xl="5" lg="6" md="12" sm="12" xm="12">
            <v-select :items="selectListItems" label="Patient List" v-model="selected" flat></v-select>
          </v-col>
          <v-col cols="12" xl="2" lg="6" md="12" sm="12" xm="12" class="flex-row-end-center">
            <NewEntryDialog />
            <v-divider class="mx-2" inset vertical></v-divider>
            <BaseNextEntry />
          </v-col>
        </v-row>
      </template>
    </v-data-table>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import "../../../assets/styles/colors.css";
import NewEntryDialog from "../../ui/NewEntryDialog.vue";
import BaseNextEntry from "./BaseNextEntry.vue";
import StatsCard from "./StatsCard.vue";
export default {
  name: "PatientListTable",
  props: ["list"],
  components: {
    StatsCard,
    NewEntryDialog,
    BaseNextEntry
  },

  data() {
    return {
      search: "",
      itemsPerPage: 5,
      sticky: true,
      headers: [
        {
          text: "Name",
          sortable: false,
          value: "name"
        },
        {
          text: "Number",
          sortable: false,
          value: "number"
        }
      ],
      selectListItems: ["all", "done", "undone"]
    };
  },
  computed: {
    ...mapGetters("entrybook", ["stats"]),
    selected: {
      get: function() {
        return this.$store.state.selected;
      },
      set: function(value) {
        this.$store.commit("UPDATE_SELECTED", value);
      }
    }
  }
};
</script>

<style scoped>
.table {
  background-color: var(--main-color) !important;
}

td,
tr {
  border-bottom: 1px solid var(--outline-color) !important;
}
.sticky-btn {
  top: 50%;
  position: fixed;
}
</style>
