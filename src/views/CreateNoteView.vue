<script setup>
import { InputText, IftaLabel, FloatLabel, Textarea, Button, Chip, useToast } from 'primevue'
import { ref, onMounted, watch } from 'vue'

const title = ref('')
const note = ref('')
const tag = ref('')
const tags = ref([])
const toast = useToast()

const addTag = () => {
  const value = tag.value.trim()

  if (!value) return

  if (tags.value.includes(value)) {
    toast.add({
      severity: 'error',
      summary: 'Duplicate Tag',
      detail: `"${value}" is already added!`,
      life: 4000
    })
    return
  }

  tags.value.push(value)
  tag.value = ''
}

onMounted(() => {
  const savedTags = localStorage.getItem('tags')
  if (savedTags) {
    tags.value = JSON.parse(savedTags)
  }
})

watch(tags, (newTags) => {
  localStorage.setItem('tags', JSON.stringify(newTags))
}, { deep: true })

const removeTag = (t) => {
  tags.value = tags.value.filter(tag => tag !== t)
}

const saveNote = () => {
  if (!note.value.trim()) {
    toast.add({
      severity: 'warn',
      summary: 'Empty Note',
      detail: 'You cannot save an empty note.',
      life: 3000
    })
    return
  }

  const noteTitle = title.value.trim() || 'Untitled Note'

  const newNote = {
    id: Date.now(), // simple unique id
    title: noteTitle,
    note: note.value,
    tags: [...tags.value],
    createdAt: new Date().toISOString()
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
    life: 3000
  })

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
      <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f609/512.gif" width="28" height="28">
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

      <!-- Tags -->
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

<style scoped>
.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem 0;
}

.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  max-width: 380px;
  margin: 0.75rem 0 1rem;
}

.mt-1 {
  margin-top: 1rem;
}

.row {
  display: flex;
  gap: 1rem;
  width: 100%;
}

.button-row {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
}

.save-btn {
  min-width: 140px;
}

.field {
  flex: 1;
}

@media (max-width: 640px) {
  .row {
    flex-direction: column;
  }
}
</style>
