import { Dialog } from 'quasar';

// src/boot/register-sw.js
export default () => {
	if (process.env.PROD && 'serviceWorker' in navigator) {
		navigator.serviceWorker.register('/sw.js').then((registration) => {
			registration.addEventListener('updatefound', () => {
				const newWorker = registration.installing;
				if (newWorker) {
					newWorker.addEventListener('statechange', () => {
						if (
							newWorker.state === 'installed' &&
							navigator.serviceWorker.controller
						) {
							showUpdatePrompt();
						}
					});
				}
			});
		});

		navigator.serviceWorker.addEventListener('controllerchange', () => {
			console.log('Service worker baru aktif');
		});
	}

	function showUpdatePrompt() {
		// Contoh sederhana: pakai confirm()

		// Atau gunakan Quasar Notify/Dialog untuk tampilan lebih elegan:
		// import { Dialog } from 'quasar'
		Dialog.create({
			title: 'Update tersedia',
			message: 'Versi baru tersedia. Muat ulang sekarang?',
			cancel: true,
			persistent: true,
		}).onOk(() => {
			window.location.reload();
		});
	}
};
