<template>
  <div>
    <GoBack name="Contact Us" />
    <v-row class="flex-row-center-center">
      <v-col cols="12" xl="6" lg="6" md="8" sm="12">
        <v-row class="flex-row-center-center">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSc-wElfaqFlyQT8PG5TZs8Tl33902LRqU-Wa49tpzHwYdL9bQ/viewform?embedded=true"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
          >Loading…</iframe>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import GoBack from "../components/ui/GoBack";
export default {
  name: "ContactUs",
  components: {
    GoBack
  }
};
</script>

<style scoped>
iframe {
  width: 100%;
  min-height: 50rem;
}
</style>
