<template>
  <div
    :id="`appTextEditor_${_uid}`"
    :class="$style.root"
  />
</template>

<script>
// https://editorjs.io/
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'

export default {
  model: {
    event: 'change'
  },
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      editor: null,
      defaultConfig: {
        tools: {
          header: {
            class: Header,
            inlineToolbar: true
          },
          list: {
            class: List,
            inlineToolbar: true
          }
        }
      }
    }
  },
  mounted () {
    this.editor = new EditorJS({
      holder: `appTextEditor_${this._uid}`,
      logLevel: 'ERROR',
      minHeight: 200,
      onChange: this.onChange,
      ...this.defaultConfig,
      ...this.config
    })

    this.editor.isReady.catch((reason) => {
      if (reason.message.includes("Pass correct holder's ID")) {
        // eslint-disable-next-line no-console
        console.log(
          "%c [AppTextEditor.vue] Don't panic please! It isn't critical error.",
          'color: green'
        )
      }
    })
  },
  beforeDestroy () {
    // Проверка устраняет проблему с тем,
    // что на момент срабатывания beforeDestroy
    // инстанс класса EditorJS может быть не инициализирован
    if (this.editor.destroy instanceof Function) {
      this.editor.destroy()
    }
  },
  methods: {
    onChange ({ saver }) {
      this.$nextTick(() => {
        saver.save().then((outputData) => {
          outputData.blocks.length
            ? this.$emit('change', JSON.stringify(outputData))
            : this.$emit('change', null)
        })
      })
    }
  }
}
</script>

<style lang="less" module>
// stylelint-disable-next-line selector-pseudo-class-no-unknown
:global {
  .codex-editor {
    min-height: 200px;
  }

  .codex-editor__redactor {
    padding-bottom: 0 !important;
  }

  .ce-block__content {
    max-width: 100%;
  }

  .ce-toolbar__content {
    max-width: calc(100% - 60px);
  }
}

.root {
  padding: @input-padding-vertical-base @input-padding-horizontal-base;
  color: @text-color;
  border-width: @border-width-base;
  border-style: @border-style-base;
  border-color: @border-color-base;
  border-radius: @border-radius-base;
}

/*
https://html.spec.whatwg.org/multipage/rendering.html#sections-and-headings
Форма с редактором обёрнута <section>.
Согласно спецификации внутри section свойства h1 отличаются.
*/
h1 {
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  font-size: 2em;
  font-weight: bold;
}
</style>
