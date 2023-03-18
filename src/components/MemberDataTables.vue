<template>
  <Suspense>
    <template #default>
      <data-table class="display table" :options="options" id="member-data-table">
        <thead>
          <tr>
            <th style="text-align: center;">!</th>
            <th>Nama</th>
            <th>Pasangan</th>
            <th>Ortu-1</th>
            <th>Ortu-2</th>
            <th>Ortu-3</th>
          </tr>
        </thead>
      </data-table>
    </template>
    <template #fallback>
      <p>...loading</p>
    </template>
  </Suspense>
</template>

<script setup>
import DataTable from "datatables.net-vue3";
import DataTablesLib from "datatables.net-dt";
import { ref, onMounted, onUnmounted, computed } from 'vue';
import memberCrud from '../stores/member-crud-store'
import { useRouter } from 'vue-router';
import api from '../config/api-tokened'
import { toArray } from '../utils/array';
import { notifyError, notifySuccess } from "src/utils/notify";
import { forceRerender, closeModalSearch } from '../utils/buttons-click'
const router = useRouter()

//pinia state
const familyId = computed(() => memberCrud().getFamilyId)
const isHusband = computed(() => memberCrud().getIsHusband)
const isWife = computed(() => memberCrud().getIsWife)
const isChild = computed(() => memberCrud().getIsChild)
const isNew = computed(() => memberCrud().getIsNew)

const url = `${api.defaults.baseURL}/members/search`
const headers = { Authorization: api.defaults.headers.common.Authorization }
DataTable.use(DataTablesLib);
const options = ref({
  isNew: isNew.value,
  processing: true,
  serverSide: true,
  responsive: true,
  ajax: {
    url: url,
    type: 'POST',
    headers: headers,
  },
  order: [],
  columnDefs: [
    {
      targets: 0,
      orderable: false,
      className: 'dt-body-center',
      render: function (data, type, row, meta) {
        let result = null
        const name = row[1].replace(/['"]+/g, '')
        if (isNew.value) result = `<button type='button' class='btn btn-add' onclick='addMemberTo(${data},"${name}")'></button>`
        else result = `<button type='button' class='btn btn-copy' onclick='copyMemberId(${data})'></button>`
        return result
      },
    },
    {
      targets: 1,
      render: function (data, type, row, meta) {
        let result = null
        if (isNew.value) result = data
        else result = `<span class="nama-link" onClick='goToMember(${row[0]})'>${row[1]}</span>`
        return result
      },
    },
  ],
  language: {
    search: 'Cari:',
    zeroRecords: 'Tidak data data untuk ditampilkan. Coba kata kunci yang lain!',
    info: 'Menampilkan _START_ hingga _END_, dari total _TOTAL_ data',
    // info: 'Halaman _PAGE_ dari _PAGES_ halaman',
    infoFiltered: '(disaring dari _MAX_ total data)',
    paginate: { first: '↑', previous: '←', next: '→', last: '↓' },
    lengthMenu: '_MENU_ Perhalaman',
  },
  autoWidth: false,
  // dom: 'bftip',
})

onMounted(() => {
  document.addMemberTo = async (memberId, memberName) => {
    const isConfirmed = confirm(`Tambahkan ${memberName}`)
    if (!isConfirmed) return
    try {
      let response
      if (isHusband.value) response = await api.put(`families/${familyId.value}`, { suami_id: memberId })
      if (isWife.value) response = await api.put(`families/${familyId.value}`, { istri_id: memberId })
      if (isChild.value) response = await api.post(`families/${familyId.value}/children`, { member_id: memberId })
      closeModalSearch()
      notifySuccess(response.data.message)
      forceRerender()
    } catch (error) {
      toArray(error.response.data.message).forEach((errorMessage) => {
        notifyError(errorMessage)
      })
    }
  };

  document.copyMemberId = (id) => {
    navigator.clipboard.writeText(id);
    notifySuccess(`ID Member (${id}) sudah disalin/dicopy ke clipboard`)
  };

  document.goToMember = (id) => {
    router.push(`/members/${id}`)
  };
});

onUnmounted(() => {
  delete document.copyMemberId;
  delete document.addMemberTo;
  delete document.goToMember;
});

</script>
<style lang="scss">
@import "datatables.net-dt";
</style>
