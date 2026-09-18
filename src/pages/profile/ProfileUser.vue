<template>
	<q-card class="text-green-10 bg-green-2">
		<q-card-section>
			<q-list separator>
				<q-item>
					<q-item-section>
						<q-item-label class="text-green-10" caption
							>Email:</q-item-label
						>
						<q-item-label>{{ user.email }}</q-item-label>
					</q-item-section>
				</q-item>
				<q-item>
					<q-item-section>
						<q-item-label class="text-green-10" caption
							>Username:</q-item-label
						>
						<q-item-label>{{ user.username }}</q-item-label>
					</q-item-section>
					<!-- username -->
					<q-item-section side>
						<q-icon
							name="edit"
							color="green-10"
							flat
							class="q-pr-none"
						>
							<q-popup-edit
								v-model="user.username"
								buttons
								v-slot="scope"
								@save="
									(val, initVal) =>
										updateUserProfile('username', val)
								"
							>
								<q-input
									v-model="scope.value"
									dense
									autofocus
									@keyup.enter="scope.set"
									hint="Anda bisa login email atau username "
								/>
							</q-popup-edit>
						</q-icon>
					</q-item-section>
				</q-item>

				<q-item>
					<q-item-section>
						<q-item-label class="text-green-10" caption
							>Password:</q-item-label
						>
						<q-item-label>***</q-item-label>
					</q-item-section>
					<q-item-section side>
						<q-btn
							icon="edit"
							color="green-10"
							flat
							class="q-pr-none"
							@click="changePassword"
						/>
					</q-item-section>
				</q-item>

				<q-item>
					<q-item-section>
						<q-item-label class="text-green-10" caption>
							Telepon/WA:
						</q-item-label>
						<q-item-label>
							{{ user.phone ? user.phone : '-' }}
						</q-item-label>
					</q-item-section>
					<q-item-section side>
						<q-icon
							name="edit"
							color="green-10"
							flat
							class="q-pr-none"
						>
							<q-popup-edit
								v-model="user.phone"
								v-slot="scope"
								@save="
									(val, initVal) =>
										updateUserProfile('phone', val)
								"
							>
								<q-input
									type="number"
									v-model="scope.value"
									hint="Nomor telepon: 081234567890"
									dense
									autofocus
									@keyup.enter="scope.set"
								>
									<template v-slot:after>
										<q-btn
											flat
											dense
											color="negative"
											icon="cancel"
											@click.stop.prevent="scope.cancel"
										/>
										<q-btn
											flat
											dense
											color="positive"
											icon="check_circle"
											@click.stop.prevent="scope.set"
										/>
									</template>
								</q-input>
							</q-popup-edit>
						</q-icon>
					</q-item-section>
				</q-item>
			</q-list>
		</q-card-section>
	</q-card>
</template>
<script setup>
import { onMounted, reactive } from 'vue';
import { notifyAlert, notifySuccess } from 'src/utils/notify';
import { forceRerender } from 'src/utils/buttons-click';
import UserCurrent from 'src/models/UserCurrent';

const emit = defineEmits(['username']);
const user = reactive({});

onMounted(async () => {
	await getUserProfile();
});

async function getUserProfile() {
	try {
		const response = await UserCurrent.getProfile();
		if (response) {
			Object.assign(user, response.data.user);
			emit('username', response.data.user.username);
		}
	} catch (error) {
		console.log('Not Found: users -> profile', error.response);
	}
}

async function updateUserProfile(field, value) {
	const data = {};
	data[field] = value;

	try {
		const response = await UserCurrent.updateProfile(data);
		if (response) {
			notifySuccess(response.message);
		}
	} catch (error) {
		console.log('Not Found: users -> profile', error.response);
		forceRerender();
	}
}

const changePassword = async () => {
	await notifyAlert(
		'Untuk mengganti password, silakan logout (keluar) terlebih dahulu. Lalu, pada halaman login, klik lupa password.<br/>Ikuti petunjuk yang diberikan.',
		0,
	);
};
</script>
