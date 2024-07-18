<template>
	<q-banner class="no-padding no-margin bg-transparent">
		<q-list>
			<q-item class="no-padding">
				<q-item-section avatar>
					<q-btn
						icon="family_restroom"
						color="green-10"
						style="width: 46px; height: 46px"
						:class="keluarga_id ? 'text-green-11' : null"
						:to="/families/ + keluarga_id"
						:disable="!keluarga_id > 0"
						:glossy="keluarga_id > 0"
						:outline="!keluarga_id > 0"
					/>
				</q-item-section>
				<q-item-section>
					<table>
						<tbody>
							<tr>
								<td
									class="text-left text-italic"
									style="width: 44px"
								>
									Ayah
								</td>
								<td class="text-left text-weight-medium">
									{{ ayah ? ayah : '?' }}
								</td>
								<td class="text-right">
									<q-btn
										icon="info"
										color="green-10"
										dense
										:class="
											ayah_id ? 'text-green-11' : null
										"
										:to="
											ayah_id
												? '/members/' + ayah_id
												: null
										"
										:outline="ayah_id ? false : true"
										:glossy="!ayah_id ? false : true"
										:disable="!ayah_id ? true : false"
									/>
								</td>
							</tr>
							<tr>
								<td
									class="text-left text-italic"
									style="width: 44px"
								>
									Ibu
								</td>
								<td class="text-left text-weight-medium">
									{{ ibu ? ibu : '?' }}
								</td>
								<td class="text-right">
									<q-btn
										icon="info"
										color="green-10"
										dense
										:class="ibu_id ? 'text-green-11' : null"
										:to="
											ibu_id ? '/members/' + ibu_id : null
										"
										:outline="ibu_id ? false : true"
										:glossy="!ibu_id ? false : true"
										:disable="!ibu_id ? true : false"
									/>
								</td>
							</tr>
						</tbody>
					</table>
				</q-item-section>
			</q-item>
		</q-list>
	</q-banner>
</template>
<script setup>
import { toRefs } from 'vue';

const props = defineProps({ parent: { type: Object } });

// Object.assign(parent, props.parent);
const {
	keluarga_id = null,
	ayah_id = null,
	ibu_id = null,
	ayah = '',
	ibu = '',
} = toRefs(props.parent);
</script>
<style scoped></style>
