<template>
  <a-card title="Вход">
    <login-form
      :class="$style.form"
      @success="onSuccess"
    />
    <a-space direction="vertical">
      <!-- <nuxt-link :to="{ name: 'RestorePassword' }">
        Забыли пароль?
      </nuxt-link> -->
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
  methods: {
    onSuccess () {
      if (this.returnUrl) {
        location.replace(this.returnUrl)
      } else {
        this.$router.push('/')
      }
    }
  },
  head: {
    title: 'Вход'
  }
}
</script>

<style lang="less" module>
.form {
  margin-bottom: @padding-lg;
}
</style>
