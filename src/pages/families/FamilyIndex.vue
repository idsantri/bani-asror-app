<template>
	<div>
		<banner-app
			page-title="Data Keluarga"
			:page-sub-title="pageSubTitle"
			:show-search-members="true"
			:show-reload="false"
		/>
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
					:to="toChildren"
					name="child"
					label="Anak"
					replace=""
				/>

				<DropDownTab />
			</q-tabs>

			<q-separator dark />

			<q-tab-panels v-model="tab" animated class="bg-green-6" swipeable>
				<q-tab-panel name="profile" class="no-padding no-margin">
					<suspense>
						<template #default>
							<FamilyProfile />
						</template>
						<template #fallback>
							<div class="spinner">
								<q-spinner-cube color="green-2" size="8em" />
							</div>
						</template>
					</suspense>
				</q-tab-panel>

				<q-tab-panel name="child" class="no-padding no-margin">
					<suspense>
						<template #default>
							<FamilyChildren />
						</template>
						<template #fallback>
							<div class="spinner">
								<q-spinner-cube color="green-2" size="8em" />
							</div>
						</template>
					</suspense>
				</q-tab-panel>
			</q-tab-panels>
		</q-card>
	</div>
</template>

<script setup>
import { computed, ref } from 'vue';
import FamilyProfile from './FamilyProfile.vue';
import FamilyChildren from './FamilyChildren.vue';
import { useRoute } from 'vue-router';
import DropDownTab from 'src/components/DropDownTab.vue';
import familyState from '../../stores/family-store';
import { storeToRefs } from 'pinia';
import BannerApp from 'src/components/BannerApp.vue';

const emit = defineEmits(['showButtonSearch']);
emit('showButtonSearch', true);

const state = familyState();
const { family } = storeToRefs(state);

const pageSubTitle = computed(() => {
	return `${family.value.suami || '?'} & ${family.value.istri || '?'}`;
});

const tab = ref('profile');
const toProfile = '/families/' + useRoute().params.id.toString() + '/profile';
const toChildren = '/families/' + useRoute().params.id.toString() + '/children';
</script>
<style scoped>
.spinner {
	text-align: center;
	margin: 30px auto;
}
</style>
