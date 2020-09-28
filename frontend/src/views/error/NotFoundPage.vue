<template>
  <div>
    <GoBack name="Page Not Found" />
    <v-row class="y-center flex-column-start-start">
      <h1 class="error-message not-found">Sorry we couldn't find this page.</h1>
    </v-row>
  </div>
</template>

<script>
import GoBack from "../../components/ui/navs/GoBack";
export default {
  name: "NotFoundPage",
  components: {
    GoBack
  }
};
</script>

<style>
.not-found::before {
  display: block;
  content: "Error 404";
  font-size: 1rem;
}
.error-message {
  color: #aaaaaa !important;
}
</style>
