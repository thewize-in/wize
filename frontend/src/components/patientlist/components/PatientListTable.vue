<template>
  <v-row class="flex-row-center-center">
    <v-data-table
      :headers="headers"
      :items="list"
      :search="search"
      :items-per-page="itemsPerPage"
      class="table"
      mobile-breakpoint="320"
      no-data-text="Empty List"
      :no-results-text="search+ ' not in list'"
    >
      <template v-slot:top>
        <v-row class="d-flex">
          <v-col cols="12" xl="12" lg="12" md="12" sm="12" xm="12">
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" hide-details></v-text-field>
          </v-col>
        </v-row>
      </template>
    </v-data-table>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "PatientListTable",
  props: ["list"],

  data() {
    return {
      search: "",
      itemsPerPage: 5,

      headers: [
        {
          text: "Name",
          sortable: false,
          value: "name"
        },
        {
          text: "Number",
          sortable: true,
          value: "number"
        }
      ]
    };
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
.v-data-table .v-data-footer .v-data-footer {
  justify-content: flex-start !important;
}
</style>
