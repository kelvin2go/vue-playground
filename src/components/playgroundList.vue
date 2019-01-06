<template>
  <v-layout row>
    <Header />
    <v-flex
      xs12
      v-if="cards.length > 0"
    >
      <v-card>
        <v-container
          fluid
          grid-list-md
        >
          <v-layout
            row
            wrap
          >
            <v-flex xs12>
              <h1 class="display-1">Vue playground</h1>
            </v-flex>
            <v-flex
              v-for="card in cards"
              v-bind="{ [`xs${card.flex}`]: true }"
              :key="card.title"
            >
              <router-link :to="card.url">
                <v-card
                  height="500px"
                  :class="randomColor()"
                >
                  <v-img
                    :src="card.src"
                    height="90%"
                    width="auto"
                  >
                    <v-container
                      fill-height
                      fluid
                      pa-2
                    >
                      <v-layout fill-height>
                        <v-flex
                          xs12
                          align-end
                          flexbox
                        >
                          <span
                            class="headline white--text"
                            v-text="card.title"
                          ></span>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-img>

                  <v-card-actions>
                    <div class="title white--text">{{card.description}}</div>
                  </v-card-actions>
                </v-card>
              </router-link>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Header from '@/components/header.vue'
export default {
  data () {
    return {
      color: ['blue-grey', 'cyan', 'purple', 'grey', 'indigo', 'blue', 'light-blue', 'teal'],
      cards: [
        {
          title: 'Youtube TV',
          src: 'static/TV10-26-2018-min.png',
          url: 'tv',
          description: 'TV mode for Youtube playlist',
          flex: 6
        },
        {
          title: 'Image recongizer',
          src: 'static/Cam10-26-2018-min.png',
          url: 'vision',
          description: 'Web-cam image recognition via Google vision',
          flex: 6
        }
      ]
    }
  },
  components: {
    Header
  },
  methods: {
    randomColor () {
      const rand = (num) => {
        return Math.floor(Math.random() * num)
      }
      const colorTemp = ['', 'darken', 'accent']
      const colorTempRand = rand(2)
      return `${this.color[rand(this.color.length)]} ${colorTemp[colorTempRand] === '' ? '' : `${colorTemp[colorTempRand]}-${rand(5)}`}`
    }
  }
}
</script>

<style scoped>
</style>
