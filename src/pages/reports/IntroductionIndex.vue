<template>
  <q-list bordered separator padding class="bg-green-8">
    <q-item v-for="(report, index) in reports" :key="index">
      <q-item-section class="text-green-1">
        <q-item-label class="text-green-3" caption>{{ report.username }} | {{ report.email }} | {{ report.phone
        }}</q-item-label>
        <q-item-label><span v-html="report.message"></span></q-item-label>

        <q-separator class="q-mt-md" dark />
        <q-banner class="q-px-none bg-transparent">
          <q-form>
            <q-input type="number" outlined v-model="text" label="ID Member" placeholder="Masukkan ID Member">
              <template v-slot:after>
                <q-btn type="submit" label="Kirim" color="green-6" />
              </template>
            </q-input>
          </q-form>
        </q-banner>
      </q-item-section>

      <!-- <q-item-section side top>
        <q-item-label caption>5 min ago</q-item-label>
      </q-item-section> -->
    </q-item>
  </q-list>
</template>
<script setup>
import { apiTokened } from '../../config/api';
import { reactive, ref } from 'vue';
const isMember = ref(false)
const reports = reactive({})
try {
  const response = await apiTokened.get(`reports/introduction`)
  Object.assign(reports, response.data.data.reports)
  console.log(reports);
} catch (error) {
  console.log("Not Found: reports -> introduction", error.response)
}
</script>
