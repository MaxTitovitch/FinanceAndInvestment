<template>
  <div class="header-panel">
    <div class="child-panel">

      <img src="@/assets/map/logo.svg" class="img-logo" alt="logoImage">

      <button
          class="button graph"
          @click="onChartClick(true)"
          v-on:click="$emit('graphClick')"
          :class="($attrs.showTable ? '' : 'active-button-link') + ' button table-'"
      >
        <img src="@/assets/map/graphIconActive.svg" v-if="!$attrs.showTable" alt="graphActiveImage"
             class="img-graphIcon-Active">
        <img src="@/assets/map/graphIconNotActive.svg" v-if="$attrs.showTable" alt="graphNotActiveImage"
             class="img-graphIcon-notActive">
      </button>

      <button
          :class="($attrs.showTable ? 'active-button-link' : '') + ' button table-'"
          @click="onTableClick(true)"
          v-on:click="$emit('tableClick')"
      >
        <img src="@/assets/map/tableIconActive.svg" v-if="$attrs.showTable" alt="tableActiveImage"
             class="img-tableIcon-Active">
        <img src="@/assets/map/tableIconNotActive.svg" v-if="!$attrs.showTable" alt="tableNotActiveImage"
             class="img-tableIcon-notActive">
      </button>

    </div>


    <div class="child-panel">
      <div class="search-panel">
        <input v-model="$attrs.filtersProps[5].key" @keyup.enter="onEnterKey" placeholder="Поиск по облигациям"
               class="search-input">
        <button class="search-button">
          <img src="@/assets/map/searchIcon.svg" ref="searchButton" v-on:click="$emit('searchKeyClick')"
               alt="searchButton" class="img-searchIcon">
        </button>
      </div>
    </div>

    <div class="child-panel" style="text-align: right">

      <label class="toggleEur">
        <input type="checkbox" id="eurButtonDesktop" checked @click="onEurClick(true, !$attrs.showTable)"
               v-on:click="$emit('eurClick')">
        <div class="lol">USD/EUR</div>
      </label>

      <label class="toggleByn">
        <input type="checkbox" id="bynButtonDesktop" checked @click="onBynClick(true, !$attrs.showTable)"
               v-on:click="$emit('bynClick')">
        <div class="lol">BYN</div>
      </label>

      <button :class="(hasFilter ? 'active-button-link' : '') + ' button filters'" @click="onFiltersClick">
        <img src="@/assets/map/filtersIcon.svg" v-if="!hasFilter" class="img-filtersIcon">
        <img src="@/assets/map/filtersIconActive.svg" v-if="hasFilter" class="img-filtersIcon">
      </button>
    </div>

    <div class="mobile-layout">
      <img src="@/assets/map/logo.svg" class="img-logo" alt="logoImage">

      <button class="button menu" @click="onMenuClick">
        <img src="@/assets/map/menuIcon.svg" class="img-menu" alt="menuImage">
      </button>

      <div class="menu-panel" v-if="showMenu">
        <button class="button graph" @click="onChartClick(false)" v-on:click="$emit('graphClick')">
          <img src="@/assets/map/graphIconActive.svg" v-if="!$attrs.showTable" alt="graphActiveImage"
               class="img-graphIcon-Active">
          <img src="@/assets/map/graphIconNotActive.svg" v-if="$attrs.showTable" alt="graphNotActiveImage"
               class="img-graphIcon-notActive">
        </button>

        <button class="button table-" @click="onTableClick(false)" v-on:click="$emit('tableClick')">
          <img src="@/assets/map/tableIconActive.svg" v-if="$attrs.showTable" alt="tableActiveImage"
               class="img-tableIcon-Active">
          <img src="@/assets/map/tableIconNotActive.svg" v-if="!$attrs.showTable" alt="tableNotActiveImage"
               class="img-tableIcon-notActive">
        </button>

        <img src="@/assets/map/closeButton.svg" @click="onCloseMenuClick" class="img-closeMenu">
      </div>

      <div class="search-panel">

        <input v-model="$attrs.filtersProps[5].key" @keyup.enter="onEnterKey" placeholder="Поиск по облигациям"
               class="search-input"><br>
      </div>

      <div class="search-panel">
        <div style="width: 30%; min-width: 174px; height: 50px; display: inline-block">
          <div style="width: 33.33%; height: 100%; text-align: left; float: left; box-shadow: none">
            <label class="toggleByn">
              <input type="checkbox" id="bynButtonMobile" checked @click="onBynClick(false, !$attrs.showTable)"
                     v-on:click="$emit('bynClick')">
              <div class="lol">BYN</div>
            </label>
          </div>

          <div style="width: 33.33%; height: 100%; text-align: center; float: left; box-shadow: none">
            <label class="toggleEur">
              <input type="checkbox" id="eurButtonMobile" checked @click="onEurClick(false, !$attrs.showTable)"
                     v-on:click="$emit('eurClick')">
              <div class="lol">USD/EUR</div>
            </label>
          </div>

          <div style="width: 33.33%; height: 100%; text-align: right; float: left; box-shadow: none">
            <button class="button filters" @click="onFiltersClick">
              <img src="@/assets/map/filtersIcon.svg" class="img-filtersIcon">
            </button>
            <br>
            <button class="search-button">
              <img src="@/assets/map/searchIcon.svg" ref="searchButton" v-on:click="$emit('searchKeyClick')"
                   alt="searchButton" class="img-searchIcon">
            </button>
          </div>

        </div>
      </div>
    </div>

    <div class="filters-panel" v-if="showFiltersMenu">
      <h1>Фильтры</h1>
      <button class="close-filters-button">
        <img src="@/assets/map/closeButton.svg" @click="onCloseFiltersClick" class="img-closeFilters">
      </button>
      <div style="width: 100%; height: auto; position: relative; bottom: 20px; overflow: hidden; margin: 0">
        <div class="filters-text-wrapper">
          <div class="blue-filters-menu-panel"></div>
          <div class="text-wrapper">
            <div style="color: white">
              Надежность<br>
              Коэффициент ЭБ<br>
            </div>
            Срок погашения<br>
            Номинал<br>
            Процентная ставка<br>
            <button class="clear-filters-button" v-on:click="$emit('clearFiltersClick')">
              Очистить фильтры
            </button>
          </div>
        </div>

        <div class="filters-input-wrapper">
          <div>
            <input v-model="$attrs.filtersProps[0].from" placeholder="от" class="filters-input-from">
            <input v-model="$attrs.filtersProps[0].to" placeholder="до" class="filter-input-to">
          </div>
          <div>
            <input v-model="$attrs.filtersProps[1].from" placeholder="от" class="filters-input-from">
            <input v-model="$attrs.filtersProps[1].to" placeholder="до" class="filter-input-to">
          </div>
          <div>
            <input v-model="$attrs.filtersProps[2].from" placeholder="от" class="filters-input-from">
            <input v-model="$attrs.filtersProps[2].to" placeholder="до" class="filter-input-to">
          </div>
          <div>
            <input v-model="$attrs.filtersProps[3].from" placeholder="от" class="filters-input-from">
            <input v-model="$attrs.filtersProps[3].to" placeholder="до" class="filter-input-to">
          </div>
          <div>
            <input v-model="$attrs.filtersProps[4].from" placeholder="от" class="filters-input-from">
            <input v-model="$attrs.filtersProps[4].to" placeholder="до" class="filter-input-to">
          </div>

          <button class="search-filters-button" v-on:click="$emit('searchFiltersClick')">
            Поиск
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  computed: {
    hasFilter() {
      for (let i = 0; i < this.$attrs.filtersProps.length-1; i++) {
        if(this.$attrs.filtersProps[i].from != '' || this.$attrs.filtersProps[i].to != '') {
          return true;
        }
      }
      return false;
    }
  },
  data() {
    return {
      showFiltersMenu: false,
      showMenu: false
    }
  },
  methods: {
    onChartClick(onDesktop) {
      let eurID = onDesktop ? "eurButtonDesktop" : "eurButtonMobile";
      let bynID = onDesktop ? "bynButtonDesktop" : "bynButtonMobile";
      document.getElementById(eurID).checked = true;
      document.getElementById(bynID).checked = false;
    },
    onTableClick(onDesktop) {
      let eurID = onDesktop ? "eurButtonDesktop" : "eurButtonMobile";
      let bynID = onDesktop ? "bynButtonDesktop" : "bynButtonMobile";
      document.getElementById(eurID).checked = true;
      document.getElementById(bynID).checked = true;
    },
    onEurClick(onDesktop, onChart) {
      let eurID = onDesktop ? "eurButtonDesktop" : "eurButtonMobile";
      let bynID = onDesktop ? "bynButtonDesktop" : "bynButtonMobile";
      if ((document.getElementById(eurID).checked === false) && (document.getElementById(bynID).checked === false)) {
        document.getElementById(bynID).checked = true;
      } else if ((onChart) && (document.getElementById(eurID).checked === true) && (document.getElementById(bynID).checked === true)) {
        document.getElementById(bynID).checked = false;
      }
    },
    onBynClick(onDesktop, onChart) {
      let eurID = onDesktop ? "eurButtonDesktop" : "eurButtonMobile";
      let bynID = onDesktop ? "bynButtonDesktop" : "bynButtonMobile";
      if ((document.getElementById(bynID).checked === false) && (document.getElementById(eurID).checked === false)) {
        document.getElementById(eurID).checked = true;
      } else if ((onChart) && (document.getElementById(eurID).checked === true) && (document.getElementById(bynID).checked === true)) {
        document.getElementById(eurID).checked = false;
      }
    },
    onFiltersClick() {
      this.showFiltersMenu = true;
    },
    onCloseFiltersClick() {
      this.showFiltersMenu = false;
    },
    onEnterKey() {
      this.$refs.searchButton.click();
    },
    onMenuClick() {
      this.showMenu = true;
    },
    onCloseMenuClick() {
      this.showMenu = false;
    }
  }
}
</script>

