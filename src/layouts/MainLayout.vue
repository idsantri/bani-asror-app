<template>
	<q-layout view="lHh LpR lFf">
		<q-header elevated class="bg-green-10 text-green-1">
			<q-toolbar>
				<q-btn
					dense
					flat
					round
					icon="menu"
					@click="toggleLeftDrawer"
					color="green-4"
				/>
				<q-avatar class="bg-green-1">
					<img src="../assets/logo-c.png" />
				</q-avatar>

				<q-toolbar-title class="no-padding q-ml-sm">
					<q-list>
						<q-item clickable v-ripple class="no-padding" to="/">
							<q-item-section>
								<q-item-label class="q-py-sm">
									<p class="header header-1">
										<span class="header-span">{{
											constanta.APP_NAME_1
										}}</span>
										{{ constanta.APP_NAME_2 }}
									</p>
									<p class="header header-2">
										({{ constanta.ANCESTOR_ALIAS }})
									</p>
								</q-item-label>
							</q-item-section>
						</q-item>
					</q-list>
				</q-toolbar-title>
				<q-btn
					v-show="isAdmin"
					round
					flat
					dense
					icon="notifications"
					color="green-1"
					to="/reports"
				>
					<q-badge
						v-show="showNotification"
						floating
						color="red"
						rounded
					/>
				</q-btn>
				<q-btn-dropdown
					flat
					round
					dense
					dropdown-icon="more_vert"
					class="q-pl-md"
					color="green-1"
				>
					<q-list>
						<q-item
							clickable
							v-close-popup
							name="install"
							@click="installApp"
							v-if="!pwaIsInstalled"
						>
							<q-item-section>Install</q-item-section>
							<q-item-section avatar>
								<q-icon color="green" name="install_mobile" />
							</q-item-section>
						</q-item>

						<q-item clickable v-close-popup to="/profile">
							<q-item-section>Profil</q-item-section>
							<q-item-section avatar>
								<q-icon color="green" name="3p" />
							</q-item-section>
						</q-item>

						<q-item clickable v-close-popup @click="copyUrl">
							<q-item-section>Salin URL</q-item-section>
							<q-item-section avatar>
								<q-icon color="green" name="content_copy" />
							</q-item-section>
						</q-item>

						<q-item clickable v-close-popup to="/logout">
							<q-item-section>Keluar</q-item-section>
							<q-item-section avatar>
								<q-icon color="red" name="logout" />
							</q-item-section>
						</q-item>
					</q-list>
				</q-btn-dropdown>
			</q-toolbar>
		</q-header>

		<q-drawer
			:width="250"
			show-if-above
			v-model="leftDrawerOpen"
			side="left"
			elevated
			class="bg-green-7"
		>
			<q-banner class="bg-transparent q-mt-md">
				<img
					src="../assets/logo.png"
					style="height: 100px; object-fit: cover"
				/>
				<p class="text-green-1 text-h6 text-weight-medium no-margin">
					<span class="text-weight-light">{{
						constanta.APP_NAME_1
					}}</span>
					{{ constanta.APP_NAME_2 }}
				</p>
				<p
					class="text-green-1 text-subtitle1 text-weight-light text-italic"
				>
					({{ constanta.ANCESTOR_ALIAS }})
				</p>
			</q-banner>
			<AsideContent />
		</q-drawer>

		<q-page-container :key="componentKey">
			<div class="q-pa-sm">
				<div class="q-gutter-y-sm">
					<q-banner
						v-if="pageTitle"
						class="bg-green-9 text-green-1"
						inline-actions
					>
						<h2 class="text-h6 no-margin text-weight-light">
							{{ pageTitle }}
						</h2>
						<p
							class="no-margin text-weight-light"
							v-if="pageSubTitle"
						>
							{{ pageSubTitle.value }}
						</p>
						<!-- TOMBOL CARI -->
						<template v-slot:action>
							<q-btn
								v-show="showButtonSearch"
								flat
								color="green-1"
								icon="search"
								@click="clickSearch"
							/>
						</template>
					</q-banner>

					<suspense>
						<template #default>
							<router-view
								:key="$route.fullPath"
								@page-title="handlePageTitle"
								@page-sub-title="handlePageSubTitle"
								@show-button-search="handleShowButtonSearch"
							/>
						</template>
						<template #fallback>
							<div class="spinner">
								<q-spinner-cube color="green-8" size="8em" />
							</div>
						</template>
					</suspense>
				</div>
			</div>

			<!-- TOMBOL CARI -->
			<!-- <q-btn v-show="showButtonSearch" round color="green-8" class="absolute absolute-bottom-right q-mr-lg q-mb-xl"
        icon="search" @click="clickSearch" /> -->
		</q-page-container>

		<!-- modal search member -->
		<q-dialog v-model="showSearch" full-width>
			<q-card>
				<q-card-section class="bg-green-8 text-green-1 q-pa-sm">
					<div class="text-h6 text-weight-light">
						Cari Anggota {{ familyStatus }}
					</div>
				</q-card-section>
				<q-card-section style="max-height: 75vh" class="scroll">
					<MemberDataTable />
				</q-card-section>

				<q-card-actions class="bg-green-8 text-green-1 q-pa-sm">
					<q-btn
						:style="styleButtonNew"
						label="Baru"
						color="green-11"
						outline
						glossy
						class="bg-green-10"
						@click="addNew"
						no-caps
					/>
					<q-space />
					<q-btn
						glossy
						label="Tutup"
						color="green-1"
						class="text-green-10"
						v-close-popup
						id="btn-close-modal-search"
						no-caps
					/>
				</q-card-actions>
			</q-card>
		</q-dialog>

		<!-- modal crud member -->
		<q-dialog v-model="showCrud" persistent>
			<MemberCrud />
		</q-dialog>

		<!-- hidden elements -->
		<div style="display: none">
			<button @click="forceRerender" id="btn-force-rerender">
				rerender
			</button>
			<button @click="showSearch = true" id="btn-show-modal-search">
				show search
			</button>
			<button @click="showCrud = true" id="btn-show-modal-crud">
				show crud
			</button>
		</div>

		<q-footer bordered class="bg-green-9 text-green-1">
			<!-- TOMBOL CARI -->
			<q-btn
				v-show="showButtonSearch"
				round
				color="green-7"
				class="absolute absolute-bottom-left q-ml-md q-mb-xl"
				icon="search"
				@click="clickSearch"
			/>
			<p class="text-center no-margin q-pa-xs">
				&copy;
				<a
					href="https://fb.me/idsantri.page"
					target="_blank"
					class="text-green-1"
					>ID Santri</a
				>
			</p>
		</q-footer>
	</q-layout>
