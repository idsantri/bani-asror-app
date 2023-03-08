<template>
  <q-card-section class="bg-green-7">
    <q-banner class="q-pa-sm bg-green-2 text-dark">
      <template #avatar>
        <q-avatar :icon="sexIcon" color="green-10" text-color="green-2" rounded font-size=".7em"></q-avatar>
      </template>
      <div>
        <h3 class="text-h6 no-margin">{{ nama.toUpperCase() }} ({{ lp.toUpperCase() }})</h3>
        <p class="no-margin text-body2 text-weight-light text-italic" v-if="alias">({{
          alias
        }})</p>
        <p class="no-margin text-h7" v-if="nama_arab">{{ member.nama_arab }}</p>
        <p class="no-margin" v-if="alamat">{{ alamat }}</p>
      </div>
    </q-banner>

    <q-banner class="q-pa-sm bg-green-3 text-dark q-mt-md">
      <template #avatar>
        <q-avatar rounded icon="diversity_3" color="green-10" text-color="green-3" font-size=".6em"></q-avatar>
      </template>
      <div class="row">
        <div class="col-2">
          <p class="no-margin q-pa-xs">Ayah:</p>
          <p class="no-margin q-pa-xs">Ibu:</p>
        </div>
        <div class="col">
          <p class="no-margin q-pa-xs">
            <span v-if="!ayah_id">-</span>
            <span v-if="ayah_id"> <router-link :to="ayah_id">{{
              ayah
            }}</router-link></span>
          </p>

          <p class="no-margin q-pa-xs">
            <span v-if="!ibu_id">-</span>
            <span v-if="ibu_id > 0"> <router-link :to="ibu_id">{{ ibu }}</router-link></span>
          </p>
        </div>
        <div class="col-2">
          <span v-if="keluarga_id" class="float-bl">
            <router-link :to="/families/ + keluarga_id">
              <q-icon name="play_circle_filled" size="3.5em" color="green-10" />
            </router-link>
          </span>
        </div>
      </div>
    </q-banner>

    <q-banner class="q-pa-sm bg-green-4 text-dark q-mt-md">
      <div>
        <p class="no-margin q-pb-xs"><span class="text-weight-light">Tanggal Wafat: </span>{{ tgl_wafat }}</p>
        <p class="no-margin q-pb-xs"><span class="text-weight-light">Usia Wafat: </span>{{ (usia_wafat > 0 ? usia_wafat +
          " tahun" : "-") }}</p>
        <p class="no-margin text-weight-light"><em>{{ (catatan ? catatan : 'Catatan: -') }}</em></p>
      </div>
      <template #avatar>
        <q-avatar rounded icon="info" color="green-10" text-color="green-3" font-size=".85em"></q-avatar>
      </template>
    </q-banner>

    <q-btn class="glossy btn-float" round color="green-10" icon="edit">
      <q-tooltip class="bg-white text-dark">Edit data</q-tooltip>
    </q-btn>
  </q-card-section>
</template>

<script setup>
import { api } from "../../boot/axios";
import { toRefs, reactive, ref } from "vue";
import { useRoute } from "vue-router";
const member = reactive({});
const route = useRoute();
const memberId = route.params.id;
const sexIcon = ref('')
// emit data dari modal ketika sukses
const handleNewMember = (newMember) => {
  Object.assign(member, newMember);
};

try {
  const response = await api.get(`members/${memberId}`);
  Object.assign(member, response.data.data.member);
  if (member.lp.toUpperCase() == 'L') sexIcon.value = 'man'
  if (member.lp.toUpperCase() == 'P') sexIcon.value = 'woman'
} catch (error) {
  console.log("Not Found: member -> detail", error.response);
}
const {
  alamat,
  alias,
  ayah,
  ayah_id,
  ibu,
  ibu_id,
  nama,
  nama_arab,
  tgl_wafat,
  usia_wafat,
  catatan,
  lp,
  keluarga_id,
} = toRefs(member);
</script>
<style scoped>
.btn-float {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.float-bl {
  position: relative;
  top: 5px;
  text-align: end;
}
</style>
