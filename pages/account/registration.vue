<template>
  <a-card title="Регистрация">
    <template v-if="!resultVisible">
      <registration-form
        :class="$style.form"
        @success="onSuccess"
      />
      <span>
        Уже зарегистрированы?
        <nuxt-link :to="{ name: 'Login' }">
          Войти
        </nuxt-link>
      </span>
    </template>
    <a-result
      v-else
      status="success"
      sub-title="Доступ в административную панель будет открыт после подтверждения аккаунта администратором."
    >
      <template #extra>
        <a-button
          key="login"
          type="primary"
          @click="$router.push({ name: 'Login' })"
        >
          Вернуться
        </a-button>
      </template>
    </a-result>
  </a-card>
</template>

<script>
import RegistrationForm from '@/components/forms/account/RegistrationForm.vue'

export default {
  components: {
    RegistrationForm
  },
  data () {
    return {
      resultVisible: false
    }
  },
  methods: {
    onSuccess () {
      this.resultVisible = true
    }
  },
  head: {
    title: 'Регистрация'
  }
}
</script>

<style lang="less" module>
.form {
  margin-bottom: @padding-lg;
}
</style>
