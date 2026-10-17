<template>
	<LoginPassword
		v-if="route?.query?.tab == 'password'"
		@raise-error="(e) => $emit('raiseError', e)"
		@set-title="(v) => $emit('setTitle', v)"
	/>
	<LoginOTP
		v-else
		@raise-error="(e) => $emit('raiseError', e)"
		@set-title="(v) => $emit('setTitle', v)"
	/>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { onBeforeMount } from 'vue';
import LoginOTP from './LoginFormOtp.vue';
import LoginPassword from './LoginFormPassword.vue';

const route = useRoute();
const router = useRouter();
onBeforeMount(() => {
	if (!route.query.tab) {
		router.replace({
			path: route.path,
			query: { ...route.query, tab: 'otp' },
		});
	}
});
</script>

<style scoped lang="scss"></style>
