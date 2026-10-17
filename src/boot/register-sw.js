import { Dialog } from 'quasar';
import v from '../../package.json';
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
			title: 'Update',
			message: `Versi baru tersedia. Muat ulang sekarang untuk memperbarui? <br/><small>v${v.version}</small>`,
			cancel: true,
			persistent: true,
			html: true,
		}).onOk(() => {
			window.location.reload();
		});
	}
};
