<template>
  <q-card-section class="bg-green-7">
    <q-banner class="q-pa-sm bg-green-3 text-dark">
      <div class="q-pa-sm">
        <q-list v-if="families.length > 0" separator>
          <q-item v-for="(family, index) in families" :key="index">
            <q-item-section>

              <q-item clickable v-ripple class="no-padding" dense
                :to="family.pasangan_id ? '/members/' + family.pasangan_id : null">
                <q-item-section>
                  <q-item-label class="text-h5 no-margin">
                    {{ family.pasangan_id ? family.pasangan : '?' }}
                  </q-item-label>
                  <q-item-label caption>Jumlah anak: {{ family.children_count }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-item-section>
            <q-item-section avatar>
              <q-btn :to="/families/ + family.family_id" color="green-8" icon="diversity_1" />
            </q-item-section>
          </q-item>
        </q-list>

        <q-list v-else>
          <q-item>
            <q-item-section>
              <q-item-label>-</q-item-label>
              <q-item-label caption class="no-margin">Jumlah anak: -</q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-btn color="green-8" icon="diversity_1" disable />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-banner>
    <q-btn class="glossy btn-float" round color="green-10" icon="add" @click="createFamily">
      <q-tooltip class="bg-green-1 text-dark">Tambah pasangan</q-tooltip>
    </q-btn>
  </q-card-section>
</template>

<script setup>
import api from '../../utils/api-tokened';
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toArray } from '../../utils/array';
import memberState from '../../stores/member-store'
import { notifyError } from 'src/utils/notify';

const families = reactive([])
const router = useRouter()
const route = useRoute()
const memberId = route.params.id.toString()

try {
  const response = await api.get(`members/${memberId}/families`)
  Object.assign(families, response.data.data.families)
  // console.log(families)
} catch (error) {
  console.log("Not Found: member -> families", error.response);
}

const createFamily = async () => {
  const nama = memberState().getMember.nama
  const pasangan = memberState().getMember.lp.toUpperCase() == 'L' ? 'istri' : 'suami'
  const isConfirmed = confirm(`Tambahkan keluarga baru (${pasangan}) untuk ${nama}?`)
  if (!isConfirmed) return
  try {
    const response = await api.post('families', { member_id: memberId })
    // console.log('new family', response.data)
    const familyId = response.data.data.family.id
    // console.log(familyId);
    router.push(`/families/${familyId}`)
  } catch (error) {
    // console.log("error create family:", error.response);
    toArray(error.response.data.message).forEach((errorMessage) => {
      notifyError(errorMessage)
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
