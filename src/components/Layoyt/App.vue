<template>
    <div id="app" :class="isBlur ? 'blur' : ''" @click="hideBlur($event)">
        <Header/>
        <router-view/>
        <Footer/>
        <Contacts />
    </div>
</template>

<script>
import Header from '@/components/Layoyt/Header';
import Footer from '@/components/Layoyt/Footer';
import {mapGetters} from 'vuex';
import Contacts from '@/components/Parts/Contacts';

export default {
  name: 'App',
  components: {
    Contacts,
    Header,
    Footer,
  },
  computed: {
    ...mapGetters({
      isBlur: 'getIsBlur',
    }),
  },
  methods: {
    hideBlur($event) {
      if ($event.target.getAttribute('target') !== '_blank') {
        $event.preventDefault();
        this.$store.commit('hideTerms');
      }
    },
  },
};
</script>

<style>
@font-face {
    font-family: 'Rubik';
    src: local('Rubik'),
    local('Rubik-Regular'),
    /*url('~@/assets/fonts/Rubik.woff2') format('woff2'),*/
    /*url('~@/assets/fonts/Rubik.woff') format('woff'),*/
    url('~@/assets/fonts/Rubik-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
}
@font-face {
    font-family: 'RobotoBold';
    src: local('RobotoBold'),
    local('Roboto-Bold'),
    url('~@/assets/fonts/Roboto-Bold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
}
@font-face {
    font-family: 'RubikBold';
    src: local('RubikBold'),
    local('Rubik-Regular'),
    url('~@/assets/fonts/Rubik-ExtraBold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
}

.blur {
    background: rgba(0, 0, 0, .1);
}

h1, h2 {
    font-family: RubikBold,serif!important;

}

html, body {
    min-height: 100vh;
    overflow-x: hidden;
    font-family: Rubik, serif;
}

body {
    overflow-x: hidden!important;
    overflow-y: hidden!important;
}

html {
    overflow-y: overlay;
    max-width: 100vw!important;
    overflow-x: hidden;
}

.modal-open {
    overflow-y: hidden!important;
    padding-right: 0!important;
}

body.hide-scroll, html.hide-scroll {
    overflow-y: hidden!important;
}

body.show-scroll, html.show-scroll {
    overflow-y: overlay!important;
}

/**::-webkit-scrollbar-track {*/
/*    border-radius: 15px;;*/
/*    background-color: rgba(0,0,0,0);*/
/*    opacity: 0;*/
/*    visibility: hidden;*/
/*}*/


/**::-webkit-scrollbar {*/
/*    width: 10px;*/
/*    background-color: rgba(0,0,0,0);*/
/*}*/


/**::-webkit-scrollbar-thumb {*/
/*    border-radius: 15px;*/
/*    !*background-color: rgba(0,0,0,0);*!*/
/*    background-clip: content-box;*/
/*    border: 2px solid rgba(0,0,0,0);*/
/*    background-color: #4a4a4a;*/
/*}*/


/**::-webkit-scrollbar-thumb:hover {*/
/*    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);*/
/*    background-color: #4a4a4a;*/
/*}*/

.pointer {
    cursor: pointer;
}

h1, h2, h3, h4, h5, p, span, div {
    font-family: Rubik, serif;
}

#app {
    min-height: 100vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    flex-direction: column;
    padding-top: 72px;
}

#app > * {
    width: 100%;
}

#app > *:nth-child(2) {
    flex: 2;
}

main {
    min-height: 100%;
}

.menu-dropdown-item {
    color: black !important;
    font-weight: bold !important;
    padding: 0 !important;
    background: rgba(0, 0, 0, 0) !important;
    border: 0 !important;
}

.menu-dropdown-item::after {
    display: inline-block;
    margin-left: 0.255em;
    vertical-align: 0.255em;
    content: "";
    border: 0 !important;
}

.menu-dropdown-item:focus, .menu-dropdown-item:active {
    box-shadow: none !important;
    outline: none !important;
    background: rgba(0, 0, 0, 0) !important;
}

.w-33 {
    width: 33.333% !important;
}

nav {
    z-index: 1001;
}

@media screen and (max-device-width: 767px) {
    div.mobile-hidden, ul.mobile-hidden, .mobile-hidden {
        display: none !important;
    }
}

@media screen and (min-device-width: 768px) {
    div.mobile-show, ul.mobile-show, .mobile-show {
        display: none !important;
    }
}

@media (min-width: 2000px) {
    #app {
        /*min-height: auto;*/
    }
}
</style>
