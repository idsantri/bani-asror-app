<template>
	<div>
		<banner-app
			page-title="Petunjuk Input Data"
			:show-search-members="false"
			:show-reload="false"
		/>
		<div class="text-green-10">
			<q-card>
				<q-card-section>
					<span v-html="article"></span>
				</q-card-section>
			</q-card>

			<!-- TOMBOL CARI -->
			<q-page-sticky position="bottom-left" :offset="[12, 12]">
				<q-btn
					fab-mini
					v-if="showButtonEdit()"
					@click="showModal = true"
					round
					glossy
					color="green-7"
					icon="edit"
					class=""
				/>
			</q-page-sticky>

			<q-dialog v-model="showModal" maximized>
				<q-card>
					<q-card-section>
						<div class="text-h6 text-green-10">Edit Artikel</div>
					</q-card-section>
					<q-card-section class="q-pt-none">
						<q-editor
							v-model="articleEdit"
							min-height="5rem"
							:dense="$q.screen.lt.md"
							:toolbar="toolbar"
						/>
					</q-card-section>
					<q-card-actions align="right" class="bg-white text-green">
						<q-btn color="positive" label="Simpan" @click="save" />
						<q-btn color="negative" label="Gagal" v-close-popup />
					</q-card-actions>
				</q-card>
			</q-dialog>
		</div>
	</div>
</template>
<script setup>
import { useAuthStore } from 'src/stores/auth-store';
import { onMounted, ref, watchEffect } from 'vue';
import { useQuasar } from 'quasar';
import BannerApp from 'src/components/BannerApp.vue';
import Var from 'src/models/Var';

const $q = useQuasar();
const emit = defineEmits(['showButtonSearch']);
emit('showButtonSearch', false);
const showModal = ref(false);
const article = ref('');
const articleEdit = ref('');
const showButtonEdit = () => useAuthStore().isSuperAdmin;

watchEffect(() => {
	if (showModal.value) articleEdit.value = article.value;
});

onMounted(async () => {
	const response = await Var.getTextAdminGuide();
	// console.log('🚀 ~ response:', response);
	if (response) {
		article.value = response.data?.vars?.val || '';
	}
});

const save = async () => {
	try {
		const response = await Var.updateTextAdminGuide(articleEdit.value);
		// console.log('🚀 ~ save ~ response:', response);
		if (response) {
			article.value = response.data.vars.val;
		}
	} finally {
		showModal.value = false;
	}
};

const toolbar = [
	[
		{
			label: $q.lang.editor.align,
			icon: $q.iconSet.editor.align,
			fixedLabel: true,
			options: ['left', 'center', 'right', 'justify'],
		},
	],
	['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
	['token', 'hr', 'link', 'custom_btn'],
	[
		{
			label: $q.lang.editor.formatting,
			icon: $q.iconSet.editor.formatting,
			list: 'no-icons',
			options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
		},
		{
			label: $q.lang.editor.fontSize,
			icon: $q.iconSet.editor.fontSize,
			fixedLabel: true,
			fixedIcon: true,
			list: 'no-icons',
			options: [
				'size-1',
				'size-2',
				'size-3',
				'size-4',
				'size-5',
				'size-6',
				'size-7',
			],
		},
		'removeFormat',
	],
	['quote', 'unordered', 'ordered', 'outdent', 'indent'],
	['undo', 'redo'],
];
</script>
