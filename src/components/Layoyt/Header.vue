<template>
    <div class="w-100" :class="{['main-class']: isMainClass || isShowSidebar}">
        <header class="container">
            <b-navbar toggleable="lg" variant="faded" type="light" class="flex-nowrap header-height pb-0">
                <b-navbar-brand to="/" :class="showSearch ? 'mobile-hidden' : ''">
                    <h2 class="font-weight-bold" :class="{['light-color']: isMainClass || isShowSidebar}">
                        Binvesting</h2>
                </b-navbar-brand>

                <b-nav id="nav-collapse" is-nav class="w-100">
                    <b-navbar-nav class="mobile-hidden w-100 d-flex justify-content-end" v-if="!showSearch">
                        <MenuNavbar
                                main-class="d-flex justify-content-around w-75"
                                type="desktop"
                                :is-main-class="isMainClass"
                        />
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
                                            <div v-for="(entity, id) in group[groups.type]" :key="id"
                                                 class="col-12 p-1">
                                                <a href="#" class="entity-name"
                                                   @click.prevent="find(entity.name, groups.type)"
                                                   v-if="groups.type === 'videos'">
                                                    <img src="@/assets/noshow.svg" alt="Не просмотрено" class="eye"
                                                         v-if="entity.showType === 'NOSHOW'">
                                                    <img src="@/assets/show.svg" alt="Просмотрено" class="eye"
                                                         v-if="entity.showType === 'SHOW'">
                                                    <img src="@/assets/fullshow.svg" alt="Просмотрено полностью"
                                                         class="eye"
                                                         v-if="entity.showType === 'FULLSHOW'">
                                                    <span class="ml-2">{{ entity.name }}</span>
                                                </a>
                                                <a href="#" class="entity-name"
                                                   @click.prevent="find(entity.name, groups.type)"
                                                   v-if="groups.type === 'terms'">
                                                    {{ entity.name }}
                                                    <img src="@/assets/eye.svg" alt="Просмотрено" class="eye"
                                                         v-if="entity.isShow">
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

                <b-navbar-nav class="ml-auto mobile-show" v-if="!showSearch">
                    <b-link href="#" v-b-toggle.sidebar-right>
                        <img :src="require(`@/assets/menu${isMainClass || isShowSidebar ? '' : '-dark'}.svg`)"
                             alt="Меню"
                             class="image-search mt-0">
                    </b-link>
                    <b-sidebar
                            id="sidebar-right"
                            right
                            no-header
                            body-class="sidebar px-3"
                            width="100%"
                            v-model="isShowSidebar"
                    >
                        <MenuNavbar
                                dropdown-class="menu-link"
                                main-class="sidebar"
                                first-item-claas="mt-1"
                                type="mobile"
                                isShowSidebar="isShowSidebar"
                                :isMainClass="isMainClass || isShowSidebar"
                                v-on:hide-sidebar="hideMenu"
                        />
                        <template slot="footer">
                            <div class="links pa-2">
                                <a :href="link.link" v-for="(link, i) in links" :key="i">
                                    <img :src="`/img/contacts/${link.photo}`" :alt="link.title">
                                    {{ link.title }}
                                </a>
                            </div>
                        </template>
                    </b-sidebar>
                </b-navbar-nav>
            </b-navbar>
        </header>
    </div>
</template>

<script>
import MenuNavbar from '@/components/Parts/MenuNavbar';
import {mapGetters} from 'vuex';
import Settings from '@/settings';

export default {
  name: 'Header',
  components: {MenuNavbar},
  mounted() {
  },
  data() {
    return {
      searchQuery: '',
      isShowSidebar: false,
      links: [
        {
          title: '+375 (29) 768-19-40',
          link: Settings.LINK_PHONE,
          photo: `phone-light.svg`,
        },
        {
          title: '@eugene_levy',
          link: Settings.LINK_TELEGRAM,
          photo: `telegram-light.svg`,
        },
        {
          title: 'ЭБ Инвестиции',
          link: Settings.LINK_YOUTUBE,
          photo: `youtube-light.svg`,
        },
        {
          title: 'sales@binvesting.ru',
          link: Settings.LINK_EMAIL,
          photo: `email-light.svg`,
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      videoGroups: 'getGroupVideo',
      termGroups: 'getGroupTerms',
      showSearch: 'getSearch',
    }),
    isMainClass() {
      return this.$route.path === '/';
    },
    allGroups() {
      return [{array: this.videoGroups, type: 'videos'}, {array: this.termGroups, type: 'terms'}];
    },
    isHaveElements() {
      let count = 0, entity;
      for (let k = 0; k < this.allGroups.length; k++) {
        for (let i = 0; i < this.allGroups[k].array?.length; i++) {
          for (let j = 0; j < this.allGroups[k].array[i][this.allGroups[k].type]?.length; j++) {
            return ++count;
          }
        }
      }
      return count === 0 ? 0 : entity;
    },
  },
  watch: {
    isShowSidebar(value) {
      if (value) {
        document.querySelector('html').classList.add('hide-scroll');
        document.querySelector('html').classList.remove('show-scroll');
      } else {
        document.querySelector('html').classList.add('show-scroll');
        document.querySelector('html').classList.remove('hide-scroll');
      }
    },
  },
  updated() {
    if (this.showSearch) {
      document.getElementById('searchInput').focus();
    }
  },
  methods: {
    toggleSearch() {
      this.searchQuery = '';
      this.$store.commit('toggleSearch');
    },
    find(name, type, isGo = true) {
      this.searchQuery = name;
      this.$store.dispatch('initGroupVideos');
      this.$store.dispatch('initGroupTerms', {lastGroupName: '!'});
      switch (type) {
        case 'videos':
          this.$store.commit('filtrateVideos', this.searchQuery);
          this.$store.commit('filtrateTerms', '');
          break;
        case 'terms':
          this.$store.commit('filtrateVideos', '');
          this.$store.commit('filtrateTerms', this.searchQuery);
          break;
      }
      if (isGo) {
        this.$store.commit('setSearch', false);
        if (this.$route.name !== type) {
          this.$store.commit('setFromSearch', true);
          this.$router.push(type);
        }
      }
    },
    filtrateData() {
      this.$store.dispatch('initGroupVideos');
      this.$store.dispatch('initGroupTerms', {lastGroupName: '!'});
      this.$store.commit('filtrateVideos', this.searchQuery);
      this.$store.commit('filtrateTerms', this.searchQuery);
    },
    focusSearch() {
      document.getElementById('searchInput').focus();
    },
    hideMenu: function() {
      this.isShowSidebar = false;
    },
  },
};
</script>

<style scoped>
header {
    padding-bottom: 0;
}

.main-class {
    background: #243EE9;
}

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


.light-color {
    color: white;
}


.links {
    display: flex;
    flex-wrap: wrap;
}

.links a {
    width: 100%;
    margin-top: 1rem;
    color: #494949;
}

.links a:hover {
    text-decoration: none;
    opacity: 0.8;
}

.links a img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
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
    header {
        padding-bottom: 0;
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

<style>
.b-sidebar {
    overflow: hidden;
    padding-bottom: 3rem;
    top: 72px !important;
    height: calc(100vh - 72px) !important;
}

.b-sidebar.bg-light, .b-sidebar-footer, .b-sidebar-body {
    background-color: #243EE9 !important;
}

.b-sidebar-footer {
    padding: 0 1rem;
}
</style>