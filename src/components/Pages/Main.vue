<template>
 <main>
   <div>
     <vue-headful title="Главная - Эмитенты Беларуси" description="Главная - Эмитенты Беларуси"/>
   </div>
   <div class="container template">
     <div class="row main-row">
       <div class="col-12 col-md-5">
         <h1 class="pb-5">Про финансы <br>и инвестиции простыми словами</h1>
         <div class="buttons d-flex align-items-center flex-wrap mb-4 mobile-hidden">
           <div class="w-100 mb-4">
             <router-link to="/terms">Термины</router-link>
           </div>
           <div class="w-100 mb-4">
             <router-link to="/videos">Видео</router-link>
           </div>
         </div>
       </div>
     </div>
     <div class="row carousel-row justify-content-between pb-5 mobile-hidden">
      <TileLink :model="link" v-for="(link, index) in links" :key="index"/>
     </div>
     <div class="row mobile-show">
       <div class="col-12">
         <splide :options="options" class="mb-5">
           <splide-slide v-for="(link, index) in links" :key="index">
             <TileLink :model="link" width="100%"/>
           </splide-slide>
         </splide>
       </div>
     </div>
   </div>
 </main>
</template>

<script>
import TileLink from "@/components/Parts/TileLink";
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

export default {
  name: "Main",
  components: {TileLink, Splide, SplideSlide},
  mounted() {
    this.$store.commit('setSearch', false)
  },
  data (){
    return {
      options: {
        slide: 'loop',
        rewind: true,
        autoplay: true,
        speed: 500,
        arrowPath: 'M1 1L13 13L1 25'
      },
      links: [
        {title: 'Все инвестиционные понятия в разделе термины', link: '/terms', photo: 'terms.svg'},
        {title: 'Делаем короткие мультики на тему финансов', link: '/videos', photo: 'videos.svg'},
        {title: 'Представляем аналитику по белорусским компаниям', link: '/issuers', photo: 'issuers.svg'},
      ],
    }
  },
}
</script>

<style scoped>
   main {
     padding: 0.5rem 1rem;
     /*height: 125%;*/
   }

  .template  {
    padding-right: 45px;
    padding-left: 30px;
  }

  h1 {
    font-style: normal;
    font-weight: bold;
    font-size: 60px;
    line-height: 60px;
  }

  .main-row {
    background-image: url(~@/assets/main-photo.svg);
    /*height: 70%;*/
    background-size: 60%;
    background-repeat: no-repeat;
    background-position-x: right;
  }
  .carousel-row {
    /*height: 30%;*/
  }

  .buttons {
    margin-top: 10px;
  }

  .buttons a {
    background: #243EE9!important;
    color: white;
    padding: 10px;
    max-width: 65%;
    text-align: center;
    display: block;
    border-radius: 10px;
    width: 205px;
    box-shadow: 0 22px 20px -12px rgba(36, 62, 233, 0.35);
  }

   .buttons a:hover {
     text-decoration: none;
     background: #0f21a5!important;
  }

   a:hover {
     text-decoration: none;
   }

   @media screen and (max-device-width: 767px) {
     h1 {
       font-size: 30px;
       line-height: 30px;
     }

     .template {
       padding: 0;
     }

     .main-row {
       background-image: url(~@/assets/main-photo-mobile.svg);
       background-position-x: left;
       padding-top: 15.5rem;
       background-size: 100% 15rem;
     }

     main {
       min-height: auto;
     }
   }

</style>

<style>
  .splide__arrow {
    background: rgba(0,0,0,0);
    fill: none;
    height: 100%;
    width: 6em;
    display: flex;
  }

  .splide__arrow--next {
    right: 0;
    justify-content: flex-end;
  }

  .splide__arrow--prev {
    left: 0;
    justify-content: flex-start;
  }

  .splide__pagination {
    bottom: -1.5em;
  }

  .splide__pagination__page {
    background: #C4C4C4;
  }

  .splide__pagination__page.is-active {
    background: #222;
  }

  .splide__track {
    box-shadow: 0px 22px 20px -5px rgba(117, 117, 117, 0.25);
  }

  .splide__arrow>svg {
    height: 40px;
    width: 40px;
    stroke: #000;
    stroke-width: 3px;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .splide__arrow>svg {
    height: 40px;
    width: 40px;
    stroke: #000;
    stroke-width: 3px;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
</style>