<template>
  <q-layout view="hHh LpR lFf">
    <q-header elevated class="bg-green-10 text-green-1">
      <button @click="forceRerender" id="btn-force-rerender" style="display: none;">rerender</button>
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" color="green-4" />
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
        </q-avatar>

        <q-toolbar-title>
          <q-list>
            <q-item clickable v-ripple class="no-padding" to="/">
              <q-item-section>
                <q-item-label>Silsilah Bani Asror</q-item-label>
                <q-item-label caption class="text-green-1 text-italic no-margin">(Bujuk Langgundih)</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-toolbar-title>
        <q-btn round flat dense icon="notifications" disabled>
          <q-badge floating color="primary" rounded />
        </q-btn>
        <q-btn-dropdown flat round dense dropdown-icon="more_vert" class="q-pl-md">

          <q-list>
            <q-item clickable v-close-popup to="/profile">
              <q-item-section>Profil</q-item-section>
              <q-item-section avatar>
                <q-icon color="green" name="3p" />
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup to="/logout">
              <q-item-section>Keluar</q-item-section>
              <q-item-section avatar>
                <q-icon color="red" name="logout" />
              </q-item-section>
            </q-item>
          </q-list>

        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" elevated class="bg-green-1">
      <q-list>
        <q-item-label header> Bani Asror </q-item-label>
        <aside-content />
      </q-list>
    </q-drawer>

    <q-page-container :key="componentKey">
      <div class="q-pa-sm">
        <div class="q-gutter-y-sm">
          <q-banner class="bg-green-9 text-green-1" inline-actions>
            <h2 class="text-h6 no-margin text-weight-light">{{ pageTitle }}</h2>
            <p class="no-margin text-weight-light">{{ pageSubTitle }}</p>
            <template v-slot:action>
              <q-btn flat color="white" icon="search" />
            </template>
          </q-banner>
          <router-view :key="$route.fullPath" @page-title="handlePageTitle" />
        </div>
      </div>
    </q-page-container>
    <q-footer bordered class="bg-green-9 text-white">
      <p class="text-center no-margin q-pa-sm">by idsantri</p>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import AsideContent from "src/components/AsideContent.vue";
import memberState from '../../src/stores/member-store'
const pageTitle = ref("Data")
const pageSubTitle = ref('Nama')
const leftDrawerOpen = ref(false);
const componentKey = ref(0);

const toggleLeftDrawer = () => (leftDrawerOpen.value = !leftDrawerOpen.value);
const handlePageTitle = (value) => pageTitle.value = value
const forceRerender = () => componentKey.value++;

watchEffect(() => pageSubTitle.value = `${memberState().member.nama} (${memberState().member.lp})`)
</script>
