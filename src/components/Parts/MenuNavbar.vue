<template>
<div :class="mainClass">
  <router-link to="/terms" class="menu-link">Термины</router-link>
  <router-link to="/videos" class="menu-link">Видео</router-link>
  <div
      :class="dropdownClass + ' d-block font-weight-bold'"
      @mouseenter="changeDropdown(type === 'desktop')"
      @mouseleave="changeDropdown(type === 'desktop')"
      @click="changeDropdown(type === 'mobile')"
  >
    <div class="d-flex align-items-center h-100 dropdown-button">
      <div>
        Беларусь
        <img v-if="isOpen" src="@/assets/arrow-up.svg" class="dropdown-arrow">
        <img v-if="!isOpen" src="@/assets/arrow-down.svg" class="dropdown-arrow">
      </div>
    </div>
    <div class="dropdown-items" v-show="isOpen">
      <p :class="'menu-link ' + firstItemClaas">
        <a class="text-dark" :href="Settings.LINK_MARKET_MAP" target="_blank">Карта рынка облигаций</a>
      </p>
      <p class="menu-link">
        <router-link class="text-dark" to="/issuers">Оценки эмитентов</router-link>
      </p>
      <p class="menu-link">
        <router-link class="text-dark" to="/banks">Оценки банков</router-link>
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
    },
    type: {
      default: 'desktop'
    }
  },
  data (){
    return {
      Settings,
      isOpen: false,
    }
  },
  methods: {
    changeDropdown(isNeedType) {
      if(isNeedType){
        this.isOpen = !this.isOpen
      }
    }
  },
}
</script>

<style>
  .menu-link>a, .menu-link {
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
    display: block;
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
    padding: 0;
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