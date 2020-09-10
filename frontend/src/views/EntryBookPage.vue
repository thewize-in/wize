<template>
  <EntryBook />
</template>

<script>
import "../assets/styles/colors.css";
import EntryBook from "../components/entrybook/EntryBook.vue";

export default {
  name: "EntryBookPage",
  components: {
    EntryBook
  }
};
</script>

<style>
.container-fluid,
.row {
  margin: 0px !important;
  padding: 0px !important;
}
</style>
