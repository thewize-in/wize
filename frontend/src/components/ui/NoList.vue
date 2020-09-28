<template>
  <v-row class="flex-row-center-center y-center">
    <div class="flex-column-center-center">
      <div>
        <CreateNewListDialog />
      </div>
    </div>
  </v-row>
</template>

<script>
import { mapActions } from "vuex";
import { buttonMixin } from "../../mixins/ui/buttonMixin";
import CreateNewListDialog from "./dialogs/CreateNewListDialog";
export default {
  name: "NoEntryBook",
  mixins: [buttonMixin],
  components: {
    CreateNewListDialog
  }
};
</script>
