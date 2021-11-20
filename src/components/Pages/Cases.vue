<template>
    <main>
        <div>
            <vue-headful title="Наши кейсы - ЭБ Инвестиции" description="Наши кейсы - ЭБ Инвестиции"/>
        </div>
        <div class="container py-2 mt-3 text-center">
            <h1>Наши кейсы</h1>
        </div>
        <div class="container">
            <div class="row">
                <div v-for="(link, i) in links" :key="i" class="col-12 links-row">
                    <div class="links-row-body">
                        <div v-if="link.position === 'right' && !isMobile"
                             class="w-50 d-flex justify-content-center align-items-center">
                            <img :src="`/img/cases/${link.photo}`" :alt="link.title" class="link-image">
                        </div>
                        <div class="d-flex flex-column justify-content-between links-description p-3">
                            <div>
                                <h2>{{ link.title }}</h2>
                                <p class="mobile-hidden">{{ link.description }}</p>
                            </div>
                            <div v-if="isMobile" class="w-100 d-flex justify-content-center">
                                <img :src="`/img/cases/${link.photo}`" :alt="link.title" class="w-75">
                            </div>
                            <div class="buttons mt-3 mt-md-0">
                                <router-link to="#">Презентация</router-link>
                                <router-link to="#contacts">Контакты</router-link>
                            </div>
                        </div>
                        <div v-if="link.position === 'left' && !isMobile"
                             class="w-50 d-flex justify-content-center align-items-center">
                            <img :src="`/img/cases/${link.photo}`" :alt="link.title" class="link-image">
                        </div>
                    </div>
                </div>
                <div class="col-12 text-center">
                    <p>Предоставляем больше кейсов по запросу</p>
                </div>
            </div>
        </div>
        <div class="container py-1 mt-5 text-center">
            <h2 class="h1">С кем мы работали</h2>
        </div>
        <div class="container mb-5">
            <div class="row">
                <div v-for="(image, i) in images" :key="i" class="col-6 col-md-4 links-row">
                    <div class="links-row-body p-1">
                        <div class="w-100 d-flex justify-content-center align-items-center">
                            <img :src="`/img/cases/${image.photo}`" :alt="image.title" class="w-100 h-100">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>

export default {
  name: 'Cases',
  mounted() {
    this.$store.commit('setSearch', false);
  },
  data() {
    return {
      links: [
        {
          title: 'Подготовка презентации для инвесторов',
          description: 'Компания ООО "Блесаварис Лизинг" впервые выходила на долговой рынок и нуждалась в презентации для инвесторов. Собрав информацию о компании и рынке лизинга, мы подготовили презентацию. Эмитент в полном объеме разместил планируемые выпуски.',
          position: 'right',
          photo: 'presentation.svg',
        },
        {
          title: 'Оценка надежности эмитента облигаций',
          description: 'Мы подготовили независимую оценку надежности компании ООО "ЕвроЛомбард" по нашей модели перед очередным выпуском корпоративных облигаций. Наша модель учитывает риски связанные с денежными потоками, ликвидностью и уровнем задолженности эмитента.',
          position: 'left',
          photo: 'estimation.svg',
        },
        {
          title: 'Видеопрезентация эмитента облигаций',
          description: 'Совместно с ООО "Агрофинанс" мы подготовили видеопрезентацию компании. В коротком ролике Директор Михаил Левкович поделился основной информацией о компании, а также своим видением перспектив развития рынков лизинга и техники для сельского хозяйства.',
          position: 'right',
          photo: 'video.svg',
        },
      ],
      images: [
        {photo: 'expect.svg', title: 'Expect' },
        {photo: 'capital.svg', title: 'Capital' },
        {photo: 'lacerta.svg', title: 'Lacerta' },
      ],
    };
  },
  computed: {
    isMobile() {
      return window.mobileCheck();
    },
  },
};
</script>

<style scoped>

h1, .h1 {
    font-style: normal;
    font-weight: bold;
    color: #000000;
    font-size: 3.5rem;
    line-height: 3.5rem;
}

h2 {
    font-weight: bold;
    font-size: 3rem;
    line-height: 3rem;
}

.link-image {
    width: 85%;
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
.links-row-body img {
    border-radius: 45px;
}

.links-description {
    width: 50%;
    padding-left: 3rem;
}

.buttons {
    margin-top: 10px;
    display: flex;
    align-items: end;
    flex-wrap: nowrap;
}

.buttons a {
    background: #243EE9 !important;
    color: white;
    padding: 10px;
    margin-right: 50px;
    max-width: 65%;
    text-align: center;
    display: block;
    border-radius: 10px;
    width: 200px;
}

.buttons a:hover {
    text-decoration: none;
    background: #0f21a5 !important;
}

a:hover {
    text-decoration: none;
}

@media screen and (max-device-width: 767px) {
    h1, .h1  {
        font-size: 30px!important;
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

    .buttons {
        justify-content: space-evenly;
    }

    .buttons > a {
        width: 42%;
        max-width: unset!important;
        margin-right: 0;
    }

    main {
        min-height: auto;
    }

    .links-row-body {
        border-radius: 14px;
    }
}

</style>