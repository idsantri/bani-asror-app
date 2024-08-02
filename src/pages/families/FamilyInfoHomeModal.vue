<template>
	<q-card style="width: 600px; max-width: 90vw">
		<q-form @submit.prevent="onSubmit" accept-charset="utf-8">
			<q-card-section class="bg-green-8 text-green-1">
				<h6 class="text-h6 no-margin text-weight-light">
					Info Data Keluarga
				</h6>
			</q-card-section>

			<q-card-section class="q-pa-sm bg-green-1">
				<q-input
					outlined
					class=""
					v-model="input.alamat"
					label="Alamat"
					placeholder="Alamat tinggal pasangan/keluarga (singkat)"
				/>
				<q-input
					outlined
					class="q-mt-md"
					v-model="input.catatan"
					type="textarea"
					label="Catatan"
					placeholder="Catatan mengenai pasangan/keluarga"
					autogrow
				/>
			</q-card-section>
			<q-card-actions class="bg-green-7">
				<q-space />
				<q-btn
					label="Simpan"
					color="green-9"
					class="text-weight-light"
					type="submit"
				/>
				<q-btn
					label="Gagal"
					color="secondary"
					class="text-weight-light"
					v-close-popup
					id="btn-close-modal"
				/>
			</q-card-actions>
		</q-form>
		<q-inner-loading :showing="loading">
			<q-spinner-gears size="50px" color="green" />
		</q-inner-loading>
	</q-card>
</template>
<script setup>
import apiUpdate from 'src/api/api-update';
import { onMounted, ref } from 'vue';

const props = defineProps({ data: { type: Object } });
const emit = defineEmits(['onSubmit']);
const input = ref({});
const loading = ref(false);

async function onSubmit() {
	const data = { alamat: input.value.alamat, catatan: input.value.catatan };

	const upd = await apiUpdate({
		endPoint: `families/${input.value.id}`,
		data,
		loading,
	});
	if (upd) {
		emit('onSubmit');
		document.getElementById('btn-close-modal').click();
	}
}

onMounted(() => {
	Object.assign(input.value, props.data);
});
</script>

<style scoped></style>
