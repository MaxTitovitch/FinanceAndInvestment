<template>
  <div class="footer-panel">
    <div class="footer-child">
      <img src="@/assets/map/logoFooter.svg" class="footer-logo">
      <img src="@/assets/map/social.svg" class="social-text">
      <div class="social-icons">
        <a href="https://t.me/belarus_issuers" style="margin-right: 20px">
          <img src="@/assets/map/telegramIcon.svg">
        </a>
        <a href="https://www.youtube.com/channel/UCMoQpocwH_cZdm1crXH59nA">
          <img src="@/assets/map/youtubeIcon.svg">
        </a>
      </div>

    </div>

    <div class="footer-child">
      <img src="@/assets/map/rightsText.svg" style="position: relative; top: 150px">
    </div>

    <div class="footer-child">
      <div
          style="width: 170px; font-size: 12px; line-height: 20px; text-align: left; display: inline-block; margin-top: 34px">
        <div style="font-weight: bold;">Полезные ссылки<br></div>
        <a href="https://t.me/belarus_issuers/14" style="color: #494949">
          Коэффициент ЭБ
        </a><br>
        <a href="https://telegra.ph/MODEL-ANALIZA-EHMITENTOV-30-04-29-2" style="color: #494949">
          Модель анализа эмитентов
        </a>
      </div>
    </div>


    <div class="mobile-footer-layout">
      <div style="width: 100%; height: 80px; overflow: hidden; padding-top: 10px;">
        <div class="logo-container">
          <img src="@/assets/map/logoFooter.svg" class="footer-logo">
          <img src="@/assets/map/social.svg" class="social-text">
          <div class="social-icons">
            <a href="https://t.me/belarus_issuers" style="margin-right: 12px">
              <img src="@/assets/map/telegramIcon.svg">
            </a>
            <a href="https://www.youtube.com/channel/UCMoQpocwH_cZdm1crXH59nA">
              <img src="@/assets/map/youtubeIcon.svg">
            </a>
          </div>
        </div>

        <div class="links-container">
          <div style="width: 143px; display: inline-block; text-align: left">
            <div style="font-weight: bold;">Полезные ссылки</div>
            <a href="https://t.me/belarus_issuers/14" style="color: #494949">
              Коэффициент ЭБ
            </a><br>
            <a href="https://telegra.ph/MODEL-ANALIZA-EHMITENTOV-30-04-29-2" style="color: #494949">
              Модель анализа эмитентов
            </a><br>
          </div>

        </div>
      </div>

      <div style="width: 100%; height: 20px; text-align: center; font-size: 12px; line-height: 18px;">
        <div style="font-weight: bold; padding-top: 2px">© 2020 ЭБ Беларусь. Все права защищены.</div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style>
#app-module .mobile-footer-layout {
  display: none;
}

#app-module .footer-panel {
  width: 100%;
  height: 100%;
  background: #F5F5F5;
  overflow: hidden;
}

#app-module .footer-child {
  float: left;
  text-align: center;
  width: 33.33%;
  height: 170px;
  box-shadow: none;
}

#app-module .footer-logo {
  margin: 34px 20px 0;
}

#app-module .social-text {
  margin-top: -15px;
}

#app-module .social-icons {
  position: relative;
  left: 68px;
  bottom: 40px;
}

@media only screen and (max-width: 1290px) {
  #app-module .footer-child {
    display: none;
  }

  #app-module .mobile-footer-layout {
    display: inline-block;
    width: 100%;
    height: 100%;
  }

  #app-module .logo-container {
    float: left;
    text-align: center;
    width: 50%;
    height: 100%;
    box-shadow: none
  }

  #app-module .links-container {
    padding-top: 5px;
    float: left;
    text-align: center;
    width: 50%;
    height: 100%;
    box-shadow: none;
    font-size: 11px;
  }

  #app-module .footer-logo {
    margin: 10px 0 0 5px;
    width: 74px;
  }

  #app-module .social-text {
    margin: -20px 0 5px 5px;
    width: 90px;
  }

  #app-module .social-icons {
    position: relative;
    bottom: 30px;
    left: 40px;
  }

  #app-module .laceta-text {
    width: 90px;
    position: relative;
    left: 15px;
    top: 2px
  }

  #app-module .laceta-logo {
    width: 137px;
  }

  @media only screen and (max-width: 350px) {
    #app-module .logo-container {
      float: left;
      text-align: left;
      width: 60%;
      height: 100%;
      box-shadow: none;
    }

    #app-module .links-container {
      padding-top: 5px;
      float: left;
      text-align: center;
      width: 40%;
      height: 100%;
      box-shadow: none;
      font-size: 10px;
    }

    #app-module .footer-logo {
      margin: 10px 0 0 5px;
      width: 70px;
    }

    #app-module .social-text {
      margin: -20px 0 5px 5px;
      width: 80px;
    }

    #app-module .social-icons {
      position: relative;
      bottom: 30px;
      left: 85px;
    }
  }
}
</style>