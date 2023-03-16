<template>
  <div class="q-pa-xs">
    <form @submit.prevent="register">
      <div class="q-gutter-y-md column">
        <q-input bg-color="green-1" filled outlined v-model="username" minlength="5" required label="Username"
          placeholder="Masukkan username!" />
        <q-input bg-color="green-1" filled outlined v-model="email" type="email" required label="Email"
          placeholder="Masukkan email!" hint="Kami tidak akan membagikan email Anda" />
        <q-input bg-color="green-1" filled outlined v-model="password" type="password" required label="Password"
          placeholder="Masukkan password!" />
        <q-input bg-color="green-1" filled outlined v-model="password_confirm" type="password" required
          label="Konfirmasi Password" placeholder="Ulangi password!" />
        <q-btn type="submit" class="full-width q-pa-sm text-green-10" color="green-3" label="Daftar" />


        <q-card class="my-card" flat>
          <q-card-section class="text-green-10 text-center bg-green-2 q-pa-sm">
            <q-btn outline color="green-10" class="full-width text-weight-regular " no-caps to="/login"
              label="Sudah punya akun? Login" />
          </q-card-section>
        </q-card>
      </div>
    </form>
  </div>
</template>

<script setup>
import { api } from "src/boot/axios";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { toArray } from "../../utils/array";
const router = useRouter();
const username = ref("");
const email = ref("");
const password = ref("");
const password_confirm = ref("");
const emit = defineEmits(["title", "errors"]);
emit("title", "Daftar");
emit("errors", []);

const register = async () => {
  emit("errors", []);
  try {
    const response = await api.post("register", {
      username: username.value,
      email: email.value,
      password: password.value,
      password_confirm: password_confirm.value,
    });
    alert(response.data.message);
    router.push({ name: "Login" });
  } catch (error) {
    emit("errors", toArray(error.response.data.message));
    // toArray(error.response.data.message).forEach(error => {
    //   alert(error)
    // });
  }
};
</script>
