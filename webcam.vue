<template>
  <video
    ref="video"
    :width="width"
    :height="height"
    :src="source"
    :autoplay="autoplay"
    :playsinline="playsinline"
  />
</template>

<script>
// import axios from 'axios'
import getUserMedia from 'getusermedia'
export default {
  name: 'vue-cam-vision',
  data () {
    return {
      source: null,
      canvas: null,
      camerasListEmitted: false,
      cameras: []
    }
  },
  props: {
    width: {
      type: [Number, String],
      default: '100%'
    },
    height: {
      type: [Number, String],
      default: 500
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    screenshotFormat: {
      type: String,
      default: 'image/jpeg'
    },
    deviceId: {
      type: String,
      default: null
    },
    playsinline: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    deviceId: function (id) {
      this.changeCamera(id)
    }
  },
  mounted () {
    this.setupMedia()
  },
  methods: {
    open () {
      getUserMedia((err, stream) => {
        if (err) {
          console.log('failed')
        } else {
          console.log('got a stream', stream)
          this.video = this.$refs.video
          if ('srcObject' in this.video) {
            this.video.srcObject = stream
          } else {
            this.video.src = window.URL.createObjectURL(stream)
          }
          this.video.onloadedmetadata = () => {
            this.video.play()
          }
          this.video.play()
        }
      })
    }
  }
}
</script>