<template>
	<div>
		<banner-app
			page-title="Ahlan wa Sahlan …"
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
import { notifySuccess } from 'src/utils/notify';
import { onMounted, ref, watchEffect } from 'vue';
import { useQuasar } from 'quasar';
import Article from 'src/models/Article';
import BannerApp from 'src/components/BannerApp.vue';

const $q = useQuasar();
const emit = defineEmits(['showButtonSearch']);
emit('showButtonSearch', false);

const showModal = ref(false);
const article = ref('');
const articleEdit = ref('');

watchEffect(() => {
	if (showModal.value) articleEdit.value = article.value;
});

onMounted(async () => {
	const response = await Article.get();
	if (response) {
		article.value = response.data.setting.val;
	}
});

const showButtonEdit = () => useAuthStore().isAdminOrSuperAdmin;

const save = async () => {
	try {
		const response = await Article.update({
			val: articleEdit.value,
		});
		if (response) {
			article.value = response.data.setting.val;
			notifySuccess(response.message);
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
