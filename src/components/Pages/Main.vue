<template>
    <main>
        <div>
            <vue-headful title="Главная - ЭБ Инвестиции" description="Главная - ЭБ Инвестиции"/>
        </div>
        <div class="container-fluid p-0 position-relative">
            <img :src="require(`@/assets/main/${backgroundImage}`)" alt="Background" class="background-image">
            <div class="main-row d-flex justify-content-center align-items-center main-text">
                <h1>Ваш проводник в <br> финансовый мир!</h1>
            </div>
        </div>
        <div class="container my-5">
            <div class="row">
                <div v-for="(link, i) in links" :key="i" class="col-12 links-row">
                    <div class="links-row-body">
                        <div v-if="link.position === 'right' && !isMobile" class="w-50 d-flex justify-content-center">
                            <img :src="`/img/main/${link.photo}`" :alt="link.title" class="link-image" :class="link.otherClass || ''">
                        </div>
                        <div class="d-flex flex-column justify-content-between links-description p-3">
                            <div>
                                <h2>{{ link.title }}</h2>
                                <p class="mobile-hidden">{{ link.description }}</p>
                            </div>
                            <div v-if="isMobile" class="w-100 d-flex justify-content-center">
                                <img :src="`/img/main/${link.photo}`" :alt="link.title" :class="link.otherClass || 'w-75'">
                            </div>
                            <div class="buttons mt-3 mt-md-0">
                                <div class="w-100">
                                    <router-link :to="link.link">Подробнее</router-link>
                                </div>
                            </div>
                        </div>
                        <div v-if="link.position === 'left' && !isMobile" class="w-50 d-flex justify-content-center">
                            <img :src="`/img/main/${link.photo}`" :alt="link.title" class="link-image" :class="link.otherClass || ''">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>

export default {
  name: 'Main',
  mounted() {
    this.$store.commit('setSearch', false);
  },
  data() {
    return {
      links: [
        {
          title: 'Консультации и софт для компаний',
          description: 'Поможем вашему бизнесу оптимизировать внутренние финансы и привлечь внешнее финансирование на выгодных условиях. Соберем инвестиционный портфель под ваши цели.',
          position: 'right',
          link: '/services',
          photo: 'services.svg',
        },
        {
          title: 'Обучение инвестированию и финансам',
          description: 'Библиотека терминов и образовательные видео по теме инвестиций и финансов',
          position: 'left',
          link: '/terms',
          photo: 'terms.svg',
        },
        {
          title: 'Аналитика по компаниям и банкам',
          description: 'Аналитика по различным аспектам деятельности сотен компаний и банков',
          position: 'right',
          link: '/issuers',
          photo: 'issuers.svg',
        },
        {
          title: 'Наша книга',
          description: 'В нашей книге мы собрали все необходимые знания для старта в инвестициях с нуля. В ней вы найдете обзор основных инвестиционных инструментов, рекомендации по выбору портфеля, а также в книге развенчаны основные мифы и заблуждения новичков.',
          position: 'left',
          link: '/book',
          photo: 'book.png',
          otherClass: 'w-50',
        },
      ],
    };
  },
  computed: {
    backgroundImage() {
      return window.mobileCheck() ? 'main-photo-phone.png' : 'main-photo.png'
    },
    isMobile() {
      return window.mobileCheck();
    }
  },
};
</script>

<style scoped>

h1 {
    font-style: normal;
    font-weight: bold;
    text-align: center;
    color: #FFFFFF;
    padding-bottom: 5rem;
    font-size: 3.4rem;
    line-height: 3.4rem;
}

h2 {
    font-weight: bold;

    font-size: 2.9rem;
    line-height: 2.9rem;
}

.link-image {
    width: 70%;
}

.links-description {
    width: 50%;
    padding-left: 3rem;
}

.main-row {
    height: calc(100vh - 72px);
}

.main-text {
    position: relative;
    z-index: 100;
}

.background-image {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: calc(100vh - 72px);
}

.links-row {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    margin-bottom: 2rem;
}

.links-row-body {
    width: 100%;
    display: flex;
    justify-content: space-between;
    background: #FFFFFF;
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.25);
    border-radius: 45px;
    padding: 3rem;
}

.buttons {
    margin-top: 10px;
    display: flex;
    align-items: end;
    flex-wrap: wrap;
}

.buttons a {
    background: #243EE9 !important;
    color: white;
    padding: 10px;
    max-width: 65%;
    text-align: center;
    display: block;
    border-radius: 10px;
    width: 205px;
}

.buttons a:hover {
    text-decoration: none;
    background: #0f21a5 !important;
}

a:hover {
    text-decoration: none;
}

@media screen and (max-device-width: 767px) {
    h1 {
        font-size: 30px;
        line-height: 30px;
    }

    h2 {
        text-align: center;
        font-size: 18px;
        line-height: 18px;
        margin-bottom: 12px;
    }

    main {
        min-height: auto;
    }

    .links-row-body {
        flex-direction: column;
    }

    .links-description {
        width: 100%;
    }

    .links-row-body {
        padding: 1rem;
    }

    .buttons > div {
        display: flex;
        justify-content: center;
    }

    .links-row-body {
        border-radius: 14px;
    }
}

</style>
