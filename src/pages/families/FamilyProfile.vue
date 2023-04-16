<template>
  <q-card-section class="bg-green-7">

    <!-- SUAMI -->
    <div>
      <family-profile-parent :member-id="parseInt(suami_id)" :family-id="parseInt(id)" member-sex="L" />
    </div>

    <!-- ISTRI -->
    <div class="q-mt-md">
      <family-profile-parent :member-id="parseInt(istri_id)" :family-id="parseInt(id)" member-sex="P" />
    </div>

    <!-- alamat -->
    <q-banner class="q-pa-sm bg-green-4 text-dark q-mt-md">
      <template #avatar>
        <q-avatar rounded icon="info" color="green-10" text-color="green-3" font-size=".85em"></q-avatar>
      </template>
      <!-- <p class="no-margin q-pb-xs"><span class="text-weight-light">Alamat: </span>{{ alamat }}</p> -->
      <div class="cursor-pointer">
        Alamat: {{ alamat ? alamat : '-' }}
        <q-popup-edit v-model="alamat" v-slot="scope" @save="submitAlamat(alamat)">
          <q-input autofocus dense v-model="scope.value" :model-value="scope.value" hint="Alamat tinggal pasangan"
            @update:modelValue="alamat = scope.value">
            <template v-slot:after>
              <q-btn flat dense color="negative" icon="cancel" @click.stop.prevent="scope.cancel" />
              <q-btn flat dense color="positive" icon="check_circle" @click.stop.prevent="scope.set" />
            </template>
          </q-input>
        </q-popup-edit>
      </div>
    </q-banner>

    <q-btn class="glossy btn-float" round color="negative" icon="delete" @click="deleteFamily">
      <q-tooltip class="bg-green-1 text-dark">Hapus keluarga ini</q-tooltip>
    </q-btn>
  </q-card-section>
</template>

<script setup>
import { toArray } from '../../utils/array';
import { apiTokened } from "../../config/api";
import { toRefs, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { notifySuccess, notifyError, notifyWarning, notifyWarningExpired } from 'src/utils/notify';
import FamilyProfileParent from './FamilyProfileSplit.vue';
const family = reactive({})
const route = useRoute()
const familyId = route.params.id

try {
  const response = await apiTokened.get(`families/${familyId}`)
  Object.assign(family, response.data.data.family)
} catch (error) {
  // console.log("Not Found: family -> detail", error.response);
  const errMsg = toArray(error.response.data.message)
  const exp = errMsg.some(item => item.toLowerCase().includes("expired"))
  if (exp) notifyWarningExpired()
  else errMsg.forEach((message) => notifyError(message))
}
const { suami_id, istri_id, id, alamat } = toRefs(family)
const submitAlamat = async (alamat) => {
  // console.log(alamat);
  // return
  try {
    const response = await apiTokened.put(`families/${id.value}`, {
      alamat: alamat,
    })
    Object.assign(family, response.data.data.family)
    notifySuccess(response.data.message)
  } catch (error) {
    toArray(error.response.data.message).forEach((errorMessage) => {
      notifyError(errorMessage)
    })
  }
}

const deleteFamily = async () => {
  const isConfirmed = confirm('Hapus Keluaga? \nAksi ini tidak dapat dibatalkan.\nData anak yang terhubung dengan id ini juga akan terhapus')
  if (!isConfirmed) return
  try {
    const response = await apiTokened.delete(`families/${familyId}`)
    // console.log('hapus family', response.data);
    notifySuccess(response.data.message)
    history.back();
  } catch (error) {
    // console.log("error create family:", error.response);
    toArray(error.response.data.message).forEach((errorMessage) => {
      notifyError(errorMessage)
    })
  }
}

</script>

<style lang="scss" scoped>
.btn-float {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>
