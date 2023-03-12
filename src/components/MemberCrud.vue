<template>
  <q-card style="width: 600px; max-width: 90vw;">
    <q-form @submit.prevent="saveMember" accept-charset="utf-8">
      <q-card-section class="bg-green-10 text-green-1">
        <h6 class="text-h6 no-margin text-weight-light">{{ modalTitle }}
          <span v-if="isNew">({{ title }})</span>
        </h6>
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

        <input type="hidden" v-model="id">
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
        <q-btn label="Hapus" color="negative" class="text-weight-light" @click="deleteMember(id)" />
        <q-space />
        <q-btn label="Simpan" color="green-9" class="text-weight-light" type="submit" />
        <q-btn label="Gagal" color="secondary" class="text-weight-light" v-close-popup id="btn-close-modal" />
      </q-card-actions>

    </q-form>
  </q-card>
</template>
<script setup>
import memberState from '../stores/member-store';
import { toRefs, reactive, ref, computed } from 'vue';
import api from '../utils/api-tokened';
import { useRoute, useRouter } from 'vue-router';
import { toArray } from '../utils/array';
import { useQuasar } from 'quasar'
import { notifySuccess } from '../utils/notify'

const $q = useQuasar()
const route = useRoute()
const router = useRouter()
const memberId = route.params.id
const errors = ref('')
const optionsSex = ref([{ label: 'Laki-Laki', value: 'L' }, { label: 'Perempuan', value: 'P' },])

const props = defineProps({
  member: { type: Object },
  modalTitle: { type: String, default: "Anggota" },
  isNew: { type: Boolean, default: true }
})

const title = computed(() => memberState().getTitle)
const familyId = computed(() => memberState().getFamilyId)
const isHusband = computed(() => memberState().getIsHusband)
const isWife = computed(() => memberState().getIsWife)
const isChild = computed(() => memberState().getIsChild)

const copyMember = reactive({ alamat: '', alias: '', nama: '', nama_arab: '', tgl_wafat: '', usia_wafat: '', id: null, catatan: '', lp: null })
Object.assign(copyMember, props.member)
const { alamat, alias, nama, nama_arab, tgl_wafat, usia_wafat, id, catatan, lp } = toRefs(copyMember)

const emit = defineEmits(['newMember'])
const saveMember = async () => {
  errors.value = []
  const data = {
    alamat: alamat.value,
    alias: alias.value,
    nama: nama.value,
    nama_arab: nama_arab.value,
    tgl_wafat: tgl_wafat.value,
    usia_wafat: usia_wafat.value,
    catatan: catatan.value,
    lp: lp.value,
  }
  if (props.isNew) {
    let url = null;
    if (isHusband.value) url = `members/suami/${familyId.value}`
    if (isWife.value) url = `members/istri/${familyId.value}`
    if (isChild.value) url = `members/anak/${familyId.value}`
    try {
      //is new
      const response = await api.post(url, data)
      closeModal()
      notifySuccess(response.data.message)
      document.getElementById('btn-force-rerender').click()
    } catch (error) {
      errors.value = toArray(error.response.data.message)
    }
  } else {
    //not new
    try {
      const response = await api.put(`members/${memberId}`, data)
      closeModal()
      notifySuccess(response.data.message)
      emit('newMember', response.data.data.member)
    } catch (error) {
      errors.value = toArray(error.response.data.message)
    }
  }
}

function closeModal() {
  document.getElementById('btn-close-modal').click()
}

const deleteMember = async (id) => {
  const isConfirmed = confirm("Hapus anggota? \nAksi ini tidak dapat dibatalkan.\nData keluarga yang terhubung dengan ID ini juga akan terpengaruh.")
  if (isConfirmed) {
    try {
      const response = await api.delete(`members/${id}`)
      closeModal()
      notifySuccess(response.data.message)
      router.go(-2)
    } catch (error) {
      alert(error.response.data.message);
    }
  }
}

</script>

<style scoped></style>
