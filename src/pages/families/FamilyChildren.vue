<template>
	<q-card-section class="bg-green-7">
		<q-banner class="q-pa-sm bg-green-3 text-dark">
			<q-list v-if="children.length > 0" bordered separator>
				<q-item v-for="(child, index) in children" :key="index">
					<q-item-section side class="q-pr-sm">
						<q-btn
							icon="info"
							glossy
							color="green-10"
							style="width: 34px; height: 34px"
							:to="/members/ + child.member_id"
							class="text-green-11"
						/>
					</q-item-section>
					<q-item-section side class="">
						<q-card
							style="width: 34px; height: 34px"
							class="flex flex-center bg-green-2 glossy"
						>
							<q-badge color="green-8">
								{{ child.urut ? child.urut : '-' }}

								<q-popup-edit
									v-model="child.urut"
									buttons
									v-slot="scope"
									@save="submitUrut(child.id, child.urut)"
									:validate="(val) => val > 0"
								>
									<q-input
										v-model="scope.value"
										dense
										autofocus
										@keyup.enter="scope.set"
										type="number"
										hint="Tetapkan nomor urut!"
										:rules="[
											(val) =>
												scope.validate(val) ||
												'Jangan 0',
										]"
										@update:modelValue="
											child.urut = scope.value
										"
									/>
								</q-popup-edit>
							</q-badge>
						</q-card>
					</q-item-section>

					<q-item-section class="">
						<q-item-label>
							{{ child.nama }}
						</q-item-label>
					</q-item-section>

					<q-item-section avatar>
						<q-btn color="green-2" round size=".8em" glossy="">
							<q-icon
								name="delete"
								color="negative"
								@click="deleteChild(child.id)"
							/>
						</q-btn>
					</q-item-section>
				</q-item>
			</q-list>

			<q-list v-else bordered separator>
				<q-item>
					<q-avatar>
						<q-badge align="middle" color="green-8">0</q-badge>
					</q-avatar>
					<q-item-section>
						<q-item-label>-</q-item-label>
					</q-item-section>
				</q-item>
			</q-list>
		</q-banner>

		<q-btn
			class="btn-float text-green-11"
			round
			color="green-10"
			glossy
			icon="add"
			@click="addChild"
		>
			<q-tooltip class="bg-green-1 text-dark">Tambahkan anak</q-tooltip>
		</q-btn>
	</q-card-section>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { forceRerender } from 'src/utils/buttons-click';
import { showModalSearch } from 'src/utils/buttons-click';
import Child from 'src/models/Child';
import Family from 'src/models/Family';

const children = reactive([]);
const route = useRoute();
const familyId = route.params.id.toString();

function getChildren() {
	Family.getChildren(familyId).then((response) => {
		if (response?.data?.children) {
			Object.assign(children, response.data.children);
		}
	});
}

onMounted(() => getChildren());

const deleteChild = async (id) => {
	const response = await Child.remove(id);
	if (response) {
		forceRerender();
	}
};

const addChild = () => {
	showModalSearch({
		familyId: familyId,
		isChild: true,
	});
};

const submitUrut = async (id, urut) => {
	await Child.updateUrut(id, urut);
	forceRerender();
};
</script>

<style scoped>
.btn-float {
	position: absolute;
	bottom: 10px;
	right: 10px;
}
</style>
