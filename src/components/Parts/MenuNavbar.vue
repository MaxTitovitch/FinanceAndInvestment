<template>
<div :class="mainClass">
  <b-nav-item href="/terms" class="menu-link">Термины</b-nav-item>
  <b-nav-item href="/videos" class="menu-link">Видео</b-nav-item>
  <div :class="dropdownClass + ' d-block font-weight-bold'" @mouseenter="changeDropdown" @mouseleave="changeDropdown" @click="changeDropdown">
    <div class="d-flex align-items-center h-100 dropdown-button">
      <div>
        Беларусь
        <img v-if="isOpen" src="@/assets/arrow-up.svg" class="dropdown-arrow">
        <img v-if="!isOpen" src="@/assets/arrow-down.svg" class="dropdown-arrow">
      </div>
    </div>
    <div class="dropdown-items" v-show="isOpen">
      <p :class="'menu-link ' + firstItemClaas">
        <a class="text-dark" :href="Settings.MARKET_MAP" target="_blank">Карта рынка облигаций</a>
      </p>
      <p class="menu-link">
        <a class="text-dark" href="/issuers">Оценки эмитентов</a>
      </p>
      <p class="menu-link">
        <a class="text-dark" href="/banks">Оценки банков</a>
      </p>
    </div>
  </div>
</div>
</template>

<script>
import Settings from '@/settings'

export default {
  name: "MenuNavbar",
  props: {
    dropdownClass: {
      default: ''
    },
    mainClass: {},
    firstItemClaas: {
      default: ''
    }
  },
  data (){
    return {
      Settings,
      isOpen: false,
    }
  },
  methods: {
    changeDropdown() {
      this.isOpen = !this.isOpen
    }
  },
}
</script>

<style scoped>
  .menu-link>a {
    color: black!important;
    font-weight: bold;
    font-size: .9rem;
  }

  .b-sidebar-body>div>.menu-link>a, .b-sidebar-body>div>.menu-link {
    font-size: 1.2rem;
    font-weight: 500!important;
  }

  .b-sidebar-body>div>.menu-link .dropdown-items .menu-link>a {
    font-size: 1.2rem;
    font-weight: 400!important;
  }

  div.menu-link{
    padding: 0.3rem 0 0.9rem 0;
  }

  .menu-link, .menu-link>a {
    padding: 0.3rem 0;
  }

  .menu-link:hover {
    cursor: pointer;
  }

  .dropdown-items {
    position: absolute;
  }
  .dropdown-items p{
    margin-block-start: 0;
    margin-block-end: 0;
  }

  .dropdown-button:hover {
    cursor: pointer;
  }

  @media (max-width: 992px) {
    .navbar-expand-lg .navbar-nav>* {
      flex-direction: row !important;
    }
  }
</style>