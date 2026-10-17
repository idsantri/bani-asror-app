<template>
	<form @submit.prevent="login">
		<q-btn
			v-if="showBtnVerify"
			@click="resendEmail"
			class="q-btn full-width q-pa-sm q-mb-md bg-primary no-caps"
			>Kirim ulang email verifikasi</q-btn
		>
		<div class="q-gutter-y-md column">
			<q-input
				bg-color="green-1"
				outlined
				v-model="username"
				required
				label="Login"
				placeholder="Masukkan username atau email Anda!"
				autocomplete=""
				autocapitalize="none"
				autocorrect="off"
				:rules="[(val) => !!val || 'Username wajib diisi']"
				name="username"
				type="text"
			/>
			<q-input
				bg-color="green-1"
				outlined
				v-model="password"
				:type="isPwd ? 'password' : 'text'"
				required
				label="Password"
				name="password"
				placeholder="Masukkan password!"
				autocomplete="off"
				autocapitalize="off"
				:rules="[(val) => !!val || 'Password wajib diisi']"
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
				label="Login"
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
						to="/register"
						label="Belum punya akun? Daftar!"
					/>
					<q-btn
						outline
						color="green-10"
						class="full-width text-weight-regular q-mt-sm"
						no-caps
						to="/forgot"
						label="Lupa password? Atur ulang!"
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
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useAuthStore } from '../../stores/auth-store';
import { notifySuccess } from 'src/utils/notify';
import Auth from 'src/models/Auth';

const router = useRouter();
const username = ref('');
const password = ref('');
const showSpinner = ref(false);
const isPwd = ref(true);
const showBtnVerify = ref(false);
const emit = defineEmits(['setTitle', 'raiseError']);
emit('setTitle', 'Login Password');
emit('raiseError', '');

const login = async () => {
	emit('raiseError', '');
	try {
		showSpinner.value = true;
		const response = await Auth.login({
			login: username.value,
			password: password.value,
		});
		useAuthStore().setUser(response.data);

		notifySuccess(response.message);

		const memberId = response.data.user?.member_id;
		if (memberId) router.push(`/members/${memberId}`);
		else router.push('/profile');
	} catch (error) {
		const res = error.response.data;
		if (res?.data?.code == 'EMAIL_NOT_VERIFIED') {
			// alert("Email belum diverifikasi. Silakan verifikasi email Anda.");
			showBtnVerify.value = true;
		}

		emit('raiseError', res.message);
	} finally {
		showSpinner.value = false;
	}
};

const resendEmail = async () => {
	try {
		emit('raiseError', '');
		showSpinner.value = true;
		const response = await Auth.resendEmail({
			login: username.value,
		});

		notifySuccess(response.message);

		showBtnVerify.value = false;
	} catch (error) {
		const res = error.response.data;
		emit('raiseError', res.message);
	} finally {
		showSpinner.value = false;
	}
};
</script>

<style scoped lang="scss"></style>