<style>

#app-module .mobile-layout {
  display: none
}

#app-module .header-panel {
  height: 100%;
  width: 100%;
  background: #F5F5F5;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  overflow: hidden;
}

#app-module .child-panel {
  float: left;
  width: 33.33%;
  height: 100%;
  box-shadow: none;
  vertical-align: top;
}

#app-module .button {
  border: none;
  outline: none;
  background: #F5F5F5;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  padding: 0;
}

#app-module .button:focus {
  outline: none;
  border: none;
}

#app-module .button:hover {
  background-color: rgba(255, 255, 255, 0.73);
}

#app-module .button:active {
  border: none;
  background-color: rgba(206, 197, 197, 0.97);
}

#app-module .img-logo {
  width: 84px;
  height: 50px;
  margin: 34px 34px 34px;
}

#app-module .graph {;
  width: 50px;
  height: 50px;
  margin: 34px 34px 34px 0;
}

#app-module .table- {
  width: 50px;
  height: 50px;
  margin: 34px 34px 34px 0;
}

#app-module .search-panel {
  width: 100%;
  height: 100%;
  text-align: center;
}

#app-module .search-input {
  width: 344px;
  height: 50px;
  margin: 34px 0 34px;
  padding: 12px 20px;
  outline: none;
  border: none;

  display: inline-block;
  box-shadow: 0 4px 10px #C1C1C1;
  border-radius: 5px;
  -webkit-appearance: none;
}

