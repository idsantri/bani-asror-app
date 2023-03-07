<template>
  <q-card-section class="bg-green-7">
    <q-banner class="q-pa-sm bg-green-3 text-dark">
      <template #avatar>
        <q-avatar icon="man" color="green-10" text-color="green-2" rounded font-size=".7em"></q-avatar>
      </template>
      <div>

      </div>
    </q-banner>
    <q-btn class="glossy btn-float" round color="green-10" icon="add">
      <q-tooltip class="bg-info text-dark">Tambah pasangan</q-tooltip>
    </q-btn>
  </q-card-section>
</template>

<script setup>
import { api } from '../../boot/axios';
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toArray } from '../../utils/array';
const families = reactive([])
const router = useRouter()
const route = useRoute()
const idMember = route.params.id.toString()

try {
  const response = await api.get(`members/${idMember}/families`)
  Object.assign(families, response.data.data.families)
  // console.log(families)
} catch (error) {
  console.log("Not Found: member -> families", error.response);
}

const createFamily = async () => {
  const isConfirmed = confirm('Buat kelurga baru untuk member ini?')
  if (!isConfirmed) return
  try {
    const response = await axios.post('families', { member_id: idMember })
    console.log('new family', response.data)
    const familyId = response.data.data.family.id
    // console.log(familyId);
    router.push(`/families/${familyId}`)
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
</style>
