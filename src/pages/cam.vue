<template>
  <v-card flat >
    <video ref="video" id="video" width="100%" height="100%" autoplay></video>
    <canvas ref="canvas" id="canvas" width="640" height="640"></canvas>
    <v-container class="report-container" fill-height fluid>
      <v-layout fill-height v-if="imgReport.length > 0" :class="{'grey-bg': imgReport.length > 0}">
        <v-flex xs12 align-end flexbox class="report">
          <div class="text-capitalize font-weight-thin font-italic display-4" :data-percent="imgReport[0].score | percent">{{imgReport[0].description}}</div>
          <span v-for="report in imgReport.slice(1,4)" :key="`id_${report.mid}`">
            <v-chip class="subheading font-weight-regular text-capitalize" text-color="white" label>
              {{report.description}} <span class="subheading font-weight-thin font-italic font-weight-bold">({{ report.score | percent }})</span>
            </v-chip>
          </span>
        </v-flex>
      </v-layout>
    </v-container>
    <v-card-title primary-title>
      <v-layout align-center row wrap>
        <v-flex class="capture" xs3 v-for="(c, i) in captures" :key="`id_${i}_${c.img}`">
          <img :src="c.image" width="130" @click="imgReport = captures[i].imgReport"/>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-card-actions class="videoActions" align-content-center>
      <div>
        <v-btn class="shutter" color="white" flat outline fab id="snap" @click="capture">
          <v-icon large>camera</v-icon>
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios'
import * as config from '../config/cam'
export default {
  data () {
    return {
      captures: [],
      imgReport: []
    }
  },
  mounted () {
    this.video = this.$refs.video
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          this.video.src = window.URL.createObjectURL(stream)
          this.video.play()
        })
    }
  },
  methods: {
    async readImg (index) {
      console.log(config.apiUrls)
      const sendData = {
        image: {
          content: this.captures[index].image
            .replace('data:image/jpeg;base64,', '')
        },
        features: {type: 'LABEL_DETECTION', maxResults: 5}
      }
      let { data } = await axios.post(
        config.apiUrls.cloudVision,
        { requests: [sendData] }
      )
      console.log(data)
      if (data && data.responses[0].labelAnnotations) {
        this.imgReport = data.responses[0].labelAnnotations
        this.captures[index].imgReport = data.responses[0].labelAnnotations
      }
    },
    capture () {
      this.canvas = this.$refs.canvas
      this.canvas.getContext('2d').drawImage(this.video, 0, 0, 640, 640)
      const URL = this.canvas.toDataURL('image/jpeg', 1)
      if (this.captures.length > 3) {
        this.captures.shift()
      }
      this.captures.push({
        image: URL,
        imgReport: {}
      })
      this.readImg(this.captures.length - 1)
    }
  },
  filters: {
    percent: function (value) {
      if (!value) return ''
      return (Math.floor((value) * 10000) / 100).toFixed(2) + '%'
    }
  }
}
</script>

<style lang="stylus">
.fullscreen
  background-color: #000
  color: #fff
  margin: 0
  height: 100vh
  overflow: hidden
  .v-image
    height: 100%
.v-card__title
  padding: 5px
  position: absolute
  bottom: 52px
  z-index: 1000
.theme--light.v-chip
  background-color: rgba(190, 182, 182, 0.4)
.v-card
  height: 100%
.v-badge__badge
  border-radius: 15px
  width: 55px
.report-container
  color: white
  padding: 100px 50px
  background-color: rgba(0,0,0,0.2)
  text-align: center
  font-size: 25px
  font-wight: 300
  .headline
    font-size: 50px !important
    padding: 15px 5px
    font-wight: 500
  .subheader
    font-size: 20px
.report
  z-index: 600
  color: white

#video
  position: fixed
  min-width: 100%
  min-height: 100%
  width: auto
  height: auto
  top: 50%
  left: 50%
  -webkit-transform: translateX(-50%) translateY(-50%)
  transform: translateX(-50%) translateY(-50%)
  pointer-events: none
#canvas
  width: 100%
  display: none
.capture
  z-index: 500
  img
    padding: 5px
    size: 10vh
.shutter
  margin: 0 auto
  z-index: 400
  opacity: 0.8

.videoActions
  z-index: 400
  position: absolute
  bottom: 0
  left: 44%
.grey-bg 
  background-color: rgba(101, 101, 101, 0.4)

</style>
