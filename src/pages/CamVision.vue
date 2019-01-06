<template>
  <v-card flat>
    <v-container
      class="container"
      fill-height
      fluid
      style="padding:0; background-color:grey"
    >
      <v-layout
        align-center
        justify-center
        row
        fill-height
      >
        <WebCam
          ref="webcam"
          :deviceId="deviceId"
          width="auto"
          height="100%"
          @cameras="onCameras"
          @camera-change="onCameraChange"
          :isFrontCam="frontCam"
          :googleKey="googleKey"
        >
        </WebCam>
        <v-flex
          xs12
          align-end
          flexbox
          class="report"
          v-if="imgReport.length > 0"
          :class="{'grey-bg': imgReport.length > 0}"
        >
          <div
            class="text-capitalize font-weight-thin font-italic display-4"
            :data-percent="imgReport[0].score | percent"
          >{{imgReport[0].description}}</div>
          <span
            v-for="report in imgReport.slice(1,4)"
            :key="`id_${report.mid}`"
          >
            <v-chip
              class="subheading font-weight-regular text-capitalize"
              text-color="white"
              label
            >
              {{report.description}} <span class="subheading font-weight-thin font-italic font-weight-bold">({{ report.score | percent }})</span>
            </v-chip>
          </span>
        </v-flex>
      </v-layout>
    </v-container>
    <v-card-title primary-title>
      <v-layout
        align-center
        row
        wrap
      >
        <v-flex
          class="capture"
          xs3
          v-for="(c, i) in captures"
          :key="`id_${i}_${c.img}`"
        >
          <img
            :src="c.image"
            width="130"
            @click="imgReport = captures[i].imgReport"
          />
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-card-actions
      class="videoActions"
      align-content-center
    >
      <v-flex xs3>
        <v-btn
          class="shutter"
          color="info"
          flat
          outline
          fab
          id="snap"
          @click="capture"
        >
          <v-icon large>camera</v-icon>
        </v-btn>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs3>
        <v-switch
          color="info"
          v-model="frontCam"
        >
          <v-icon>camera_front</v-icon>
        </v-switch>
      </v-flex>
    </v-card-actions>
  </v-card>
</template>

<script>
import { WebCam } from 'vue-cam-vision'
import * as config from '../config/cam'

export default {
  data () {
    return {
      captures: [],
      imgReport: [],
      frontCam: true,
      webcam: null,
      img: null,
      camera: null,
      deviceId: null,
      devices: [],
      googleKey: config.googleVisionKey
    }
  },
  components: {
    WebCam
  },
  mounted () {
  },
  computed: {

  },
  watch: {
    camera: function (id) {
      this.deviceId = id
    },
    devices: function () {
      // Once we have a list select the first one
      let first = this.devices || this.devices[0]
      if (first) {
        this.camera = first.deviceId
        this.deviceId = first.deviceId
      }
    }
  },
  methods: {
    async sendGVision () {
      const { labelAnnotations } = await this.$refs.webcam.googleVision()
      this.imgReport = labelAnnotations
    },
    async capture () {
      this.img = await this.$refs.webcam.capture()
      this.sendGVision()
    },
    onCameras (cameras) {
      this.devices = cameras
      console.log('On Cameras Event', cameras)
    },
    onCameraChange (deviceId) {
      this.deviceId = deviceId
      this.camera = deviceId
      console.log('On Camera Change Event', deviceId)
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
.fullscreen {
  background-color: #000;
  color: #fff;
  margin: 0;
  height: 100vh;
  overflow: hidden;

  .v-image {
    height: 100%;
  }
}

.v-card__title {
  padding: 5px;
  position: absolute;
  bottom: 52px;
  z-index: 1000;
}

.theme--light.v-chip {
  background-color: rgba(190, 182, 182, 0.4);
}

.v-card {
  height: 100%;
}

.v-badge__badge {
  border-radius: 15px;
  width: 55px;
}

.report-container {
  color: white;
  padding: 100px 50px;
  background-color: rgba(0, 0, 0, 0.2);
  text-align: center;
  font-size: 25px;
  font-wight: 300;

  .headline {
    font-size: 50px !important;
    padding: 15px 5px;
    font-wight: 500;
  }

  .subheader {
    font-size: 20px;
  }
}

.report {
  z-index: 600;
  color: white;
  position: absolute;
  width: 50%;
  height: 50%;
}

#video {
  position: fixed;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  top: 50%;
  left: 50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  pointer-events: none;
}

#canvas {
  width: 100%;
  display: none;
}

.capture {
  z-index: 500;

  img {
    padding: 5px;
    size: 10vh;
  }
}

.shutter {
  margin: 0 auto;
  z-index: 400;
  opacity: 0.8;
}

.videoActions {
  z-index: 400;
  position: absolute;
  bottom: 0;
  left: 44%;
}

.grey-bg {
  background-color: rgba(101, 101, 101, 0.4);
}
</style>
