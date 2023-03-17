<template>
  <q-card class="my-card bg-secondary text-green-1 q-pa-lg bg-green-8 text-green-1">
    <q-card-section class="no-padding q-mb-md">
      <h1 class="title">Bani Asror</h1>
      <h2 class="sub-title">{{ title }}</h2>
    </q-card-section>

    <q-card flat v-if="errors.length > 0" class="q-ma-xs" id="error">
      <q-card-section class="q-pa-xs bg-red-2 text-red">
        <ul class="q-my-xs">
          <li v-for="error in errors" :key="error">
            <span v-html="error" class="anchorErrorResponse" @click="clickAnchor"></span>
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
import { ref } from "vue";
import { api } from "src/boot/axios";
import { toArray } from "src/utils/array";
import { useRouter } from "vue-router";

const router = useRouter();
const title = ref("Autentikasi");
const handleTitle = (value) => (title.value = value);

const errors = ref([]);
const handleErrors = (value) => (errors.value = value);

const clickAnchor = (e) => {
  const anchor = e.target.querySelector("a");
  // console.log(anchor);
  e.preventDefault();
  if (anchor) {
    e.target.addEventListener("click", async (e) => {
      console.log("anchor clicked");
      errors.value = [];
      e.preventDefault();
      const href = anchor.href.replace("%2540", "@");
      try {
        const response = await api.get(href);
        // console.log("res", response);
        alert(response.data.message);
        await router.push("/login");
      } catch (error) {
        errors.value = toArray(error.response.data.message);
      }
    });
  }
};
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
}

.my-card {
  margin: 2em auto;
  margin-top: 10vh;
  width: 100%;
  max-width: 400px;
}

.alert {
  background: red;
}
</style>
