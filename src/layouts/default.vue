
<template>
  <div id="app" class="main">
    <v-app>
      <v-content :class="[{ drawer: sidebar }]">
        <router-view/>
      </v-content>
    </v-app>
  </div>
</template>

<style lang="stylus">
html {
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.71;
  letter-spacing: normal;
  background-color: #fafafa;
  body {
    margin: 0;
  }
  ul {
    list-style: none;
  }
  nav {
    box-shadow: none;
  }
  .error--text, .error-text{
    color: #ea5265;
    span {
      font-size: 16px;
      font-weight: normal;
      line-height: 1.5;
    }
  }
  .error{
    background-color: #ff5252 !important;
  }
  .drawer {
    padding-left: 330px !important;
  }
}
</style>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  components: {
  }
}
</script>
