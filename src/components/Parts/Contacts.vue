<template>
    <b-modal
            id="modal-contacts"
            centered
            hide-footer
            hide-header
            content-class="modal-contacts"
            body-class="p-0"
            size="lg"
            v-model="showModal"
            @close.stop="$emit('close')"
    >
        <div class="modal-contacts-close" @click="closeModal">
            ×
        </div>
        <div class="modal-contacts-body">
            <h2 class="mt-4">
                Контактная информация
            </h2>
            <div class="links">
                <a :href="link.link" v-for="(link, i) in links" :key="i">
                    <img :src="`/img/contacts/${link.photo}`" :alt="link.title">
                    {{ link.title }}
                </a>
            </div>
            <h2 class="mt-5">
                Реквизиты
            </h2>
            <div>
                <p>
                    ИП Левый Евгений Валерьевич <br>
                    УНП 193426480 <br>
                    Республика Беларусь, 220039 <br>
                    г. Минск, ул. Чкалова, д. 18, корп. 3, кв.50 <br>
                    р/с BY51PJCB30130627721000000933 <br>
                    в ОАО «ПРИОРБАНК» <br>
                    БИК PJCBBY2X <br>
                </p>
            </div>
        </div>
    </b-modal>
</template>

<script>
import Settings from '@/settings';

export default {
  name: 'Contacts',
  props: {
    show: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    links() {
      const modifier = window.mobileCheck() ? '-light' : '';
      return [
        {
          title: '+375 (29) 768-19-40',
          link: Settings.LINK_PHONE,
          photo: `phone${modifier}.svg`,
        },
        {
          title: '@eugene_levy',
          link: Settings.LINK_TELEGRAM,
          photo: `telegram${modifier}.svg`,
        },
        {
          title: 'ЭБ Инвестиции',
          link: Settings.LINK_YOUTUBE,
          photo: `youtube${modifier}.svg`,
        },
        {
          title: 'sales@binvesting.ru',
          link: Settings.LINK_EMAIL,
          photo: `email${modifier}.svg`,
        },
      ];
    },
    showModal: {
      get() {
        return this.$route.hash === '#contacts';
      },
      set(value) {
        if (!value) {
          this.closeModal();
        }
      },
    },
    isMainClass() {
      return this.$route.path === '/';
    },
  },
  watch: {
    showModal(value) {
      if (value) {
        document.querySelector('body').classList.add('show-scroll')
        document.querySelector('html').classList.add('hide-scroll')
        document.querySelector('body').classList.remove('hide-scroll')
        document.querySelector('html').classList.remove('show-scroll')
      } else  {
        document.querySelector('body').classList.add('hide-scroll')
        document.querySelector('html').classList.add('show-scroll')
        document.querySelector('body').classList.remove('show-scroll')
        document.querySelector('html').classList.remove('hide-scroll')
      }
    }
  },
  methods: {
    closeModal() {
      this.$router.replace(this.$route.path);
    },
  },
};
</script>

<style scoped>
    h2 {
        font-weight: bold;
    }

    .links {
        display: flex;
        flex-wrap: wrap;
    }

    .links a {
        width: 50%;
        margin-top: 1rem;
        color: #494949;
    }

    .links a:hover {
        text-decoration: none;
        opacity: 0.8;
    }

    .links a img {
        width: 20px;
        height: 20px;
        margin-right: 5px;
    }


    @media screen and (max-device-width: 767px) {
        .links a {
            width: 100%;
        }
    }
</style>

<style>
    .modal-contacts {
        border-radius: 17px!important;
        box-shadow: 0 4px 18px rgba(0, 0, 0, 0.25);

        padding: 15px 30px;
    }

    .modal-contacts-close {
        color: black;
        font-size: 2.5rem;
        cursor: pointer;
        position: absolute;
        right: -5px;
        top: -15px;
    }

    .modal-contacts-close:hover {
        color: #243EE9;
    }

    .modal-contacts-body {
        width: 75%;
    }

    @media screen and (max-device-width: 767px) {
        .modal-contacts-body {
            width: 100%;
        }

        .modal-contacts {
            background-color: #243EE9!important;
            color: white;
        }


        .links a {
            color: white!important;
        }

        .links a img svg path {
            stroke: white!important;
            fill: white!important;
            color: white!important;
        }

        h2 {
            font-size: 1.5rem!important;
        }


        .modal-contacts-close {
            color: white;
            right: -12px;
        }


        .modal-contacts-close:hover {
            opacity: 0.8;
            color: white;
        }

        .links a, p {
            font-size: 0.9rem;
        }
    }
</style>