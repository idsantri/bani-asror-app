<template>
  <q-banner class="no-padding no-margin bg-transparent">
    <template #avatar>
      <q-avatar rounded icon="diversity_3" color="green-10" text-color="green-3" font-size=".6em"></q-avatar>
    </template>
    <q-list>
      <q-item class="no-padding">
        <q-item-section>

          <q-list>
            <q-item clickable v-ripple :to="urlAyah" class="no-padding" dense>
              <q-item-label><span class="parent-label">Ayah:</span>{{ ayah ? ayah : '-' }}</q-item-label>
            </q-item>
            <q-item clickable v-ripple :to="urlIbu" class="no-padding" dense>
              <q-item-label><span class="parent-label">Ibu:</span>{{ ibu ? ibu : '-' }}</q-item-label>
            </q-item>
          </q-list>
        </q-item-section>

        <q-item-section v-if="keluarga_id > 0" avatar>
          <q-btn :to="/families/ + keluarga_id" color="green-2" round>
            <q-icon name="play_circle_filled" color="green-9" size="3em" />
          </q-btn>
        </q-item-section>
      </q-item>
    </q-list>
  </q-banner>
</template>
<script setup>
import { reactive, toRefs, ref } from 'vue'
const props = defineProps({
  parent: { type: Object },
})

const parent = reactive({
  keluarga_id: null,
  ayah_id: null,
  ibu_id: null,
  ayah: '',
  ibu: ''
})

Object.assign(parent, props.parent)
const { keluarga_id, ayah_id, ibu_id, ayah, ibu } = toRefs(parent)

const urlAyah = ref(null)
const urlIbu = ref(null)
if (ayah_id.value) urlAyah.value = '/members/' + ayah_id.value
if (ibu_id.value) urlIbu.value = '/members/' + ibu_id.value

</script>
<style scoped>
.parent-label {
  display: inline-block;
  width: 50px;
}
</style>
