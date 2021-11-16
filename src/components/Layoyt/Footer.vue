<template>
  <footer>
    <div class="container">
      <div class="row mb-3">
        <div class="col-12 col-md-4 d-flex justify-content-center">
          <div class="w-50 mt-1">
            <router-link to="/">
              <img class="w-100 image-logo" src="@/assets/logo.png" alt="Эмитенты Беларуси">
            </router-link>
          </div>
          <SocialMedia container-class="w-50"/>
        </div>
        <div class="col-6 col-md-4 d-flex flex-wrap justify-content-center mobile-hidden">
          <div>
            <p class="font-weight-bold"><router-link class="text-dark" to="/">Главная</router-link></p>
<!--            <p class="font-weight-bold"><router-link class="text-dark" to="/etf">ETF</router-link></p>-->
            <p class="font-weight-bold"><router-link class="text-dark" to="/videos">Видео</router-link></p>
            <p class="font-weight-bold"><router-link class="text-dark" to="/terms">Термины</router-link></p>
          </div>
        </div>
        <div class="col-6 col-md-4 mobile-hidden">
          <p class="font-weight-bold">Беларусь</p>
          <p class="p-no-line"><router-link class="text-dark" to="/issuers">Оценки эмитентов</router-link></p>
          <p class="p-no-line"><router-link class="text-dark" to="/banks">Оценки банков</router-link></p>
        </div>
      </div>
      <div class="row">
        <div class="col-12 text-center">
          <p class="font-weight-bold">© {{ year }} ЭБ Инвестиции. Все права защищены.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import Settings from '@/settings'
import SocialMedia from "@/components/Parts/SocialMedia";

export default {
  name: "Footer",
  components: {SocialMedia},
  data(){
    return {
      Settings
    }
  },
  computed: {
    year: () => {
      let yearStart = 2019;
      let currentYear = (new Date).getFullYear();
      return yearStart === currentYear ? currentYear : `${yearStart}-${currentYear}`;
    },
  }
}
</script>

<style scoped>

  footer {
    background: #F5F5F5;
    padding: 32px 0;
  }
  p.p-no-line {
    margin-block-start: 0;
    margin-block-end: 0;
  }

  p {
    margin-block-start: 0;
    margin-block-end: 0;
    padding-bottom: 2px;
    font-size: .8em;
  }

  .container {
    padding: 0 100px;
  }

  @media screen and (max-device-width: 767px) {

    .container {
      padding: 0 70px;
    }

    .image-logo {
      padding: 0 15px;
    }
  }
</style>