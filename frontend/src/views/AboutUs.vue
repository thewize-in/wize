<template>
  <div>
    <GoBack name="About Us" />
    <v-row class="y-center">
      <UnderConstruction />
    </v-row>
  </div>
</template>

<script>
import GoBack from "../components/ui/GoBack";
import UnderConstruction from "../components/ui/UnderConstruction";
export default {
  name: "AboutUs",
  components: {
    GoBack,
    UnderConstruction
  }
};
</script>

<style></style>
