<template>
	<q-card class="text-green-10 bg-green-11">
		<q-card-section style="max-width: 600px">
			<div class="text-body1">Kontak</div>
			<ul class="q-gutter-y-sm">
				<li>
					Hal-hal yang terkait dengan data (konten aplikasi) hubungi
					Admin:
				</li>
				<ul class="q-gutter-y-sm">
					<li v-for="(admin, index) in admins" :key="index">
						<div>
							{{ admin.nama ? admin.nama : '?' }}
							<span
								v-show="admin.alamat"
								class="text-italic text-caption"
								>&mdash; {{ admin.alamat }}</span
							>
						</div>
						<div class="text-caption">
							{{ admin.email }}
							<span v-show="admin.phone"
								><br />
								<a
									href="#"
									@click.prevent="redirectToWA(admin.phone)"
									target="_blank"
									>{{ admin.phone }}
									<span class="text-italic">(klik)</span>
								</a>
							</span>
						</div>
					</li>
				</ul>
				<li>
					Hal-hal yang terkait dengan fitur dan pengembangan aplikasi
					hubungi developer (ID Santri)
				</li>
			</ul>
			<br />
			<p class="text-center">***</p>
			<p>
				Aplikasi ini dibuat oleh perorangan secara sukarela. Dukungan
				Anda dibutuhkan agar aplikasi ini terus dikembangkan.
			</p>
			<p>
				Dukung kami dengan berdonasi pada<a
					href="https://trakteer.id/bani-asror/tip"
					target="_blank"
					class="text-weight-bold text-italic"
				>
					tautan ini.</a
				>
			</p>
			<p>Salam,</p>
			<br />

			<p class="no-margin">ID Santri</p>
			<ul class="no-margin text-italic q-pl-md">
				<li>
					<a href="https://fb.me/idsantri.page" target="_blank"
						>https://fb.me/idsantri.page</a
					>
				</li>
				<li>idsantri.mail@gmail.com</li>
				<li>
					<a href="https://wa.me/6285765675657" target="_blank"
						>0857-6567-5657 (WA Only)</a
					>
				</li>
			</ul>
		</q-card-section>
	</q-card>
</template>
<script setup>
import { apiTokened } from 'src/config/api';
import { onMounted, reactive } from 'vue';

const admins = reactive({});
const emit = defineEmits(['pageTitle', 'pageSubTitle', 'showButtonSearch']);
emit('pageTitle', 'Tentang …');
emit('pageSubTitle', null);
emit('showButtonSearch', false);

onMounted(async () => {
	try {
		const response = await apiTokened.get('user-group/list/admin');
		// console.log(response.data.data.users)
		Object.assign(admins, response.data.data.users);
		// console.log(users);
	} catch (error) {
		console.log('Not Found: user-group -> users', error.response);
	}
});

const redirectToWA = (no) => {
	window.open('https://wa.me/' + no, '_blank');
};
</script>
