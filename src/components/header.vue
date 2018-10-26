<template>
  <v-toolbar fixed app :clipped-left="clipped" v-on:scroll="handleScroll" v-bind:class="{solid: this.scroll > 48}">
    <a id="brand" href="/"><v-toolbar-title class="titleText" v-text="title"></v-toolbar-title></a>
    <v-spacer></v-spacer>
    <v-list-tile
      router
      :to="item.to"
      :key="i"
      v-for="(item, i) in items"
      exact
      class="menuText white--text"
    >
      <v-list-tile-content>
        <v-list-tile-title class="white--text" v-text="item.title"></v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
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
  .theme--light
    .v-toolbar
      z-index: 300
      background: rgba(18, 21, 20, 0.55)
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
