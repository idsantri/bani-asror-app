<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="q-pa-xs">
    <q-card class="my-card q-mb-lg" flat>
      <q-card-section class="no-padding no-margin">
        <p class="q-pa-sm no-margin text-green-10 text-justify bg-green-1">
          Tidak masalah. Masukkan email Anda di bawah ini dan kami akan
          mengirimkan instruksi untuk mengatur ulang kata sandi Anda.
        </p>
      </q-card-section>
    </q-card>
    <form @submit.prevent="reset">
      <div class="q-gutter-y-md column">

        <q-input class="no-margin no-padding" bg-color="green-1" outlined v-model="email" required label="Email"
          placeholder="Masukkan email Anda!" type="email" />
        <q-btn type="submit" class="full-width q-pa-sm text-green-10" color="green-3" label="Kirim instruksi" />

        <q-card class="my-card" flat>
          <q-card-section class="text-green-10 text-center bg-green-2 q-pa-sm">
            <q-btn outline color="green-10" class="full-width text-weight-regular " no-caps to="/login"
              label="Kembali ke halaman login" />
            <q-btn outline color="green-10" class="full-width text-weight-regular q-mt-sm" no-caps to="/reset"
              label="Atur ulang password" />
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
const email = ref("");
const emit = defineEmits(["title", "errors"]);
emit("title", "Lupa Kata Sandi?");
emit("errors", []);

const reset = async () => {
  emit("errors", []);
  try {
    const response = await api.post("forgot", {
      email: email.value,
    });
    alert(response.data.message);
    router.push("/reset");
  } catch (error) {
    emit("errors", toArray(error.response.data.message));
    // toArray(error.response.data.message).forEach(error => {
    //   alert(error)
    // });
  }
};
</script>
