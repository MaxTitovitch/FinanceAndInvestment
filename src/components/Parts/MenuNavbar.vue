<template>
<div :class="mainClass">
  <div class="w-33 text-center">
    <router-link to="/terms" class="menu-link">Термины</router-link>
  </div>
  <div class="w-33 text-center">
    <router-link to="/videos" class="menu-link">Видео</router-link>
  </div>
  <div :class="dropdownClass + ' d-flex justify-content-center font-weight-bold w-33'">
    <div class="d-flex align-items-center h-100">
      <div
          class="dropdown-body"
          @mouseenter="changeDropdown(type === 'desktop')"
          @mouseleave="changeDropdown(type === 'desktop')"
          @click="changeDropdown(type === 'mobile')"
      >
        <span class="dropdown-button">
          Беларусь
          <img v-if="isOpen" src="@/assets/arrow-up.svg" class="dropdown-arrow">
          <img v-if="!isOpen" src="@/assets/arrow-down.svg" class="dropdown-arrow">
        </span>
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
  .menu-link>a, .menu-link, .dropdown-button {
    color: black!important;
    font-weight: bold;
    line-height: 1.1rem;
  }

  .menu-link a:hover, .menu-link:hover,  .dropdown-button:hover, .dropdown-body:hover .dropdown-button {
    text-decoration: none;
    font-size: 1.1rem;
    line-height: 1.1rem;
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
    padding: 0;
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

    .dropdown-button {
      display: flex;
      padding: 3px 0 0 0;
      font-size: 1.2rem;
    }

    a.menu-link{
      padding: 3px 0;
      font-size: 1.2rem;
    }

    p.menu-link>a {
      padding: 3px 0 3px 0;
      font-size: 1.2rem!important;
      font-weight: 600!important;
    }

    div.menu-link{
      padding: 0;
      font-size: 1.2rem;
    }

    .menu-link, .dropdown-button {
      font-size: 1.2rem;
      text-align: left;
      width: 100%;
      font-weight: 600;
    }

    .menu-link a:hover, .menu-link:hover,  .dropdown-button:hover, .dropdown-body:hover .dropdown-button {
      text-decoration: none;
      font-size: 1.2rem;
      line-height: 1.2rem;
    }

    div.menu-link.d-flex {
      justify-content: end!important;
    }

    .b-sidebar-body>div>.menu-link .dropdown-items .menu-link>a {
      font-weight: 600!important;
    }
  }
</style>