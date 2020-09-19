<template>
  <div>
    <GoBack name="Guide" />
    <v-row class="flex-row-center-center" style="height: 90vh;">
      <UnderConstruction />
    </v-row>
  </div>
</template>

<script>
import UnderConstruction from "../components/ui/UnderConstruction";
import GoBack from "../components/ui/GoBack";
export default {
  name: "Guide",
  components: {
    UnderConstruction,
    GoBack
  }
};
</script>

<style></style>
