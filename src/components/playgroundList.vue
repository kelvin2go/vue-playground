<template>
  <v-layout row>
    <v-flex xs12 v-if="cards.length > 0">
      <v-card>
        <v-container
          fluid
          grid-list-md
        >
          <v-layout row wrap>
            <v-flex
              v-for="card in cards"
              v-bind="{ [`xs${card.flex}`]: true }"
              :key="card.title"
            >
              <router-link :tag="card.url" :to="card.url">
                <v-card>
                  <v-img
                    :src="card.src"
                    height="500px"
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
                    <v-spacer></v-spacer>
                    <v-btn icon>
                      <v-icon>favorite</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon>bookmark</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon>share</v-icon>
                    </v-btn>
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
          src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
          url: 'tv',
          flex: 12
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
