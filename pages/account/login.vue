<template>
  <a-card title="Вход">
    <login-form
      :class="$style.form"
      @success="onSuccess"
    />
    <a-space direction="vertical">
      <span>
        У вас ещё нет аккаунта?
        <nuxt-link :to="{ name: 'Registration' }">
          Зарегистрироваться
        </nuxt-link>
      </span>
    </a-space>
  </a-card>
</template>

<script>
import LoginForm from '@/components/forms/account/LoginForm.vue'

export default {
  components: {
    LoginForm
  },
  props: {
    returnUrl: {
      type: String,
      default: null
    }
  },
  head: {
    title: 'Вход'
  },
  methods: {
    onSuccess () {
      if (this.returnUrl) {
        location.replace(this.returnUrl)
      } else {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style lang="less" module>
.form {
  margin-bottom: @padding-lg;
}
</style>
