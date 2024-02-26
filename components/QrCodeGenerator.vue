<template>
  <a-card style="width: 230px;">
    <img :src="qrCodeUrl" alt="QR Code">
  </a-card>
</template>

<script>
import QRCode from 'qrcode'

export default {
  props: {
    jsonObject: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      qrCodeUrl: ''
    }
  },
  watch: {
    jsonObject: {
      handler () {
        this.generateQRCode()
      },
      deep: true
    }
  },
  mounted () {
    this.generateQRCode()
  },
  methods: {
    generateQRCode () {
      const jsonString = JSON.stringify(this.jsonObject)

      QRCode.toDataURL(jsonString, { type: 'image/png' })
        .then((url) => {
          this.qrCodeUrl = url
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error)
        })
    }
  }
}
</script>