#app-module .search-button {
  outline: none;
  border: none;
  background: none;
  margin-left: -45px;
}

#app-module .search-button:focus {
  outline: none;
  border: none;
}

#app-module .toggleEur {
  display: inline-block;
  width: 85px;
  height: 50px;

  margin: 33px 35px 35px;
}

#app-module .toggleEur input {
  display: none;
}

#app-module .toggleByn {
  display: inline-block;
  width: 50px;
  height: 50px;

  margin: 33px 35px 35px 0;
}

#app-module .toggleByn input {
  display: none;
}

#app-module .lol {
  width: 100%;
  height: 100%;
  padding: 0;
  cursor: pointer;
  text-align: center;
  line-height: 50px;
  color: #494949;
  background-color: #F5F5F5;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  border: 1px solid transparent;

  -webkit-transition: 1s;
  transition: 1s;
}

#app-module input:checked + .lol, #app-module .active-button-link, #app-module .active-button-link:focus {
  color: #243EE9;
  border: 1px solid #243EE9 !important;
  box-shadow: 0px 4px 10px rgba(36, 62, 233, 0.35);
}

#app-module .filters {
  width: 50px;
  height: 50px;
  position: relative;
  top: -3px;
  margin: 33px 35px 35px 0;
}

#app-module .close-filters-button {
  background: none;
  outline: none;
  border: none;
  position: relative;
  bottom: 33px;
  margin-right: 10px;
}

