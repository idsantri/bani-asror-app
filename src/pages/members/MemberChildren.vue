<template>
  <q-card-section class="bg-green-7">
    <q-banner class="q-pa-sm bg-green-3 text-dark">
      <q-list v-if="children.length > 0" bordered separator>
        <q-item v-for="(child, index) in children" :key="index" clickable v-ripple :to="/members/ + child.anak_id">
          <q-avatar>
            <q-badge align="middle" color="green-8">{{ parseInt(index) + 1 }}</q-badge>
          </q-avatar>
          <q-item-section>
            <q-item-label> {{ child.anak }}</q-item-label>
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
