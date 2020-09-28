<template>
  <div>
    <GoBack name="Error" />
    <v-row class="y-center flex-column-start-start">
      <h1 class="error-message server-error">
        Sorry. It's not your mistake it's our.
      </h1>
    </v-row>
  </div>
</template>

<script>
import GoBack from "../../components/ui/navs/GoBack";
export default {
  name: "ServerErrorPage",
  components: {
    GoBack
  }
};
</script>

<style>
.server-error::before {
  display: block;
  content: "Error 500";
  font-size: 1rem;
}
.error-message {
  color: #aaaaaa !important;
}
</style>