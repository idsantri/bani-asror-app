<template>
  <div class="q-pa-xs">
    <form @submit.prevent="login">
      <div class="q-gutter-y-md column">
        <q-input bg-color="white" outlined v-model="username" required label="Login"
          placeholder="Masukkan username atau email Anda!" />
        <q-input bg-color="white" outlined v-model="password" type="password" required label="Password"
          placeholder="Masukkan password!" />
        <q-btn type="submit" class="full-width q-pa-sm" color="primary" label="Login" />
        <q-separator dark />
        <q-card class="my-card" flat>
          <q-card-section class="text-black text-center no-padding no-margin">
            <p class="q-pa-sm no-margin">Belum punya akun? <router-link to="/register">Daftar</router-link></p>
            <p class="q-pa-sm no-margin">Lupa password? <router-link to="/forgot">Atur ulang</router-link></p>
          </q-card-section>
        </q-card>
      </div>
    </form>
  </div>
</template>

<script setup>
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { toArray } from '../../utils/array'
const router = useRouter()
const username = ref('')
const password = ref('');

const emit = defineEmits(['title', 'errors'])
emit('title', "Login")
emit('errors', [])

const login = async () => {
  emit('errors', [])
  try {
    const response = await api.post('login', {
      login: username.value,
      password: password.value,
    })
    localStorage.setItem('token', response.data.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.data.user));
    localStorage.setItem('userGroup', JSON.stringify(response.data.data.group));
    router.push('/members/0')
  } catch (error) {
    emit('errors', toArray(error.response.data.message))
  }
}
</script>
