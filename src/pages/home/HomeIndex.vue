<template>
  <div class="text-green-10">
    <span v-html="article"></span>
  </div>
  <q-btn v-if="showButtonEdit()" @click="showModal = true" round color="green-8" icon="edit"
    class="absolute-bottom-left q-ml-md q-mb-xl" />
  <q-dialog v-model="showModal" maximized>
    <q-card>
      <q-card-section>
        <div class="text-h6 text-green-10">Edit Artikel</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-editor v-model="articleEdit" min-height="5rem" :dense="$q.screen.lt.md" :toolbar="toolbar" />
      </q-card-section>
      <q-card-actions align="right" class="bg-white text-green">
        <q-btn color="positive" label="Simpan" @click="save" />
        <q-btn color="negative" label="Gagal" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { apiTokened } from 'src/config/api';
import useAuthStore from 'src/stores/auth-store';
import { notifyError, notifySuccess } from 'src/utils/notify';
import { ref, watchEffect } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar()
const emit = defineEmits(["pageTitle", "pageSubTitle", "showButtonSearch"]);
emit("pageTitle", "Ahlan wa Sahlan …");
emit("pageSubTitle", null);
emit("showButtonSearch", false);

const showModal = ref(false)
const article = ref('')
const articleEdit = ref('')

watchEffect(() => {
  if (showModal.value) articleEdit.value = article.value
})


try {
  const response = await apiTokened.get(`settings/article-introduction`)
  article.value = response.data.data.setting.val
} catch (error) {
  toArray(error.response.data.message).forEach((errorMessage) => {
    notifyError(errorMessage)
  })
}

const showButtonEdit = () => {
  if (useAuthStore().getGroup.is_superadmin || useAuthStore().getGroup.is_admin) {
    return true
  }
  return false
}

const save = async () => {
  try {
    const response = await apiTokened.put(`settings/article-introduction`, {
      val: articleEdit.value,
    });
    notifySuccess(response.data.message);
    article.value = response.data.data.setting.val
  } catch (error) {
    // console.log(error);
    toArray(error.response.data.message).forEach((message) => {
      notifyError(message);
    });
  } finally {
    showModal.value = false
  }
}
const toolbar = [
  [
    {
      label: $q.lang.editor.align,
      icon: $q.iconSet.editor.align,
      fixedLabel: true,
      options: ['left', 'center', 'right', 'justify']
    }
  ],
  ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
  ['token', 'hr', 'link', 'custom_btn'],
  [
    {
      label: $q.lang.editor.formatting,
      icon: $q.iconSet.editor.formatting,
      list: 'no-icons',
      options: [
        'p',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'code'
      ]
    },
    {
      label: $q.lang.editor.fontSize,
      icon: $q.iconSet.editor.fontSize,
      fixedLabel: true,
      fixedIcon: true,
      list: 'no-icons',
      options: [
        'size-1',
        'size-2',
        'size-3',
        'size-4',
        'size-5',
        'size-6',
        'size-7'
      ]
    },
    'removeFormat'
  ],
  ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
  ['undo', 'redo'],
]
</script>
