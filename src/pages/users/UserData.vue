<template>
  <q-table title="" :rows="users" :filter="filter" class="bg-green-1 text-green-10">
    <template v-slot:top-right>
      <q-input borderless dense debounce="300" v-model="filter" placeholder="Cari...">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
  </q-table>
</template>

<script setup>
import { apiTokened } from "../../config/api";
import { reactive, ref } from 'vue';

const users = reactive([])
const filter = ref('')
try {
  const response = await apiTokened.get(`users`)
  Object.assign(users, response.data.data.users)
} catch (error) {
  console.log("Not Found: users -> users", error.response)
}


</script>

