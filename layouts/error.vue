<template>
  <a-row
    type="flex"
    justify="center"
    align="middle"
    :class="$style.root"
  >
    <a-result
      v-if="error.statusCode === 403"
      status="403"
      title="403"
      sub-title="Доступ ограничен"
    />
    <a-result
      v-if="error.statusCode === 404"
      status="404"
      title="404"
      sub-title="Страница не найдена"
    />
    <a-result
      v-if="error.statusCode === 500"
      status="500"
      title="500"
      sub-title="Внутренняя ошибка сервера"
    />
    <a-result
      v-if="![403, 404, 500].includes(error.statusCode)"
      :status="error.statusCode"
      title="Возникла непредвиденная ошибка"
    />
  </a-row>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  },
  head: {
    title: 'Ошибка'
  }
}
</script>

<style lang="less" module>
.root {
  flex: auto;
}
</style>
