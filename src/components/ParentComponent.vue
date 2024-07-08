<template>
	<q-banner class="no-padding no-margin bg-transparent">
		<q-list>
			<q-item class="no-padding">
				<q-item-section avatar>
					<q-btn
						icon="family_restroom"
						color="green-10"
						style="width: 46px; height: 46px"
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
										outline
										glossy
										color="green-10"
										dense
										:to="
											ayah_id
												? '/members/' + ayah_id
												: null
										"
										:disable="!ayah_id"
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
										outline
										glossy
										color="green-10"
										dense
										:to="
											ibu_id ? '/members/' + ibu_id : null
										"
										:disable="!ibu_id"
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
