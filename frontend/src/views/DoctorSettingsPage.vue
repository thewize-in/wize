<template>
  <BaseEntryBookSetting />
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseEntryBookSetting from '../components/doctorsettings/BaseEntryBookSetting.vue';
@Component({
  components: {
    BaseEntryBookSetting,
  },
})
export default class DoctorSettingsPage extends Vue {}
</script>
