<template>
  <EntryBook />
</template>

<script lang="ts">
import '../assets/styles/colors.css';
import EntryBook from '../components/entrybook/EntryBook.vue';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    EntryBook,
  },
})
export default class EntryBookPage extends Vue {}
</script>

<style>
.container-fluid,
.row {
  margin: 0px !important;
  padding: 0px !important;
}
</style>
