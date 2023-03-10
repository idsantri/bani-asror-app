<template>
  <div class="sidebar-menu">
    <ul class="menu">
      <li class="sidebar-title">Bani</li>
      <li class="sidebar-item">
        <router-link to="/members/1" class="sidebar-link">
          <img src="../assets/avatars/male.svg" alt="ikon pria" style="height: 18px" />
          <span>Asyiq</span>
        </router-link>
      </li>
      <li class="sidebar-item">
        <router-link to="/members/2" class="sidebar-link">
          <img src="../assets/avatars/male.svg" alt="ikon pria" style="height: 18px" />
          <span>Nur Khotim</span>
        </router-link>
      </li>
      <li class="sidebar-item">
        <router-link to="/members/3" class="sidebar-link">
          <img src="../assets/avatars/male.svg" alt="ikon pria" style="height: 18px" />
          <span>Umar</span>
        </router-link>
      </li>
      <li class="sidebar-item">
        <router-link to="/members/4" class="sidebar-link">
          <img src="../assets/avatars/male.svg" alt="ikon pria" style="height: 18px" />
          <span>Muhyiddin</span>
        </router-link>
      </li>
      <li class="sidebar-item">
        <router-link to="/members/5" class="sidebar-link">
          <img src="../assets/avatars/female.svg" alt="ikon wanita" style="height: 18px" />
          <span>Bintu Asror 1</span>
        </router-link>
      </li>
      <li class="sidebar-item">
        <router-link to="/members/6" class="sidebar-link">
          <img src="../assets/avatars/female.svg" alt="ikon wanita" style="height: 18px" />
          <span>Bintu Asror 2</span>
        </router-link>
      </li>
      <li class="sidebar-item">
        <router-link to="/members/7" class="sidebar-link">
          <img src="../assets/avatars/female.svg" alt="ikon wanita" style="height: 18px" />
          <span>Bintu Asror 3</span>
        </router-link>
      </li>

      <!-- <li class='sidebar-title'>Pengaturan</li>
      <li class="sidebar-item">
        <a href="<?= site_url('user'); ?>" class='sidebar-link'>
          <i class="fa-solid fa-users-gear"></i>
          <span>Pengaturan User</span>
        </a>
      </li>

      <li class='sidebar-title'>Tentang</li>
      <li class="sidebar-item">
        <a href="<?= site_url('about/contact'); ?>" class='sidebar-link'>
          <i class="fa-solid fa-phone"></i>
          <span>Huhungi Kami</span>
        </a>
      </li> -->
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.menu {
  padding-left: 0;
  margin-top: 2rem;

  .sidebar-title {
    padding: 0.7rem 1.5rem;
    font-size: 0.8rem;
    font-weight: 600;
    color: #888;
    text-transform: uppercase;
  }

  .sidebar-link {
    display: block;
    padding: 0.7rem 1.5rem;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    transition: all 0.5s;
    text-decoration: none;

    &:hover {
      span {
        opacity: 1;
      }
    }

    &>span {
      color: #053382;
      font-weight: 500;
      margin-left: 1rem;
      opacity: 0.8;
    }
  }

  .sidebar-item {
    list-style: none;
    margin-top: 0.5rem;
    position: relative;

    &.has-sub {
      .sidebar-link:after {
        content: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9" style="fill:none;stroke:gray;stroke-width:1"></polyline></svg>');
        position: absolute;
        color: #ccc;
        right: 15px;
        top: 12px;
        display: block;
      }
    }

    &.active {
      .sidebar-link {
        background-color: #e8f3ff;
      }

      .sidebar-link:before {
        content: "";
        position: absolute;
        left: 0;
        height: 100%;
        top: 0;
        bottom: 0;
        background-color: rgba(#2eaaf4, 0.5);
        width: 5px;
      }
    }
  }

  .submenu {
    list-style: none;
    max-height: 0;
    transition: max-height 0.5s ease-out;
    overflow: hidden;

    &.active {
      max-height: 500px;
      // transition: max-height 0.2s ease-in;
    }

    li {
      a {
        padding: 0.7rem 3rem;
        display: block;
        color: #676767;
        font-size: 0.75rem;
        font-weight: 500;
        letter-spacing: 0.5px;
        transition: all 0.2s;

        &:hover {
          margin-left: 0.3rem;
        }
      }
    }
  }
}
</style>
