<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 600px">
      <q-card>
        <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify"
          narrow-indicator>
          <q-tab name="profile" label="Profil" />
          <q-tab name="family" label="Alarms" />
          <q-tab name="child" label="Anak" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="profile">
            <div class="text-h6">Mails</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="family">
            <div class="text-h6">Keluarga</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="child">
            <div class="text-h6">Anak</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </q-card>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const tab = ref('profile')
</script>
