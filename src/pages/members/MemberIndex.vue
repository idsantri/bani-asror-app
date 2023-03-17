<template>
  <q-card class="bg-green-8 text-green-1">
    <q-tabs v-model="tab" class="text-green-5" active-color="green-1" indicator-color="green-3" align="justify"
      narrow-indicator>
      <q-tab name="profile" label="Profil" />
      <q-tab name="family" label="Keluarga" />
      <q-tab name="child" label="Anak" />
    </q-tabs>

    <q-separator dark />

    <q-tab-panels v-model="tab" animated class="bg-green-6">
      <q-tab-panel name="profile" class="no-padding no-margin">
        <Suspense>
          <template #default>
            <member-profile />
          </template>
          <template #fallback>
            <div class="spinner">
              <q-spinner-cube color="green-2" size="8em" />
            </div>
          </template>
        </Suspense>
      </q-tab-panel>

      <q-tab-panel name="family" class="no-padding no-margin">
        <Suspense>
          <template #default>
            <member-families />
          </template>
          <template #fallback>
            <div class="spinner">
              <q-spinner-cube color="green-2" size="8em" />
            </div>
          </template>
        </Suspense>
      </q-tab-panel>

      <q-tab-panel name="child" class="no-padding no-margin">
        <Suspense>
          <template #default>
            <member-children />
          </template>
          <template #fallback>
            <div class="spinner">
              <q-spinner-cube color="green-2" size="8em" />
            </div>
          </template>
        </Suspense>
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import MemberProfile from "./MemberProfile.vue";
import MemberFamilies from "./MemberFamilies.vue";
import MemberChildren from "./MemberChildren.vue";
import memberState from '../../stores/member-store'
const tab = ref("profile");
const pageSubTitle = ref(null)
watchEffect(() => pageSubTitle.value = `${memberState().member.nama} (${memberState().member.lp})`)

const emit = defineEmits(["pageTitle", "pageSubTitle"]);
emit("pageTitle", "Data Anggota");
emit("pageSubTitle", pageSubTitle);

</script>
<style scoped>
.spinner {
  text-align: center;
  margin: 30px auto;
}
</style>
