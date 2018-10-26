<template>
  <v-layout class="fullscreen">
    CAM
    <vue-webrtc ref="webrtc"
      width="100%"
      :roomId="roomId"
      @error="onError"
      socketURL=""
    />

    <div class="row">
      <div class="col-md-12 my-3">
        <button type="button" class="btn btn-primary" @click="onJoin">Join</button>
        <button type="button" class="btn btn-primary" @click="onLeave">Leave</button>
        <button type="button" class="btn btn-primary" @click="onCapture">Capture Photo</button>
      </div>
    </div>
     <div class="row">
      <div class="col-md-12">
        <h2>Captured Image</h2>
        <figure class="figure">
          <img :src="img" class="img-responsive" />
        </figure>
      </div>
    </div>
  </v-layout>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'app',
  components: {
  },
  data () {
    return {
      img: null,
      roomId: 'public-room'
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    onCapture () {
      this.img = this.$refs.webrtc.capture()
    },
    onJoin () {
      this.$refs.webrtc.join()
    },
    onLeave () {
      this.$refs.webrtc.leave()
    },
    onError (error, stream) {
      console.log('On Error Event', error, stream)
    }
  }
}
</script>

<style lang="stylus">

</style>