#app-module .close-filters-button:focus {
  outline: none;
  border: none;
}

#app-module .filters-panel {
  position: absolute;
  top: 110px;
  right: 34px;
  z-index: 20;

  width: 350px;
  height: 230px;

  text-align: right;

  background: #F5F5F5;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  overflow: hidden;
}

#app-module .filters-panel h1 {
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  padding-top: 10px;
}

#app-module textarea:focus, input:focus {
  outline: none;
}

#app-module .filters-text-wrapper {
  float: left;
  width: 50%;
  height: 100%;
  box-shadow: none;

  text-align: left
}

#app-module .text-wrapper {
  position: relative;
  bottom: 56px;
  padding-left: 10px;
  font-size: 16px;
  line-height: 1.8;
}

#app-module .filters-input-wrapper {
  line-height: 1.8;
  position: relative;
  bottom: 2px;

  float: left;
  width: 50%;
  height: 100%;
  box-shadow: none;
  text-align: right;
}

#app-module .blue-filters-menu-panel {
  position: relative;
  left: 5px;
  width: 155px;
  height: 56px;

  background: #243EE9;
  border-radius: 5px;
}

#app-module .clear-filters-button {
  outline: none;
  border: none;
  font-weight: 600;
  background: none;
  margin-top: 10px;
  margin-left: -5px;

  color: #494949;
}

#app-module .clear-filters-button:focus {
  outline: none;
  border: none;
}

#app-module .filters-input-from {
  position: relative;
  padding: 0;
  right: 10px;
  width: 70px;
  height: 20px;
  font-size: 12px;
}

#app-module .filter-input-to {
  position: relative;
  padding: 0;
  right: 11px;
  width: 70px;
  height: 20px;
  font-size: 12px;
}

#app-module .search-filters-button {
  padding-top: 13px;
  padding-right: 100px;

  outline: none;
  border: none;
  font-weight: 600;
  background: none;

  color: #494949;
}

#app-module .search-filters-button:focus {
  outline: none;
  border: none;
}

