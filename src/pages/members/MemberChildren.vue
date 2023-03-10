<template>
  <q-card-section class="bg-green-7">
    <q-banner class="q-pa-sm bg-green-3 text-dark">

      <div class="q-pa-sm">
        <q-list bordered separator>
          <div v-if="children.length > 0">
            <q-item v-for="(child, index) in children" :key="index" clickable v-ripple>
              <q-avatar>
                <q-badge align="middle" color="green-8">{{ parseInt(index) + 1 }}</q-badge>
              </q-avatar>
              <q-item-section>
                <q-btn :to="/members/ + child.anak_id" flat>
                  {{ child.anak }}
                </q-btn>

              </q-item-section>
            </q-item>

          </div>
        </q-list>
      </div>



      <div>
        <table class="table mb-0">
          <thead>
            <tr>
              <td class="text-center" style="width: 60px;">No</td>
              <td>Anak</td>
            </tr>
          </thead>
          <tbody v-if="children.length == 0">
            <tr>
              <td class="text-center">#</td>
              <td>-</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr v-for="(child, index) in children" :key="index">
              <td class="text-center">{{ parseInt(index) + 1 }}</td>
              <td>
                <router-link :to="/members/ + child.anak_id">{{ child.anak }}</router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </q-banner>
  </q-card-section>
</template>
<script setup>
import { api } from '../../boot/axios';
import { reactive } from 'vue';
import { useRoute } from 'vue-router';

const children = reactive([])
const route = useRoute()
const memberId = route.params.id.toString()
try {
  const response = await api.get(`members/${memberId}/children`)
  Object.assign(children, response.data.data.children)
} catch (error) {
  console.log("Not Found: member -> children", error.response)
}

</script>
