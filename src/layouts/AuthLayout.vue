<template>
  <q-card class="my-card bg-secondary text-green-1 q-pa-lg bg-green-8 text-green-1">
    <q-card-section class="no-padding q-mb-md">
      <div class="container-title">
        <h1 class="title">Aplikasi</h1>
        <h1 class="title">{{ constanta.APP_NAME_2 }}</h1>
      </div>
      <q-separator dark />
      <h2 class="sub-title">{{ title }}</h2>
    </q-card-section>

    <q-card flat v-if="errors.length > 0" class="q-ma-xs" id="error">
      <q-card-section class="q-pa-xs bg-red-2 text-red">
        <ul class="q-my-xs">
          <li v-for="(error, index) in errors" :key="index">
            <span v-html="error"></span>
          </li>
        </ul>
      </q-card-section>
    </q-card>

    <q-card-section class="no-padding no-margin">
      <router-view @title="handleTitle" @errors="handleErrors" />
    </q-card-section>

  </q-card>
</template>

<script setup>
import constanta from "src/config/constanta";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const title = ref("Autentikasi");
const handleTitle = (value) => (title.value = value);

const errors = ref([]);
const handleErrors = (value) => (errors.value = value);
</script>

<style scoped>
.title {
  font-size: 2em;
  margin: 0 auto;
  padding: 0;
  text-align: center;
  height: 40px;
  line-height: 40px;
}

.sub-title {
  font-size: 1.7em;
  margin: 0 auto;
  padding: 0;
  font-weight: 500;
  text-align: center;
  height: 30px;
  line-height: 30px;
  margin-top: 10px;
}

.my-card {
  margin: 2em auto;
  margin-top: 10vh;
  width: 100%;
  max-width: 400px;
}

.container-title {
  margin-bottom: 10px;
}
</style>
