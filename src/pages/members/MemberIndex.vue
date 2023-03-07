<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 600px;">
      <q-card class="bg-green-8 text-green-1">
        <q-tabs v-model="tab" class="text-green-5" active-color="white" indicator-color="green-3" align="justify"
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
                <p>loading...</p>
              </template>
            </Suspense>
          </q-tab-panel>

          <q-tab-panel name="family" class="no-padding no-margin">
            <Suspense>
              <template #default>
                <member-families />
              </template>
              <template #fallback>
                <p>loading...</p>
              </template>
            </Suspense>
          </q-tab-panel>

          <q-tab-panel name="child" class="no-padding no-margin">
            <Suspense>
              <template #default>
                <member-children />
              </template>
              <template #fallback>
                <p>loading...</p>
              </template>
            </Suspense>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import MemberProfile from "./MemberProfile.vue";
import MemberFamilies from "./MemberFamilies.vue";
import MemberChildren from "./MemberChildren.vue";

const emit = defineEmits(["pageTitle"]);
emit("pageTitle", "Data Anggota");

const tab = ref("profile");
</script>
