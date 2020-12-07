<template>
  <header class="container pb-4">
    <b-navbar toggleable="lg" variant="faded" type="light" class="flex-nowrap header-height">
      <b-navbar-brand to="/" :class="showSearch ? 'mobile-hidden' : ''">
        <img class="image-logo" src="@/assets/logo.png" alt="Эмитенты Беларуси">
      </b-navbar-brand>

      <b-nav id="nav-collapse" is-nav class="w-100">
        <b-navbar-nav class="mobile-hidden w-100 px-5" v-if="!showSearch">
          <MenuNavbar main-class="d-flex justify-content-around w-100" type="desktop"/>
        </b-navbar-nav>

        <b-navbar-nav class="search-area w-100 mt-2" v-if="showSearch">
          <b-nav-form class="search-form" form-class="align-end justify-content-between">
            <b-form-input
                id="searchInput"
                size="sm"
                class="mr-sm-2 search-input"
                placeholder="Поиск по терминам и видео"
                autocomplete="off"
                @keypress.enter.prevent
                @input="filtrateData"
                v-model="searchQuery"
            ></b-form-input>
            <b-link href="#" class="text-dark search-close mobile-hidden" @click.prevent="toggleSearch">×</b-link>
            <b-link href="#" class="text-dark search-close mobile-show" @click.prevent="focusSearch">
              <img src="@/assets/search.svg" alt="Поиск">
            </b-link>
          </b-nav-form>
          <b-nav-item href="#" class="text-dark search-close mobile-show" @click.prevent="toggleSearch">
            ×
          </b-nav-item>
        </b-navbar-nav>
        <div class="item-list" v-if="searchQuery && showSearch">
          <div class="item-list-body">
            <div v-for="(groups, index) in allGroups" :key="index">
              <div v-for="(group, index) in groups.array" :key="index">
                <h3 class="group-name-small" v-if="group[groups.type].length > 0">
                  {{ group.name }}
                </h3>
                <div class="container-fluid">
                  <div class="row">
                    <div v-for="(entity, id) in group[groups.type]" :key="id" class="col-12 p-1">
                      <a href="#" class="entity-name" @click.prevent="find(entity.name, groups.type)"
                         v-if="groups.type === 'videos'">
                        <img src="@/assets/noshow.svg" alt="Не просмотрено" class="eye"
                             v-if="entity.showType === 'NOSHOW'">
                        <img src="@/assets/show.svg" alt="Просмотрено" class="eye" v-if="entity.showType === 'SHOW'">
                        <img src="@/assets/fullshow.svg" alt="Просмотрено полностью" class="eye"
                             v-if="entity.showType === 'FULLSHOW'">
                        <span class="ml-2">{{ entity.name }}</span>
                      </a>
                      <a href="#" class="entity-name" @click.prevent="find(entity.name, groups.type)" v-if="groups.type === 'terms'">
                        {{ entity.name }}
                        <img src="@/assets/eye.svg" alt="Просмотрено" class="eye" v-if="entity.isShow">
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div v-if="isHaveElements === 0">Ничего не найдено</div>
          </div>
        </div>
      </b-nav>

      <b-navbar-nav class="ml-auto mr-2 search-area" v-if="!showSearch">
        <b-link href="#" @click.prevent="toggleSearch" class="image-search">
          <img src="@/assets/search.svg" alt="Поиск">
        </b-link>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto mobile-show" v-if="!showSearch">
        <b-link href="#" v-b-toggle.sidebar-right>
          <img src="@/assets/menu.svg" alt="Меню" class="image-search">
        </b-link>
        <b-sidebar id="sidebar-right" right shadow backdrop class="sidebar" body-class="px-3">
          <MenuNavbar dropdown-class="menu-link" main-class="sidebar" first-item-claas="mt-1" type="mobile"/>
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
import {mapGetters} from "vuex";

export default {
  name: "Header",
  components: {SocialMedia, MenuNavbar},
  mounted() {
  },
  data() {
    return {
      // showSearch: false,
      searchQuery: '',
    }
  },
  computed: {
    ...mapGetters({
      videoGroups: 'getGroupVideo',
      termGroups: 'getGroupTerms',
      showSearch: 'getSearch',
    }),
    allGroups() {
      return [{array: this.videoGroups, type: 'videos'}, {array: this.termGroups, type: 'terms'}]
    },
    isHaveElements() {
      let count = 0, entity;
      for (let k = 0; k < this.allGroups.length; k++) {
        for (let i = 0; i < this.allGroups[k].array?.length; i++) {
          for (let j = 0; j <  this.allGroups[k].array[i][this.allGroups[k].type]?.length; j++) {
            return ++count;
          }
        }
      }
      return count === 0 ? 0 : entity;
    }
  },
  updated() {
    if (this.showSearch) {
      document.getElementById('searchInput').focus();
    }
  },
  methods: {
    toggleSearch() {
      this.searchQuery = ''
      this.$store.commit('toggleSearch')
    },
    find(name, type, isGo = true) {
      this.searchQuery = name
      this.$store.dispatch('initGroupVideos');
      this.$store.dispatch('initGroupTerms', {lastGroupName: '!'});
      switch (type){
        case 'videos':
          this.$store.commit('filtrateVideos', this.searchQuery)
          this.$store.commit('filtrateTerms', '')
          break;
        case 'terms':
          this.$store.commit('filtrateVideos', '')
          this.$store.commit('filtrateTerms', this.searchQuery)
          break;
      }
      if(isGo) {
        this.$store.commit('setSearch', false)
        if (this.$route.name !== type) {
          this.$store.commit('setFromSearch', true)
          this.$router.push(type)
        }
      }
    },
    filtrateData() {
      this.$store.dispatch('initGroupVideos');
      this.$store.dispatch('initGroupTerms', {lastGroupName: '!'});
      this.$store.commit('filtrateVideos', this.searchQuery)
      this.$store.commit('filtrateTerms', this.searchQuery)
    },
    focusSearch() {
      document.getElementById('searchInput').focus();
    },
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


.group-name-small {
  padding-top: 10px;
  font-weight: bold;
  font-size: 18px;
  line-height: 18px;
  color: #243EE9;
}

.item-list {
  position: absolute;
  z-index: 1000;
  left: 0;
  top: 60px;
  width: 100%;
  padding: 0 15px;
  display: flex;
  justify-content: center;
}

.item-list-body {
  border: 1px solid #949090;
  padding: 5px;
  background: white;
  border-radius: 10px;
  max-height: 60vh;
  overflow-y: auto;
  width: 34vw;
  margin-left: 95px;
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

.search-form > * {
  width: 100%;
}

.search-input {
  width: 90% !important;
  background: rgba(0, 0, 0, 0);
  border: 0;
}

.search-input:focus, .search-input:active {
  box-shadow: none;
  outline: none;
  background: rgba(0, 0, 0, 0);
}

.search-close {

  padding-left: 3px;
  width: 6%;
  text-align: center;
}

.search-close > a, .search-close {
  line-height: 100%;
  color: black !important;
  font-size: 1.6rem;
  font-weight: 500;
}

.search-close:hover {
  text-decoration: none;
}

.entity-name {
  font-size: 16px;
  line-height: 19px;
  color: #000000;
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

  .search-close > a {
    padding: 0;
  }

  .image-logo {
    width: 22vw;
    max-width: 50vw;
  }


  .item-list {
    justify-content: end;
  }

  .item-list-body {

    max-height: 75vh;
    width: 90%;
    margin-left: 0;
  }
}


</style>