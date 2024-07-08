<template>
	<q-btn-dropdown
		flat
		round
		dense
		dropdown-icon="more_vert"
		class="q-pl-md"
		color="green-1"
	>
		<q-list>
			<q-item clickable v-close-popup @click="print">
				<q-item-section>Cetak</q-item-section>
				<q-item-section avatar>
					<q-icon color="green" name="print" />
				</q-item-section>
			</q-item>
			<q-item clickable v-close-popup @click="report">
				<q-item-section>Lapor</q-item-section>
				<q-item-section avatar>
					<q-icon color="red" name="report_problem" />
				</q-item-section>
			</q-item>
		</q-list>
	</q-btn-dropdown>
</template>
<script setup>
import { useQuasar } from 'quasar';
import { notifyError } from 'src/utils/notify';
import { useRouter } from 'vue-router';

const $q = useQuasar();
const router = useRouter();
const report = async () => {
	$q.dialog({
		title: 'Lapor!',
		message:
			'Untuk perbaikan dan/atau penambahan data baru silakan hubungi Admin!',
		cancel: true,
		persistent: true,
	})
		.onOk(() => {
			router.push('/about');
		})
		.onOk(() => {
			// console.log('Keluar dari dari Aplikasi..')
		})
		.onCancel(() => {
			// history.go(-1);
		})
		.onDismiss(() => {
			// console.log('I am triggered on both OK and Cancel')
		});
	// await notifyAlert("Untuk perbaikan dan/atau penambahan data baru silakan hubungi Admin!<br/><br/><router-link to:'/about'>aa</router-link>", 0);
};
const print = () => {
	notifyError('Fitur belum siap.');
};
</script>
