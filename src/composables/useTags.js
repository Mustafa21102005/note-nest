import { ref } from 'vue'

export function useTags(toast) {
  const tag = ref('')
  const tags = ref([])

  const addTag = () => {
    const value = tag.value.trim()
    if (!value) return

    if (tags.value.includes(value)) {
      toast?.add({
        severity: 'error',
        summary: 'Duplicate Tag',
        detail: `"${value}" is already added!`,
        life: 4000,
      })
      return
    }

    tags.value.push(value)
    tag.value = ''
  }

  const removeTag = (t) => {
    tags.value = tags.value.filter((tag) => tag !== t)
  }

  return {
    tag,
    tags,
    addTag,
    removeTag,
  }
}
