<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Parts/Header";
import Footer from "@/components/Parts/Footer";

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
  #app {
    min-height: 100vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    flex-direction: column;
  }
  #app>*{
    width: 100%;
  }
  #app>*:nth-child(2){
    flex: 2;
  }

  .menu-dropdown-item {
    color: black!important;
    font-weight: bold!important;
    padding: 0!important;
    background: rgba(0,0,0,0) !important;
    border: 0!important;
  }

  .menu-dropdown-item::after{
    display: inline-block;
    margin-left: 0.255em;
    vertical-align: 0.255em;
    content: "";
    border: 0!important;
  }

  .menu-dropdown-item:focus, .menu-dropdown-item:active {
    box-shadow: none!important;
    outline: none!important;
    background: rgba(0,0,0,0)!important;
  }

  @media screen and (max-device-width: 767px) {
    div.mobile-hidden, ul.mobile-hidden, .mobile-hidden {
      display: none!important;
    }
  }

  @media screen and (min-device-width: 768px) {
    div.mobile-show, ul.mobile-show, .mobile-show {
      display: none!important;
    }
  }
</style>
