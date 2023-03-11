<template>
  <q-layout view="lHh LpR lFf">
    <q-header elevated class="bg-green-10 text-green-1">
      <button @click="forceRerender" id="btn-force-rerender" style="display: none;">rerender</button>
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" color="green-4" />
        <q-avatar class="bg-green-1">
          <img src="../assets/logo-circle.png">
        </q-avatar>

        <q-toolbar-title class="no-padding q-ml-sm">
          <q-list>
            <q-item clickable v-ripple class="no-padding" to="/">
              <q-item-section>
                <q-item-label class="q-py-sm">
                  <p class="header header-1"><span class="header-span">Silsilah</span> Bani Asror</p>
                  <p class="header header-2">(Bujuk Langgundih)</p>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-toolbar-title>
        <q-btn round flat dense icon="notifications" disabled color="green-1">
          <q-badge floating color="info" rounded />
        </q-btn>
        <q-btn-dropdown flat round dense dropdown-icon="more_vert" class="q-pl-md" color="green-1">

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

    <q-drawer :width="250" show-if-above v-model="leftDrawerOpen" side="left" elevated class="bg-green-7">

      <q-banner class="bg-transparent q-mt-md">
        <img src="../assets/logo.png" style="height: 100px; object-fit: cover;">
        <p class="text-green-1 text-h6 text-weight-medium no-margin"> <span class="text-weight-light">Silsilah</span> Bani
          Asror</p>
        <p class="text-green-1 text-subtitle1 text-weight-light text-italic">(Bujuk Langgundih)</p>
      </q-banner>
      <aside-content />
    </q-drawer>

    <q-page-container :key="componentKey">
      <div class="q-pa-sm">
        <div class="q-gutter-y-sm">
          <q-banner class="bg-green-9 text-green-1" inline-actions>
            <h2 class="text-h6 no-margin text-weight-light">{{ pageTitle }}</h2>
            <p class="no-margin text-weight-light">{{ pageSubTitle }}</p>
            <!-- tombol cari -->
            <template v-slot:action>
              <q-btn flat color="white" icon="search" @click="modalCari = true" />
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

  <q-dialog v-model="modalCari" full-width>
    <q-card>
      <q-card-section class="bg-green-8 text-green-1 q-pa-sm">
        <div class="text-h6 text-weight-light">Cari Anggota</div>
      </q-card-section>

      <q-card-section style="max-height: 75vh" class="scroll">
        <search-member />
      </q-card-section>

      <q-card-actions class="bg-green-8 text-green-1 q-pa-sm">
        <q-btn label="Baru" color="secondary" v-close-popup />
        <q-space />
        <q-btn label="Tutup" color="green-10" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import AsideContent from "src/components/AsideContent.vue";
import memberState from '../../src/stores/member-store'
import SearchMember from "src/pages/search/SearchMember.vue";
// import { useRoute } from 'vue-router'

const pageTitle = ref("Data")
const pageSubTitle = ref('Nama')
const leftDrawerOpen = ref(false);
const componentKey = ref(0);
const modalCari = ref(false)

const toggleLeftDrawer = () => (leftDrawerOpen.value = !leftDrawerOpen.value);
const handlePageTitle = (value) => pageTitle.value = value
const forceRerender = () => componentKey.value++;

watchEffect(() => pageSubTitle.value = `${memberState().member.nama} (${memberState().member.lp})`)
// console.log(useRoute().meta);
// if(useRoute().n)
</script>
<style scoped >
.header {
  margin: 0;
  padding: 0;
}


.header-1 {
  font-weight: 500;
}

.header-2 {
  font-weight: 100;
  font-size: .7em;
  font-style: italic;
}

.header-span {
  font-weight: 100;
}
</style>
