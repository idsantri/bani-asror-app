<template>
  <q-card class="text-green-10 bg-green-2">
    <q-card-section>
      <q-list separator>
        <q-item>
          <q-item-section>
            <q-item-label class="text-green-10" caption>Email:</q-item-label>
            <q-item-label>{{ user.email }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <!-- <q-btn icon="more_vert" color="green-10" flat class="q-pr-none" /> -->
            <q-btn icon="more_vert" color="green-10" flat class="q-pr-none">
              <q-menu cover auto-close>
                <q-list>
                  <q-item clickable @click="changePassword">
                    <q-item-section>Ganti password</q-item-section>
                    <q-item-section avatar>
                      <q-icon color="green" name="key" />
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label class="text-green-10" caption>Username:</q-item-label>
            <q-item-label>{{ user.username }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label class="text-green-10" caption>Telepon/WA:</q-item-label>
            <q-item-label>{{ user.phone ? user.phone : '-' }}

              <q-popup-edit v-model.number="user.phone" :validate="phoneValidation" @hide="phoneValidation"
                v-slot="scope">
                <q-input type="number" v-model.number="scope.value" hint="Nomor telepon: 628123456" :error="errorPhone"
                  :error-message="errorMessagePhone" dense autofocus @keyup.enter="scope.set">
                  <template v-slot:after>
                    <q-btn flat dense color="negative" icon="cancel" @click.stop.prevent="scope.cancel" />
                    <q-btn flat dense color="positive" icon="check_circle" @click.stop.prevent="scope.set" />
                  </template>
                </q-input>
              </q-popup-edit>

            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { reactive, ref, toRefs, watch, } from 'vue';
import authState from '../../stores/auth-store'
import { apiTokened } from 'src/config/api';
import { notifyAlert, notifyError, notifySuccess } from 'src/utils/notify';
import { forceRerender } from 'src/utils/buttons-click';

const emit = defineEmits(["username"]);
const user = reactive({})
const userId = authState().getUser.id

try {
  const response = await apiTokened.get(`users/${userId}`)
  Object.assign(user, response.data.data.user)
  emit("username", response.data.data.user.username);
} catch (error) {
  console.log("Not Found: users -> profile", error.response)
}

const errorPhone = ref(false)
const errorMessagePhone = ref('')
const phoneValidation = (val) => {
  if (val == 0 || val == '') {
    errorPhone.value = false
    errorMessagePhone.value = ''
    return true
  }

  const valid = val.toString().length > 10 && val.toString().length < 14
  if (!valid) {
    errorPhone.value = true
    errorMessagePhone.value = 'Nomor telepon tidak valid!'
    return false
  }

  errorPhone.value = false
  errorMessagePhone.value = ''
  return true
}

const { phone } = toRefs(user)
watch(phone, async (newValue, oldValue) => {
  // console.log("new", newValue);
  // console.log("old", oldValue);
  if (newValue != oldValue) {
    try {
      const response = await apiTokened.put(`users/${user.id}`, {
        phone: newValue
      })
      notifySuccess(response.data.message)
    } catch (error) {
      const errMsg = toArray(error.response.data.message)
      const exp = errMsg.some(item => item.toLowerCase().includes("expired"))
      if (exp) notifyWarningExpired()
      else if (error.response.status == 404) console.log(error.response);
      else errMsg.forEach((message) => notifyError(message))
      forceRerender()
    }
  }
});

const changePassword = () => {
  notifyAlert("Untuk mengganti password, silakan logout (keluar) terlebih dahulu. Lalu, pada halaman login, klik lupa password.<br/>Ikuti petunjuk yang diberikan.", 0)
}
</script>
