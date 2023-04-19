<template>
  <q-list bordered separator class="bg-green-2">
    <q-item v-for="(report, index) in reports" :key="index" class="q-pa-sm">
      <q-item-section class="text-green-10">

        <q-card flat bordered class="my-card bg-green-1">
          <q-card-section>
            <div class="row items-center no-wrap">
              <div class="col">
                <!-- <div class="text-h6">Our Planet</div> -->
                <div class="text-subtitle2">{{ report.username }} | {{ report.email }} | {{ report.phone
                }}</div>
              </div>

              <div class="col-auto">
                <q-btn color="green-10" round flat icon="more_vert">
                  <q-menu cover auto-close>
                    <q-list>
                      <q-item clickable @click="checkDone(report.id)">
                        <q-item-section>Tandai sudah selesai</q-item-section>
                        <q-item-section avatar>
                          <q-icon color="green" name="done" />
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
            </div>
          </q-card-section>

          <q-card-section>
            <span v-html="report.message"></span>
          </q-card-section>

          <q-separator />

          <q-card-actions>
            <q-input type="number" outlined v-model="report.member_id" label="ID Member" placeholder="Masukkan ID Member"
              class="green">
              <template v-slot:after>
                <q-btn type="button" label="Kirim" color="green-8"
                  @click="submitIntroduction(report.id, report.user_id, report.member_id)" />
              </template>
            </q-input>
          </q-card-actions>
        </q-card>

      </q-item-section>
    </q-item>
  </q-list>
</template>
<script setup>
import { apiTokened } from '../../config/api';
import { reactive } from 'vue';
import { notifyError, notifySuccess } from 'src/utils/notify';
import { forceRerender } from 'src/utils/buttons-click';

const emit = defineEmits(["pageTitle", "pageSubTitle", "showButtonSearch"]);
emit("pageTitle", "Laporaran Pengguna");
emit("pageSubTitle", null);
emit("showButtonSearch", true);

const reports = reactive({})

try {
  const response = await apiTokened.get(`reports/introduction`)
  Object.assign(reports, response.data.data.reports)
  // console.log(reports);
} catch (error) {
  console.log("Not Found: reports -> introduction", error.response)
}

const submitIntroduction = async (id, userId, memberId) => {
  try {
    const response = await apiTokened.put(`reports/introduction`, {
      id: id,
      is_responded: true,
      user_id: userId,
      member_id: memberId
    })
    console.log(response.data);
    notifySuccess(response.data.message)
    forceRerender()
  } catch (error) {
    toArray(error.response.data.message).forEach((errorMessage) => {
      notifyError(errorMessage)
    })
  }
}

const checkDone = async (id) => {
  try {
    const response = await apiTokened.put(`reports/${id}`, { is_responded: true, })
    console.log(response.data);
    notifySuccess(response.data.message)
    forceRerender()
  } catch (error) {
    toArray(error.response.data.message).forEach((errorMessage) => {
      notifyError(errorMessage)
    })
  }
}


</script>
