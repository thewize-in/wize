<template>
  <div>
    <GoBack name="About Us" />
    <v-row class="flex-row-center-center" style="height: 90vh;">
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
