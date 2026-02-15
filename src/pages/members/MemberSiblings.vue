<template>
	<q-card-section class="bg-green-7">
		<q-banner class="q-pa-sm bg-green-3 text-dark">
			<q-list v-if="siblings.length > 0" bordered separator>
				<q-item
					v-for="(sibling, index) in siblings"
					:key="index"
					:class="
						sibling.member_id == sibling.saudara_id
							? 'text-green-7 text-bold'
							: ''
					"
				>
					<q-item-section side class="flex flex-center">
						<q-badge class="" color="green-8">
							{{ parseInt(index) + 1 }}
						</q-badge>
					</q-item-section>
					<q-item-section>
						<q-item-label>
							{{ sibling.saudara_nama }}
							({{ sibling.saudara_lp }})
						</q-item-label>
						<q-item-label caption class="">
							<span
								v-if="sibling.member_id != sibling.saudara_id"
							>
								Saudara {{ sibling.saudara_status }}
							</span>
							<span v-else class="text-green-10 font-bold">
								-
							</span>
						</q-item-label>
					</q-item-section>
					<q-item-section side>
						<q-btn
							:class="
								sibling.member_id != sibling.saudara_id
									? 'text-green-11'
									: null
							"
							icon="info"
							:glossy="sibling.member_id != sibling.saudara_id"
							color="green-10"
							style="width: 34px; height: 34px"
							:outline="sibling.member_id == sibling.saudara_id"
							:to="/members/ + sibling.saudara_id"
							:disable="sibling.member_id == sibling.saudara_id"
						/>
					</q-item-section>
				</q-item>
			</q-list>

			<q-list v-else bordered separator>
				<q-item>
					<q-item-section avatar class="flex flex-center">
						<q-badge class="" color="green-8"> 0 </q-badge>
					</q-item-section>
					<q-item-section>
						<q-item-label>-</q-item-label>
					</q-item-section>
				</q-item>
			</q-list>
		</q-banner>
	</q-card-section>
</template>
<script setup>
import { toArray } from 'src/utils/array';
import { apiTokened } from '../../config/api';
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import { notifyError, notifyWarningExpired } from 'src/utils/notify';

const siblings = reactive([]);
const route = useRoute();
const memberId = route.params.id.toString();
try {
	const response = await apiTokened.get(`members/${memberId}/siblings`);
	Object.assign(siblings, response.data.data.siblings);
} catch (error) {
	// console.log("Not Found: member -> siblings", error.response)
	const errMsg = toArray(error.response.data.message);
	const exp = errMsg.some((item) => item.toLowerCase().includes('expired'));
	if (exp) notifyWarningExpired();
	else if (error.response.status == 404) console.log(error.response);
	else errMsg.forEach((message) => notifyError(message));
}
</script>
