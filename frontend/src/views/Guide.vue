<template>
  <div>
    <GoBack name="Guide" />
    <v-row class="y-center">
      <UnderConstruction />
    </v-row>
  </div>
</template>

<script>
import UnderConstruction from "../components/ui/UnderConstruction";
import GoBack from "../components/ui/navs/GoBack";
export default {
  name: "Guide",
  components: {
    UnderConstruction,
    GoBack
  }
};
</script>

<style></style>
