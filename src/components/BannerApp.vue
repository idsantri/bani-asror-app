<template>
	<q-banner
		v-if="pageTitle"
		:class="bgColor + ' text-green-11 q-mb-sm'"
		inline-actions
	>
		<div class="flex items-center q-gutter-x-md">
			<q-icon v-if="iconName" :name="iconName" size="md" />
			<img
				v-else
				src="/idsantri.svg"
				alt="idsantri"
				style="height: 30px"
			/>
			<div>
				<h2 class="text-h6 no-margin text-weight-light">
					{{ pageTitle }}
				</h2>
				<p class="no-margin text-weight-light" v-if="pageSubTitle">
					{{ pageSubTitle }}
				</p>
			</div>
		</div>
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
	iconName: {
		type: String,
		default: null,
	},
	bgColor: {
		type: String,
		default: 'bg-green-9',
	},
});
</script>
<style lang=""></style>
