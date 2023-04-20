<template>
  <suspense>
    <template #default>
      <router-view />
    </template>
    <template #fallback>
      <div class="spinner">
        <q-spinner-cube color="green-8" size="8em" />
      </div>
    </template>
  </suspense>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style lang="scss" scoped>
.spinner {
  text-align: center;
  margin: 30px auto;
}
</style>
