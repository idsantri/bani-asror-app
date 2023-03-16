<template>
  <div>

  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
if (confirm("Keluar dari situs ini?") == true) {
  localStorage.setItem("token", "");
  localStorage.setItem("user", "");
  useRouter().push('/login')
  // next("/login");
} else {
  history.go(-1);
}
</script>