</template>

<script setup>
import { ref, watchEffect, computed, onMounted } from 'vue';
import { showModalSearch, showModalCrud } from 'src/utils/buttons-click';
import memberCrudState from '../stores/member-crud-store';
import constanta from 'src/config/constanta';
import AsideContent from 'src/components/AsideContent.vue';
import MemberDataTable from '../components/MemberDataTables.vue';
import MemberCrud from 'src/components/MemberCrud.vue';
import { apiTokened } from 'src/config/api';
import useAuthStore from 'src/stores/auth-store';
import { useQuasar } from 'quasar';
import { notifySuccess } from 'src/utils/notify';

const pageTitle = ref('Data');
const pageSubTitle = ref('');
const leftDrawerOpen = ref(false);
const componentKey = ref(0);
const showSearch = ref(false);
const showCrud = ref(false);
const familyStatus = ref('');
const styleButtonNew = ref({ display: 'none' });
const showButtonSearch = ref(true);
const showNotification = ref(false);

const copyUrl = async () => {
	const url = document.location.href;
	await navigator.clipboard.writeText(url);
	notifySuccess('URL sudah disalin/dicopy ke clipboard');
};

const $q = useQuasar();
const addNew = () => {
	$q.dialog({
		title: 'Konfirmasi',
		message: `Buat data baru? ${familyStatus.value}`,
		cancel: true,
		persistent: false,
		html: true,
	}).onOk(() => {
		showSearch.value = false;
		showModalCrud(false);
	});
};

const toggleLeftDrawer = () => (leftDrawerOpen.value = !leftDrawerOpen.value);
const handlePageTitle = (value) => (pageTitle.value = value);
const handlePageSubTitle = (value) => (pageSubTitle.value = value);
const handleShowButtonSearch = (value) => (showButtonSearch.value = value);
const forceRerender = () => componentKey.value++;
const clickSearch = () => showModalSearch();

watchEffect(() => {
	const { getIsNew, getIsHusband, getIsWife, getIsChild } = memberCrudState();
	if (getIsNew) {
		styleButtonNew.value = { display: 'inline-flex' };
		if (getIsHusband) familyStatus.value = '(Suami)';
		if (getIsWife) familyStatus.value = '(Istri)';
		if (getIsChild) familyStatus.value = '(Anak)';
	} else {
		styleButtonNew.value = { display: 'none' };
		familyStatus.value = '';
	}
});

/**
 * ----------------------------------
 * REQUEST CHECK REPORT
 * ----------------------------------
 */
const checkReport = async () => {
	try {
		const response = await apiTokened.get('reports/count/0');
		const reports = response.data.data.reports_count;
		if (reports > 0) showNotification.value = true;
		else showNotification.value = false;
		// console.log(reports);
	} catch (error) {
		console.log(error);
	}
};
const isAdmin =
	useAuthStore().getGroup.is_superadmin || useAuthStore().getGroup.is_admin;
if (isAdmin) {
	//init
	checkReport();
	// continues
	setInterval(
		async () => {
			checkReport();
		},
		1000 * 60 * 2,
	);
}

/**
 * ----------------------------------
 * PWA
 * ----------------------------------
 */
let deferredPrompt = ref(null);
onMounted(async () => {
	window.addEventListener('beforeinstallprompt', (e) => {
		e.preventDefault();
		deferredPrompt.value = e;
	});
});

const pwaIsInstalled = computed(() => {
	if (window.matchMedia('(display-mode:standalone)').matches) {
		console.log('this is standalone');
		return true;
	}
	console.log('this is not standalone');
	return false;
});

const installApp = async () => {
	deferredPrompt.value.prompt();
	const { outcome } = await deferredPrompt.value.userChoice;
	if (outcome === 'dismissed') {
		console.log('this is standalone');
		return true;
	}
};
</script>
<style scoped>
.spinner {
	text-align: center;
	margin: 30px auto;
}

.header {
	margin: 0;
	padding: 0;
}

.header-1 {
	font-weight: 500;
}

.header-2 {
	font-weight: 100;
	font-size: 0.7em;
	font-style: italic;
}

.header-span {
	font-weight: 100;
}
</style>
