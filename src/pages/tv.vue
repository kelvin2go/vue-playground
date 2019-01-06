<template>
  <v-layout
    class="fullscreen"
    :class="[{ drawer: drawer }]"
    @mouseenter="mouseOver"
    @mouseleave="mouseLeave"
  >
    <v-navigation-drawer
      :clipped="clipped"
      class="toolbar"
      v-model="drawer"
      width="330"
      dark
      app
      hide-overlay
      fixed
    >
      <YoutubeList
        :tv-list="allList.items"
        @changeChannel="changeChannel"
      />
    </v-navigation-drawer>
    <v-toolbar
      dark
      white--text
      absolute
      class="menuBar"
      v-show="drawer || hover "
    >
      <v-toolbar-side-icon @click="toggleDrawer"></v-toolbar-side-icon>
      <v-flex
        xs5
        sm6
        md3
        white--text
        :label="currentIndex"
      >
        <v-text-field
          label="Watch youtube playlist"
          placeholder="playlist ID"
          v-model="inputVID"
          append-icon="search"
          @click:append="redirectVID(inputVID)"
        ></v-text-field>
      </v-flex>
      <v-flex>
        <v-btn @click="backToTV"> TV NEWS</v-btn>
      </v-flex>
    </v-toolbar>
    <v-flex xs-12>
      <div class="videoContainer">
        <youtube
          width="100%"
          height="100%"
          :video-id="currentVideo.id"
          :player-vars="playerVars"
          @playing="playing"
          @ended="currentIndex++"
        ></youtube>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'
import YoutubeList from '@/components/TVList.vue'
import { mapGetters, mapActions } from 'vuex'
import _debounce from 'lodash/debounce'

export default {
  components: {
    YoutubeList
  },
  beforeRouteEnter (to, from, next) {
    next(async vm => {
      const items = await vm.getTVItems(to.params.id)
      vm.updateTV(items.tvList)
      vm.videoListId = to.params.id
      next()
    })
  },
  data () {
    return {
      clipped: false,
      hover: false,
      videoId: 'u5X_hiHtKkM',
      videoListId: '',
      inputVID: '',
      currentIndex: 0,
      playerVars: {
        autoplay: 1
      },
      tvList: {
        items: {}
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    allList: function () {
      return this.tvList
    },
    drawer: {
      get: function () {
        return this.sidebar
      },
      set: function (val) {
        if (val === false) {
          this.setSidebar(val)
        }
      }
    },
    currentVideo: function () {
      if (this.allList.items.length > 0) {
        return {
          id: this.allList.items[this.currentIndex].snippet.resourceId.videoId
        }
      }
      return {
        id: 'u5X_hiHtKkM',
        index: 0
      }
    }
  },
  watch: {
    videoListId: async function (val) {
      const items = await this.getTVItems(val)
      this.updateTV(items.tvList)
    }
  },
  methods: {
    ...mapActions([
      'openSideBar',
      'closeSidebar',
      'toggleSidebar',
      'setSidebar'
    ]),
    redirectVID (playlistId) {
      this.videoListId = playlistId
      this.$router.push({ name: 'TV', params: { id: playlistId } })
    },
    changeChannel (index) {
      this.currentIndex = index
    },
    mouseOver: _debounce(function () {
      console.log('enter')
      this.hover = true
      if (this.hover) {
        this.openSideBar()
      }
    }, 400),
    mouseLeave: _debounce(function () {
      console.log('leave')
      if (!this.clipped) {
        this.hover = false
        this.closeSidebar()
      }
    }, 400),
    toggleDrawer: _debounce(function () {
      console.log('toggle')
      this.clipped = !this.clipped
      this.toggleSidebar()
    }, 400),
    playing () {
      console.log(' we are watching!!!')
    },
    updateTV (items) {
      this.tvList = {
        ...items
      }
    },
    backToTV () {
      this.videoListId = 'PL0Lee22_Srhx2x7Zki5Xue8ZcjWvwn1Nv'
    },
    async getTVItems (id) {
      const playlistId = this.videoListId || id || 'PL0Lee22_Srhx2x7Zki5Xue8ZcjWvwn1Nv'
      try {
        let { data } = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
          params: {
            part: 'snippet',
            playlistId,
            maxResults: 50,
            key: process.env.YOUTUBE_KEY
          },
          useCache: true
        })
        // console.log(data.items[0].snippet)
        if (data && data.items.length > 0) {
          return { tvList: data }
        }
        return { tvList: {
          items: {}
        } }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="stylus">
.fullscreen {
  .menuBar {
    color: rgba(0, 0, 0, 0.7);
  }

  .toolbar {
    z-index: 3000;
  }

  .v-navigation-drawer {
    z-index: 4000;
  }

  &.drawer {
    padding-left: 330px;
  }
}

.videoContainer {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