@media only screen and (max-width: 1290px) {

  #app-module .child-panel {
    display: none;
  }

  #app-module .mobile-layout {
    display: inline-block;
    text-align: center;
    width: 100%;
    height: 100%;
  }

  #app-module .img-logo {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 50px;
    height: 30px;
    margin: 0;
  }

  #app-module .menu {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
  }

  #app-module .menu-panel {
    position: absolute;
    top: 50px;
    right: 10px;
    width: 118px;
    height: 60px;
    z-index: 5;
    text-align: left;
    background: #F5F5F5;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
  }

  #app-module .graph {
    width: 30px;
    height: 30px;
    margin: 15px 10px 15px 15px;
  }

  #app-module .img-graphIcon-Active {
    height: 17px;
  }

  #app-module .img-graphIcon-notActive {
    height: 17px;
  }

  #app-module .table- {
    width: 30px;
    height: 30px;
    margin: 15px 10px 15px 0;
  }

  #app-module .img-tableIcon-Active {
    width: 18px;
  }

  #app-module .img-tableIcon-notActive {
    width: 18px;
  }

  #app-module .img-closeMenu {
    height: 8px;
    margin: 15px 0 37px 0;
  }

  #app-module .search-panel {
    width: 100%;
    height: 50%;
    text-align: center;
  }

  #app-module .search-input {
    position: relative;
    width: 30%;
    min-width: 174px;
    height: 30px;
    padding: 12px 10px;
    outline: none;
    border: none;
    top: -25px;

    font-size: 12px;
    display: inline-block;
    box-shadow: 0 4px 10px #C1C1C1;
    border-radius: 5px;
  }

  #app-module .search-button {
    position: relative;
    top: -70px;
    outline: none;
    border: none;
    background: none;
  }

  #app-module .search-button:focus {
    outline: none;
    border: none;
  }

  #app-module .img-searchIcon {
    width: 12px;
    height: 12px;
  }

  #app-module .toggleEur {
    width: 60px;
    height: 30px;
    margin: 0;
  }

  #app-module .toggleEur input {
    display: none;
  }

  #app-module .toggleByn {
    width: 30px;
    height: 30px;
    margin: 0;
  }

  #app-module .toggleByn input {
    display: none;
  }

  #app-module .lol {
    width: 100%;
    height: 100%;
    padding: 0;
    cursor: pointer;
    font-size: 12px;
    text-align: center;
    line-height: 30px;
    color: #494949;
    background-color: #F5F5F5;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    border: 1px solid transparent;

    -webkit-transition: 1s;
    transition: 1s;
  }

  #app-module .filters {
    width: 30px;
    height: 30px;
    margin: 0;
    top: -1px;
  }

  #app-module .img-filtersIcon {
    width: 17px;
    height: 17px;
  }


  #app-module .filters-panel {
    z-index: 20;
    position: absolute;
    top: 110px;
    right: 34px;

    width: 280px;
    height: 185px;

    text-align: right;

    background: #F5F5F5;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    overflow: hidden;
    -webkit-appearance: none;
  }

  #app-module .filters-panel h1 {
    text-align: center;
    font-weight: 600;
    font-size: 12px;
    padding-top: 10px;
  }

  #app-module .close-filters-button {
    background: none;
    outline: none;
    border: none;
    position: relative;
    bottom: 30px;
    margin-right: 10px;
  }

  #app-module .close-filters-button:focus {
    outline: none;
    border: none;
  }

  #app-module textarea:focus, #app-module input:focus {
    outline: none;
  }

  #app-module .filters-text-wrapper {
    float: left;
    width: 50%;
    box-shadow: none;

    text-align: left
  }

  #app-module .text-wrapper {
    padding-top: 15px;
    padding-left: 10px;
    font-size: 12px;
    line-height: 1.8;
  }

  #app-module .filters-input-wrapper {
    float: left;
    width: 50%;
    box-shadow: none;
    text-align: right;
    line-height: 1.35;

    position: relative;
    bottom: 1px;
  }

  #app-module .blue-filters-menu-panel {
    position: relative;
    right: 165px;
    width: 110px;
    height: 45px;

    background: #243EE9;
    border-radius: 5px;
  }

  #app-module .clear-filters-button {
    outline: none;
    border: none;
    font-weight: 600;
    background: none;
    margin-top: 5px;
    margin-left: 0;
    padding: 0;

    color: #494949;
  }

  #app-module .clear-filters-button:focus {
    outline: none;
    border: none;
  }

  #app-module .filters-input-from {
    position: relative;
    right: 5px;
    width: 60px;
    height: 15px;
    font-size: 10px;
    padding-left: 1px;
  }

  #app-module .filter-input-to {
    position: relative;
    right: 6px;
    width: 60px;
    height: 15px;
    font-size: 10px;
    padding-left: 1px;
  }

  #app-module .search-filters-button {
    padding: 13px 85px 0 12px;

    outline: none;
    border: none;
    font-weight: 600;
    font-size: 12px;
    background: none;

    color: #494949;
  }

  #app-module .search-filters-button:focus {
    outline: none;
    border: none;
  }
}
</style>
