<script setup>
import { useTags } from '@/composables/useTags'
import { IftaLabel, InputText, useToast, Chip, FloatLabel, Textarea, Button } from 'primevue'
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const title = ref('')
const note = ref('')
const { tag, tags, addTag, removeTag } = useTags(toast)

const goToNote = () => {
  router.push({
    name: 'notes',
  })
}

const noteId = Number(route.params.id)

onMounted(() => {
  const savedNotes = JSON.parse(localStorage.getItem('notes')) || []
  const existingNote = savedNotes.find((n) => n.id === noteId)

  if (!existingNote) {
    toast.add({
      severity: 'error',
      summary: 'Note Not Found :(',
      detail: 'Did you write the link yourself? ;D',
      life: 5000,
    })
    router.push('/')
    return
  }

  title.value = existingNote.title
  note.value = existingNote.note
  tags.value = [...existingNote.tags]
})

watch(
  tags,
  (newTags) => {
    localStorage.setItem('tags', JSON.stringify(newTags))
  },
  { deep: true },
)

const updateNote = () => {
  if (!note.value.trim()) {
    toast.add({
      severity: 'warn',
      summary: 'Empty Note',
      detail: 'Note cannot be empty',
      life: 3000,
    })
    return
  }

  const savedNotes = JSON.parse(localStorage.getItem('notes')) || []

  const updatedNotes = savedNotes.map((n) =>
    n.id === noteId
      ? { ...n, title: title.value || 'Untitled Note', note: note.value, tags: tags.value }
      : n,
  )

  localStorage.setItem('notes', JSON.stringify(updatedNotes))

  toast.add({
    severity: 'success',
    summary: 'Updated',
    detail: 'Note updated successfully',
    life: 3000,
  })

  router.push('/notes')
}
</script>

<template>
  <div class="center">
    <h1>Edit Note ✏️</h1>

    <div class="form">
      <div class="row">
        <IftaLabel class="field">
          <InputText id="title" v-model="title" />
          <label for="title">Title</label>
        </IftaLabel>

        <IftaLabel class="field">
          <InputText id="tag" v-model="tag" @keydown.enter.prevent="addTag" />
          <label for="tag">Add Your Tag & Press Enter</label>
        </IftaLabel>
      </div>

      <div class="tag-container">
        <Chip v-for="t in tags" :key="t" :label="t" removable @remove="removeTag(t)" />
      </div>

      <div class="mt-1">
        <FloatLabel variant="on">
          <Textarea id="note" v-model="note" rows="5" cols="48" style="resize: none" />
          <label for="note">Note</label>
        </FloatLabel>
      </div>

      <div class="button-row">
        <Button label="Cancel" severity="secondary" raised class="save-btn" style="margin-right: 1rem"
          @click="goToNote()" />
        <Button label="Update" raised class="save-btn" @click="updateNote()" />
      </div>
    </div>
  </div>
</template>
