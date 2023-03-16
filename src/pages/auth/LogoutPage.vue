<template>
  <div>

  </div>
</template>
<script setup>
import { useQuasar } from 'quasar'
(() => {
  useQuasar()
    .dialog({
      title: 'Konfirmasi',
      message: 'Keluar dari Aplikasi?',
      cancel: true,
      persistent: true
    }).onOk(() => {
      // console.log('Keluar dari dari Aplikasi.')
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }).onOk(() => {
      // useRouter().push('/login')
      // console.log('Keluar dari dari Aplikasi..')
    }).onCancel(() => {
      history.go(-1);
    }).onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    })
})()

// if (confirm("Keluar dari situs ini?") == true) {
//   localStorage.setItem("token", "");
//   localStorage.setItem("user", "");
//   useRouter().push('/login')
//   // next("/login");
// } else {
//   history.go(-1);
// }
</script>
