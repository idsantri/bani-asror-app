<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="q-pa-xs">
    <q-card class="my-card q-mb-lg" flat>
      <q-card-section class="no-padding no-margin">
        <p class="q-pa-sm no-margin text-green text-justify">
          Tidak masalah. Masukkan email Anda di bawah ini dan kami akan mengirimkan
          instruksi untuk mengatur ulang kata sandi Anda.
        </p>
      </q-card-section>
    </q-card>
    <form @submit.prevent="reset">
      <div class="q-gutter-y-md column">
        <q-input class="no-margin no-padding" bg-color="white" outlined v-model="email" required label="Email"
          placeholder="Masukkan email Anda!" />
        <q-btn type="submit" class="full-width q-pa-sm" color="primary" label="Kirim instruksi" />
        <q-separator dark />
        <q-card class="my-card" flat>
          <q-card-section class="text-black text-center no-padding no-margin">
            <p class="q-pa-sm no-margin">Kembali ke halaman <router-link to="/login">Login</router-link></p>
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
const email = ref('')
const emit = defineEmits(['title', 'errors'])
emit('title', "Lupa Kata Sandi?")
emit('errors', [])

const reset = async () => {
  emit('errors', [])
  try {
    const response = await api.post('forgot', {
      email: email.value,
    })
    alert(response.data.message)
    router.push('/reset')
  } catch (error) {
    emit('errors', toArray(error.response.data.message))
    // toArray(error.response.data.message).forEach(error => {
    //   alert(error)
    // });
  }
}

</script>
