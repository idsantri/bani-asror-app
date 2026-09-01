// src/boot/pinia.js
import { boot } from 'quasar/wrappers';
import pinia from 'src/stores'; // langsung pakai index.js

export default boot(({ app }) => {
	app.use(pinia);
});
