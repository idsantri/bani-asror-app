<template>
  <q-card-section class="bg-green-7">
    <q-banner class="q-pa-sm bg-green-3 text-dark">
      <template #avatar>
        <q-avatar icon="diversity_1" color="green-10" text-color="green-2" rounded font-size=".7em"></q-avatar>
      </template>
      <div>

        <table>
          <thead>
            <tr>
              <td class="text-center" style="width: 60px;">No</td>
              <td>Suami/Istri</td>
              <td>Anak</td>
              <td></td>
            </tr>
          </thead>
          <tbody v-if="families.length == 0">
            <tr>
              <td class="text-center">#</td>
              <td>-</td>
              <td>-</td>
              <td class="text-end">
                <span class="btn btn-outline-secondary btn-sm disabled">
                  <i class="fa-solid fa-circle-info me-1"></i>detail
                </span>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr v-for="(family, index) in families" :key="index">
              <td class="text-center">{{ parseInt(index) + 1 }}</td>
              <td v-if="family.pasangan_id">
                <router-link :to="/members/ + family.pasangan_id">
                  {{ family.pasangan }}
                </router-link>
              </td>
              <td v-else>-</td>
              <td>{{ family.children_count }}</td>
              <td class="text-end">
                <router-link :to="/families/ + family.family_id" class="btn btn-outline-info btn-sm">
                  <i class="fa-solid fa-circle-info me-1"></i>detail
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>


      </div>
    </q-banner>
    <q-btn class="glossy btn-float" round color="green-10" icon="add" @click="createFamily">
      <q-tooltip class="bg-white text-dark">Tambah pasangan</q-tooltip>
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
