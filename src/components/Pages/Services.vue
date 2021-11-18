<template>
    <main>
        <div>
            <vue-headful title="Услуги - ЭБ Инвестиции" description="Услуги - ЭБ Инвестиции"/>
        </div>
        <div class="container py-2 mt-3 text-center">
            <h1>Услуги которые мы предоставляем</h1>
        </div>
        <div class="container">
            <div class="row">
                <div v-for="(link, i) in links" :key="i" class="col-12 links-row">
                    <div class="links-row-body">
                        <div v-if="link.position === 'right'"
                             class="w-50 d-flex justify-content-center align-items-center">
                            <img :src="`/img/services/${link.photo}`" :alt="link.title" class="w-75 h-75">
                        </div>
                        <div class="d-flex flex-column justify-content-between w-50 p-3 pl-5">
                            <div>
                                <h2>{{ link.title }}</h2>
                                <p>{{ link.description }}</p>
                            </div>
                            <div class="buttons d-flex align-items-end justify-content-start flex-nowrap mobile-hidden">
                                <router-link to="/cases">Кейсы</router-link>
                                <router-link to="#contacts">Контакты</router-link>
                            </div>
                        </div>
                        <div v-if="link.position === 'left'"
                             class="w-50 d-flex justify-content-center align-items-center">
                            <img :src="`/img/services/${link.photo}`" :alt="link.title" class="w-75 h-75">
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
          position: 'right',
          photo: 'consulting.svg',
        },
        {
          title: 'Софтверные решения с аналитикой',
          description: 'Предоставим отчетность и аналитику по компаниям в удобном для вас формате.',
          position: 'left',
          photo: 'solutions.svg',
        },
        {
          title: 'Помощь в коммуникации с инвесторами',
          description: 'Поможем вам выстроить прозрачную систему коммуникации с инвесторами и привлечь средства на выгодных условиях.',
          position: 'right',
          photo: 'communication.svg',
        },
        {
          title: 'Персональные консультации по выбору портфеля',
          description: 'Поможем вам собрать инвестиционный портфель в зависимости от ваших целей и склонности к риску.',
          position: 'left',
          photo: 'package.svg',
        },
      ],
    };
  },
};
</script>

<style scoped>

h1 {
    font-style: normal;
    font-weight: bold;
    color: #000000;
    font-size: 3rem;
    line-height: 3rem;
}

h2 {
    font-weight: bold;
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
    box-shadow: 0 22px 20px -12px rgba(36, 62, 233, 0.35);
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


    main {
        min-height: auto;
    }
}

</style>
