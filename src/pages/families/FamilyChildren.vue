<template>
  <q-card-section class="bg-green-7">
    <q-banner class="q-pa-sm bg-green-3 text-dark">
      <q-list v-if="children.length > 0" bordered separator>
        <q-item v-for="(child, index) in children" :key="index">
          <q-avatar>
            <q-badge align="middle" color="green-8">{{ child.urut ? child.urut : "-" }}

              <q-popup-edit v-model="child.urut" buttons v-slot="scope" @save="submitUrut(child.id, child.urut)"
                :validate="val => val > 0">
                <q-input v-model="scope.value" dense autofocus @keyup.enter="scope.set" type="number"
                  hint="Tetapkan nomor urut!" :rules="[
                    val => scope.validate(val) || 'Jangan 0'
                  ]" @update:modelValue="child.urut = scope.value" />
              </q-popup-edit>


            </q-badge>
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
            <q-btn color="green-2" round size=".8em">
              <q-icon name="delete" color="negative" @click="deleteChild(child.id)" />
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
      <q-tooltip class="bg-green-1 text-dark">Tambahkan anak</q-tooltip>
    </q-btn>

  </q-card-section>
</template>

<script setup>
import { apiTokened } from "../../config/api";
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import { toArray } from '../../utils/array';
import { notifyError, notifySuccess } from 'src/utils/notify';
import { forceRerender } from 'src/utils/buttons-click';
import { showModalSearch } from 'src/utils/buttons-click';

const children = reactive([])
const route = useRoute()
const familyId = route.params.id.toString()

try {
  const response = await apiTokened.get(`families/${familyId}/children`)
  Object.assign(children, response.data.data.children)
  // console.log(response.data.data.children);
} catch (error) {
  console.log("Not Found: family -> children", error.response)
}

const deleteChild = async (id) => {
  const isConfirmed = confirm(`Hapus yang bersangkutan dari daftar anak?`)
  if (!isConfirmed) return
  try {
    const response = await apiTokened.delete(`children/${id}`)
    // console.log(response.data);
    notifySuccess(response.data.message)
    forceRerender()

  } catch (error) {
    // console.log("error hapus anak:", error.response);
    toArray(error.response.data.message).forEach((errorMessage) => {
      notifyError(errorMessage)
    })
  }
}

const addChild = () => {
  showModalSearch({
    familyId: familyId,
    isChild: true
  })
}

const submitUrut = async (id, urut) => {
  try {
    const response = await apiTokened.put(`children/${id}/short`, { urut: urut })
    // console.log(response.data);
    notifySuccess(response.data.message)
    // document.getElementById('btn-force-rerender').click()
    forceRerender()
  } catch (error) {
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
