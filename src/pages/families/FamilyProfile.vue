<template>
	<q-card-section class="bg-green-7">
		<!-- SUAMI -->
		<div>
			<FamilyProfileSplit
				:member-id="parseInt(family.suami_id) ?? null"
				:family-id="parseInt(family.id) ?? null"
				member-sex="L"
				key="suami"
			/>
		</div>

		<!-- ISTRI -->
		<div class="q-mt-md">
			<FamilyProfileSplit
				:member-id="parseInt(family.istri_id) ?? null"
				:family-id="parseInt(family.id) ?? null"
				member-sex="P"
				key="istri"
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
						:class="family.id ? 'text-green-11' : null"
						:glossy="family.id ? true : false"
						:disable="family.id ? false : true"
						:outline="!family.id > 0"
					/>
				</q-avatar>
			</template>

			<table>
				<tbody>
					<tr>
						<td class="text-left text-italic" style="width: 56px">
							Alamat
						</td>
						<td>{{ family.alamat ? family.alamat : '-' }}</td>
					</tr>
					<tr>
						<td class="text-left text-italic" style="width: 56px">
							Catatan
						</td>
						<td>
							{{ family.catatan ? family.catatan : '-' }}
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
import { useRoute } from 'vue-router';
import { notifySuccess } from 'src/utils/notify';
import FamilyProfileSplit from './FamilyProfileSplit.vue';
import FamilyInfoHomeModal from './FamilyInfoHomeModal.vue';
import { forceRerender } from 'src/utils/buttons-click';
import familyState from 'src/stores/family-store';
import Family from 'src/models/Family';
import { onMounted, reactive, ref } from 'vue';

const family = reactive({});
const route = useRoute();
const familyId = route.params.id;
const modalInfo = ref(false);

async function getFamilyDetail() {
	const response = await Family.getById({ id: familyId });
	if (response) {
		// console.log(response.data.family);
		Object.assign(family, response.data.family);
		familyState().family = family;
	}
}

onMounted(async () => await getFamilyDetail());

const deleteFamily = async () => {
	const response = await Family.remove({ id: familyId });
	if (response) {
		notifySuccess(response.message);
		history.back();
	}
};
</script>

<style lang="scss" scoped>
.btn-float {
	position: absolute;
	bottom: 10px;
	right: 10px;
}
</style>
