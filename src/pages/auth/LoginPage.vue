<template>
  <div class="q-pa-xs">
    <form @submit.prevent="login">
      <div class="q-gutter-y-md column">
        <q-input bg-color="green-1" outlined v-model="username" required label="Login"
          placeholder="Masukkan username atau email Anda!" autocomplete="" />
        <q-input bg-color="green-1" outlined v-model="password" type="password" required label="Password"
          placeholder="Masukkan password!" autocomplete="" />
        <q-btn type="submit" class="full-width q-pa-sm text-green-10" color="green-3" label="Login" />

        <q-card class="my-card" flat>
          <q-card-section class="text-green-10 text-center bg-green-2 q-pa-sm">
            <q-btn outline color="green-10" class="full-width text-weight-regular " no-caps to="/register"
              label="Belum punya akun? Daftar!" />
            <q-btn outline color="green-10" class="full-width text-weight-regular q-mt-sm" no-caps to="/forgot"
              label="Lupa password? Atur ulang!" />
          </q-card-section>
        </q-card>
      </div>
    </form>
    <div class="spinner" id="spinner">
      <q-spinner-cube color="green-2" size="16em" />
    </div>
  </div>
</template>

<script setup>
import { api, apiTokened } from "../../config/api";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { toArray } from "../../utils/array";
import authState from '../../stores/auth-store'

const router = useRouter();
const username = ref("");
const password = ref("");

const emit = defineEmits(["title", "errors"]);
emit("title", "Login");
emit("errors", []);

onMounted(() => document.getElementById('spinner').classList.add('hide'))

const login = async () => {
  document.getElementById('spinner').classList.remove('hide')
  emit("errors", []);
  try {
    const response = await api.post("login", {
      login: username.value,
      password: password.value,
    });
    // console.log(response.data.data);
    authState().token = response.data.data.token
    authState().user = response.data.data.user
    authState().groups = response.data.data.groups

    apiTokened.defaults.headers.common["Authorization"] =
      "Bearer " + authState().getToken

    setTimeout(() => {
      document.getElementById('spinner').classList.add('hide')
      router.push("/members/0");
    }, 2000);

  } catch (error) {
    emit("errors", toArray(error.response.data.message));
    document.getElementById('spinner').classList.add('hide')
  }

};
</script>
<style scoped lang="scss">
.spinner {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hide {
  display: none;
}
</style>
