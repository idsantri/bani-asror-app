<template>
	<q-card class="bg-green-1 text-green-10">
		<div v-if="loading" class="text-center absolute-center">
			<q-spinner color="green-4" size="8em" thickness="2" />
		</div>
		<!-- <q-card class="bg-green-1 text-green-10"> -->
		<q-card-section class="q-pa-sm">
			<q-list separator>
				<q-item class="q-px-none">
					<q-item-section>
						<q-item-label overline
							>ID | Username | Email | Phone</q-item-label
						>
						<q-item-label>
							{{ user.id || '?' }} | {{ user.username || '?' }} |
							{{ user.email || '?' }} | {{ user.phone || '?' }}
						</q-item-label>
					</q-item-section>
					<q-item-section side class="no-padding">
						<q-item-label class="text-green-10">
							<q-btn
								class="bg-green-11 text-green-10 q-px-sm q-ml-sm"
								outline
								glossy
							>
								<q-icon name="phone" size="1em" />
								<q-icon name="edit" size="1em" />

								<q-popup-edit
									v-model="user.phone"
									autofocus
									v-slot="scope"
								>
									<q-input
										autofocus
										dense
										v-model="user.phone"
										:model-value="user.phone"
										hint="User Phone: 628x ..."
									>
										<template v-slot:after>
											<q-btn
												flat
												dense
												color="negative"
												icon="cancel"
												@click.stop.prevent="
													scope.cancel
												"
											/>
											<q-btn
												flat
												dense
												color="positive"
												icon="check_circle"
												@click.stop.prevent="
													updateUserPhone(user.id)
												"
											/>
										</template>
									</q-input>
								</q-popup-edit>
							</q-btn>
							<q-btn
								class="bg-green-11 text-green-10 q-px-sm q-ml-sm"
								outline
								glossy
								icon="phone"
								:disable="!user.phone"
								@click="callPhone(user.phone)"
							></q-btn>
						</q-item-label>
					</q-item-section>
				</q-item>
				<q-item class="q-px-none">
					<q-item-section>
						<q-item class="no-padding">
							<q-item-section>
								<q-item-label overline>Nama</q-item-label>
								<q-item-label>
									{{
										user.member_nama
											? user.member_nama
											: '-'
									}}
								</q-item-label>
							</q-item-section>
						</q-item>
					</q-item-section>
					<q-item-section side class="no-padding">
						<q-item-label class="">
							<q-btn
								class="bg-green-11 text-green-10 q-px-sm q-ml-sm"
								outline
								glossy
								:label="user.member_id ? user.member_id : '?'"
							>
								<q-icon
									name="edit"
									size="1em"
									class="q-ml-xs"
								/>
								<q-popup-edit
									v-model="user.member_id"
									autofocus
									v-slot="scope"
								>
									<q-input
										autofocus
										dense
										v-model="user.member_id"
										:model-value="user.member_id"
										hint="Member ID"
									>
										<template v-slot:after>
											<q-btn
												flat
												dense
												color="negative"
												icon="cancel"
												@click.stop.prevent="
													scope.cancel
												"
											/>
											<q-btn
												flat
												dense
												color="positive"
												icon="check_circle"
												@click.stop.prevent="
													updateMemberId(user.id)
												"
											/>
										</template>
									</q-input>
								</q-popup-edit>
							</q-btn>
							<q-btn
								class="bg-green-11 text-green-10 q-px-sm q-ml-sm"
								outline
								glossy
								:to="
									user.member_id
										? '/members/' + user.member_id
										: null
								"
								icon="person"
								:disable="!user.member_id"
							>
							</q-btn>
						</q-item-label>
					</q-item-section>
				</q-item>
				<q-item class="q-px-none">
					<q-item-section>
						<q-item-label overline>Akses</q-item-label>
						<q-item-label>
							<div class="q-gutter-x-md"></div>
						</q-item-label>
					</q-item-section>
				</q-item>
			</q-list>
		</q-card-section>
		<q-separator />
		<q-card-actions align="right">
			<q-btn
				label="Hapus"
				no-caps=""
				color="negative"
				@click="deleteUser(user.id)"
			/>
		</q-card-actions>
		<!-- <pre>id: {{ userId }}</pre> -->
	</q-card>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { forceRerender } from 'src/utils/buttons-click';
import { notifyError, notifySuccess } from 'src/utils/notify';
import { reactive, ref, watch } from 'vue';

const props = defineProps({
	userId: {
		type: [String, Number],
		required: true,
	},
});

const user = reactive({});
const $q = useQuasar();
const loading = ref(false);

watch(
	() => props.userId,
	async (newUserId) => {
		if (newUserId) {
			loading.value = true;
			try {
				const response = await api.get(`users/${newUserId}`);
				Object.assign(user, response.data.data.user);
			} catch (error) {
				toArray(error.response.data.message).forEach((message) => {
					notifyError(message);
				});
			} finally {
				loading.value = false;
			}
		}
	},
	{ immediate: true },
);

const updateMemberId = async (id) => {
	$q.dialog({
		title: 'Konfirmasi',
		message: 'Update Member ID',
		cancel: true,
		persistent: false,
		html: true,
	}).onOk(async () => {
		try {
			const response = await api.put(`users/${id}`, {
				member_id: user.member_id,
			});
			notifySuccess(response.data.message);
			forceRerender();
		} catch (error) {
			toArray(error.response.data.message).forEach((message) => {
				notifyError(message);
			});
		}
	});
};

const updateUserPhone = async (id) => {
	$q.dialog({
		title: 'Konfirmasi',
		message: 'Update Nomor Telepon (WA)?',
		cancel: true,
		persistent: false,
		html: true,
	}).onOk(async () => {
		try {
			const response = await api.put(`users/${id}`, {
				phone: user.phone,
			});
			notifySuccess(response.data.message);
			forceRerender();
		} catch (error) {
			toArray(error.response.data.message).forEach((message) => {
				notifyError(message);
			});
		}
	});
};

const callPhone = (phone) => {
	window.open(`https://wa.me/${phone.replace(/^0/, '62')}`, '_blank');
};

const deleteUser = async (id) => {
	$q.dialog({
		title: 'Konfirmasi',
		message: 'Hapus user ini?',
		cancel: true,
		persistent: false,
		html: true,
	}).onOk(async () => {
		try {
			const response = await api.delete(`users/${id}`);
			notifySuccess(response.data.message);
		} catch (error) {
			toArray(error.response.data.message).forEach((message) => {
				notifyError(message);
			});
		} finally {
			forceRerender();
		}
	});
};
</script>
