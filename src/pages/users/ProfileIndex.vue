<template>
  <q-card class="text-green-1">
    <q-card-section class=" bg-green-8 ">
      <div class="text-h6">Selamat Datang</div>
      <div class="text-subtitle1">{{ user.nama ? user.nama : user.username }}</div>
    </q-card-section>

    <q-card-section class="bg-green-7">
      <q-card class="text-green-10 bg-green-2">
        <q-card-section>
          <q-list separator>
            <q-item>
              <q-item-section>
                <q-item-label class="text-green-10" caption>Email</q-item-label>
                <q-item-label>{{ user.email }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="text-green-10" caption>Username</q-item-label>
                <q-item-label>{{ user.username }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="text-green-10" caption>Telepon/WA</q-item-label>
                <q-item-label>{{ user.phone ? user.phone : '-' }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>

    </q-card-section>


    <q-card-section class="bg-green-6">
      <q-card v-if="member.id" class="bg-green-3 text-green-10">
        <q-card-section>
          <q-list separator>
            <q-item v-ripple clickable :to="member.id ? '/members/' + member.id : null">
              <q-item-section>
                <q-item-label class="text-green-10" caption>Nama</q-item-label>
                <q-item-label>{{ member.nama }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="text-green-10" caption>Orang Tua</q-item-label>
                <q-item-label>
                  {{ member.ayah ? member.ayah : '?' }}
                  --
                  {{ member.ibu ? member.ibu : '?' }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>

      <q-card v-else class="bg-green-3 text-green-10">
        <q-form @submit.prevent="introduceMySelf">
          <q-card-section class="q-px-md">
            <h4 class="text-h6 no-margin q-pt-sm">Mari Perkenalkan diri Anda!</h4>
            <input v-model="user.id" type="hidden">
            <q-input v-model="message" outlined class="q-mt-md" type="textarea" :label="messageLabel" autogrow lazy-rules
              :rules="[val => val && val.length >= 20 || 'Setidaknya 20 karakter!']" :placeholder="messagePlaceholder" />
          </q-card-section>
          <q-card-actions class="q-px-md" align="right">
            <q-btn type="submit" color="green-8" label="Kirim" id="btn-submit" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-card-section>
  </q-card>
</template>

<script setup>
import constanta from '../../config/constanta'
import { apiTokened } from 'src/config/api';
import { toArray } from 'src/utils/array';
import { notifyError, notifySuccess } from 'src/utils/notify';
import { reactive, ref } from 'vue';
import authState from '../../stores/auth-store'

const user = reactive({})
const member = reactive({})
const message = ref('')
const userId = authState().getUser.id
const messagePlaceholder = `Saya Fulan bin/binti Fulan ... bin ${constanta.ANCESTOR}, atau &#10;Saya Fulan bin/binti Fulan,  istri/suami dari Fulan bin/binti Fulan ... bin ${constanta.ANCESTOR}`
const messageLabel = `Tulis Jalur Anda ke ${constanta.ANCESTOR}! *`

const emit = defineEmits(["pageTitle", "pageSubTitle"]);
emit("pageTitle", "Profil Pengguna");
emit("pageSubTitle", null);

try {
  const response = await apiTokened.get(`users/${userId}`)
  Object.assign(user, response.data.data.user)
  // console.log(response.data.data);
  if (user.member_id) {
    const responseMember = await apiTokened.get(`members/${user.member_id}`)
    Object.assign(member, responseMember.data.data.member)
  }
} catch (error) {
  console.log("Not Found: users -> profile", error.response)
}

const introduceMySelf = async () => {
  try {
    const response = await apiTokened.post("reports", {
      user_id: userId,
      category: 'introduction',
      message: message.value
    });
    // console.log(response.data.message);
    notifySuccess(response.data.message)
    document.getElementById('btn-submit').setAttribute('disabled', '')

  } catch (error) {
    toArray(error.response.data.message).forEach((errorMessage) => {
      notifyError(errorMessage)
    })
  }
}

</script>
<style scoped>
.spinner {
  text-align: center;
  margin: 30px auto;
}
</style>
