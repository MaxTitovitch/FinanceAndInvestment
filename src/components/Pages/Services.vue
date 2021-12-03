<template>
    <main>
        <div>
            <vue-headful title="Услуги - Binvesting" description="Услуги - Binvesting"/>
        </div>
        <div class="container py-5 mt-3 text-center">
            <h1>Услуги которые мы предоставляем</h1>
        </div>
        <div class="container mb-5">
            <div class="row">
                <div v-for="(link, i) in links" :key="i" class="col-12 links-row">
                    <div class="links-row-body height-size">
                        <div v-if="link.position === 'right' && !isMobile"
                             class="w-50 d-flex justify-content-center align-items-center">
                            <img :src="`/img/services/${link.photo}`" :alt="link.title" class="w-75 h-75">
                        </div>
                        <div class="d-flex flex-column justify-content-between links-description p-3">
                            <div>
                                <h2>{{ link.title }}</h2>
                                <p class="mobile-hidden">{{ link.description }}</p>
                            </div>
                            <div v-if="isMobile" class="w-100 d-flex justify-content-center">
                                <img :src="`/img/services/${link.photo}`" :alt="link.title" class="w-75">
                            </div>
                            <div class="buttons mt-3 mt-md-0">
                                <router-link to="/cases">Кейсы</router-link>
                                <router-link to="#contacts">Контакты</router-link>
                            </div>
                        </div>
                        <div v-if="link.position === 'left' && !isMobile"
                             class="w-50 d-flex justify-content-center align-items-center">
                            <img :src="`/img/services/${link.photo}`" :alt="link.title" class="link-image">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>

export default {
  name: 'Services',
  mounted() {
    this.$store.commit('setSearch', false);
  },
  data() {
    return {
      links: [
        {
          title: 'Финансовый консалтинг для компаний',
          description: 'Подготовим финансовую модель, оценим стоимость и кредитоспосбность компании.',
          position: 'left',
          photo: 'consulting.svg',
        },
        {
          title: 'Софтверные решения с аналитикой',
          description: 'Предоставим отчетность и аналитику по компаниям в удобном для вас формате.',
          position: 'right',
          photo: 'solutions.svg',
        },
        {
          title: 'Помощь в коммуникации с инвесторами',
          description: 'Поможем вам выстроить прозрачную систему коммуникации с инвесторами и привлечь средства на выгодных условиях.',
          position: 'left',
          photo: 'communication.svg',
        },
        {
          title: 'Персональные консультации по выбору портфеля',
          description: 'Поможем вам собрать инвестиционный портфель в зависимости от ваших целей и склонности к риску.',
          position: 'right',
          photo: 'package.svg',
        },
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

h1 {
    font-style: normal;
    font-weight: bold;
    color: #000000;
    font-size: 3.4rem;
    line-height: 3.4rem;
}

h2 {
    font-weight: bold;
    font-size: 2.7rem;
    line-height: 2.7rem;
}

.link-image {
    width: 70%;
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

.height-size {
    height: 450px;
}

.links-row-body > div {
    height: 100%;
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
    h1 {
        font-size: 30px;
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

    .links-row-body {
        border-radius: 14px;
    }
}

</style>
