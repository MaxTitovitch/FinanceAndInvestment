<template>
    <main>
        <div>
            <vue-headful title="Услуги - Binvesting" description="Услуги - Binvesting"/>
        </div>
        <div class="container py-5 mt-3 text-center">
            <h1>Команда</h1>
        </div>
        <div class="container mb-5">
            <div class="row">
                <div v-for="(link, i) in links" :key="i" class="col-12 links-row">
                    <div class="links-row-body height-size">
                        <h2 class="w-100 mb-0 pb-0 d-flex justify-content-center align-items-center">{{ link.title }}</h2>
                        <div v-if="link.position === 'right' && !isMobile"
                             class="w-45 d-flex justify-content-center align-items-center">
                            <img :src="`/img/team/${link.photo}`" :alt="link.title" class="link-image">
                        </div>
                        <div class="d-flex flex-column justify-content-between links-description p-3">
                            <div v-if="isMobile" class="w-100 d-flex justify-content-center mb-2">
                                <img :src="`/img/team/${link.photo}`" :alt="link.title" class="link-image">
                            </div>
                            <div>
                                <p class="font-weight-bold">Образование:</p>
                                <p class="" v-for="(graduate, i) in link.graduate" :key="i">{{ graduate }}</p>
                                <p class="font-weight-bold">Описание:</p>
                                <p class="">{{ link.description }}</p>
                            </div>
                        </div>
                        <div v-if="link.position === 'left' && !isMobile"
                             class="w-45 d-flex justify-content-center align-items-center">
                            <img :src="`/img/team/${link.photo}`" :alt="link.title" class="link-image">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>

export default {
  name: 'Team',
  mounted() {
    this.$store.commit('setSearch', false);
  },
  data() {
    return {
      links: [
        {
          title: 'Максим Адаскевич, CFA, CFM',
          graduate: ['СПбГПУ Политех', 'СПбГУ Высшая Школа Менеджмента', 'Universität Mannheim'],
          description: 'Максим имеет более 5 лет опыта работы в области финансового и стратегического консалтинга, привлечении инвестиций, финансовом моделировании, оценке проектов и компаний, подготовке экспертных заключений для международного арбитража и судебных экспертиз, исследованиях рынков, разработке концепций новых продуктов и стратегий их вывода на рынок, клиентском и конкурентном анализе. Принимал участие в реализации более чем 100 проектов.',
          position: 'right',
          photo: 'member-1.png',
        },
        {
          title: 'Евгений Левый',
          graduate: ['IPM Business School', 'ОЦ Парка высоких технологий'],
          description: 'Уже более трех лет Евгений был задействован в решении широкого спектра бизнес-задач. Опыт Евгения включает в себя построение систем управленческого учета и контроллинга, создание цифровых систем для автоматизированной аналитики производственной эффективности на предприятии, создание и применение моделей оценки кредитоспособности и стоимости предприятий, создании прогностических моделей для предсказания вероятности дефолта эмитентов облигаций на основе больших массивов данных, подготовку инвестиционных презентаций и финансовых моделей для компаний из различных отраслей. ',
          position: 'left',
          photo: 'member-2.png',
        },
        {
          title: 'Владислав Малиновский',
          graduate: ['Politechnika Warszawska'],
          description: 'Последние 3 года Владислав разрабатывал программное обеспечение для различных компаний, в том числе для финансового сектора. Владислав имеет широкий набор компетенций в создании архитектуры реляционных и нереляционных баз данных, написании алгоритмов для автоматизированного скоринга на основании больших массивов данных, создании децентрализованных облачных приложений и оптимизации использования облачных ресурсов.',
          position: 'right',
          photo: 'member-3.png',
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
    width: 75%;
    border-radius: 50%;
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
    flex-wrap: wrap;
}
.links-row-body p {
    margin: 0!important;
}

.height-size {
    height: 600px;
}

.links-row-body > div {
    max-height: 100%;
}

.links-description {
    width: 55%;
    padding-left: 3rem;
}

.w-45 {
    width: 45%;
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
        flex-direction: row;
        height: unset!important;
    }

    .links-row-body > div {
        width: 100% !important;
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
