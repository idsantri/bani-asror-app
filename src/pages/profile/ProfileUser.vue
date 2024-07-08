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
							<q-popup-edit v-model="user.phone" v-slot="scope">
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
import { reactive, toRefs, watch } from 'vue';
import { apiTokened } from 'src/config/api';
import { notifyAlert, notifyError, notifySuccess } from 'src/utils/notify';
import { forceRerender } from 'src/utils/buttons-click';
import { toArray } from 'src/utils/array';

const emit = defineEmits(['username']);
const user = reactive({});

try {
	const response = await apiTokened.get('user');
	Object.assign(user, response.data.data.user);
	emit('username', response.data.data.user.username);
} catch (error) {
	console.log('Not Found: users -> profile', error.response);
}

const { phone, username } = toRefs(user);
watch(phone, async (newValue, oldValue) => {
	// console.log(newValue);
	if (newValue != oldValue) {
		try {
			const response = await apiTokened.put('user', {
				phone: newValue,
			});
			notifySuccess(response.data.message);
		} catch (error) {
			const errMsg = toArray(error.response.data.message);
			const exp = errMsg.some((item) =>
				item.toLowerCase().includes('expired'),
			);
			if (exp) notifyWarningExpired();
			else if (error.response.status == 404) console.log(error.response);
			else errMsg.forEach((message) => notifyError(message));
			forceRerender();
		}
	}
});

watch(username, async (newValue, oldValue) => {
	if (newValue != oldValue) {
		try {
			const response = await apiTokened.put('user', {
				username: newValue,
			});
			notifySuccess(response.data.message);
		} catch (error) {
			const errMsg = toArray(error.response.data.message);
			const exp = errMsg.some((item) =>
				item.toLowerCase().includes('expired'),
			);
			if (exp) notifyWarningExpired();
			else if (error.response.status == 404) console.log(error.response);
			else errMsg.forEach((message) => notifyError(message));
			forceRerender();
		}
	}
});

const changePassword = async () => {
	await notifyAlert(
		'Untuk mengganti password, silakan logout (keluar) terlebih dahulu. Lalu, pada halaman login, klik lupa password.<br/>Ikuti petunjuk yang diberikan.',
		0,
	);
};
</script>
