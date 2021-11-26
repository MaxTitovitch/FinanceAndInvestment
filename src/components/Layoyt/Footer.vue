<template>
    <footer>
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-2 d-flex justify-content-center footer-logo-body">
                    <div class="w-100 mt-1">
                        <router-link to="/" class="footer-logo">
                            <h3 class="font-weight-bold">Binvesting</h3>
                        </router-link>
                    </div>
                </div>
                <div class="col-12 col-md-6 pl-5 d-flex flex-wrap justify-content-between align-items-center footer-link">
                    <router-link v-for="(link, i) in filtratedLinks" :key="i" class="text-dark" :to="link.link">
                        {{ link.title }}
                    </router-link>
                </div>
                <div class="col-12 col-md-4 d-flex flex-wrap align-items-end flex-column footer-link mt-4 mt-md-0">
                    <a class="text-dark pointer" target="_blank" @click="openLink(Settings.LINK_PHONE)">
                        <img :src="`/img/contacts/phone.svg`" class="mobile-show mr-1" alt="Phone">
                        <span>+375 (29) 768-19-40</span>
                    </a>
                    <div class="footer-social d-flex justify-content-end mt-2">
                        <a class="text-dark pointer" target="_blank" @click="openLink(link.link)" v-for="(link, i) in socialLinks" :key="i">
                            <img :src="`/img/contacts/${link.photo}`" :alt="link.title" class="mr-1">
                            <span class="mobile-show">{{ link.title }}</span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="row mt-4 mobile-hidden">
                <div class="col-12 text-center">
                    <p class="font-weight-bold">© {{ year }} Binvesting. Все права защищены.</p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
import Settings from '@/settings';

export default {
  name: 'Footer',
  data() {
    return {
      Settings,
      links: [
        {title: 'Услуги', link: '/services'},
        {title: 'Кейсы', link: '/cases'},
        {title: 'Книга', link: '/book'},
        {title: 'Обучение', link: '/terms', onlyDesktop: true},
        {title: 'Аналитика', link: '/issuers', onlyDesktop: true},
        {title: 'Видео', link: '/videos', onlyMobile: true},
        {title: 'Термины', link: '/terms', onlyMobile: true},
        {title: 'Оценка эмитентов', link: '/issuers', onlyMobile: true},
        {title: 'Оценка банков', link: '/banks', onlyMobile: true},
      ],
      socialLinks: [
        {
          title: '@binvesting',
          link: Settings.LINK_TELEGRAM,
          photo: 'telegram.svg',
        },
        {
          title: 'ЭБ Инвестиции',
          link: Settings.LINK_YOUTUBE,
          photo: 'youtube.svg',
        },
        {
          title: 'sales@binvesting.ru',
          link: Settings.LINK_EMAIL,
          photo: 'email.svg',
        },
      ],
    };
  },
  computed: {
    year: () => {
      let yearStart = 2019;
      let currentYear = (new Date).getFullYear();
      return yearStart === currentYear ? currentYear : `${yearStart}-${currentYear}`;
    },
    filtratedLinks() {
      return this.links.filter(link => {
        return window.mobileCheck() ? !link.onlyDesktop : !link.onlyMobile;
      })
    },
  },
  methods: {
    openLink(link) {
      window.open(link, '_blank');
    },
  },
};
</script>

<style scoped>

.footer-logo {
    color: black;
}
.footer-logo h3 {
    font-family: RobotoBold,serif!important;
    font-weight: bold;
}


.footer-logo:hover {
    text-decoration: none;
}

footer {
    background: #F5F5F5;
    padding: 32px 0 10px;
    max-width: 100vw;
}

.footer-link {
    color: black;
}

.footer-link a:hover {
    font-weight: bold;
    text-decoration: none;
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
    .footer-link {
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: start!important;
        padding: 0!important;
    }

    .container {
        padding: 30px!important;
    }

    footer {
        padding: 10px 0!important;
    }

    .footer-social {
        flex-direction: column;
        margin-top: 0!important;
    }

    .footer-logo-body {
        padding: 0!important;
    }
}
</style>