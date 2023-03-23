<template>
  <q-banner class="q-pa-sm bg-green-2 text-dark">
    <template #avatar>
      <q-avatar rounded :icon="memberSex == 'L' ? 'man' : 'woman'" color="green-10" text-color="green-3"
        font-size=".6em"></q-avatar>
    </template>
    <q-list>
      <q-item class="no-padding">
        <q-item-section>
          <q-list>
            <q-item clickable v-ripple class="no-padding" dense :to="id ? '/members/' + id : null">
              <q-item-section>
                <q-item-label caption>{{ memberSex == 'L' ? 'Suami' : 'Istri' }}</q-item-label>
                <q-item-label class="text-h5 no-margin">{{ nama ? nama : '?' }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-item-section>

        <q-item-section avatar>
          <q-fab v-model="fab" icon="keyboard_arrow_left" direction="left" padding="sm" color="green-9">
            <q-fab-action padding="5px" external-label label-position="bottom" color="orange" icon="edit" label="Edit"
              @click="editPasangan" />
            <q-fab-action v-if="id" padding="5px" external-label label-position="bottom" color="negative" icon="delete"
              label="Hapus" @click="deletePasangan" />
          </q-fab>
        </q-item-section>
      </q-item>
    </q-list>
  </q-banner>

  <!-- ORTU  -->
  <q-banner class="q-pa-sm bg-green-3 text-dark">
    <parent-component :parent="parent" />
  </q-banner>
</template>

<script setup>


import { reactive, toRefs, ref } from 'vue'
import { apiTokened } from '../../config/api';
import memberCrudState from '../../stores/member-crud-store';
import { toArray } from '../../utils/array';
import ParentComponent from 'src/components/ParentComponent.vue';
import { notifySuccess, notifyError } from '../../utils/notify';
import { showModalSearch, forceRerender } from 'src/utils/buttons-click';

const fab = ref(false)
const member = reactive({})
const parent = reactive({});
const props = defineProps({
  memberId: { type: Number, default: null },
  familyId: { type: Number, default: null },
  memberSex: { type: String, default: '' },
})
if (props.memberId || props.memberId === 0) {
  try {
    const response = await apiTokened.get(`members/${props.memberId}`)
    // console.log(response.data.data.member);
    Object.assign(member, response.data.data.member)
    Object.assign(parent, response.data.data.member);
  } catch (error) {
    console.log("Not Found: member -> detail", error.response);
  }
}
const { id, nama, ayah, ayah_id, ibu, ibu_id, keluarga_id, avatar, lp } = toRefs(member)

const editPasangan = () => {
  const args = { familyId: props.familyId, }
  if (props.memberSex.toUpperCase() == 'L') args.isHusband = true
  if (props.memberSex.toUpperCase() == 'P') args.isWife = true
  showModalSearch(args)
}

const deletePasangan = async () => {
  if (!props.memberId) {
    notifyError('Setidaknya ada salah satu pasangan dalam keluarga.')
    return
  }

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
    const response = await apiTokened.put(`families/${props.familyId}`, data)
    // console.log('hapus pasangan', response.data);
    notifySuccess(response.data.message)
    forceRerender()
  } catch (error) {
    toArray(error.response.data.message).forEach((errorMessage) => {
      notifyError(errorMessage)
    })
  }
}
</script>

<style scoped>
.parent-label {
  display: inline-block;
  width: 50px;
}
</style>
