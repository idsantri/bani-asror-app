<template>
	<q-card class="bg-green-7 text-green-1">
		<q-card-section class="q-pa-sm">
			<q-table
				title="Users"
				:rows="users"
				:columns="columns"
				:filter="filter"
				class="bg-green-1 text-green-10"
				@row-click="(e, row) => (userId = row.id)"
			>
				<template v-slot:top-right>
					<q-input
						borderless
						dense
						debounce="300"
						v-model="filter"
						placeholder="Cari..."
					>
						<template v-slot:append>
							<q-icon name="search" />
						</template>
					</q-input>
				</template>
			</q-table>
		</q-card-section>
	</q-card>
	<user-detail :userId="userId" />
</template>

<script setup>
import { inject, reactive, ref } from 'vue';
import { notifyError } from 'src/utils/notify';
import UserDetail from './UserDetail.vue';

const columns = [
	{
		name: 'username',
		align: 'left',
		label: 'Username',
		field: 'username',
		sortable: true,
	},
	{
		name: 'member_nama',
		label: 'Nama',
		align: 'left',
		field: 'member_nama',
		sortable: true,
	},
	{
		name: 'roles',
		label: 'Group',
		align: 'left',
		field: 'roles',
		sortable: false,
	},
	{
		name: 'email',
		label: 'Email',
		align: 'left',
		field: 'email',
		sortable: true,
	},
];

const api = inject('api');
const users = reactive([]);
const filter = ref('');
const userId = ref(null);

const fetchUsers = async () => {
	try {
		const response = await api.get('users');
		// console.log(response.data.data.users);
		Object.assign(users, response.data.data.users);
		// console.log(users);
	} catch (error) {
		notifyError('Gagal memuat data pengguna');
		console.log('Not Found: users -> users', error.response);
	}
};
fetchUsers();
</script>
