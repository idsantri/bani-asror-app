<template>
  <suspense>
    <template #default>
      <user-data />
    </template>
    <template #fallback>
      <div class="spinner">
        <q-spinner-cube color="green-2" size="8em" />
      </div>
    </template>
  </suspense>
</template>

<script setup>
import UserData from "./UserData.vue";

const emit = defineEmits(["pageTitle", "pageSubTitle"]);
emit("pageTitle", "Data Pengguna");
emit("pageSubTitle", null);

</script>
<style scoped>
.spinner {
  text-align: center;
  margin: 30px auto;
}
</style>
