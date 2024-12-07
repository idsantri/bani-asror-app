<template>
	<div class="absolute-center full-width q-px-md">
		<div style="max-width: 400px; margin: auto">
			<!-- PWA -->
			<pwa-card />

			<!-- MAIN CARD -->
			<q-card
				class="bg-secondary text-green-1 q-pa-lg bg-green-7 text-green-1"
			>
				<q-card-section class="no-padding q-mb-md">
					<div class="container-title">
						<p class="text-center text-subtitle1 no-margin">
							Aplikasi
						</p>
						<h1 class="title">{{ config.APP_NAME_2 }}</h1>
						<h2
							class="text-center text-overline no-margin"
							style="font-size: medium; font-weight: 300"
						>
							({{ config.ANCESTOR_ALIAS }})
						</h2>
					</div>
					<q-separator dark />
					<h2 class="sub-title text-green-11">{{ title }}</h2>
				</q-card-section>

				<q-card
					flat
					v-if="errors.length > 0"
					class="q-ma-xs"
					id="error"
				>
					<q-card-section class="q-pa-xs bg-red-2 text-red">
						<ul class="q-my-xs">
							<li v-for="(error, index) in errors" :key="index">
								<span v-html="error"></span>
							</li>
						</ul>
					</q-card-section>
				</q-card>

				<q-card-section class="no-padding no-margin">
					<router-view @title="handleTitle" @errors="handleErrors" />
				</q-card-section>
			</q-card>
		</div>
	</div>
</template>

<script setup>
import config from 'src/config';
import { ref } from 'vue';
import PwaCard from 'src/components/PwaCard.vue';
const title = ref('Autentikasi');
const handleTitle = (value) => (title.value = value);

const errors = ref([]);
const handleErrors = (value) => (errors.value = value);
</script>

<style scoped>
.title {
	font-size: 2em;
	margin: 0 auto;
	padding: 0;
	text-align: center;
	height: 40px;
	line-height: 40px;
}

.sub-title {
	font-size: 1.7em;
	margin: 0 auto;
	padding: 0;
	font-weight: 500;
	text-align: center;
	height: 30px;
	line-height: 30px;
	margin-top: 10px;
}

.my-card {
	width: 400px;
	max-width: 95vw;
}

.container-title {
	margin-bottom: 10px;
}
</style>
