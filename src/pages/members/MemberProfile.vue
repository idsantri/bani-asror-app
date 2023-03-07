<template>
  <q-card-section class="bg-green-7">
    <h3 class="text-h6 no-margin">{{ nama }}</h3>
    <p class="no-margin" v-if="nama_arab.length > 1">{{ member.nama_arab }}</p>
    <p class="no-margin">{{ alamat }}</p>
  </q-card-section>
  <q-card-section>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga eveniet
    tempore praesentium vitae odit, repellat repellendus atque cupiditate non
    sed ducimus amet, itaque mollitia tenetur vero pariatur omnis voluptatem
    officiis.
  </q-card-section>
</template>

<script setup>
import { api } from "../../boot/axios";
import { toRefs, reactive } from "vue";
import { useRoute } from "vue-router";
const member = reactive({});
const route = useRoute();
const memberId = route.params.id;

// emit data dari modal ketika sukses
const handleNewMember = (newMember) => {
  Object.assign(member, newMember);
};

try {
  const response = await api.get(`members/${memberId}`);
  Object.assign(member, response.data.data.member);
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
  avatar,
} = toRefs(member);
</script>
