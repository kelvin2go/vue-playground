<template>
  <v-layout row>
    <v-flex xs12 v-if="cards.length > 0">
      <v-card>
        <v-container
          fluid
          grid-list-md
        >
          <v-layout row wrap>
            <v-flex xs12>
              <h1 class="display-1">This is my vue playground</h1>
            </v-flex>
            <v-flex
              v-for="card in cards"
              v-bind="{ [`xs${card.flex}`]: true }"
              :key="card.title"
            >
              <router-link :tag="card.url" :to="card.url">
                <v-card height="500px">
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
                        <v-flex xs12 align-end flexbox>
                          <span class="headline white--text" v-text="card.title"></span>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-img>

                  <v-card-actions>
                    <div class="title">{{card.description}}</div>
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

export default {
  data () {
    return {
      cards: [
        {
          title: 'Youtube TV',
          src: '/static/TV10-26-2018-min.png',
          url: 'tv',
          description: 'Simulate for playing YouTube playlist on TV mode',
          flex: 6
        },
        {
          title: 'Camera image recongizer',
          src: '/static/Cam10-26-2018-min.png',
          url: 'cam',
          description: 'Google vision api to recongize object through cam',
          flex: 6
        }
      ]
    }
  },
  components: {
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
