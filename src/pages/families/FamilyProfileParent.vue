<template>
  <q-card-section class="bg-green-7">
    <q-banner class="q-pa-sm bg-green-2 text-dark">
      <template #avatar>
        <q-avatar icon="main" color="green-10" text-color="green-2" rounded font-size=".7em"></q-avatar>
      </template>
      <div>
        <h3 class="text-h6 no-margin">abdm</h3>
        <!-- <p class="no-margin text-body2 text-weight-light text-italic" v-if="alias">({{
          alias
        }})</p> -->
        <!-- <p class="no-margin text-h7" v-if="nama_arab">{{ member.nama_arab }}</p>
        <p class="no-margin" v-if="alamat">{{ alamat }}</p> -->
      </div>
    </q-banner>
  </q-card-section>
</template>

<script setup>
import { reactive, toRefs } from 'vue'
import api from '../../utils/api-tokened'
import memberState from '../../stores/member-store';
import { toArray } from '../../utils/array';

const member = reactive({})
// eslint-disable-next-line no-undef
const props = defineProps({
  memberId: { type: Number, default: null },
  familyId: { type: Number, default: null },
  memberSex: { type: String, default: '' },
})
if (props.memberId || props.memberId === 0) {
  try {
    const response = await api.get(`members/${props.memberId}`)
    // console.log(response.data.data.member);
    Object.assign(member, response.data.data.member)
  } catch (error) {
    console.log("Not Found: member -> detail", error.response);
  }
}
const { id, nama, ayah, ayah_id, ibu, ibu_id, keluarga_id, avatar, lp } = toRefs(member)

const showModal = () => {
  memberState().$reset()
  memberState().familyId = props.familyId
  if (props.memberSex.toLowerCase() == 'suami') {
    memberState().title = `Suami`
    memberState().isHusband = true
  }
  if (props.memberSex.toLowerCase() == 'istri') {
    memberState().title = `Istri`
    memberState().isWife = true
  }
}

const deletePasangan = async () => {
  let pasangan
  let data
  if (lp.value.toLowerCase() == 'l') {
    pasangan = 'suami';
    data = { suami_id: null }
  }
  if (lp.value.toLowerCase() == 'p') {
    pasangan = 'istri';
    data = { istri_id: null }
  }
  const isConfirmed = confirm(`Hapus ${pasangan}?`)
  if (!isConfirmed) return

  try {
    const response = await api.put(`families/${props.familyId}`, data)
    // console.log('hapus pasangan', response.data);
    alert(response.data.message)

    document.getElementById('btn-force-rerender').click()

  } catch (error) {
    toArray(error.response.data.message).forEach((errorMessage) => {
      alert(errorMessage)
    })
  }
}
</script>

<style scoped>
h4 {
  font-weight: 300;
  font-size: larger;
}

#nama {
  font-weight: 500;
}
</style>
