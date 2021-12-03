<template>
    <main>
        <div>
            <vue-headful title="Наши кейсы - Binvesting" description="Наши кейсы - Binvesting"/>
        </div>
        <div class="container py-5 mt-3 text-center">
            <h1>Наши кейсы</h1>
        </div>
        <div class="container">
            <div class="row">
                <div v-for="(link, i) in links" :key="i" class="col-12 links-row">
                    <div class="links-row-body height-size">
                        <div v-if="link.position === 'right' && !isMobile"
                             class="w-55 d-flex justify-content-center align-items-center">
                            <img :src="`/img/cases/company/${link.photo}`" :alt="link.title" class="link-image">
                        </div>
                        <div class="d-flex flex-column justify-content-between links-description p-3">
                            <div>
                                <h2>{{ link.title }}</h2>
                                <p class="mobile-hidden">{{ link.description }}</p>
                            </div>
                            <div v-if="isMobile" class="w-100 d-flex justify-content-center">
                                <img :src="`/img/cases/company/${link.photo}`" :alt="link.title" class="w-75">
                            </div>
                            <div class="buttons mt-3 mt-md-0">
                                <a :href="link.link" target="_blank">Презентация</a>
                                <router-link to="#contacts">Контакты</router-link>
                            </div>
                        </div>
                        <div v-if="link.position === 'left' && !isMobile"
                             class="w-55 d-flex justify-content-center align-items-center">
                            <img :src="`/img/cases/company/${link.photo}`" :alt="link.title" class="link-image">
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
            <splide :options="options" class="mb-5">
                <splide-slide v-for="(image, index) in images" :key="index" class="links-row p-4">
                    <div class="links-row-body p-4 my-2">
                        <img :src="`/img/cases/company/${image.photo}`" :alt="image.title" class="w-100">
                    </div>
                </splide-slide>
            </splide>
        </div>
    </main>
</template>

<script>
import {Splide, SplideSlide} from '@splidejs/vue-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

export default {
  name: 'Cases',
  components: {Splide, SplideSlide},
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
          photo: 'company-6.png',
          link: 'https://binvesting-docs.s3.eu-central-1.amazonaws.com/Блесаварис+ИП.pdf',
        },
        {
          title: 'Оценка надежности эмитента облигаций',
          description: 'Мы подготовили независимую оценку надежности компании ООО "ЕвроЛомбард" по нашей модели перед очередным выпуском корпоративных облигаций. Наша модель учитывает риски связанные с денежными потоками, ликвидностью и уровнем задолженности эмитента.',
          position: 'left',
          photo: 'company-7.png',
          link: 'https://binvesting-docs.s3.eu-central-1.amazonaws.com/Евроломбард+Оценка+Надежности.pdf',
        },
        {
          title: 'Видеопрезентация эмитента облигаций',
          description: 'Совместно с ООО "Агрофинанс" мы подготовили видеопрезентацию компании. В коротком ролике Директор Михаил Левкович поделился основной информацией о компании, а также своим видением перспектив развития рынков лизинга и техники для сельского хозяйства.',
          position: 'right',
          photo: 'company-3.jpg',
          link: 'https://www.youtube.com/watch?v=GcpaGg5KyvU',
        },
      ],
      images: [
        {photo: 'company-1.jpg', title: 'Company 1'},
        {photo: 'company-5.png', title: 'Company 5'},
        {photo: 'company-3.jpg', title: 'Company 3'},
        {photo: 'company-7.png', title: 'Company 7'},
        {photo: 'company-4.jpg', title: 'Company 4'},
        {photo: 'company-8.png', title: 'Company 8'},
        {photo: 'company-6.png', title: 'Company 6'},
        {photo: 'company-9.png', title: 'Company 9'},
        {photo: 'company-2.jpeg', title: 'Company 2'},
        {photo: 'company-10.png', title: 'Company 10'},
      ],
    };
  },
  computed: {
    isMobile() {
      return window.mobileCheck();
    },

    options() {
      const perPage = window.mobileCheck() ? 1 : 3;

      return {
        slide: 'loop',
        rewind: true,
        autoplay: true,
        speed: 500,
        perPage,
        arrowPath: 'M84,44H21.656l21.456-21.456c1.562-1.562,1.562-4.095,0.001-5.657c-1.562-1.562-4.096-1.562-5.658,0L9.172,45.171l0,0  c-0.186,0.186-0.352,0.391-0.498,0.61c-0.067,0.101-0.114,0.21-0.171,0.315c-0.067,0.124-0.142,0.242-0.196,0.373  c-0.056,0.135-0.088,0.276-0.129,0.416c-0.032,0.111-0.075,0.217-0.098,0.331C8.028,47.475,8,47.737,8,48l0,0  c0,0.003,0.001,0.005,0.001,0.008c0,0.259,0.027,0.519,0.078,0.774c0.024,0.121,0.069,0.232,0.104,0.349  c0.039,0.133,0.07,0.268,0.123,0.397c0.058,0.139,0.136,0.265,0.208,0.396c0.054,0.098,0.096,0.198,0.159,0.292  c0.147,0.221,0.314,0.427,0.501,0.614l28.282,28.281c1.562,1.562,4.095,1.562,5.657,0.001c1.562-1.562,1.562-4.096,0-5.658  L21.657,52H84c2.209,0,4-1.791,4-4S86.209,44,84,44z',
      };
    },
  },
};
</script>

<style scoped>

h1, .h1 {
    font-style: normal;
    font-weight: bold;
    color: #000000;
    font-size: 3.4rem;
    line-height: 3.4rem;
}

h2 {
    font-family: Rubik, serif;
    font-weight: bold;
    font-size: 2.35rem;
    line-height: 2.35rem;
}

.link-image {
    width: 90%;
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
    align-items: center;
    background: #FFFFFF;
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.25);
    border-radius: 45px;
    padding: 3rem;
}

.height-size {
    height: 450px;
}

.links-row-body > div {
    height: 100%;
}

.links-row-body img {
    border-radius: 45px;
}

.w-55 {
    width: 47% !important;
}

.links-description {
    width: 53%;
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
    h1, .h1 {
        font-size: 30px !important;
        line-height: 30px;
    }

    h2 {
        text-align: center;
        font-size: 18px;
        line-height: 30px;
        margin-bottom: 12px;
    }

    main {
        min-height: auto;
    }

    .links-row-body {
        flex-direction: column;
        justify-content: center;
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
        max-width: unset !important;
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

<style>
.splide__pagination__page.is-active {
    background: darkgray !important;
}

.splide__arrow {
    top: calc(100% - 16px);
    margin-bottom: 20px;
    z-index: 10000;
    background-color: unset!important;
    background-size: cover;
    padding: 10px;
}

.splide__arrow:hover {
    fill: white;
    border-radius: 50%;
    background-color: #243EE9!important;
}

.splide__arrow--prev {
    background-image: url("/img/arrow-slider-left.svg");
}

.splide__arrow--next {
    background-image: url("/img/arrow-slider-right.svg");
}

.splide__arrow--prev:hover {
    background-image: url("/img/arrow-slider-left-white.svg");
}

.splide__arrow--next:hover {
    background-image: url("/img/arrow-slider-right-white.svg");
}

.splide__arrow svg {
    display: none!important;
}
</style>