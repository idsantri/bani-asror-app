<template>
  <div class="q-pa-xs">
    <form @submit.prevent="reset">
      <div class="q-gutter-y-md column">
        <q-input
          bg-color="white"
          outlined
          v-model="token"
          required
          label="Token"
          placeholder="Masukkan token!"
          hint="Token yang Anda dapatkan dari email"
        />
        <q-input
          bg-color="white"
          outlined
          v-model="email"
          type="email"
          required
          label="Email"
          placeholder="Masukkan email!"
        />
        <q-input
          bg-color="white"
          outlined
          v-model="password"
          type="password"
          required
          label="Password"
          placeholder="Masukkan password!"
        />
        <q-input
          bg-color="white"
          outlined
          v-model="password_confirm"
          type="password"
          required
          label="Konfirmasi Password"
          placeholder="Ulangi password!"
        />
        <q-btn
          type="submit"
          class="full-width q-pa-sm"
          color="primary"
          label="Ganti Password"
        />
        <q-separator dark />
        <q-card class="my-card" flat>
          <q-card-section class="text-black text-center no-padding no-margin">
            <p class="q-pa-sm no-margin">
              Kembali ke halaman <router-link to="/login">Login</router-link>
            </p>
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
const token = ref("");
const email = ref("");
const password = ref("");
const password_confirm = ref("");
const emit = defineEmits(["title", "errors"]);
emit("title", "Reset Password");
emit("errors", []);
const reset = async () => {
  emit("errors", []);
  try {
    const response = await api.post("reset-password", {
      token: token.value,
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
