<template>
	<q-card-section class="bg-green-7">
		<q-banner class="no-padding bg-green-3 text-dark">
			<q-list v-if="families.length > 0" separator>
				<q-item
					v-for="(family, index) in families"
					:key="index"
					class="q-pa-sm"
				>
					<q-item-section>
						<q-item class="no-padding" dense>
							<q-item-section avatar>
								<div>
									<q-btn
										glossy
										:to="/families/ + family.family_id"
										color="green-10"
										icon="diversity_1"
										style="width: 46px; height: 46px"
										class="q-mr-sm text-green-11"
									/>
									<q-btn
										:to="
											family.pasangan_id
												? '/members/' +
													family.pasangan_id
												: null
										"
										color="green-10"
										icon="info"
										style="width: 46px; height: 46px"
										:class="
											family.pasangan_id
												? 'text-green-11'
												: null
										"
										:disable="
											family.pasangan_id ? false : true
										"
										:outline="
											family.pasangan_id ? false : true
										"
										:glossy="
											family.pasangan_id ? true : false
										"
									/>
								</div>
							</q-item-section>

							<q-item-section>
								<q-item-label
									class="text-h6 no-margin text-weight-regular"
								>
									{{
										family.pasangan_id
											? family.pasangan
											: '?'
									}}
								</q-item-label>
								<q-item-label caption>
									Jumlah anak:
									{{ family.children_count }}
								</q-item-label>
							</q-item-section>
						</q-item>
					</q-item-section>
				</q-item>
			</q-list>

			<q-list v-else>
				<q-item>
					<q-item-section avatar>
						<div>
							<q-btn
								color="green-8"
								icon="diversity_1"
								style="width: 46px; height: 46px"
								class="q-mr-sm"
								outline
								disable
							/>
							<q-btn
								color="green-8"
								icon="info"
								style="width: 46px; height: 46px"
								outline
								disable
							/>
						</div>
					</q-item-section>
					<q-item-section>
						<q-item-label>-</q-item-label>
						<q-item-label caption class="no-margin">
							Jumlah anak: -
						</q-item-label>
					</q-item-section>
				</q-item>
			</q-list>
		</q-banner>
		<q-btn
			class="btn-float text-green-11"
			glossy
			round
			color="green-10"
			icon="add"
			@click="createFamily"
		>
			<q-tooltip class="bg-green-1 text-dark">Tambah pasangan</q-tooltip>
		</q-btn>
	</q-card-section>
</template>

<script setup>
import { apiTokened } from '../../config/api';
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toArray } from '../../utils/array';
import memberState from '../../stores/member-store';
import { notifyError, notifyWarningExpired } from 'src/utils/notify';
import { useQuasar } from 'quasar';

const families = reactive([]);
const router = useRouter();
const route = useRoute();
const memberId = route.params.id.toString();

try {
	const response = await apiTokened.get(`members/${memberId}/families`);
	Object.assign(families, response.data.data.families);
	// console.log(families)
} catch (error) {
	// console.log("Not Found: member -> families", error.response);
	const errMsg = toArray(error.response.data.message);
	const exp = errMsg.some((item) => item.toLowerCase().includes('expired'));
	if (exp) notifyWarningExpired();
	else if (error.response.status == 404) console.log(error.response);
	else errMsg.forEach((message) => notifyError(message));
}

const $q = useQuasar();
const createFamily = async () => {
	const nama = memberState().getMember.nama;
	const pasangan =
		memberState().getMember.lp.toUpperCase() == 'L' ? 'istri' : 'suami';

	$q.dialog({
		title: 'Konfirmasi',
		message: `Tambahkan keluarga baru (${pasangan}) untuk ${nama}?`,
		cancel: true,
		persistent: false,
		html: true,
	}).onOk(async () => {
		try {
			const response = await apiTokened.post('families', {
				member_id: memberId,
			});
			// console.log('new family', response.data)
			const familyId = response.data.data.family.id;
			// console.log(familyId);
			router.push(`/families/${familyId}`);
		} catch (error) {
			// console.log("error create family:", error.response);
			toArray(error.response.data.message).forEach((errorMessage) => {
				notifyError(errorMessage);
			});
		}
	});
};
</script>

<style scoped>
.btn-float {
	position: absolute;
	bottom: 10px;
	right: 10px;
}
</style>
