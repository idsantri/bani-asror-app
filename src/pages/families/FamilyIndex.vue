<template>
  <q-card class="bg-green-8 text-green-1">
    <q-tabs v-model="tab" class="text-green-5" active-color="green-1" indicator-color="green-3" align="justify"
      narrow-indicator>
      <q-route-tab :to="toProfile" name="profile" label="Profil" />
      <q-route-tab :to="toChildren" name="child" label="Anak" />

      <DropDownTab />
    </q-tabs>

    <q-separator dark />

    <q-tab-panels v-model="tab" animated class="bg-green-6" swipeable>
      <q-tab-panel name="profile" class="no-padding no-margin">
        <suspense>
          <template #default>
            <FamilyProfile />
          </template>
          <template #fallback>
            <div class="spinner">
              <q-spinner-cube color="green-2" size="8em" />
            </div>
          </template>
        </suspense>
      </q-tab-panel>

      <q-tab-panel name="child" class="no-padding no-margin">
        <suspense>
          <template #default>
            <FamilyChildren />
          </template>
          <template #fallback>
            <div class="spinner">
              <q-spinner-cube color="green-2" size="8em" />
            </div>
          </template>
        </suspense>
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import FamilyProfile from "./FamilyProfile.vue";
import FamilyChildren from "./FamilyChildren.vue";
import { useRoute } from "vue-router";
import DropDownTab from "src/components/DropDownTab.vue";

const emit = defineEmits(["pageTitle", "pageSubTitle", "showButtonSearch"]);
emit("pageTitle", "Data Keluarga");
emit("pageSubTitle", null);
emit("showButtonSearch", true);

const tab = ref("profile");
const toProfile = "/families/" + useRoute().params.id.toString() + "/profile"
const toChildren = "/families/" + useRoute().params.id.toString() + "/children"

</script>
<style scoped>
.spinner {
  text-align: center;
  margin: 30px auto;
}
</style>
