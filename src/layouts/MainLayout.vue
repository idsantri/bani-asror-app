<template>
  <q-layout view="lHh LpR lFf">
    <q-header elevated class="bg-green-10 text-green-1">
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
            <p class="no-margin text-weight-light" v-if="pageSubTitle">{{ pageSubTitle.value }}</p>
            <!-- tombol cari -->
            <template v-slot:action>
              <q-btn flat color="white" icon="search" @click="clickSearch" />
            </template>
          </q-banner>
          <router-view :key="$route.fullPath" @page-title="handlePageTitle" @page-sub-title="handlePageSubTitle" />
        </div>
      </div>
    </q-page-container>

    <!-- modal cari member -->
    <q-dialog v-model="showSearch" full-width>
      <q-card>
        <q-card-section class="bg-green-8 text-green-1 q-pa-sm">
          <div class="text-h6 text-weight-light">{{ searchTitle }}</div>
        </q-card-section>
        <q-card-section style="max-height: 75vh" class="scroll">
          <member-data-table />
        </q-card-section>

        <q-card-actions class="bg-green-8 text-green-1 q-pa-sm">
          <q-btn :style="styleButtonNew" label="Baru" color="secondary" @click="addNew" />
          <q-space />
          <q-btn label="Tutup" color="green-10" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- modal crud member -->
    <q-dialog v-model="showCrud" persistent>
      <member-crud />
    </q-dialog>

    <!-- hidden elements -->
    <div style="display: none;">
      <button @click="forceRerender" id="btn-force-rerender">rerender</button>
      <button @click="showSearch = true" id="btn-show-modal-search">show search</button>
      <button @click="showCrud = true" id="btn-show-modal-crud">show crud</button>
    </div>

    <q-footer bordered class="bg-green-9 text-white">
      <p class="text-center no-margin q-pa-sm">by idsantri</p>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import AsideContent from "src/components/AsideContent.vue";
import MemberDataTable from '../components/MemberDataTables.vue'
import { showModalSearch, showModalCrud } from 'src/utils/buttons-click';
import memberCrudState from '../stores/member-crud-store'
import MemberCrud from "src/components/MemberCrud.vue";

const pageTitle = ref("Data")
const pageSubTitle = ref('')
const leftDrawerOpen = ref(false);
const componentKey = ref(0);
const showSearch = ref(false)
const showCrud = ref(false)
const searchTitle = ref('')
const styleButtonNew = ref({ display: 'none' })
const addNew = () => {
  showSearch.value = false
  showModalCrud(false)
}
const toggleLeftDrawer = () => (leftDrawerOpen.value = !leftDrawerOpen.value);
const handlePageTitle = (value) => pageTitle.value = value
const handlePageSubTitle = (value) => pageSubTitle.value = value
const forceRerender = () => componentKey.value++;
const clickSearch = () => showModalSearch()

watchEffect(() => {
  let title = 'Cari Anggota'
  const { getIsNew, getIsHusband, getIsWife, getIsChild, } = memberCrudState()
  if (getIsNew) {
    styleButtonNew.value = { display: 'inline-flex' }
    if (getIsHusband) searchTitle.value = `${title} (Suami)`
    if (getIsWife) searchTitle.value = `${title} (Istri)`
    if (getIsChild) searchTitle.value = `${title} (Anak)`
  } else {
    styleButtonNew.value = { display: 'none' }
    searchTitle.value = title
  }
})

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
