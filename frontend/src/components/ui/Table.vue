<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :search="search"
    :items-per-page="itemsPerPage"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="number"
    show-expand
    mobile-breakpoint="320"
    no-data-text="Empty List"
    :no-results-text="search + ' not in list'"
    class="table"
  >
    <template v-slot:top>
      <v-row class="d-flex">
        <v-col cols="12" xl="12" lg="12" md="12" sm="12" xm="12">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td class="expanded-data" :colspan="headers.length">
        <div
          v-if="item.phone || item.address"
          class="expanded-item-container flex-row-between-center"
        >
          <div v-if="item.phone" class="phone flex-column-start-center">
            <v-icon small>mdi-phone</v-icon> <span>{{ item.phone }}</span>
          </div>
          <div v-if="item.address" class="address flex-column-start-center">
            <v-icon small> mdi-map-marker</v-icon
            ><span>{{ item.address }}</span>
          </div>
        </div>
        <div v-else class="flex-row-center-center">
          no details
        </div>
      </td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "Table",
  props: ["items"],
  data() {
    return {
      search: "",
      itemsPerPage: 5,
      expanded: [],
      singleExpand: true,
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
  padding-bottom: 10px;
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
.expanded-data {
  flex-wrap: wrap;
  box-shadow: none;
  background-color: var(--main-color);
  padding: 10px !important;
}
</style>