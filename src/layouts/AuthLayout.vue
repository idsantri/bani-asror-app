<template>
	<div class="absolute-center full-width q-px-md">
		<div style="max-width: 400px; margin: auto">
			<!-- PWA -->
			<q-card
				v-if="!isPwaInstalled && isMobile()"
				class="row q-mb-md bg-green-11 text-green-10"
			>
				<q-item class="">
					<q-item-section>
						<q-item-label>
							Install aplikasi ini ke perangkat Anda untuk
							pengalaman yang lebih baik.
						</q-item-label>
					</q-item-section>
					<q-item-section avatar="">
						<q-btn
							v-if="isAndroid()"
							icon="install_mobile"
							round
							class="text-green-10 bg-green-13"
							glossy
							@click="installPwa"
						/>
						<q-btn
							v-if="isIos()"
							icon="install_mobile"
							round
							class="text-green-10 bg-green-13"
							glossy
							@click="clickIos"
						/>
					</q-item-section>
				</q-item>
			</q-card>
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
			<!-- INSTALL PWA -->
			<q-dialog v-model="modalIos">
				<InfoIos />
			</q-dialog>
		</div>
	</div>
</template>

<script setup>
import config from 'src/config';
import { ref } from 'vue';
import InfoIos from './comp/InfoIos.vue';
import { QCard } from 'quasar';

const title = ref('Autentikasi');
const handleTitle = (value) => (title.value = value);
const modalIos = ref(false);

const errors = ref([]);
const handleErrors = (value) => (errors.value = value);

/**
 * -----------------------------------------
 * PWA
 * -----------------------------------------
 */

const getOS = () => {
	const userAgent = window.navigator.userAgent;
	const osList = [
		{ regex: /windows/i, name: 'Windows' },
		{ regex: /android/i, name: 'Android' },
		{ regex: /(iphone|ipad|ipod)/i, name: 'iOS' },
		{ regex: /linux/i, name: 'Linux' },
		{ regex: /mac/i, name: 'Mac/iOS' },
	];

	return (
		osList.find(({ regex }) => regex.test(userAgent))?.name || 'Unknown OS'
	);
};
const isIos = () => getOS() === 'iOS';
const isAndroid = () => getOS() === 'Android';
const isMobile = () => isIos() || isAndroid();

const deferredPrompt = ref(null);
window.addEventListener('beforeinstallprompt', (e) => {
	e.preventDefault();
	deferredPrompt.value = e;
});

const isPwaInstalled = ref(
	window.matchMedia('(display-mode: standalone)').matches,
);

const installPwa = () => {
	if (deferredPrompt.value) {
		deferredPrompt.value.prompt();
		deferredPrompt.value.userChoice.then((choiceResult) => {
			if (choiceResult.outcome === 'accepted') {
				console.log('User accepted the A2HS prompt');
			} else {
				console.log('User dismissed the A2HS prompt');
			}
		});
		// reset
		deferredPrompt.value = null;
	}
};

const clickIos = () => {
	modalIos.value = true;
};
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
