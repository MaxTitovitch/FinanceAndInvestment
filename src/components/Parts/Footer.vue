<template>
  <footer>
    <div class="container">
      <div class="row mb-3">
        <div class="col-12 col-md-4 d-flex justify-content-center">
          <div class="w-50 mt-1">
            <a href="/">
              <img class="w-100" src="@/assets/logo.png" alt="Эмитеты Беларуси">
            </a>
          </div>
          <div class="px-3">
            <p class="font-weight-bold">Социальные сети:</p>
            <a :href="Settings.TELEGRAM" target="_blank">
              <img class="image-social" src="@/assets/telegram.svg" alt="Эмитеты Беларуси - YouTube">
            </a>
            <a :href="Settings.YOUTUBE" target="_blank">
              <img class="image-social" src="@/assets/youtube.svg" alt="Эмитеты Беларуси - Телеграмм">
            </a>
          </div>
        </div>
        <div class="col-6 col-md-4 d-flex flex-wrap justify-content-center mobile-hidden">
          <div>
            <p class="font-weight-bold"><a class="text-dark" href="/videos">Видео</a></p>
            <p class="font-weight-bold"><a class="text-dark" href="/terms">Термины</a></p>
          </div>
        </div>
        <div class="col-6 col-md-4 mobile-hidden">
          <p class="font-weight-bold">Беларусь</p>
          <p class="p-no-line"><a class="text-dark" :href="Settings.MARKET_MAP" target="_blank">Карта рынка облигаций</a></p>
          <p class="p-no-line"><a class="text-dark" href="/issuers">Оценки эмитентов</a></p>
          <p class="p-no-line"><a class="text-dark" href="/banks">Оценки банков</a></p>
        </div>
      </div>
      <div class="row">
        <div class="col-12 text-center">
          <p class="font-weight-bold">© {{ year }} ЭБ Беларусь . Все права защищены.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import Settings from '@/settings'

export default {
  name: "Footer",
  data(){
    return {
      Settings
    }
  },
  computed: {
    year: () => {
      let yearStart = 2020;
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
  .image-social {
    width: 40px;
    height: auto;
    margin: 5px;
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


  @media screen and (min-device-width: 768px) {
    .container {
      padding: 0 100px;
    }
  }
</style>