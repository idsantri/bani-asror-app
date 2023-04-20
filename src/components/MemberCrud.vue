<template>
  <q-card style="width: 600px; max-width: 90vw">
    <q-form @submit.prevent="saveMember" accept-charset="utf-8">
      <q-card-section class="bg-green-10 text-green-1">
        <h6 class="text-h6 no-margin text-weight-light">{{ crudTitle }}</h6>
      </q-card-section>

      <q-card-section class="q-pa-sm bg-green-1">
        <q-banner v-if="errors.length > 0" class="q-mb-sm text-negative bg-red-2">
          <p class="no-margin"><strong>Terjadi kesalahan</strong></p>
          <ul class="no-margin">
            <li v-for="error in errors" :key="error">
              <span v-html="error" class="anchorErrorResponse"></span>
            </li>
          </ul>
        </q-banner>

        <input type="hidden" v-model="id" />
        <q-input outlined v-model="nama" label="Nama" placeholder="Nama Lengkap"
          hint="Tulis nama tanpa gelar kehormatan" />
        <q-input outlined class="q-mt-md" v-model="nama_arab" label="الاسم" placeholder="الاسم بالعربية" dir="rtl"
          lang="ar" />
        <q-input outlined class="q-mt-md" v-model="alias" label="Alias"
          placeholder="Panggilan, julukan, nama lain, ..." />

        <q-option-group class="q-mt-md" v-model="lp" :options="optionsSex" color="primary" inline />

        <q-input outlined class="q-mt-md" v-model="alamat" label="Alamat" placeholder="Alamat singkat (1 atau 2 kata)" />
        <q-input outlined class="q-mt-md" v-model="tgl_wafat" type="date" label="Tanggal Wafat" />
        <q-input outlined class="q-mt-md" v-model="usia_wafat" type="number" label="Usia Wafat"
          placeholder="usia ketika wafat (tahun)" />
        <q-input outlined class="q-mt-md" v-model="catatan" type="textarea" label="Catatan"
          placeholder="Tulis catatan (biografi singkat) disini!" autogrow />
      </q-card-section>

      <q-card-actions class="bg-green-10">
        <q-btn :style="styleButtonDelete" label="Hapus" color="negative" class="text-weight-light"
          @click="deleteMember(id)" />
        <q-space />
        <q-btn label="Simpan" color="green-9" class="text-weight-light" type="submit" />
        <q-btn label="Gagal" color="secondary" class="text-weight-light" v-close-popup id="btn-close-modal" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>
<script setup>
import memberCrudState from "../stores/member-crud-store";
import { toRefs, reactive, ref, computed, watchEffect } from "vue";
import { apiTokened } from "../config/api";
import { useRoute, useRouter } from "vue-router";
import { toArray } from "../utils/array";
import { useQuasar } from "quasar";
import { notifyError, notifySuccess } from "../utils/notify";
import { forceRerender } from "../utils/buttons-click";

const $q = useQuasar();
const route = useRoute();
const router = useRouter();
const memberId = route.params.id;
const errors = ref("");
const optionsSex = ref([
  { label: "Laki-Laki", value: "L" },
  { label: "Perempuan", value: "P" },
]);
const styleButtonDelete = ref({ display: "none" });
const crudTitle = ref("");

watchEffect(() => {
  const { getIsNew, getIsHusband, getIsWife, getIsChild } = memberCrudState();
  if (getIsNew) {
    styleButtonDelete.value = { display: "none" };
    if (getIsHusband) crudTitle.value = `Tambah Anggota (Suami)`;
    if (getIsWife) crudTitle.value = `Tambah Anggota (Istri)`;
    if (getIsChild) crudTitle.value = `Tambah Anggota (Anak)`;
  } else {
    styleButtonDelete.value = { display: "inline-flex" };
    crudTitle.value = "Edit Anggota";
  }
});

const copyMember = reactive({
  alamat: "",
  alias: "",
  nama: "",
  nama_arab: "",
  tgl_wafat: "",
  usia_wafat: "",
  id: null,
  catatan: "",
  lp: null,
});
Object.assign(copyMember, memberCrudState().getMember);
const {
  alamat,
  alias,
  nama,
  nama_arab,
  tgl_wafat,
  usia_wafat,
  id,
  catatan,
  lp,
} = toRefs(copyMember);

const saveMember = async () => {
  const familyId = computed(() => memberCrudState().getFamilyId);
  const isHusband = computed(() => memberCrudState().getIsHusband);
  const isWife = computed(() => memberCrudState().getIsWife);
  const isChild = computed(() => memberCrudState().getIsChild);
  const isNew = computed(() => memberCrudState().getIsNew);

  errors.value = [];
  const data = {
    alamat: alamat.value,
    alias: alias.value,
    nama: nama.value,
    nama_arab: nama_arab.value,
    tgl_wafat: tgl_wafat.value,
    usia_wafat: usia_wafat.value,
    catatan: catatan.value,
    lp: lp.value,
  };
  if (isNew.value) {
    let url = null;
    if (isHusband.value) url = `members/husband/${familyId.value}`;
    if (isWife.value) url = `members/wife/${familyId.value}`;
    if (isChild.value) url = `members/child/${familyId.value}`;
    try {
      //is new
      const response = await apiTokened.post(url, data);
      closeModal();
      notifySuccess(response.data.message);
      forceRerender();
    } catch (error) {
      errors.value = toArray(error.response.data.message);
      // console.log(error.response.data);
    }
  } else {
    //not new
    try {
      const response = await apiTokened.put(`members/${memberId}`, data);
      closeModal();
      notifySuccess(response.data.message);
      forceRerender();
    } catch (error) {
      errors.value = toArray(error.response.data.message);
    }
  }
};

const deleteMember = async (id) => {
  $q.dialog({
    title: "Konfirmasi",
    message: `Hapus anggota? <br/>
    <strong>Aksi ini tidak dapat dibatalkan.</strong><br/><br/><hr/>
    <small>Data keluarga yang terhubung dengan ID ini juga akan terpengaruh.</small>
    <hr/>`,
    cancel: true,
    persistent: false,
    html: true,
  }).onOk(async () => {
    try {
      const response = await apiTokened.delete(`members/${id}`);
      closeModal();
      notifySuccess(response.data.message);
      router.go(-2);
    } catch (error) {
      notifyError(error.response.data.message);
    }
  });
};

function closeModal() {
  document.getElementById("btn-close-modal").click();
}
</script>

<style scoped></style>
