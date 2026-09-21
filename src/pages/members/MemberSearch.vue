<template>
	<q-card flat bordered>
		<q-card-section class="bg-green-1 q-pa-sm">
			<q-input
				label="Cari Anggota"
				outlined
				dense
				v-model="filter"
				type="search"
				clearable
			/>
		</q-card-section>
		<q-card-section class="q-pa-sm">
			<q-table
				flat
				:loading="loading"
				:rows="members"
				:filter="filter"
				:rows-per-page-options="[10]"
				:columns="columns"
			>
				<template #body="props">
					<q-tr :props="props">
						<q-td col-name="nama" :props="props">
							<router-link :to="'/members/' + props.row.id">
								{{ props.row.nama }} ({{ props.row.lp }})
							</router-link>
						</q-td>
						<q-td col-name="spouse_json" :props="props">
							<!-- {{ props.row?.spouse_json?.length }} -->
							<template v-if="props.row?.spouse_json?.length > 0">
								<span
									v-for="(item, i) in props.row.spouse_json"
									:key="item.id ?? item.name"
								>
									<router-link
										v-if="item.id"
										:to="'/members/' + item.id"
									>
										{{ item.name }}
									</router-link>
									<span v-else>{{ item.name }}</span>
									<span
										v-if="
											i < props.row.spouse_json.length - 1
										"
										>;&nbsp;
									</span>
								</span>
							</template>
						</q-td>
						<q-td col-name="parent1_name" :props="props">
							<router-link
								v-if="props.row.parent1_id"
								:to="'/members/' + props.row.parent1_id"
							>
								{{ props.row.parent1_name }} ({{
									props.row.parent1_sex
								}})
							</router-link>
						</q-td>
						<q-td col-name="parent2_name" :props="props">
							<router-link
								v-if="props.row.parent2_id"
								:to="'/members/' + props.row.parent2_id"
							>
								{{ props.row.parent2_name }} ({{
									props.row.parent2_sex
								}})
							</router-link>
						</q-td>
						<q-td col-name="parent3_name" :props="props">
							<router-link
								v-if="props.row.parent3_id"
								:to="'/members/' + props.row.parent3_id"
							>
								{{ props.row.parent3_name }} ({{
									props.row.parent3_sex
								}})
							</router-link>
						</q-td>
					</q-tr>
				</template>
			</q-table>
		</q-card-section>
	</q-card>
	<!-- <pre>{{ members[6] }}</pre> -->
</template>
<script setup>
import Member from 'src/models/Member';
import { onMounted, ref } from 'vue';

const emit = defineEmits(['pageTitle', 'pageSubTitle', 'showButtonSearch']);
emit('pageTitle', 'Cari Anggota');
emit('pageSubTitle', null);
emit('showButtonSearch', false);

const members = ref([]);
const loading = ref(false);
const filter = ref('');

async function getMembers() {
	try {
		loading.value = true;
		const response = await Member.getAll();
		if (response) {
			const data = response.data.members.map((i) => {
				i.spouse_json = safeParse(i.spouse_json);
				return i;
			});
			members.value = data;
		}
	} catch (error) {
		console.log(error);
	} finally {
		loading.value = false;
	}
}

function safeParse(val) {
	try {
		const arr = JSON.parse(val ?? '[]');
		return Array.isArray(arr) ? arr : [];
	} catch {
		return [];
	}
}

onMounted(() => {
	getMembers();
});

const columns = [
	{
		name: 'nama',
		label: 'Nama',
		field: 'nama',
		sortable: true,
		align: 'left',
	},
	{
		name: 'spouse_json',
		label: 'Pasangan',
		field: (row) => {
			try {
				const arr = JSON.parse(row.spouse_json ?? '[]');
				return Array.isArray(arr) ? arr : [];
			} catch {
				return [];
			}
		},
		sortable: true,
		align: 'left',
		// format: (row) =>
		// 	JSON.parse(row.spouse_json)
		// 		.map((item) => item.name)
		// 		.join(', '),
	},
	{
		name: 'parent1_name',
		label: 'Ortu-1',
		field: 'parent1_name',
		sortable: true,
		align: 'left',
	},
	{
		name: 'parent2_name',
		label: 'Ortu-2',
		field: 'parent2_name',
		sortable: true,
		align: 'left',
	},
	{
		name: 'parent3_name',
		label: 'Ortu-3',
		field: 'parent3_name',
		sortable: true,
		align: 'left',
	},
];
</script>
<style lang=""></style>
