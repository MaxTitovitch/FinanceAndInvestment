<template>
  <header class="container pb-2">
    <b-navbar toggleable="lg" variant="faded" type="light" class="flex-nowrap header-height">
      <b-navbar-brand href="/" :class="showSearch ? 'mobile-hidden' : ''">
          <img class="image-logo" src="@/assets/logo.png" alt="Эмитеты Беларуси">
      </b-navbar-brand>

      <b-nav id="nav-collapse" is-nav class="w-100">
        <b-navbar-nav class="mobile-hidden w-100 px-5" v-if="!showSearch">
          <MenuNavbar main-class="d-flex justify-content-around w-100"/>
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

      <b-navbar-nav class="ml-auto mr-2 search-area" v-if="!showSearch" >
        <b-link href="#" @click.prevent="toggleSearch" class="image-search">
          <img src="@/assets/search.svg" alt="Поиск">
        </b-link>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto mobile-show" v-if="!showSearch">
        <b-link href="#" v-b-toggle.sidebar-right>
          <img src="@/assets/menu.svg" alt="Меню" class="image-search">
        </b-link>
        <b-sidebar id="sidebar-right" right shadow backdrop class="sidebar" body-class="px-3">
          <MenuNavbar dropdown-class="menu-link" main-class="sidebar" first-item-claas="mt-1"/>
          <template slot="footer">
            <SocialMedia container-class="p-3 w-50" header-size=".9em"/>
        </template>
        </b-sidebar>
      </b-navbar-nav>
    </b-navbar>
  </header>
</template>

<script>
import SocialMedia from "@/components/Parts/SocialMedia";
import MenuNavbar from "@/components/Parts/MenuNavbar";

export default {
  name: "Header",
  components: {SocialMedia, MenuNavbar},
  data (){
    return {
      showSearch: false,
    }
  },
  methods: {
    toggleSearch() {
      this.showSearch = !this.showSearch;
      if (this.showSearch) {
        setTimeout(() => {document.getElementById('searchInput').focus()}, 200)
      }
    }
  },
}
</script>

<style scoped>
  .header-height {
    height: 72px;
  }

  .search-area {
    padding-right: 2px;
    padding-top: 2px;
  }

  .image-search {
    margin-top: 5px;
  }

  .image-logo {
    width: 75px;
  }


  img {
    max-width: 75px;
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

    padding-left: 3px;
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


  @media screen and (max-device-width: 767px) {
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

    .image-logo {
      width: 22vw;
      max-width: 50vw;
    }
  }


</style>