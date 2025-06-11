<template lang="">
	<q-card style="min-width: 300px">
		<q-card-section
			class="q-py-sm q-px-md bg-green-6 text-green-11 text-subtitle1"
		>
			Instal Aplikasi
		</q-card-section>
		<q-card-section class="q-py-sm q-px-md bg-green-1 text-green-10">
			<p class="no-margin">
				Instal aplikasi untuk mendapatkan pengalaman lebih baik!
			</p>
			<q-separator class="q-my-sm" />
			<p class="no-margin">Bagi Pengguna iOS!</p>
			<ol class="no-margin q-pl-md">
				<li>
					Pastikan Anda menggunakan browser
					<span class="text-weight-bold">Safari</span>;
				</li>
				<li>
					Ketuk ikon &ldquo;bagikan&rdquo; (sebuah kotak dengan panah
					ke atas di bagian bawah layar);
				</li>
				<li>
					Gulir ke bawah dalam menu bagikan dan pilih opsi
					&ldquo;Tambahkan ke Layar Utama&rdquo;;
				</li>
				<li>
					Anda mungkin akan diminta untuk memberikan nama dan
					mengonfigurasi ikon;
				</li>
				<li>
					Ketuk &ldquo;Tambahkan&rdquo; di pojok kanan atas layar
					untuk menyelesaikan proses;
				</li>
			</ol>
		</q-card-section>
		<q-card-actions align="right" class="bg-green-5 q-py-sm q-px-md">
			<q-btn
				outline
				no-caps
				label="Tutup"
				color="green-11"
				class="bg-green-6"
				glossy
				v-close-popup
			/>
		</q-card-actions>
	</q-card>
</template>
<script>
export default {};
</script>
<style lang=""></style>
