<template>
  <suspense>
    <template #default>
      <UserData />
    </template>
    <template #fallback>
      <div class="spinner">
        <q-spinner-cube color="green-4" size="8em" />
      </div>
    </template>
  </suspense>
</template>

<script setup>
import UserData from "./UserData.vue";

const emit = defineEmits(["pageTitle", "pageSubTitle", "showButtonSearch"]);
emit("pageTitle", "Data Pengguna");
emit("pageSubTitle", null);
emit("showButtonSearch", true);

</script>
<style scoped>
.spinner {
  text-align: center;
  margin: 30px auto;
}
</style>
