<template>
	<q-card class="bg-green-1 text-green-10">
		<div v-if="loading" class="text-center absolute-center">
			<q-spinner color="green-4" size="8em" :thickness="3" />
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
						<q-list bordered="" separator="" class="bg-green-1">
							<q-item
								tag="label"
								v-ripple
								v-for="(group, index) in groups"
								:key="index"
							>
								<q-item-section>
									<q-item-label>{{
										group.title
									}}</q-item-label>
									<q-item-label caption="">
										{{ group.description }}
									</q-item-label>
								</q-item-section>
								<q-item-section side>
									<q-toggle
										color="green-10"
										v-model="group.value"
										:true-value="true"
										:false-value="false"
										@click="
											setGroup(
												group.key,
												group.title,
												group.value,
											)
										"
									/>
								</q-item-section>
							</q-item>
						</q-list>
					</q-item-section>
				</q-item>
			</q-list>
		</q-card-section>
		<q-separator />
		<q-card-actions align="right">
			<q-btn
				v-if="userId"
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
import User from 'src/models/User';
import UserGroup from 'src/models/UserGroup';
import { forceRerender } from 'src/utils/buttons-click';
import { notifyConfirm, notifySuccess } from 'src/utils/notify';
import { reactive, ref, watch } from 'vue';

const props = defineProps({
	userId: {
		type: [String, Number],
		required: false,
	},
});

const user = reactive({});
const groups = reactive([]);
const loading = ref(false);

async function fetchUser(id) {
	try {
		loading.value = true;
		const response = await User.getById({ id });
		if (!response) return;
		Object.assign(user, response.data.user);
		Object.assign(groups, response.data.groups);
	} catch (error) {
		console.log('🚀 ~ fetchUser ~ error:', error);
	} finally {
		loading.value = false;
	}
}

watch(
	() => props.userId,
	async (newUserId, oldUserId) => {
		if (newUserId && newUserId !== oldUserId) {
			await fetchUser(newUserId);
		}
	},
	{ immediate: true },
);

const updateMemberId = async (id) => {
	const isConfirmed = await notifyConfirm('Update Member ID', true);
	if (!isConfirmed) return;

	try {
		loading.value = true;
		await User.update({
			id,
			data: { member_id: user.member_id },
		});

		forceRerender();
	} catch (error) {
		console.log('🚀 ~ updateMemberId ~ error:', error);
	} finally {
		loading.value = false;
	}
};

const updateUserPhone = async (id) => {
	const isConfirmed = await notifyConfirm('Update Nomor Telepon (WA)', true);
	if (!isConfirmed) return;

	try {
		loading.value = true;
		await User.update({
			id,
			data: { phone: user.phone },
		});

		forceRerender();
	} catch (error) {
		console.log('🚀 ~ updateUserPhone ~ error:', error);
	} finally {
		loading.value = false;
	}
};

const callPhone = (phone) => {
	window.open(`https://wa.me/${phone.replace(/^0/, '62')}`, '_blank');
};

const setGroup = async (group, title, value) => {
	let message = null;
	if (value) message = `Tetapkan sebagai <strong>${title}</strong>?`;
	else message = `Hapus dari group <strong>${title}</strong>?`;
	// console.log("🚀 ~ setGroup ~ message:", message);

	if (value) {
		await UserGroup.addToGroup({
			userId: user.id,
			group,
			message,
		});
	} else {
		await UserGroup.removeFromGroup({
			userId: user.id,
			group,
			message,
		});
	}

	forceRerender();
};

const deleteUser = async (id) => {
	try {
		loading.value = true;
		const response = await User.remove({ id });
		if (!response) return;
		notifySuccess(response.message);
	} finally {
		loading.value = false;
		forceRerender();
	}
};
</script>
