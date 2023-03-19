<template>
  <q-table title="Users" :rows="users" :columns="columns" :filter="filter" class="bg-green-1 text-green-10">
    <template v-slot:top-right>
      <q-input borderless dense debounce="300" v-model="filter" placeholder="Cari...">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
    <template v-slot:body="props">
      <q-tr :props="props" @click="onRowClick(props.row)">
        <!-- <q-td auto-width>
          <q-btn size="sm" color="green-8" round dense @click="props.expand = !props.expand"
            :icon="props.expand ? 'remove' : 'add'" />
        </q-td> -->
        <q-td key="username" :props="props">
          {{ props.row.username }}
        </q-td>
        <q-td key="nama" :props="props">
          {{ props.row.nama }}
        </q-td>
        <q-td key="groups" :props="props">
          [{{ props.row.groups }}]
        </q-td>
        <q-td key="email" :props="props">
          {{ props.row.email }}
        </q-td>
      </q-tr>

      <!-- <q-tr v-show="props.expand" :props="props">
        <q-td colspan="100%">
          <div class="text-left">
            Email: {{ props.row.email }}
          </div>
          <div class="text-left">
            Akses:
            <q-toggle v-model="isMember" color="green" label="Anggota"
              @click="toggleClick(props.row.username, 'member', isMember)" />
            <q-toggle v-model="isAdmin" color="green" label="Admin" @click="toggleClick('admin', isAdmin)" />
            <q-toggle v-model="isRoot" color="green" label="Root" @click="toggleClick('root', isRoot)" />
          </div>
        </q-td>
      </q-tr> -->
    </template>
  </q-table>

  <q-card-section class="q-pa-sm bg-green-1">
    <q-card class="bg-green-8 text-green-1">
      <q-card-section v-if="user.id">
        <p>Username: {{ user.username }}</p>
        <p>Email: {{ user.email }}</p>
        <p>Nama: {{ user.nama }}</p>
        <q-toggle v-model="isMember" color="green" label="Anggota" @click="toggleClick(user.id, 'member', isMember)" />
        <q-toggle v-model="isAdmin" color="green" label="Admin" @click="toggleClick(user.id, 'admin', isAdmin)" />
        <q-toggle v-model="isRoot" color="green" label="Root" @click="toggleClick(user.id, 'root', isRoot)" />
      </q-card-section>
    </q-card>
  </q-card-section>
</template>

<script setup>
import { apiTokened } from "../../config/api";
import { reactive, ref } from 'vue';
const columns = [
  // { name: '', align: 'center', label: '!', field: '', sortable: false },
  { name: 'username', align: 'left', label: 'Username', field: 'username', sortable: true },
  { name: 'nama', label: 'Nama', align: 'left', field: 'nama', sortable: true },
  { name: 'groups', label: 'Group', align: 'left', field: 'groups', sortable: false },
  { name: 'email', label: 'Email', align: 'left', field: 'email', sortable: true },
]


const user = reactive({})
const users = reactive([])
const filter = ref('')
const isRoot = ref(false)
const isAdmin = ref(false)
const isMember = ref(false)
try {
  const response = await apiTokened.get(`users`)
  Object.assign(users, response.data.data.users)

} catch (error) {
  console.log("Not Found: users -> users", error.response)
}

const onRowClick = (row) => {
  Object.assign(user, row)
  if (user.root == 1) { isRoot.value = true } else { isRoot.value = false }
  if (user.admin == 1) { isAdmin.value = true } else { isAdmin.value = false }
  if (user.anggota == 1) { isMember.value = true } else { isMember.value = false }

}

const toggleClick = (id, group, value) => {
  console.log(id);
  console.log(group);
  console.log(value);
}

</script>

