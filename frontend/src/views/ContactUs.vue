<template>
  <div>
    <GoBack name="Contact Us" />
    <v-row class="flex-row-center-center" style="height: 90vh;">
      <v-col cols="12" xl="6" lg="6" md="8" sm="12">
        <v-row class="flex-row-center-center">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSfmj78798X0vKg-vssovNN1M2nOmdNNfW39BtGULn55n62yNw/viewform?embedded=true"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
            >Loading…</iframe
          >
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
