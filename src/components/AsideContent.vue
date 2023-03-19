<template>
  <q-list>
    <q-item clickable v-ripple to="/members/1">
      <q-item-section avatar>
        <q-avatar color="green-3" text-color="green-10">
          <q-icon name="man" size="md" />
        </q-avatar>
      </q-item-section>
      <q-item-section class="text-green-1">
        <q-item-label>Asyiq</q-item-label>
        <q-item-label caption>bin Asror</q-item-label>
      </q-item-section>
    </q-item>

    <q-item clickable v-ripple to="/members/2">
      <q-item-section avatar>
        <q-avatar color="green-3" text-color="green-10">
          <q-icon name="man" size="md" />
        </q-avatar>
      </q-item-section>
      <q-item-section class="text-green-1">
        <q-item-label>Nur Khotim</q-item-label>
        <q-item-label caption>bin Asror</q-item-label>
      </q-item-section>
    </q-item>

    <q-item clickable v-ripple to="/members/3">
      <q-item-section avatar>
        <q-avatar color="green-3" text-color="green-10">
          <q-icon name="man" size="md" />
        </q-avatar>
      </q-item-section>
      <q-item-section class="text-green-1">
        <q-item-label>Umar</q-item-label>
        <q-item-label caption>bin Asror</q-item-label>
      </q-item-section>
    </q-item>

    <q-item clickable v-ripple to="/members/4">
      <q-item-section avatar>
        <q-avatar color="green-3" text-color="green-10">
          <q-icon name="man" size="md" />
        </q-avatar>
      </q-item-section>
      <q-item-section class="text-green-1">
        <q-item-label>Muhyiddin</q-item-label>
        <q-item-label caption>bin Asror</q-item-label>
      </q-item-section>
    </q-item>

    <q-item clickable v-ripple to="/members/5">
      <q-item-section avatar>
        <q-avatar color="green-3" text-color="green-10">
          <q-icon name="woman" size="md" />
        </q-avatar>
      </q-item-section>
      <q-item-section class="text-green-1">
        <q-item-label>Fulanah-1</q-item-label>
        <q-item-label caption>bintu Asror</q-item-label>
      </q-item-section>
    </q-item>

    <q-item clickable v-ripple to="/members/6">
      <q-item-section avatar>
        <q-avatar color="green-3" text-color="green-10">
          <q-icon name="woman" size="md" />
        </q-avatar>
      </q-item-section>
      <q-item-section class="text-green-1">
        <q-item-label>Fulanah-2</q-item-label>
        <q-item-label caption>bintu Asror</q-item-label>
      </q-item-section>
    </q-item>

    <q-item clickable v-ripple to="/members/7">
      <q-item-section avatar>
        <q-avatar color="green-3" text-color="green-10">
          <q-icon name="woman" size="md" />
        </q-avatar>
      </q-item-section>
      <q-item-section class="text-green-1">
        <q-item-label>Fulanah-3</q-item-label>
        <q-item-label caption>bintu Asror</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />
    <q-item clickable v-ripple to="/users">
      <q-item-section avatar>
        <q-avatar color="green-3" text-color="green-10">
          <q-icon name="manage_accounts" size="sm" />
        </q-avatar>
      </q-item-section>
      <q-item-section class="text-green-1">
        <q-item-label>Users</q-item-label>
        <q-item-label caption>Pengaturan Pengguna</q-item-label>
      </q-item-section>
    </q-item>

    <q-item clickable v-ripple to="" @click="idsantri">
      <q-item-section avatar>
        <q-avatar color="green-3" text-color="green-10">
          <q-icon name="contact_mail" size="sm" />
        </q-avatar>
      </q-item-section>
      <q-item-section class="text-green-1">
        <q-item-label>Tentang</q-item-label>
        <q-item-label caption>Hubungi Kami</q-item-label>
      </q-item-section>
    </q-item>

  </q-list>
</template>
<script setup>
const idsantri = () => window.location.replace("https://fb.me/idsantri.page");

</script>
<style lang="scss" scoped></style>
