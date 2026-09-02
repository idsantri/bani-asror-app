<template>
	<q-card v-if="member.id" class="bg-green-3 text-green-10">
		<q-card-section>
			<q-list separator>
				<q-item>
					<q-item-section>
						<q-item-label class="text-green-10" caption
							>Nama:</q-item-label
						>
						<q-item-label>{{ member.nama }}</q-item-label>
					</q-item-section>
					<q-item-section side>
						<q-btn
							class="bg-green-11 text-green-10 q-px-sm"
							outline
							:glossy="!!member.id"
							:to="member.id ? '/members/' + member.id : null"
							icon="person"
							:disable="!member.id"
						>
						</q-btn>
					</q-item-section>
				</q-item>
				<q-item>
					<q-item-section>
						<q-item-label class="text-green-10" caption
							>Orang Tua:</q-item-label
						>
						<q-item-label>
							{{ member.ayah ? member.ayah : '?' }}
							&mdash;
							{{ member.ibu ? member.ibu : '?' }}
						</q-item-label>
					</q-item-section>
					<q-item-section side>
						<q-btn
							class="bg-green-11 text-green-10 q-px-sm"
							outline
							:glossy="!!member.keluarga_id"
							:to="
								member.keluarga_id
									? '/families/' + member.keluarga_id
									: null
							"
							icon="family_restroom"
							:disable="!member.keluarga_id"
						>
						</q-btn>
					</q-item-section>
				</q-item>
			</q-list>
		</q-card-section>
	</q-card>

	<q-card v-else class="bg-green-3 text-green-10">
		<q-form @submit.prevent="introduceMySelf">
			<q-card-section class="q-px-md">
				<h4 class="text-h6 no-margin q-pt-sm">
					Mari Perkenalkan diri Anda!
				</h4>
				<input v-model="userId" type="hidden" />
				<q-input
					v-model="message"
					outlined
					class="q-mt-md"
					type="textarea"
					:label="messageLabel"
					autogrow
					lazy-rules
					:rules="[
						(val) =>
							(val && val.length >= 20) ||
							'Setidaknya 20 karakter!',
					]"
					:placeholder="messagePlaceholder"
				/>
			</q-card-section>
			<q-card-actions class="q-px-md" align="right">
				<q-btn
					type="submit"
					color="green-8"
					label="Kirim"
					id="btn-submit"
				/>
			</q-card-actions>
		</q-form>
	</q-card>
</template>

<script setup>
import constanta from '../../config/constanta';
import { api } from 'src/boot/axios';
import { toArray } from 'src/utils/array';
import { notifyError, notifySuccess } from 'src/utils/notify';
import { reactive, ref } from 'vue';
import { useAuthStore as authState } from '../../stores/auth-store';

const memberId = authState().getUser.member_id;
const userId = authState().getUser.id;
const member = reactive({});
const message = ref('');
const emit = defineEmits(['memberName']);

const messagePlaceholder = `Saya Fulan bin/binti Fulan ... bin ${constanta.ANCESTOR}, atau &#10;Saya Fulan bin/binti Fulan,  istri/suami dari Fulan bin/binti Fulan ... bin ${constanta.ANCESTOR}`;
const messageLabel = `Tulis Jalur Anda ke ${constanta.ANCESTOR}! *`;

try {
	if (memberId) {
		const response = await api.get(`members/${memberId}`);
		Object.assign(member, response.data.data.member);
		emit('memberName', response.data.data.member.nama);
	}
} catch (error) {
	console.log('Not Found: users -> profile', error.response);
}

const introduceMySelf = async () => {
	try {
		const response = await api.post('reports', {
			user_id: userId,
			category: 'introduction',
			message: message.value,
		});
		notifySuccess(response.data.message);
		document.getElementById('btn-submit').setAttribute('disabled', '');
	} catch (error) {
		toArray(error.response.data.message).forEach((errorMessage) => {
			notifyError(errorMessage);
		});
	}
};
</script>
<style scoped></style>
