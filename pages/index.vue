<template>
  <app-wrapper
    filled
    inner-gap
  >
    Здравствуйте!<br>
    Вы находитесь на главной странице административной панели приложения «QRТехподдержка».
  </app-wrapper>
</template>

<script>
import AppWrapper from '@/components/AppWrapper.vue'
import { UPDATE_ITEMS } from '@/store/breadcrumb.js'

export default {
  components: {
    AppWrapper
  },
  beforeMount () {
    if (!this.$tokenClaims.check('userRole', 'Admin')) {
      this.$nuxt.error({ statusCode: 403 })
    }
  },
  mounted () {
    this.$store.commit(`breadcrumb/${UPDATE_ITEMS}`, [
      { name: 'Административная панель' }
    ])
  }
}
</script>
