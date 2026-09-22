<template lang="">
	<q-banner
		v-if="pageTitle"
		class="bg-green-9 text-green-11 q-mb-sm"
		inline-actions
	>
		<h2 class="text-h6 no-margin text-weight-light">
			{{ pageTitle }}
		</h2>
		<p class="no-margin text-weight-light" v-if="pageSubTitle">
			{{ pageSubTitle }}
		</p>
		<!-- TOMBOL CARI -->
		<template v-slot:action>
			<q-btn
				v-show="showSearchMembers"
				flat
				color="green-1"
				icon="search"
				to="/members/search"
			/>
			<q-btn
				v-show="showReload"
				flat
				color="green-1"
				icon="sync"
				@click="$emit('on-reload')"
			/>
			<slot name="action"></slot>
		</template>
	</q-banner>
</template>
<script setup>
defineProps({
	pageTitle: {
		type: String,
		default: null,
	},
	pageSubTitle: {
		type: String,
		default: null,
	},
	showSearchMembers: {
		type: Boolean,
		default: true,
	},
	showReload: {
		type: Boolean,
		default: true,
	},
});
</script>
<style lang=""></style>
