<template>
  <BaseEntryBookSetting />
</template>
<script>
import BaseEntryBookSetting from '../components/doctorsettings/BaseEntryBookSetting.vue';
import { routerMixin } from '../mixins/routerMixin';
export default {
  name: 'DoctorSettingsPage',
  components: {
    BaseEntryBookSetting,
  },
};
</script>
