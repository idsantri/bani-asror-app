<template lang="">
	<form @submit.prevent="register">
		<div class="q-gutter-y-md column">
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
			/>
			<q-btn
				type="submit"
				class="full-width q-pa-sm text-green-10"
				color="green-3"
				label="Kirim"
			/>

			<q-card class="my-card" flat>
				<q-card-section
					class="text-green-10 text-center bg-green-2 q-pa-sm text-italic"
				>
					Kami akan mengirimkan OTP (one time password) ke email Anda
				</q-card-section>
			</q-card>
		</div>
		<q-spinner-cube
			v-show="showSpinner"
			color="green-12"
			size="14em"
			class="absolute-center"
		/>
	</form>
</template>
<script setup>
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
</script>
<style lang=""></style>
