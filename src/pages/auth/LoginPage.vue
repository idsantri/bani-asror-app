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
import { onBeforeMount, watch } from 'vue';
import LoginOTP from './LoginFormOtp.vue';
import LoginPassword from './LoginFormPassword.vue';

const route = useRoute();
const router = useRouter();
const tabStorageKey = 'login-tab';
const isValidTab = (tab) => tab === 'otp' || tab === 'password';

onBeforeMount(() => {
	const tab = route.query.tab || localStorage.getItem(tabStorageKey) || 'otp';

	if (!route.query.tab) {
		router.replace({
			path: route.path,
			query: { ...route.query, tab },
		});
	}

	if (isValidTab(tab)) {
		localStorage.setItem(tabStorageKey, tab);
	}
});

watch(
	() => route.query.tab,
	(tab) => {
		if (isValidTab(tab)) {
			localStorage.setItem(tabStorageKey, tab);
		}
	},
);
</script>

<style scoped lang="scss"></style>
