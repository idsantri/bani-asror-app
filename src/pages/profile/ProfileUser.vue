<template>
  <q-card class="text-green-10 bg-green-2">
    <q-card-section>
      <q-list separator>
        <q-item>
          <q-item-section>
            <q-item-label class="text-green-10" caption>Email</q-item-label>
            <q-item-label>{{ user.email }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label class="text-green-10" caption>Username</q-item-label>
            <q-item-label>{{ user.username }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label class="text-green-10" caption>Telepon/WA</q-item-label>
            <q-item-label>{{ user.phone ? user.phone : '-' }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { reactive } from 'vue';
import authState from '../../stores/auth-store'
import { apiTokened } from 'src/config/api';

const emit = defineEmits(["username"]);
const user = reactive({})
const userId = authState().getUser.id

try {
  const response = await apiTokened.get(`users/${userId}`)
  Object.assign(user, response.data.data.user)
  emit("username", response.data.data.user.username);
} catch (error) {
  console.log("Not Found: users -> profile", error.response)
}

</script>
