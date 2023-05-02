<template>
  <q-list>
    <q-item clickable v-ripple to="/home">
      <q-item-section avatar>
        <q-avatar color="green-3" text-color="green-10">
          <q-icon name="home" size="sm" />
        </q-avatar>
      </q-item-section>
      <q-item-section class="text-green-1">
        <q-item-label>Beranda</q-item-label>
        <q-item-label caption></q-item-label>
      </q-item-section>
    </q-item>
    <q-separator />

    <q-item clickable v-ripple v-for="(side, index) in sideLinks" :key="index" :to="side.link">
      <q-item-section avatar>
        <q-avatar color="green-3" text-color="green-10">
          <q-icon :name="side.icon" size="md" />
        </q-avatar>
      </q-item-section>
      <q-item-section class="text-green-1">
        <q-item-label>{{ side.name }}</q-item-label>
        <q-item-label caption>{{ side.caption }}</q-item-label>
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

    <q-item clickable v-ripple to="/about">
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


const sideLinks = [
  {
    name: 'Asyiq',
    caption: 'bin Asror',
    icon: 'man',
    link: '/members/1',
  },
  {
    name: 'Nur Khotim',
    caption: 'bin Asror',
    icon: 'man',
    link: '/members/2',
  },
  {
    name: 'Umar',
    caption: 'bin Asror',
    icon: 'man',
    link: '/members/3',
  },
  {
    name: 'Muhyiddin',
    caption: 'bin Asror',
    icon: 'man',
    link: '/members/4',
  },
  {
    name: 'Istri Ansor',
    caption: 'bintu Asror',
    icon: 'woman',
    link: '/members/5',
  },
  {
    name: 'Istri Hamim',
    caption: 'bintu Asror',
    icon: 'woman',
    link: '/members/6',
  },
  {
    name: 'Istri Abbas',
    caption: 'bintu Asror',
    icon: 'woman',
    link: '/members/7',
  },
]
</script>
<style lang="scss" scoped></style>
