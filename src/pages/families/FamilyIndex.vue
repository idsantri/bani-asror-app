<template>
  <q-card class="bg-green-8 text-green-1">
    <q-tabs v-model="tab" class="text-green-5" active-color="white" indicator-color="green-3" align="justify"
      narrow-indicator>
      <q-tab name="profile" label="Profil" />
      <q-tab name="child" label="Anak" />
    </q-tabs>

    <q-separator dark />

    <q-tab-panels v-model="tab" animated class="bg-green-6">
      <q-tab-panel name="profile" class="no-padding no-margin">
        <suspense>
          <template #default>
            <family-profile />
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
            halo anak
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
const emit = defineEmits(["pageTitle", 'pageSubTitle']);
emit("pageTitle", "Data Keluarga");

const tab = ref("profile");
</script>
<style scoped>
.spinner {
  text-align: center;
  margin: 30px auto;
}
</style>
