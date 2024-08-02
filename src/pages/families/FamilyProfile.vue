<template>
	<q-card-section class="bg-green-7">
		<!-- SUAMI -->
		<div>
			<FamilyProfileSplit
				:member-id="parseInt(suami_id)"
				:family-id="parseInt(id)"
				member-sex="L"
			/>
		</div>

		<!-- ISTRI -->
		<div class="q-mt-md">
			<FamilyProfileSplit
				:member-id="parseInt(istri_id)"
				:family-id="parseInt(id)"
				member-sex="P"
			/>
		</div>

		<!-- alamat -->
		<q-banner class="q-pa-sm bg-green-4 text-dark q-mt-md">
			<template #avatar>
				<q-avatar rounded>
					<q-btn
						icon="fmd_bad"
						color="green-10"
						style="width: 46px; height: 46px"
						@click="modalInfo = true"
						:class="id ? 'text-green-11' : null"
						:glossy="id ? true : false"
						:disable="id ? false : true"
						:outline="!id > 0"
					/>
				</q-avatar>
			</template>

			<table>
				<tbody>
					<tr>
						<td class="text-left text-italic" style="width: 56px">
							Alamat
						</td>
						<td>{{ alamat ? alamat : '-' }}</td>
					</tr>
					<tr>
						<td class="text-left text-italic" style="width: 56px">
							Catatan
						</td>
						<td>
							{{ catatan ? catatan : '-' }}
						</td>
					</tr>
				</tbody>
			</table>
		</q-banner>

		<q-btn
			class="glossy btn-float text-green-11"
			round
			color="negative"
			icon="delete"
			@click="deleteFamily"
		>
			<q-tooltip class="bg-green-1 text-dark">
				Hapus keluarga ini
			</q-tooltip>
		</q-btn>
	</q-card-section>

	<q-dialog v-model="modalInfo" persistent>
		<FamilyInfoHomeModal :data="family" @on-submit="forceRerender" />
	</q-dialog>
</template>

<script setup>
import { toArray } from '../../utils/array';
import { apiTokened } from '../../config/api';
import { toRefs, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useQuasar } from 'quasar';
import {
	notifySuccess,
	notifyError,
	notifyWarningExpired,
} from 'src/utils/notify';
import FamilyProfileSplit from './FamilyProfileSplit.vue';
import FamilyInfoHomeModal from './FamilyInfoHomeModal.vue';
import { forceRerender } from 'src/utils/buttons-click';

const family = reactive({});
const route = useRoute();
const familyId = route.params.id;
const modalInfo = ref(false);

try {
	const response = await apiTokened.get(`families/${familyId}`);
	Object.assign(family, response.data.data.family);
} catch (error) {
	// console.log("Not Found: family -> detail", error.response);
	const errMsg = toArray(error.response.data.message);
	const exp = errMsg.some((item) => item.toLowerCase().includes('expired'));
	if (exp) notifyWarningExpired();
	else if (error.response.status == 404) console.log(error.response);
	else errMsg.forEach((message) => notifyError(message));
}
const { suami_id, istri_id, id, alamat, catatan } = toRefs(family);

const $q = useQuasar();
const deleteFamily = async () => {
	$q.dialog({
		title: 'Konfirmasi',
		message: `Hapus Keluaga? <br/>
    <strong>Aksi ini tidak dapat dibatalkan.</strong>`,
		cancel: true,
		persistent: false,
		html: true,
	}).onOk(async () => {
		try {
			const response = await apiTokened.delete(`families/${familyId}`);
			// console.log('hapus family', response.data);
			notifySuccess(response.data.message);
			history.back();
		} catch (error) {
			// console.log("error create family:", error.response);
			toArray(error.response.data.message).forEach((errorMessage) => {
				notifyError(errorMessage);
			});
		}
	});
};
</script>

<style lang="scss" scoped>
.btn-float {
	position: absolute;
	bottom: 10px;
	right: 10px;
}
</style>
