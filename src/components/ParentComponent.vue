<template>
	<q-banner class="no-padding no-margin bg-transparent">
		<q-list>
			<q-item class="no-padding">
				<q-item-section avatar>
					<q-btn
						icon="family_restroom"
						color="green-10"
						style="width: 46px; height: 46px"
						:class="parent?.keluarga_id ? 'text-green-11' : null"
						:to="'/families/' + parent?.keluarga_id"
						:disable="!parent?.keluarga_id > 0"
						:glossy="parent?.keluarga_id > 0"
						:outline="!parent?.keluarga_id > 0"
					/>
				</q-item-section>
				<q-item-section>
					<table>
						<tbody>
							<tr>
								<td
									class="text-left text-italic"
									style="width: 56px"
								>
									Ayah
								</td>
								<td class="text-left text-weight-medium">
									{{ parent?.ayah ? parent?.ayah : '?' }}
								</td>
								<td class="text-right">
									<q-btn
										icon="info"
										color="green-10"
										dense
										:class="
											parent?.ayah_id
												? 'text-green-11'
												: null
										"
										:to="
											parent?.ayah_id
												? '/members/' + parent?.ayah_id
												: null
										"
										:outline="
											parent?.ayah_id ? false : true
										"
										:glossy="
											!parent?.ayah_id ? false : true
										"
										:disable="
											!parent?.ayah_id ? true : false
										"
									/>
								</td>
							</tr>
							<tr>
								<td
									class="text-left text-italic"
									style="width: 56px"
								>
									Ibu
								</td>
								<td class="text-left text-weight-medium">
									{{ parent?.ibu ? parent?.ibu : '?' }}
								</td>
								<td class="text-right">
									<q-btn
										icon="info"
										color="green-10"
										dense
										:class="
											parent?.ibu_id
												? 'text-green-11'
												: null
										"
										:to="
											parent?.ibu_id
												? '/members/' + parent?.ibu_id
												: null
										"
										:outline="parent?.ibu_id ? false : true"
										:glossy="!parent?.ibu_id ? false : true"
										:disable="
											!parent?.ibu_id ? true : false
										"
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
defineProps({ parent: { type: Object, default: () => {} } });
</script>
<style scoped></style>
