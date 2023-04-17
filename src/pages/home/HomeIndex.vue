<template>
  <div>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus eligendi expedita, veritatis natus illo atque
    at. Eos provident autem quae iste ipsam, porro odit! Commodi ratione quam exercitationem sequi corrupti.
  </div>
</template>
<script setup>
const emit = defineEmits(["pageTitle", "pageSubTitle"]);
emit("pageTitle", "Selamat Datang");
emit("pageSubTitle", null);
</script>
