<template>
	<div></div>
</template>
<script setup>
import { useQuasar } from 'quasar';
import { useAuthStore } from '../../stores/auth-store';

(() => {
	useQuasar()
		.dialog({
			title: 'Konfirmasi',
			message: 'Keluar dari Aplikasi?',
			cancel: true,
			persistent: true,
		})
		.onOk(() => {
			useAuthStore().$reset();
			window.location.href = '/login';
		})
		.onOk(() => {
			// useRouter().push('/login')
			// console.log('Keluar dari dari Aplikasi..')
		})
		.onCancel(() => {
			history.go(-1);
		})
		.onDismiss(() => {
			// console.log('I am triggered on both OK and Cancel')
		});
})();
</script>
