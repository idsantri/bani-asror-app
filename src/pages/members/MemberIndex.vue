<template>
  <q-card class="bg-green-8 text-green-1">
    <q-tabs v-model="tab" class="text-green-5" active-color="green-1" indicator-color="green-3" align="justify"
      narrow-indicator>
      <q-route-tab :to="toProfile" name="profile" label="Profil" />
      <q-route-tab :to="toFamilies" name="family" label="Keluarga" />
      <q-route-tab :to="toChildren" name="child" label="Anak" />

      <q-btn-dropdown flat round dense dropdown-icon="more_vert" class="q-pl-md" color="green-1">
        <q-list>
          <q-item clickable v-close-popup @click="print">
            <q-item-section>Cetak</q-item-section>
            <q-item-section avatar>
              <q-icon color="green" name="print" />
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="report">
            <q-item-section>Lapor</q-item-section>
            <q-item-section avatar>
              <q-icon color="red" name="report_problem" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>

    </q-tabs>

    <q-separator dark />

    <q-tab-panels v-model="tab" animated class="bg-green-6" swipeable>
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
import { notifyError } from "src/utils/notify";
import { useRoute } from "vue-router";

const pageSubTitle = ref(null)
watchEffect(() => pageSubTitle.value = `${memberState().member.nama} (${memberState().member.lp})`)

const emit = defineEmits(["pageTitle", "pageSubTitle", "showButtonSearch"]);
emit("pageTitle", "Data Anggota");
emit("pageSubTitle", pageSubTitle);
emit("showButtonSearch", true);

const tab = ref("profile");
const toProfile = "/members/" + useRoute().params.id.toString() + "/profile"
const toFamilies = "/members/" + useRoute().params.id.toString() + "/families"
const toChildren = "/members/" + useRoute().params.id.toString() + "/children"

const report = () => {
  notifyError('Fitur belum siap.')
}

const print = () => {
  notifyError('Fitur belum siap.')
}

</script>
<style scoped>
.spinner {
  text-align: center;
  margin: 30px auto;
}
</style>
