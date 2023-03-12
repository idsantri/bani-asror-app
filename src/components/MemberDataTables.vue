<template>
  <Suspense>
    <template #default>
      <data-table class="display table" :options="options" id="member-table">
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
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import memberState from '../stores/member-store'
import { useRouter } from 'vue-router';
import api from '../utils/api-tokened'
import { toArray } from '../utils/array';
import { notifySuccess } from "src/utils/notify";
const router = useRouter()

//pinia state
const title = computed(() => memberState().getTitle)
const familyId = computed(() => memberState().getFamilyId)
const isHusband = computed(() => memberState().getIsHusband)
const isWife = computed(() => memberState().getIsWife)
const isChild = computed(() => memberState().getIsChild)

let refHusband = ref(isHusband)
let refWife = ref(isWife)
let refChild = ref(isChild)
let isSearch = ref(true)
watch([refHusband, refWife, refChild], ([newHusband, newWife, newChild]) => isSearch.value = !newHusband && !newWife && !newChild)

const url = `${api.defaults.baseURL}/members/search`
const headers = { Authorization: api.defaults.headers.common.Authorization }

DataTable.use(DataTablesLib);
const options = ref({
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
      render: function (data, type, row) {
        const name = row[1].replace(/['"]+/g, '')
        let button = `<button type='button' class='btn btn-copy' onclick='copyMemberId(${row[0]})'></button>`
        button += `<button type='button' class='btn btn-add' onclick='addMemberTo(${row[0]},"${name}")'></button>`
        return button
      },
    },
    {
      targets: 1,
      render: function (data, type, row) {
        const result = `<span class="nama" onClick='goToMember(${row[0]})'>${row[1]}</span>`
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
    paginate: { first: 'Pertama', previous: 'Sebelumnya', next: 'Selanjutnya', last: 'Terakhir' },
    lengthMenu: '_MENU_ Perhalaman',
  },
  autoWidth: false,
  // dom: 'bftip',
})

onMounted(() => {

  document.addMemberTo = async (memberId, memberName) => {
    // console.group(isHusband.value, isWife.value, isChild.value)
    const isConfirmed = confirm(`Tambahkan ${memberName}`)
    if (!isConfirmed) return
    try {
      let response
      if (isHusband.value || isWife.value) {
        const data = isHusband.value ? { suami_id: memberId } : { istri_id: memberId }
        response = await api.put(`families/${familyId.value}`, data)
      }
      if (isChild.value) {
        response = await api.post(`families/${familyId.value}/children`, { member_id: memberId })
      }
      document.getElementById('close-modal-search').click()
      alert(response.data.message)

      document.getElementById('btn-force-rerender').click()

    } catch (error) {
      toArray(error.response.data.message).forEach((errorMessage) => {
        alert(errorMessage)
      })
    }
  };

  document.copyMemberId = (id) => {
    navigator.clipboard.writeText(id);
    notifySuccess(`ID Member (${id}) sudah disalin/dicopy ke clipboard`)
  };

  document.goToMember = (id) => {
    router.push(`/members/${id}`)
    // document.getElementById('close-modal-search').click()
  };
});

onUnmounted(() => {
  delete document.copyMemberId;
  delete document.addMemberTo;
  delete document.goToMember;
});

const addNew = () => {
  const isConfirmed = confirm(`Buat data baru? (${title.value})`)
  if (!isConfirmed) return
  document.getElementById('add-new-member').click()
}
</script>
<style lang="scss">
@import "datatables.net-dt";

.nama {
  color: rgb(17, 77, 17);
  cursor: pointer;
}


@media screen and (max-width: 480px) {
  table>tbody>tr:nth-child(odd)>td {
    padding: 4px;
  }

  table>tbody>tr:nth-child(even)>td {
    padding: 4px;
  }
}

.btn {
  border-radius: 10px;
  border-style: none;
  border-color: transparent;
  outline: 0;
  padding: 5px;
  margin: 5px;
  display: inline-block;
  width: 30px;
  cursor: pointer;
}

.btn-copy {
  background-color: teal;

  &::before {
    content: '\e14d';
    font-family: 'Material Icons';
    color: lightgreen;
  }
}

.btn-add {
  background-color: indigo;

  &::before {
    content: '\e7fe';
    font-family: 'Material Icons';
    color: lightgreen;
  }
}
</style>
