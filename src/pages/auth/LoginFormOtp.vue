<template>
	<q-form v-if="!savedEmail" @submit.prevent="requestOtp">
		<q-input
			bg-color="green-1"
			outlined
			v-model="email"
			class="q-my-md"
			type="email"
			required
			label="Email"
			placeholder="Masukkan email!"
			autocapitalize="none"
			autocomplete="off"
			autocorrect="off"
		/>
		<q-btn
			type="submit"
			class="full-width q-pa-sm text-green-10"
			color="green-3"
			label="Kirim"
		/>
		<q-card
			class="q-mt-md text-green-10 text-center bg-green-2 q-pa-sm text-italic"
			flat
		>
			Kami akan mengirimkan OTP (one time password) ke email Anda
		</q-card>
	</q-form>
	<q-form v-else @submit.prevent="verifyOtp">
		<q-input
			bg-color="green-1"
			class="q-my-md"
			outlined
			v-model="otp"
			type="number"
			required
			label="OTP"
			placeholder="Masukkan OTP!"
			autocapitalize="none"
			autocomplete="off"
			autocorrect="off"
		/>
		<q-btn
			type="submit"
			class="full-width q-pa-sm text-green-10"
			color="green-3"
			label="Login"
		/>
		<q-card
			class="q-mt-md text-green-10 text-center bg-green-12 q-pa-sm text-italic"
			flat
		>
			Kami telah mengirimkan OTP ke email Anda ({{ savedEmail }}).
			Silahkan masukkan OTP yang diterima.
		</q-card>
	</q-form>
	<q-spinner-cube
		v-show="showSpinner"
		color="green-12"
		size="14em"
		class="absolute-center"
	/>
</template>
<script setup>
import Auth from 'src/models/Auth';
import { useAuthStore } from 'src/stores/auth-store';
import { notifyConfirm, notifySuccess } from 'src/utils/notify';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const emit = defineEmits(['setTitle', 'raiseError']);
emit('setTitle', 'Login OTP');
emit('raiseError', '');

const router = useRouter();
const showSpinner = ref(false);
const email = ref('');
const savedEmail = ref('');
const otp = ref('');

async function requestOtp() {
	emit('raiseError', '');
	savedEmail.value = '';
	showSpinner.value = true;
	try {
		const response = await Auth.requestOtp(email.value);
		if (response) {
			notifyConfirm(response.message, true, 'Sukses', false);
			savedEmail.value = email.value;
		}
	} catch (error) {
		emit('raiseError', error.response.data.message);
	} finally {
		showSpinner.value = false;
	}
}

async function verifyOtp() {
	emit('raiseError', '');
	showSpinner.value = true;
	try {
		const response = await Auth.verifyOtp(savedEmail.value, otp.value);
		// console.log(response.data);
		useAuthStore().setUser(response.data);

		notifySuccess(response.message);
		savedEmail.value = '';
		const memberId = response.data.user?.member_id;
		// console.log(memberId);
		if (memberId) router.push(`/members/${memberId}`);
		else router.push('/profile');
	} catch (error) {
		emit('raiseError', error.response.data.message);
	} finally {
		showSpinner.value = false;
	}
}
</script>
<style lang=""></style>
