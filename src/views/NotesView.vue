<script setup>
import { Card, Chip } from 'primevue'
import { ref, onMounted } from 'vue'

const notes = ref([])

onMounted(() => {
  const savedNotes = localStorage.getItem('notes')
  if (savedNotes) {
    notes.value = JSON.parse(savedNotes)
  }
})
</script>

<template>
  <div class="center">
    <Card v-for="note in notes" :key="note.id" class="note-card">
      <template #title>
        {{ note.title }}
      </template>

      <template #subtitle>
        Created On: {{ new Date(note.createdAt).toLocaleDateString() }}
      </template>

      <template #content>
        <p class="m-0">
          {{ note.note }}
        </p>
      </template>
      <template #footer>
        <Chip v-for="t in note.tags" :key="t" :label="t" class="tags" />
      </template>
    </Card>
  </div>
</template>

<style scoped>
.center {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  justify-items: center;
  margin: 3rem 1rem;
}

.note-card {
  margin-bottom: 1.5rem;
  width: 100%;
  max-width: 25rem;
}

.tags:nth-child(n + 2) {
  margin-left: 0.5rem;
}

@media (max-width: 1024px) {
  .center {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .center {
    grid-template-columns: 1fr;
  }
}
</style>
