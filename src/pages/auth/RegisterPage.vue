<template>
	<div class="q-pa-xs">
		<form @submit.prevent="register">
			<div class="q-gutter-y-md column">
				<!-- <q-input
					bg-color="green-1"
					outlined
					v-model="name"
					minlength="5"
					required
					label="Nama"
					placeholder="Masukkan nama Anda!"
					:rules="[(val) => !!val || 'Nama wajib diisi']"
					name="name"
					type="text"
				/> -->
				<q-input
					bg-color="green-1"
					outlined
					v-model="email"
					type="email"
					required
					label="Email"
					placeholder="Masukkan email!"
					autocapitalize="none"
					autocomplete="off"
					autocorrect="off"
					hint="Kami tidak akan membagikan email Anda"
				/>
				<q-input
					bg-color="green-1"
					outlined
					v-model="password"
					:type="isPwd ? 'password' : 'text'"
					:rules="[(val) => !!val || 'Password wajib diisi']"
					required
					label="Password"
					placeholder="Masukkan password!"
					autocapitalize="none"
					autocomplete="off"
					autocorrect="off"
				>
					<template v-slot:append>
						<q-icon
							:name="isPwd ? 'visibility_off' : 'visibility'"
							class="cursor-pointer"
							@click="isPwd = !isPwd"
						/>
					</template>
				</q-input>
				<q-input
					bg-color="green-1"
					round
					outlined
					v-model="password_confirm"
					:type="isPwd ? 'password' : 'text'"
					:rules="[
						(val) => !!val || 'Konfirmasi password wajib diisi',
					]"
					required
					label="Konfirmasi Password"
					placeholder="Ulangi password!"
					autocapitalize="none"
					autocomplete="off"
					autocorrect="off"
				>
					<template v-slot:append>
						<q-icon
							:name="isPwd ? 'visibility_off' : 'visibility'"
							class="cursor-pointer"
							@click="isPwd = !isPwd"
						/>
					</template>
				</q-input>
				<q-btn
					type="submit"
					class="full-width q-pa-sm text-green-10"
					color="green-3"
					label="Daftar"
				/>

				<q-card class="my-card" flat>
					<q-card-section
						class="text-green-10 text-center bg-green-2 q-pa-sm"
					>
						<q-btn
							outline
							color="green-10"
							class="full-width text-weight-regular"
							no-caps
							to="/login"
							label="Sudah punya akun? Login"
						/>
					</q-card-section>
				</q-card>
			</div>
		</form>
		<q-spinner-cube
			v-show="showSpinner"
			color="green-12"
			size="14em"
			class="absolute-center"
		/>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { toArray } from '../../utils/array';
import { notifyAlert } from 'src/utils/notify';
import Auth from 'src/models/Auth';

const router = useRouter();
// const name = ref('');
const email = ref('');
const password = ref('');
const password_confirm = ref('');
const isPwd = ref(true);

const emit = defineEmits(['title', 'errors']);
emit('title', 'Daftar');
emit('errors', []);
const showSpinner = ref(false);

const register = async () => {
	emit('errors', []);

	if (password.value !== password_confirm.value) {
		emit('errors', ['Password dan konfirmasi password tidak sama.']);
		return;
	}
	try {
		showSpinner.value = true;
		const response = await Auth.register({
			// name: name.value,
			email: email.value.toLowerCase(),
			password: password.value,
		});
		const notification = notifyAlert(response.message, 0);
		await notification; // tunggu notifikasi ditutup
		router.push({ name: 'Login' });
	} catch (error) {
		emit('errors', toArray(error.response.message));
	} finally {
		showSpinner.value = false;
	}
};
</script>
