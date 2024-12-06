<template lang="">
	<q-card v-if="!isPwaInstalled && isMobile()" class="q-mb-md bg-green-11">
		<q-card-section class="q-py-sm q-px-md">
			<q-list class="">
				<q-item class="no-padding">
					<q-item-section>
						<p
							class="no-margin text-green-10"
							style="font-size: 1.1em"
						>
							Instal aplikasi untuk mendapatkan pengalaman lebih
							baik!
						</p>
					</q-item-section>
					<q-item-section avatar>
						<q-btn
							v-if="isAndroid()"
							color="green-10"
							class="text-green-11 text-weight-regular q-px-sm"
							label="Instal"
							no-caps=""
							@click="installPwa"
						>
							<q-icon name="install_mobile" />
						</q-btn>
						<q-btn
							v-if="isIos()"
							:icon="
								iosInfo
									? 'keyboard_arrow_up'
									: 'keyboard_arrow_down'
							"
							color="green-10"
							class="text-green-11"
							@click="iosInfo = !iosInfo"
						/>
					</q-item-section>
				</q-item>
				<q-item v-if="iosInfo" class="no-padding">
					<q-item-section>
						<q-item-label>
							<q-separator class="q-my-sm" />
							<p class="no-margin text-body1">
								Bagi Pengguna iOS!
							</p>
							<ol class="no-margin q-pl-md">
								<li>
									Pastikan Anda menggunakan browser
									<span class="text-weight-bold">Safari</span
									>;
								</li>
								<li>
									Ketuk ikon bagikan (sebuah kotak dengan
									panah ke atas di bagian bawah layar);
								</li>
								<li>
									Gulir ke bawah dalam menu bagikan dan pilih
									opsi &ldquo;Tambahkan ke Layar Utama&rdquo;;
								</li>
								<li>
									Anda mungkin akan diminta untuk memberikan
									nama dan mengonfigurasi ikon;
								</li>
								<li>
									Ketuk &ldquo;Tambahkan&rdquo; di pojok kanan
									atas layar untuk menyelesaikan proses;
								</li>
							</ol>
						</q-item-label>
					</q-item-section>
				</q-item>
			</q-list>
		</q-card-section>
	</q-card>
</template>
<script setup>
import { onMounted, ref } from 'vue';

const iosInfo = ref(false);

const deferredPrompt = ref(null);
window.addEventListener('beforeinstallprompt', (e) => {
	e.preventDefault();
	deferredPrompt.value = e;
});

const isPwaInstalled = ref(
	window.matchMedia('(display-mode: standalone)').matches,
);

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
onMounted(() => {
	// console.log('🚀 ~ getOS ~ getOS:', getOS());
	// console.log('🚀 ~ isIos:', isIos());
	// console.log('🚀 ~ isAndroid:', isAndroid());
	// console.log('🚀 ~ isMobile:', isMobile());
});
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
</script>
<style lang=""></style>
