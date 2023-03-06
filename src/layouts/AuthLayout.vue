<template>
  <q-card class="my-card bg-secondary text-white q-pa-lg">
    <q-card-section class="no-padding q-mb-md">
      <h1 class="title">Bani Asror</h1>
      <h2 class="sub-title">{{ title }}</h2>
      <!-- <q-separator dark /> -->
    </q-card-section>
    <!-- <q-card-section v-if="errors.length > 0" class="no-padding q-mb-lg bg-red-2 text-red">
      <ul>
        <li v-for="error in errors" :key="error"><span v-html="error" class="anchorErrorResponse"></span></li>
      </ul>
    </q-card-section> -->

    <q-card-section class="no-padding no-margin">
      <router-view @title="handleTitle" />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'

const title = ref("Autentikasi")
const handleTitle = (value) => {
  title.value = value
}
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
  font-size: 1.5em;
  margin: 0 auto;
  padding: 0;
  text-align: center;
  height: 30px;
  line-height: 30px;
}

.my-card {
  margin: 2em auto;
  margin-top: 10vh;
  width: 100%;
  max-width: 400px
}

.alert {
  background: red;
}
</style>
