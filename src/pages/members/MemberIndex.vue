<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 600px">
      <q-card class="bg-green-8 text-green-1">
        <q-tabs
          v-model="tab"
          class="text-green-5"
          active-color="white"
          indicator-color="info"
          align="justify"
          narrow-indicator
        >
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
            <div class="text-h6">Keluarga</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="child" class="no-padding no-margin">
            <div class="text-h6">Anak</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import MemberProfile from "./MemberProfile.vue";

// eslint-disable-next-line no-undef
const emit = defineEmits(["pageTitle"]);
emit("pageTitle", "Data Anggota");

const tab = ref("profile");
</script>
