<template>
  <div :class="mainClass + ' template'">
    <div class="text-center d-flex justify-content-center align-items-center"
         :class="{'w-20': type === 'desktop'}">
      <router-link to="/" class="menu-link" @click.native="hideMenu">Главная</router-link>
    </div>
    <div class="text-center d-flex justify-content-center align-items-center"
         :class="{'w-20': type === 'desktop'}">
      <router-link to="/services" class="menu-link" @click.native="hideMenu">Услуги</router-link>
    </div>
    <div class="text-center d-flex justify-content-center align-items-center"
         :class="{'w-20': type === 'desktop'}">
      <router-link to="/cases" class="menu-link" @click.native="hideMenu">Кейсы</router-link>
    </div>
    <div class="text-center d-flex justify-content-center align-items-center"
         :class="{'w-20': type === 'desktop'}">
      <router-link to="/book" class="menu-link" @click.native="hideMenu">Книга</router-link>
    </div>
    <!--        <div class="w-20 text-center d-flex justify-content-center align-items-center">-->
    <!--            <router-link to="/etf" class="menu-link" @click.native="hideMenu">ETF</router-link>-->
    <!--        </div>-->
    <div class="d-flex font-weight-bold justify-content-start"
         :class="{'w-20': type === 'desktop', [dropdownClass]: true}">
      <div class="d-flex align-items-center h-100">
        <div
            class="dropdown-body"
            @mouseenter="changeDropdown(type === 'desktop', 0)"
            @mouseleave="changeDropdown(type === 'desktop', 0)"
            @click="changeDropdown(type === 'mobile', 0)"
        >
          <span class="dropdown-button">
            Обучение
          </span>
          <div class="dropdown-items" v-show="isOpen[0]">
            <p :class="'menu-link ' + firstItemClaas">
              <router-link class="dark-text" to="/terms" @click.native="hideMenu">Термины
              </router-link>
            </p>
            <p class="menu-link">
              <router-link class="dark-text" to="/videos" @click.native="hideMenu">Видео
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex font-weight-bold justify-content-start"
         :class="{'w-20': type === 'desktop', [dropdownClass]: true}">
      <div class="d-flex align-items-center h-100">
        <div
            class="dropdown-body"
            @mouseenter="changeDropdown(type === 'desktop', 1)"
            @mouseleave="changeDropdown(type === 'desktop', 1)"
            @click="changeDropdown(type === 'mobile', 1)"
        >
          <span class="dropdown-button">
            Аналититка
          </span>
          <div class="dropdown-items" v-show="isOpen[1]">
            <p :class="'menu-link ' + firstItemClaas">
              <router-link class="dark-text" to="/issuers" @click.native="hideMenu">Оценки эмитентов
              </router-link>
            </p>
            <p class="menu-link">
              <router-link class="dark-text" to="/banks" @click.native="hideMenu">Оценки банков
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center d-flex justify-content-center align-items-center"
         :class="{'w-20': type === 'desktop'}">
      <router-link to="/contacts" class="menu-link" @click.native.prevent="hideMenu">Контакты</router-link>
    </div>
  </div>
</template>

<script>
import Settings from '@/settings';
import Vue from 'vue';

export default {
  name: 'MenuNavbar',
  props: {
    dropdownClass: {
      default: '',
    },
    mainClass: {},
    firstItemClaas: {
      default: '',
    },
    type: {
      default: 'desktop',
    },
  },
  data() {
    return {
      Settings,
      isOpen: [
        false,
        false,
      ]
    };
  },
  methods: {
    changeDropdown(isNeedType, index) {
      if (isNeedType) {
        Vue.set(this.isOpen, index, !this.isOpen[index])
      }
    },
    hideMenu() {
      this.$emit('hide-sidebar');
    },
  },
};
</script>

<style>
.w-20 {
  width: 20% !important;
}

.menu-link > a, .menu-link, .dropdown-button {
  color: black !important;
  font-weight: bold;
  line-height: 1.1rem;
}

.dropdown-button {
  display: flex;
}

.dropdown-button > .dropdown-arrow.up {
  display: none;
}

.dropdown-button > .dropdown-arrow.down {
  display: block;
}

.dropdown-button:hover > .dropdown-arrow.up,
.dropdown-button:focus > .dropdown-arrow.up,
.dropdown-body:hover .dropdown-button > .dropdown-arrow.up,
.dropdown-body:focus .dropdown-button > .dropdown-arrow.up {
  display: block;
}

.dropdown-button:hover > .dropdown-arrow.down,
.dropdown-button:focus > .dropdown-arrow.down,
.dropdown-body:hover .dropdown-button > .dropdown-arrow.down,
.dropdown-body:focus .dropdown-button > .dropdown-arrow.down {
  display: none;
}

.dropdown-arrow {
  margin-left: 3px;
}

.menu-link a:hover, .menu-link:hover, .dropdown-button:hover, .dropdown-body:hover .dropdown-button {
  text-decoration: none;
  /*font-size: 1.1rem;*/
  /*line-height: 1.1rem;*/
  color: #243EE9 !important;
}

.b-sidebar-body > div > .menu-link > a, .b-sidebar-body > div > .menu-link {
  font-size: 1.2rem;
  font-weight: 500 !important;
}

.b-sidebar-body > div > .menu-link .dropdown-items .menu-link > a {
  font-size: 1.2rem;
  font-weight: 400 !important;
}

div.menu-link {
  padding: 0.3rem 0 0.9rem 0;
}

p.menu-link > a {
  padding-top: 7px;
}

.menu-link, .menu-link > a {
  padding: 0;
  display: block;
}

.menu-link:hover {
  cursor: pointer;
}

.dropdown-items {
  position: absolute;
  background-color: white;
  padding: 5px;
  border-radius: 10px;
}

.dropdown-items p {
  margin-block-start: 0;
  margin-block-end: 0;
  padding: 0;
}

.dropdown-button:hover {
  cursor: pointer;
}


@media (max-width: 992px) {
  .navbar-expand-lg .navbar-nav > * {
    flex-direction: row !important;
  }

  .dropdown-button {
    display: flex;
    padding: 3px 0 0 0;
    font-size: 1.2rem;
  }

  a.menu-link {
    padding: 3px 0;
    font-size: 1.2rem;
    margin-top: 1.1rem;
    font-weight: bold !important;
  }

  p.menu-link > a {
    padding: 3px 0 3px 0;
    font-size: 1.2rem !important;
    margin-top: 1.1rem;
  }

  .dropdown-items p.menu-link > a {
    font-weight: 400 !important;
  }

  div.menu-link {
    padding: 0;
    font-size: 1.2rem;
    margin-top: 1.1rem;
    font-weight: bold !important;
  }

  .menu-link, .dropdown-button {
    font-size: 1.2rem;
    text-align: left;
    width: 100%;
    font-weight: bold !important;
  }

  .menu-link a:hover, .menu-link:hover, .dropdown-button:hover, .dropdown-body:hover .dropdown-button {
    text-decoration: none;
    /*font-size: 1.2rem;*/
    /*line-height: 1.2rem;*/
    color: #243EE9 !important;
  }

  div.menu-link.d-flex {
    /*justify-content: end !important;*/
  }

  .dark-text {
    color: black !important;
  }

  .dark-text {
    color: #243EE9 !important;
  }

  .dropdown-items {
    background-color: unset;
    padding: 0;
    border-radius: 0;
  }

  /*.b-sidebar-body>div>.menu-link .dropdown-items .menu-link>a {*/
  /*  font-weight: 600!important;*/
  /*}*/
}
</style>