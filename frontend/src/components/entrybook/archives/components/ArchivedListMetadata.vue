<template>
  <v-card class="mx-auto" flat dense>
    <v-list>
      <v-subheader>Lists</v-subheader>
      <v-list-item-group v-if="list.length > 0">
        <template v-for="(item, index) in list">
          <v-list-item
            :key="item._id"
            outlined
            v-on:click="sendTo(`/dr/entrybook/${item._id}`)"
          >
            <v-list-item-content>
              <v-list-item-title>{{ item.list_name }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-action-text class="flex-column-center-center">
                created on {{ item.created_on }}
              </v-list-item-action-text>
            </v-list-item-action>
          </v-list-item>
          <v-divider v-if="index < list.length - 1" :key="index"></v-divider>
        </template>
      </v-list-item-group>
      <v-list-item-group v-else>
        <v-row>
          <v-col cols="12" class="flex-column-center-center">
            <v-icon>mdi-information-outline</v-icon>
            <div color="secondary">
              Empty
            </div>
          </v-col>
        </v-row>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { routerMixin } from "../../../../mixins/routerMixin";
export default {
  name: "ArchivedListMetadata",
  mixins: [routerMixin],
  props: ["list"]
};
</script>

<style scoped>
</style>