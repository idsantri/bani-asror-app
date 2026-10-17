<template>
	<div class="">
		<LoginPassword
			v-if="route?.query?.tab == 'password'"
			@errors="(e) => $emit('errors', e)"
			@title="(v) => $emit('title', v)"
		/>
		<LoginOTP
			v-else
			@errors="(e) => $emit('errors', e)"
			@title="(v) => $emit('title', v)"
		/>
	</div>
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
