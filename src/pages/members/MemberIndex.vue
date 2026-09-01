<template>
	<q-card class="bg-green-8 text-green-1">
		<q-tabs
			v-model="tab"
			class="text-green-5"
			active-color="green-1"
			indicator-color="green-3"
			align="justify"
			narrow-indicator
		>
			<q-route-tab
				:to="toProfile"
				name="profile"
				label="Profil"
				replace=""
			/>
			<q-route-tab
				:to="toFamilies"
				name="family"
				label="Keluarga"
				replace=""
			/>
			<q-route-tab
				:to="toChildren"
				name="child"
				label="Anak"
				replace=""
			/>
			<q-route-tab
				:to="toSiblings"
				name="sibling"
				label="Saudara"
				replace=""
			/>

			<DropDownTab />
		</q-tabs>

		<q-separator dark />

		<q-tab-panels v-model="tab" animated class="bg-green-6" swipeable>
			<q-tab-panel name="profile" class="no-padding no-margin">
				<Suspense>
					<template #default>
						<member-profile />
					</template>
					<template #fallback>
						<div class="spinner">
							<q-spinner-cube color="green-2" size="8em" />
						</div>
					</template>
				</Suspense>
			</q-tab-panel>

			<q-tab-panel name="family" class="no-padding no-margin">
				<Suspense>
					<template #default>
						<member-families />
					</template>
					<template #fallback>
						<div class="spinner">
							<q-spinner-cube color="green-2" size="8em" />
						</div>
					</template>
				</Suspense>
			</q-tab-panel>

			<q-tab-panel name="child" class="no-padding no-margin">
				<Suspense>
					<template #default>
						<member-children />
					</template>
					<template #fallback>
						<div class="spinner">
							<q-spinner-cube color="green-2" size="8em" />
						</div>
					</template>
				</Suspense>
			</q-tab-panel>
			<q-tab-panel name="sibling" class="no-padding no-margin">
				<Suspense>
					<template #default>
						<member-siblings />
					</template>
					<template #fallback>
						<div class="spinner">
							<q-spinner-cube color="green-2" size="8em" />
						</div>
					</template>
				</Suspense>
			</q-tab-panel>
		</q-tab-panels>
	</q-card>
</template>

<script setup>
import { ref, watch } from 'vue';
import MemberProfile from './MemberProfile.vue';
import MemberFamilies from './MemberFamilies.vue';
import MemberChildren from './MemberChildren.vue';
import MemberSiblings from './MemberSiblings.vue';
import memberState from '../../stores/member-store';
import { useRoute } from 'vue-router';
import DropDownTab from 'src/components/DropDownTab.vue';
import { storeToRefs } from 'pinia';
const state = memberState();
const { member } = storeToRefs(state);

const emit = defineEmits(['pageTitle', 'pageSubTitle', 'showButtonSearch']);
emit('pageTitle', 'Data Anggota');
emit('showButtonSearch', true);

watch(member, () => {
	const pageSubTitle = `${member.value.nama || '?'}`;
	emit('pageSubTitle', pageSubTitle);
});

const tab = ref('profile');
const toProfile = '/members/' + useRoute().params.id.toString() + '/profile';
const toFamilies = '/members/' + useRoute().params.id.toString() + '/families';
const toChildren = '/members/' + useRoute().params.id.toString() + '/children';
const toSiblings = '/members/' + useRoute().params.id.toString() + '/siblings';
</script>
<style scoped>
.spinner {
	text-align: center;
	margin: 30px auto;
}
</style>
