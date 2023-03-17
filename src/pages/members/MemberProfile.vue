<template>
  <!-- PROFILE -->
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

    <!-- PARENT -->
    <div class="q-pa-sm bg-green-3 text-dark q-mt-md">
      <parent-component :parent="parent" />
    </div>

    <!-- OTHERS -->
    <q-banner class="q-pa-sm bg-green-4 text-dark q-mt-md">
      <div>
        <p class="no-margin q-pb-xs"><span class="text-weight-light">Wafat: </span>{{ tgl_wafat }}</p>
        <p class="no-margin q-pb-xs"><span class="text-weight-light">Usia: </span>{{ (usia_wafat > 0 ?
          usia_wafat +
          " tahun" : "-") }}</p>
        <p class="no-margin text-weight-light"><em>{{ (catatan ? catatan : 'Catatan: -') }}</em></p>
      </div>
      <template #avatar>
        <q-avatar rounded icon="info" color="green-10" text-color="green-3" font-size=".85em"></q-avatar>
      </template>
    </q-banner>

    <q-btn class="glossy btn-float" round color="green-10" icon="edit" @click="editMember">
      <q-tooltip class="bg-green-1 text-dark">Edit data</q-tooltip>
    </q-btn>
  </q-card-section>

  <!-- <q-dialog v-model="showModalCrud" persistent>
    <member-modal-edit :member="member" modal-title="Edit Anggota" :is-new="false" @new-member="handleNewMember" />
  </q-dialog> -->
</template>

<script setup>
import apiTokened from "../../config/api-tokened";
import { toRefs, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import MemberModalEdit from "../../components/MemberCrud.vue";
import ParentComponent from "src/components/ParentComponent.vue";
import memberState from '../../stores/member-store'
import memberCrudState from '../../stores/member-crud-store'
import { showModalCrud } from "src/utils/buttons-click";

const member = reactive({});
const parent = reactive({});
const route = useRoute();
const memberId = route.params.id;
const sexIcon = ref('')
const editMember = () => {
  showModalCrud(true)
  memberCrudState().member = member
}


// const showModalCrud = ref(false);
// emit data dari modal ketika sukses
// const handleNewMember = (newMember) => {
//   Object.assign(member, newMember);
// };

try {
  const response = await apiTokened.get(`members/${memberId}`);
  Object.assign(member, response.data.data.member);
  Object.assign(parent, response.data.data.member);
  memberState().member = member;

  if (member.lp.toUpperCase() == 'L') sexIcon.value = 'man'
  if (member.lp.toUpperCase() == 'P') sexIcon.value = 'woman'
} catch (error) {
  console.log("Not Found: member -> detail", error.response);
}

const { alamat, alias, ayah, ayah_id, ibu, ibu_id, nama, nama_arab, tgl_wafat, usia_wafat, catatan, lp, keluarga_id, } = toRefs(member);

</script>
<style scoped>
.btn-float {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.parent-label {
  display: inline-block;
  width: 50px;
}
</style>
