<template>
  <q-banner class="no-padding no-margin bg-transparent">
    <template #avatar>
      <q-avatar rounded icon="diversity_3" color="green-10" text-color="green-3" font-size=".6em"></q-avatar>
    </template>
    <q-list>
      <q-item class="no-padding">
        <q-item-section>
          <q-list>
            <q-item clickable v-ripple :to="ayah_id" class="no-padding" dense>
              <q-item-label><span class="parent-label">Ayah:</span>{{ ayah }}</q-item-label>
            </q-item>
            <q-item clickable v-ripple :to="ibu_id" class="no-padding" dense>
              <q-item-label><span class="parent-label">Ibu:</span>{{ ibu }}</q-item-label>
            </q-item>
          </q-list>
        </q-item-section>
        <q-item-section v-if="keluarga_id > 0" avatar>
          <q-btn :to="/families/ + keluarga_id" flat>
            <q-icon name="play_circle_filled" size="3.5em" color="green-10" />
          </q-btn>
        </q-item-section>
      </q-item>
    </q-list>
    -----------DARI LUAR -------------
  </q-banner>
</template>
<script setup>
import { reactive, toRefs } from 'vue'
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

</script>
<style scoped>
.parent-label {
  display: inline-block;
  width: 50px;
}
</style>
