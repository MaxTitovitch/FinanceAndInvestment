<template>
  <header class="container">
    <b-navbar toggleable="lg" variant="faded" type="light" class="flex-nowrap">
      <b-navbar-brand href="/" :class="showSearch ? 'mobile-hidden' : ''">
          <img class="w-100" src="@/assets/logo.png" alt="Эмитеты Беларуси">
      </b-navbar-brand>

      <b-nav id="nav-collapse" is-nav class="w-100">
        <b-navbar-nav class="mobile-hidden d-flex justify-content-around w-100 px-5" v-if="!showSearch">
          <b-nav-item href="/terms" class="menu-link">Термины</b-nav-item>
          <b-nav-item href="/videos" class="menu-link">Видео</b-nav-item>
          <div class="menu-link d-block font-weight-bold" @mouseenter="changeDropdown" @mouseleave="changeDropdown">
            <div class="d-flex align-items-center h-100">
              <div>
                Беларусь
                <img v-if="isOpen" src="@/assets/arrow-up.svg" class="dropdown-arrow">
                <img v-if="!isOpen" src="@/assets/arrow-down.svg" class="dropdown-arrow">
              </div>
            </div>
            <div class="dropdown-items" v-show="isOpen">
              <p class="menu-link">
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
        </b-navbar-nav>

        <b-navbar-nav class="search-area w-100 mt-2" v-if="showSearch">
          <b-nav-form class="search-form" form-class="align-end justify-content-between">
            <b-form-input id="searchInput" size="sm" class="mr-sm-2 search-input" placeholder="Поиск по терминам и видео"></b-form-input>
            <b-link href="#" class="text-dark search-close mobile-hidden" @click.prevent="toggleSearch">×</b-link>
            <b-link href="#" class="text-dark search-close mobile-show" @click.prevent="() => {}">
              <img src="@/assets/search.svg" alt="Поиск">
            </b-link>
          </b-nav-form>
          <b-nav-item href="#" class="text-dark search-close mobile-show" @click.prevent="toggleSearch">
            ×
          </b-nav-item>
        </b-navbar-nav>
      </b-nav>

      <b-navbar-nav class="ml-auto mr-3" v-if="!showSearch" >
        <b-link href="#" @click.prevent="toggleSearch"><img src="@/assets/search.svg" alt="Поиск"></b-link>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto mobile-show" v-if="!showSearch">
        <b-link href="#" v-b-toggle.sidebar-right><img src="@/assets/menu.svg" alt="Поиск"></b-link>
        <b-sidebar id="sidebar-right" right shadow backdrop class="sidebar" body-class="px-3">
          <b-nav-item href="/terms" class="menu-link">Термины</b-nav-item>
          <b-nav-item href="/videos" class="menu-link">Видео</b-nav-item>
          <div class="menu-link d-block font-weight-bold" @click="changeDropdown" @mouseleave="changeDropdown">
            Беларусь
            <img v-if="isOpen" src="@/assets/arrow-up.svg" class="dropdown-arrow">
            <img v-if="!isOpen" src="@/assets/arrow-down.svg" class="dropdown-arrow">
            <div class="dropdown-items pt-2" v-show="isOpen">
              <p class="menu-link">
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
          <template slot="footer">
          <div class="p-3">
            <p class="font-weight-bold social">Социальные сети:</p>
            <a :href="Settings.TELEGRAM" target="_blank" class="mr-3">
              <img class="image-social" src="@/assets/telegram.svg" alt="Эмитеты Беларуси - YouTube">
            </a>
            <a :href="Settings.YOUTUBE" target="_blank">
              <img class="image-social" src="@/assets/youtube.svg" alt="Эмитеты Беларуси - Телеграмм">
            </a>
          </div>
        </template>
        </b-sidebar>
      </b-navbar-nav>
    </b-navbar>
  </header>
</template>

<script>
import Settings from '@/settings'

export default {
name: "Header",
  data (){
    return {
      showSearch: false,
      Settings,
      isOpen: false,
    }
  },
  methods: {
    toggleSearch() {
      this.showSearch = !this.showSearch;
      if (this.showSearch) {
        setTimeout(() => {document.getElementById('searchInput').focus()}, 200)
      }
    },
    changeDropdown() {
      this.isOpen = !this.isOpen
    }
  },
}
</script>

<style scoped>

  .social {
    font-size: 0.9em;
  }
  img {
    max-width: 70px;
  }

  .search-area {
    display: flex;
    justify-content: center;
  }

  .search-form {
    width: 34vw;
    background: #e9e9e9;
    border-radius: 10px;
    box-shadow: 3px 4px 4px #bebebe;
  }

  .search-form>* {
    width: 100%;
  }

  .search-input {
    width: 90% !important;
    background: rgba(0,0,0,0);
    border: 0;
  }

  .search-input:focus, .search-input:active {
    box-shadow: none;
    outline: none;
    background: rgba(0,0,0,0);
  }

  .search-close {
    width: 6%;
    text-align: center;
  }

  .search-close>a, .search-close {
    line-height: 100%;
    color: black!important;
    font-size: 1.6rem;
    font-weight: 500;
  }

  .search-close:hover {
    text-decoration: none;
  }

  .menu-link>a {
    color: black!important;
    font-weight: bold;
    font-size: .9rem;
  }

  .b-sidebar-body>.menu-link>a, .b-sidebar-body>.menu-link {
    font-size: 1.2rem;
    font-weight: 500!important;
  }

  .b-sidebar-body>.menu-link .dropdown-items .menu-link>a {
    font-size: 1.2rem;
    font-weight: 400!important;
  }

  div.menu-link{
    padding: 0.5rem 0 1.5rem 0;
  }

  .menu-link, .menu-link>a {
    padding: 0.5rem 0;
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

  @media screen and (max-device-width: 767px) {
    .align-end {
      align-items: center!important;
    }
    .search-area {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    .search-form {
      width: 90%;
    }

    .search-close {
      width: 10%;
      font-size: 1.7rem;
      text-align: right;

      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 100%;
    }

    .search-close>a {
      padding: 0;
    }
  }

  @media (max-width: 992px) {
    .navbar-expand-lg .navbar-nav {
      flex-direction: row !important;
    }
  }
</style>