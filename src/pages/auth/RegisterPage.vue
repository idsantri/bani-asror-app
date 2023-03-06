<template>
  <div class="q-pa-xs">
    <form @submit.prevent="register">
      <div class="q-gutter-y-md column">
        <q-input bg-color="white" outlined v-model="username" minlength="5" required label="Username"
          placeholder="Masukkan username!" />
        <q-input bg-color="white" outlined v-model="email" type="email" required label="Email"
          placeholder="Masukkan email!" hint="Kami tidak akan membagikan email Anda" />
        <q-input bg-color="white" outlined v-model="password" type="password" required label="Password"
          placeholder="Masukkan password!" />
        <q-input bg-color="white" outlined v-model="password_confirm" type="password" required label="Konfirmasi Password"
          placeholder="Ulangi password!" />
        <q-btn type="submit" class="full-width q-pa-sm" color="primary" label="Daftar" />
        <q-separator dark />
        <q-card class="my-card" flat>
          <q-card-section class="text-black text-center no-padding no-margin">
            <p class="q-pa-sm no-margin">Sudah punya akun? <router-link to="/login">Login</router-link></p>
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
import { toArray } from '../../utils/array';
const router = useRouter()
const username = ref('')
const email = ref('');
const password = ref('');
const password_confirm = ref('')
const emit = defineEmits(['title'])
emit('title', "Daftar")

const register = async () => {
  try {
    const response = await api.post('register', {
      username: username.value,
      email: email.value,
      password: password.value,
      password_confirm: password_confirm.value
    })
    alert(response.data.message)
    router.push({ name: 'Login' })
  } catch (error) {
    toArray(error.response.data.message).forEach(error => {
      alert(error)
    });
  }
}
</script>
