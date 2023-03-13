<template>
  <q-card-section class="bg-green-7">
    <q-banner class="q-pa-sm bg-green-3 text-dark">
      <q-list v-if="children.length > 0" bordered separator>
        <q-item v-for="(child, index) in children" :key="index">
          <q-avatar>
            <q-badge align="middle" color="green-8">{{ child.urut ? child.urut : "-" }}</q-badge>
          </q-avatar>
          <q-item-section>


            <q-list clickable v-ripple>
              <q-item class="no-padding" dense :to="/members/ + child.member_id">
                <q-item-section>
                  <!-- <q-item-label caption>{{ memberSex == 'L' ? 'Suami' : 'Istri' }}</q-item-label> -->
                  <!-- <q-item-label class="text-h5 no-margin">{{ nama ? nama : '?' }}</q-item-label> -->
                  <q-item-label> {{ child.nama }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>


          </q-item-section>

          <q-item-section avatar>
            <q-btn color="green-2" round>
              <q-icon name="delete" color="negative" size="2em" />
            </q-btn>
          </q-item-section>
        </q-item>
      </q-list>

      <q-list v-else bordered separator>
        <q-item>
          <q-avatar>
            <q-badge align="middle" color="green-8">0</q-badge>
          </q-avatar>
          <q-item-section>
            <q-item-label>-</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-banner>

    <q-btn class="glossy btn-float" round color="secondary" icon="add" @click="addChild">
      <q-tooltip class="bg-white text-dark">Tambahkan anak</q-tooltip>
    </q-btn>

  </q-card-section>
</template>

<script setup>
import api from '../../utils/api-tokened';
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import memberState from '../../stores/member-crud-store';
import { toArray } from '../../utils/array';
import { notifyError, notifySuccess } from 'src/utils/notify';
import { forceRerender } from 'src/utils/buttons-click';
import { showModalSearch } from 'src/utils/buttons-click';

const children = reactive([])
const route = useRoute()
const familyId = route.params.id.toString()

try {
  const response = await api.get(`families/${familyId}/children`)
  Object.assign(children, response.data.data.children)
  // console.log(response.data.data.children);
} catch (error) {
  console.log("Not Found: family -> children", error.response)
}

const deleteChild = async (id) => {
  const isConfirmed = confirm(`Hapus yang bersangkutan dari daftar anak?`)
  if (!isConfirmed) return
  try {
    const response = await api.delete(`children/${id}`)
    // console.log(response.data);
    notifySuccess(response.data.message)
    forceRerender()

  } catch (error) {
    // console.log("error hapus pasangan:", error.response);
    toArray(error.response.data.message).forEach((errorMessage) => {
      // alert(errorMessage)
      notifyError(errorMessage)
    })
  }

}
const addChild = () => {
  showModalSearch(
    {
      familyId: familyId,
      title: 'Anak',
      isChild: true
    }
  )
  // memberState().$reset()
  // memberState().familyId = familyId
  // memberState().title = `Anak`
  // memberState().isChild = true
}

const urutChildren = async () => {
  let i = [];
  let u = []
  children.forEach((child) => {
    i.push(child.id);
    u.push(child.urut);
  })

  const data = { id: i, urut: u }
  // console.log(data);
  try {
    const response = await api.put('children/urut', data)
    // console.log(response.data);
    alert(response.data.message)

    // document.getElementById('btn-force-rerender').click()
  } catch (error) {
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