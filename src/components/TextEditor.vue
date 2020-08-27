<template>
  <section class="container">
      <quill-editor
        ref="editor"
        v-model="content"
        :options="editorOption"        
      />
  </section>
</template>

<script>
import katex from 'katex';
import 'katex/dist/katex.min.css';
  export default {
    name: 'quill-example-nuxt',
    data () {
      return {
        content: '<p>I am Example</p>',
        editorOption: {
          // Some Quill options...
          theme: 'snow',
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              ['formula']
            ]
          }
        }
      }
    },
    mounted() {
      console.log('App inited, the Quill instance object is:', this.$refs.editor.quill)
      setTimeout(() => {
        this.content = 'I was changed!'
      }, 3000)
    window.katex = katex;
    },
    methods: {
      onEditorBlur(editor) {
        console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      }
    }
    // @blur="onEditorBlur($event)"
    //     @focus="onEditorFocus($event)"
    //     @ready="onEditorReady($event)"
  }
</script>

<style lang="scss" scoped>
  .container {
    margin: 0 auto;
    padding: 50px 0;
    .quill-editor {
      min-height: 200px;
      max-height: 400px;
      overflow-y: auto;
    }
  }
</style>