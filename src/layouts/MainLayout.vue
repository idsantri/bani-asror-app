<template>
  <q-layout view="hHh LpR lFf">
    <q-header elevated class="bg-green-9 text-green-1">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" color="green-4" />

        <q-toolbar-title class="no-padding">
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" alt="logo" />
          </q-avatar>
          {{ pageTitle }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" elevated class="bg-green-1">
      <q-list>
        <q-item-label header> Bani Asror </q-item-label>

        <aside-content />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view :key="$route.fullPath" @page-title="handlePageTitle" />
    </q-page-container>
    <q-footer bordered class="bg-green-9 text-white">
      <p class="text-center no-margin q-pa-sm">by idsantri</p>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import AsideContent from "src/components/AsideContent.vue";

const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => (leftDrawerOpen.value = !leftDrawerOpen.value);

const pageTitle = ref("Data")
const handlePageTitle = (value) => {
  // console.log('val', value);
  pageTitle.value = value
}
</script>
