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
// import DataTablesLib from 'datatables.net-bs5';
// import 'datatables.net-responsive-bs5'
import { ref, onMounted, onUnmounted } from "vue";

DataTable.use(DataTablesLib);
const options = ref({
  processing: true,
  serverSide: true,
  responsive: true,
  ajax: {
    url: "https://api.baniasror.net/members/search",
    type: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  },
  order: [],
  columnDefs: [
    {
      targets: 0,
      orderable: false,
      className: "dt-body-center",
      render: function (data, type, row) {
        let button = `<button type='button' class='btn btn-outline-success btn-sm m-1' onclick='copyMemberId(${row[0]})'>copy</button>`;
        button += `<button type='button' class='btn btn-outline-primary btn-sm m-1' onclick='addMemberTo(${row[0]})'>add</button>`;
        return button;
      },
    },
  ],
  language: {
    search: "Cari:",
    zeroRecords:
      "Tidak data data untuk ditampilkan. Coba kata kunci yang lain!",
    info: "Menampilkan _START_ hingga _END_, dari total _TOTAL_ data",
    // info: 'Halaman _PAGE_ dari _PAGES_ halaman',
    infoFiltered: "(disaring dari _MAX_ total data)",
    paginate: { first: "|<", previous: "«", next: "»", last: ">|" },
    lengthMenu: "_MENU_ Perhalaman",
  },
});

onMounted(() => {
  document.copyMemberId = (id) => {
    navigator.clipboard.writeText(id);
    alert(`ID Member (${id}) sudah disalin/dicopy ke clipboard`);
  };
  document.addMemberTo = (id) => {
    alert(`Tambahkan member ${id}`);
  };
});
onUnmounted(() => {
  delete document.copyMemberId;
  delete document.addMemberTo;
});
</script>
<style>
@import "datatables.net-dt";

.btn {
  border-radius: 5px;
  border-style: solid;
  border: yellow;
  color: brown;
  background-color: beige;
  padding: 5px;
  margin: 2px;
}
</style>
