<template>
    <b-modal
            id="modal-disclaimer"
            centered
            hide-footer
            hide-header
            content-class="modal-disclaimer"
            body-class="p-0 ml-5 d-flex justify-content-center my-3"
            size="lg"
            v-model="showModal"
            @close.stop="$emit('close')"
    >
        <div class="modal-disclaimer-close" @click="closeModal">
            ×
        </div>
        <div class="modal-disclaimer-body">
            <h2 class="mt-4">
                Дисклеймер
            </h2>
            <div>
                <p>
                    Вся информация представленная на данном сайте не может служить инвестиционной рекомендацией.
                    Правообладатели сайта не несут ответственность за потенциальные убытки, которые инвестор может
                    понести приняв представленную на сайте информацию за рекомендацию к действию. Вся представленная
                    информация является лишь субъективным мнением авторов.
                </p>
            </div>
        </div>
    </b-modal>
</template>

<script>
export default {
  name: 'Contacts',
  props: {
    show: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    showModal: {
      get() {
        return this.$route.hash === '#disclaimer';
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
        document.querySelector('html').classList.add('hide-scroll');
        document.querySelector('html').classList.remove('show-scroll');
        if (!window.mobileCheck()) {
          document.querySelector('body').classList.add('show-scroll');
          document.querySelector('body').classList.remove('hide-scroll');
        }
      } else {
        document.querySelector('html').classList.add('show-scroll');
        document.querySelector('html').classList.remove('hide-scroll');
        if (!window.mobileCheck()) {
          document.querySelector('body').classList.add('hide-scroll');
          document.querySelector('body').classList.remove('show-scroll');
        }
      }
    },
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
</style>

<style>
.modal-disclaimer {
    border-radius: 17px !important;
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.25);

    padding: 15px 30px;
}

.modal-disclaimer-close {
    color: black;
    font-size: 2.5rem;
    cursor: pointer;
    position: absolute;
    right: -5px;
    top: -15px;
}

.modal-disclaimer-close:hover {
    color: #243EE9;
}

.modal-disclaimer-body {
    width: 85%;
}

@media screen and (max-device-width: 767px) {
    .modal-disclaimer-body {
        width: 100%;
    }

    .modal-disclaimer {
        background-color: #243EE9 !important;
        color: white;
    }
    

    h2 {
        font-size: 1.5rem !important;
    }


    .modal-disclaimer-close {
        color: white;
        right: -12px;
    }


    .modal-disclaimer-close:hover {
        opacity: 0.8;
        color: white;
    }

    .links a, p {
        font-size: 0.9rem;
    }
}
</style>