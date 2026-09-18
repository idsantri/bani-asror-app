<template>
	<q-banner class="q-pa-sm bg-green-2 text-dark">
		<q-list>
			<q-item class="no-padding">
				<q-item-section avatar>
					<q-btn
						:icon="memberSex == 'L' ? 'man' : 'woman'"
						color="green-10"
						style="width: 46px; height: 46px"
						:to="member.id ? '/members/' + member.id : null"
						:disable="!member.id ? true : false"
						:glossy="member.id ? true : false"
						:outline="!member.id ? true : false"
						:class="member.id ? 'text-green-11' : null"
					/>
				</q-item-section>
				<q-item-section>
					<q-item-label>
						<div class="text-caption text-italic">
							{{ memberSex == 'L' ? 'Suami' : 'Istri' }}
						</div>
						<div class="text-h6 text-weight-regular">
							{{ member.nama ? member.nama : '?' }}
						</div>
					</q-item-label>
				</q-item-section>

				<q-item-section avatar>
					<q-fab
						v-model="fab"
						icon="keyboard_arrow_left"
						direction="left"
						padding="sm"
						color="green-9"
						glossy
					>
						<q-fab-action
							padding="5px"
							external-label
							label-position="bottom"
							color="orange"
							icon="edit"
							label="Edit"
							@click="editPasangan"
						/>
						<q-fab-action
							v-if="member.id"
							padding="5px"
							external-label
							label-position="bottom"
							color="negative"
							icon="delete"
							label="Hapus"
							@click="deletePasangan"
						/>
					</q-fab>
				</q-item-section>
			</q-item>
		</q-list>
	</q-banner>

	<!-- ORTU  -->
	<q-banner class="q-pa-sm bg-green-3 text-dark">
		<ParentComponent :parent="member" />
	</q-banner>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';
import ParentComponent from 'src/components/ParentComponent.vue';
import { notifySuccess } from '../../utils/notify';
import { showModalSearch, forceRerender } from 'src/utils/buttons-click';
import Family from 'src/models/Family';
import Member from 'src/models/Member';

const fab = ref(false);
const member = reactive({});
const props = defineProps({
	memberId: { type: Number, default: null },
	familyId: { type: Number, default: null },
	memberSex: { type: String, default: '' },
});

watch(
	() => props.memberId,
	async (id) => {
		if (isNaN(id)) {
			// reset tampilan / kosongkan state
			return;
		}
		await getMember(id);
	},
	{ immediate: true },
);

async function getMember(id) {
	const response = await Member.getById({ id });
	if (response?.data?.member) {
		Object.assign(member, response.data.member);
	}
}

const editPasangan = () => {
	const args = { familyId: props.familyId };
	if (props.memberSex.toUpperCase() == 'L') args.isHusband = true;
	if (props.memberSex.toUpperCase() == 'P') args.isWife = true;
	showModalSearch(args);
};

const deletePasangan = async () => {
	let spouse;
	if (member.lp.toLowerCase() == 'l') {
		spouse = 'husband';
	}

	if (member.lp.toLowerCase() == 'p') {
		spouse = 'wife';
	}

	const response = await Family.removeSpouse(props.familyId, spouse);
	if (response) {
		notifySuccess(response.message);
		forceRerender();
	}
};
</script>

<style scoped></style>
