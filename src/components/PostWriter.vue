<script setup lang="ts">
import { ref, onMounted, watch, watchEffect } from 'vue'
import type { TimelinePost } from '@/posts'
import { marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import highlightjs from 'highlight.js'
import debounce from 'lodash/debounce'

// props

const props = defineProps<{
  post: TimelinePost
}>()

// variables

const title = ref(props.post.title)
const content = ref(props.post.markdown)
const html = ref('')
const contentEditable = ref<HTMLDivElement>()

/*
watchEffect( () => {
  marked.parse(content.value, (err, parseResult) => {
    html.value = parseResult
  })
})
*/

marked.use(markedHighlight({
  langPrefix: 'hljs language-',
  highlight(code) {
    return highlightjs.highlightAuto(code).value;
  }
}));

function parseHtml(markdown: string) {
  html.value = marked.parse(markdown, {
      mangle: false,
      headerIds: false,
      gfm: true,
      breaks: true,
      async: false
  })
}

watch(content, debounce((newContent) => {
  parseHtml(newContent)
}, 250), {
  immediate: true
})

// lifecycle hooks

onMounted(() => {
  if (!contentEditable.value) {
    throw Error('ContentEditable DOM node was not found')
  }
  contentEditable.value.innerText = content.value
})

// functions

function handleInput(): void {
  if (!contentEditable.value) {
    throw Error('ContentEditable DOM node was not found')
  }
  content.value = contentEditable.value?.innerText
}
</script>

<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">Post title</div>
        <input type="text" class="input" v-model="title" />
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <div contenteditable ref="contentEditable" @input="handleInput" />
    </div>
    <div class="column">
      <div v-html="html" />
    </div>
  </div>
</template>
