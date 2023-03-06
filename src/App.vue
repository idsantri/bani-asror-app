<template>
  <Suspense>
    <template #default>
      <router-view />
    </template>
    <template #fallback>
      loading...
    </template>
  </Suspense>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>
