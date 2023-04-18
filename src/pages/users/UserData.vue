<template>
  <q-card class="bg-green-7 text-green-1">
    <q-card-section class="q-pa-sm">
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
    </q-card-section>
  </q-card>

  <q-card v-if="user.id" class="bg-green-1 text-green-10">
    <!-- <q-card class="bg-green-1 text-green-10"> -->
    <q-card-section class="q-pa-sm">
      <q-list separator>
        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label overline>ID | Username | Email</q-item-label>
            <q-item-label>
              {{ user.id || '' }} |
              {{ user.username || '-' }} |
              {{ user.email || '-' }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item clickable v-ripple :to="user.member_id ? '/members/' + user.member_id : null" class="no-padding">
              <q-item-section>
                <q-item-label overline>Nama</q-item-label>
                <q-item-label>
                  {{ user.nama ? user.nama + ' (' + user.lp + ')' : '-' }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-item-section>
          <q-item-section side class="no-padding bg-green-11">
            <q-item-label class="text-green-10 cursor-pointer q-px-lg">
              {{ user.member_id ? user.member_id : "?" }}
              <q-popup-edit v-model="user.member_id" autofocus v-slot="scope">
                <q-input autofocus dense v-model="user.member_id" :model-value="user.member_id" hint="Member ID">
                  <template v-slot:after>
                    <q-btn flat dense color="negative" icon="cancel" @click.stop.prevent="scope.cancel" />
                    <q-btn flat dense color="positive" icon="check_circle"
                      @click.stop.prevent="updateMemberId(user.id)" />
                  </template>
                </q-input>
              </q-popup-edit>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label overline>Akses</q-item-label>
            <q-item-label>
              <div class="q-gutter-x-md">
                <q-toggle v-model="isGuest" color="green" label="Tamu" @click="toggleClick(user.id, 'guest', isGuest)"
                  disable />
                <q-toggle v-model="isMember" color="green" label="Anggota"
                  @click="toggleClick(user.id, 'member', isMember)" />
                <q-toggle v-model="isAdmin" color="green" label="Admin" @click="toggleClick(user.id, 'admin', isAdmin)" />
                <q-toggle v-model="isSuperadmin" color="green" label="Super Admin"
                  @click="toggleClick(user.id, 'superadmin', isSuperadmin)" disable />
              </div>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { apiTokened } from "../../config/api";
import { reactive, ref } from 'vue';
import { useQuasar } from 'quasar'
import { notifyError, notifySuccess } from "src/utils/notify";
import { toArray } from "src/utils/array";
import { forceRerender } from "src/utils/buttons-click";

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
const isSuperadmin = ref(false)
const isAdmin = ref(false)
const isMember = ref(false)
const isGuest = ref(false)
const $q = useQuasar()

try {
  const response = await apiTokened.get(`users`)
  Object.assign(users, response.data.data.users)
  // console.log(users);
} catch (error) {
  console.log("Not Found: users -> users", error.response)
}

const onRowClick = (row) => {
  Object.assign(user, row)
  // console.log(user);
  if (user.is_superadmin == 1) { isSuperadmin.value = true } else { isSuperadmin.value = false }
  if (user.is_admin == 1) { isAdmin.value = true } else { isAdmin.value = false }
  if (user.is_member == 1) { isMember.value = true } else { isMember.value = false }
  if (user.is_guest == 1) { isGuest.value = true } else { isGuest.value = false }
}

const post = async (url) => {
  try {
    const response = await apiTokened.post(url)
    // console.log("s", response.data);
    notifySuccess(response.data.message)
  } catch (error) {
    // console.log("e", error);
    toArray(error.response.data.message).forEach((errorMessage) => {
      notifyError(errorMessage)
    })
  } finally {
    forceRerender()
  }
}

const toggleClick = (id, group, value) => {
  let url = null;
  if (value) {
    url = `user-group/add/${id}/${group}`
    $q.dialog({
      title: 'Konfirmasi',
      message: 'Tetapkan yang bersangkutan sebagai ' + group.toUpperCase() + '?',
      cancel: true,
    }).onOk(() => {
      post(url)
    }).onCancel(() => {
      console.log('Aksi digagalkan');
    })
  } else {
    url = `user-group/remove/${id}/${group}`
    $q.dialog({
      title: 'Konfirmasi',
      message: 'Hapus yang bersangkutan dari group ' + group.toUpperCase() + '?',
      cancel: true,
    }).onOk(() => {
      post(url)
    }).onCancel(() => {
      console.log('Aksi digagalkan');
    })
  }
}

const updateMemberId = async (id) => {
  const isConfirmed = confirm("Update?")
  if (!isConfirmed) return
  try {
    const response = await apiTokened.put(`users/${id}`, {
      member_id: user.member_id
    })
    notifySuccess(response.data.message)
    forceRerender()
  } catch (error) {
    toArray(error.response.data.message).forEach(message => {
      notifyError(message)
    })
  }
}
</script>

