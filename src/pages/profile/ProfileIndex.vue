<template>
	<div>
		<banner-app
			page-title="Profil Saya"
			:show-search-members="false"
			:show-reload="false"
		/>
		<q-card class="text-green-1">
			<q-card-section class="bg-green-8">
				<div class="text-h6">Selamat Datang</div>
				<div class="text-subtitle1">
					{{ username }} | {{ memberName }}
				</div>
			</q-card-section>

			<q-card-section class="bg-green-7">
				<suspense>
					<template #default>
						<ProfileUser @username="handleUsername" />
					</template>
					<template #fallback>
						<div class="spinner">
							<q-spinner-cube color="green-2" size="8em" />
						</div>
					</template>
				</suspense>
			</q-card-section>

			<q-card-section class="bg-green-6">
				<suspense>
					<template #default>
						<ProfileMember @member-name="handleMemberName" />
					</template>
					<template #fallback>
						<div class="spinner">
							<q-spinner-cube color="green-2" size="8em" />
						</div>
					</template>
				</suspense>
			</q-card-section>
		</q-card>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import ProfileUser from './ProfileUser.vue';
import ProfileMember from './ProfileMember.vue';
import BannerApp from 'src/components/BannerApp.vue';

const emit = defineEmits(['showButtonSearch']);
emit('showButtonSearch', false);

const username = ref('?');
const memberName = ref('?');
const handleUsername = (value) => (username.value = value);
const handleMemberName = (value) => (memberName.value = value);
</script>
<style scoped>
.spinner {
	text-align: center;
	margin: 30px auto;
}
</style>
