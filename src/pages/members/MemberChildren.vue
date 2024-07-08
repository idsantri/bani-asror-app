<template>
	<q-card-section class="bg-green-7">
		<q-banner class="q-pa-sm bg-green-3 text-dark">
			<q-list v-if="children.length > 0" bordered separator>
				<q-item v-for="(child, index) in children" :key="index">
					<q-item-section side class="flex flex-center">
						<q-badge class="" color="green-8">
							{{ parseInt(index) + 1 }}
						</q-badge>
					</q-item-section>
					<q-item-section>
						<q-item-label> {{ child.anak }}</q-item-label>
					</q-item-section>
					<q-item-section side>
						<q-btn
							icon="info"
							glossy
							color="green-10"
							style="width: 34px; height: 34px"
							outline=""
							:to="/members/ + child.anak_id"
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

const children = reactive([]);
const route = useRoute();
const memberId = route.params.id.toString();
try {
	const response = await apiTokened.get(`members/${memberId}/children`);
	Object.assign(children, response.data.data.children);
} catch (error) {
	// console.log("Not Found: member -> children", error.response)
	const errMsg = toArray(error.response.data.message);
	const exp = errMsg.some((item) => item.toLowerCase().includes('expired'));
	if (exp) notifyWarningExpired();
	else if (error.response.status == 404) console.log(error.response);
	else errMsg.forEach((message) => notifyError(message));
}
</script>
