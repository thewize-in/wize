<template>
  <div>
    <GoBack name="Entrybook" />
    <v-row class="flex-column-center-center">
      <v-col
        cols="12"
        sm="10"
        md="6"
        lg="5"
        xl="5"
        class="flex-column-start-center"
      >
        <DatePicker />
      </v-col>
      <v-col
        cols="12"
        sm="10"
        md="6"
        lg="5"
        xl="5"
        class="flex-column-start-center"
        ><ArchivedListMetadata :list="archivedListMetadata" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import GoBack from "../../ui/navs/GoBack";
import DatePicker from "./components/DatePicker";
import ArchivedListMetadata from "./components/ArchivedListMetadata";
import { mapGetters } from "vuex";
export default {
  name: "Archives",
  components: {
    GoBack,
    DatePicker,
    ArchivedListMetadata
  },
  computed: {
    ...mapGetters("entrybook", ["archivedListMetadata"])
  }
};
</script>
