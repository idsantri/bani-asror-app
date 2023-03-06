<template>
  <q-layout view="hHh LpR lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" elevated>
      <q-list>
        <q-item-label header>
          Bani Asror
        </q-item-label>

        <aside-content />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer bordered class="bg-primary text-white">
      <p class="text-center no-margin q-pa-sm">by idsantri</p>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import AsideContent from 'src/components/AsideContent.vue'

const leftDrawerOpen = ref(false)
const toggleLeftDrawer = () => leftDrawerOpen.value = !leftDrawerOpen.value

</script>
