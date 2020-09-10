<template>
  <v-row>
    <v-col
      cols="12"
      xs="12"
      sm="8"
      md="6"
      lg="5"
      xl="5"
      class="flex-column-start-center entrybook-list-container"
    >
      <v-tabs v-model="tab" background-color="base">
        <v-tab>Entrybook Setting</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab" class="v-tab-itmes-container" background-color="base">
        <EntryBookSetting />
      </v-tabs-items>
    </v-col>
  </v-row>
</template>

<script>
import "../../assets/styles/colors.css";
import EntryBookSetting from "./componets/EntryBookSetting.vue";

export default {
  name: "BaseEntryBookSetting",
  data() {
    return {
      tab: "entrybooksetting"
    };
  },
  components: {
    EntryBookSetting
  }
};
</script>

<style scoped>
.v-tab-itmes-container {
  background-color: var(--main-container) !important;
}
</style>
