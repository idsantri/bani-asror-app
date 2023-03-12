<template>
  <q-card-section class="bg-green-7">

    <!-- SUAMI -->
    <div class="">
      <q-banner class="q-pa-sm bg-green-2 text-dark">
        <template #avatar>
          <q-avatar rounded icon="man" color="green-10" text-color="green-3" font-size=".6em"></q-avatar>
        </template>
        <q-list>
          <q-item class="no-padding" clickable v-ripple>
            <q-item-section>
              <q-item-label caption>Suami</q-item-label>
              <q-item-label class="text-h5">Fulan bin Fulan</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-banner>
      <q-banner class="q-pa-sm bg-green-3 text-dark">
        <template #avatar>
          <q-avatar rounded icon="diversity_3" color="green-10" text-color="green-3" font-size=".6em"></q-avatar>
        </template>
        <q-list>
          <q-item class="no-padding">
            <q-item-section>
              <q-list>
                <q-item clickable v-ripple class="no-padding" dense>
                  <q-item-label><span class="parent-label">Ayah:</span>Fulan</q-item-label>
                </q-item>
                <q-item clickable v-ripple class="no-padding" dense>
                  <q-item-label><span class="parent-label">Ibu:</span>Fulanah</q-item-label>
                </q-item>
              </q-list>
            </q-item-section>
            <q-item-section avatar>
              <q-btn flat>
                <q-icon name="play_circle_filled" size="3.5em" color="green-10" />
              </q-btn>
            </q-item-section>
          </q-item>
        </q-list>
      </q-banner>
    </div>

    <!-- ISTRI -->
    <div class="q-mt-md">
      <q-banner class="q-pa-sm bg-green-2 text-dark">
        <template #avatar>
          <q-avatar rounded icon="woman" color="green-10" text-color="green-3" font-size=".6em"></q-avatar>
        </template>
        <q-list>
          <q-item class="no-padding" clickable v-ripple>
            <q-item-section>
              <q-item-label caption>istri</q-item-label>
              <q-item-label class="text-h5">Fulanah bin Fulan</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-banner>
      <q-banner class="q-pa-sm bg-green-3 text-dark">
        <template #avatar>
          <q-avatar rounded icon="diversity_3" color="green-10" text-color="green-3" font-size=".6em"></q-avatar>
        </template>
        <q-list>
          <q-item class="no-padding">
            <q-item-section>
              <q-list>
                <q-item clickable v-ripple class="no-padding" dense>
                  <q-item-label><span class="parent-label">Ayah:</span>Fulan</q-item-label>
                </q-item>
                <q-item clickable v-ripple class="no-padding" dense>
                  <q-item-label><span class="parent-label">Ibu:</span>Fulanah</q-item-label>
                </q-item>
              </q-list>
            </q-item-section>
            <q-item-section avatar>
              <q-btn flat>
                <q-icon name="play_circle_filled" size="3.5em" color="green-10" />
              </q-btn>
            </q-item-section>
          </q-item>
        </q-list>
      </q-banner>
    </div>


    <q-banner class="q-pa-sm bg-green-4 text-dark q-mt-md">
      <template #avatar>
        <q-avatar rounded icon="info" color="green-10" text-color="green-3" font-size=".85em"></q-avatar>
      </template>
      <p class="no-margin q-pb-xs"><span class="text-weight-light">Alamat: </span></p>
    </q-banner>


    <q-btn class="glossy btn-float" round color="green-10" icon="edit" @click="showModal = true">
      <q-tooltip class="bg-white text-dark">Edit data</q-tooltip>
    </q-btn>
  </q-card-section>
</template>

<script setup>
import { toArray } from '../../utils/array';
import api from '../../utils/api-tokened';
import { toRefs, reactive } from 'vue';
import { useRoute } from 'vue-router';
import FamilyProfileParent from './FamilyProfileParent.vue';
const family = reactive({})
const route = useRoute()
const familyId = route.params.id

try {
  const response = await api.get(`families/${familyId}`)
  Object.assign(family, response.data.data.family)
  // console.log(data);
} catch (error) {
  // console.log("Not Found: family -> detail", error.response);
  toArray(error.response.data.message).forEach((errorMessage) => {
    alert(errorMessage)
  })
}
const { suami_id, istri_id, id, alamat } = toRefs(family)
const submitAlamat = async () => {
  // alert(id.value);
  try {
    const response = await api.put(`families/${id.value}`, {
      alamat: alamat.value,
    })
    // console.log(response.data);
    alert(response.data.message)
  } catch (error) {
    toArray(error.response.data.message).forEach((errorMessage) => {
      alert(errorMessage)
    })
  }
}


const deleteFamily = async () => {
  const isConfirmed = confirm('Hapus Keluaga? \nAksi ini tidak dapat dibatalkan.\nData anak yang terhubung dengan id ini juga akan terhapus')
  if (!isConfirmed) return
  try {
    const response = await api.delete(`families/${familyId}`)
    console.log('hapus family', response.data);
    alert(response.data.message)
    history.back();
  } catch (error) {
    // console.log("error create family:", error.response);
    toArray(error.response.data.message).forEach((errorMessage) => {
      alert(errorMessage)
    })
  }
}

</script>
<style scoped>
.btn-float {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.parent-label {
  display: inline-block;
  width: 50px;
}
</style>
