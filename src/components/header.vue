<template>
  <v-toolbar fixed app :clipped-left="clipped" v-on:scroll="handleScroll" v-bind:class="{solid: this.scroll > 48}">
    <a id="brand" href="/"><v-toolbar-title class="titleText" v-text="title"></v-toolbar-title></a>
    <v-spacer></v-spacer>
    <a
      :href="item.to"
      :key="i"
      v-for="(item, i) in items"
      class="menuText white--text">
      <v-list-tile-content>
        <v-list-tile-title class="white--text" v-text="item.title"></v-list-tile-title>
      </v-list-tile-content>
    </a>
  </v-toolbar>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'KELVIN HO',
      scroll: 0,
      items: [
        { icon: 'home', title: 'Home', to: '/' },
        { icon: 'library_books', title: 'Blogs', to: '/posts' },
        { icon: 'portrait', title: 'Showcases', to: '/showcases' },
        { icon: 'gamepad', title: 'Playground', to: '/playground' },
        { icon: 'favorite', title: 'Side Projects', to: '/sideprojects' }
      ]
    }
  },
  methods: {
    handleScroll () {
      this.scroll = window.scrollY
    }
  },
  beforeMount () {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="stylus">
  .menuText
    text-transform: capitalize

    webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: inherit;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-size: 16px;
    font-weight: 400;
    height: 48px;
    margin: 0;
    padding: 0 16px;
    position: relative;
    text-decoration: none;
    -webkit-transition: .3s cubic-bezier(.25,.8,.5,1);
    transition: .3s cubic-bezier(.25,.8,.5,1);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

  .theme--light
    .v-toolbar
      z-index: 300
      background: rgba(18, 21, 20, 0.55) !important
      font-family: Raleway, Helvetica, Arial, sans-serif
      &.solid
        background: rgba(18, 21, 20, 0.4)
  a, a:link, a:visited
    color: #63b5f7
    text-decoration: none
    &#brand
      color: #fff
      border: 1px solid #fff
      padding: 4px

    .toolbar__title
      margin-left: 0px
      .list__tile__content
        text-transform: uppercase
</style>
