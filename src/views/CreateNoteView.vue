<script setup>
import { InputText, IftaLabel, FloatLabel, Textarea, Button, Chip, useToast } from 'primevue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTags } from '@/composables/useTags'

const title = ref('')
const note = ref('')
const toast = useToast()
const router = useRouter()
const { tag, tags, addTag, removeTag } = useTags(toast)

const saveNote = () => {
  if (!note.value.trim()) {
    toast.add({
      severity: 'warn',
      summary: 'Empty Note',
      detail: 'You cannot save an empty note.',
      life: 3000,
    })
    return
  }

  const noteTitle = title.value.trim() || 'Untitled Note'

  const newNote = {
    id: Date.now(), // simple unique id
    title: noteTitle,
    note: note.value,
    tags: [...tags.value],
    createdAt: new Date().toISOString(),
  }

  // Load existing notes
  const existingNotes = JSON.parse(localStorage.getItem('notes')) || []

  // Add new note
  existingNotes.push(newNote)

  // Save back to localStorage
  localStorage.setItem('notes', JSON.stringify(existingNotes))

  // Success feedback
  toast.add({
    severity: 'success',
    summary: 'Saved',
    detail: 'Your note has been saved!',
    life: 3000,
  })

  router.push({ path: '/notes' })

  // Reset form
  title.value = ''
  note.value = ''
  tags.value = []
  tag.value = ''
}
</script>

<template>
  <div class="center">
    <h1>
      Save Your Note Here
      <img
        src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f609/512.gif"
        width="28"
        height="28"
      />
    </h1>

    <div>
      <!-- Title + Tags -->
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

      <!-- Added Tags -->
      <div class="tag-container">
        <Chip v-for="t in tags" :key="t" :label="t" removable @remove="removeTag(t)" />
      </div>

      <!-- Note -->
      <div class="mt-1">
        <FloatLabel variant="on">
          <Textarea id="note" v-model="note" rows="5" cols="48" style="resize: none" />
          <label for="note">Note</label>
        </FloatLabel>
      </div>

      <div class="button-row">
        <Button label="Save" raised class="save-btn" @click.prevent="saveNote" />
      </div>
    </div>
  </div>
</template>
