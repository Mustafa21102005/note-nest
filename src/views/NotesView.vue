<script setup>
import { Card, Chip, Button, useConfirm } from 'primevue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const notes = ref([])
const router = useRouter()
const confirm = useConfirm()

onMounted(() => {
  const savedNotes = localStorage.getItem('notes')
  if (savedNotes) {
    notes.value = JSON.parse(savedNotes)
  }
})

const goToCreateNote = () => {
  router.push({ name: 'create-note' })
}

const goToEdit = (id) => {
  router.push({
    name: 'edit-note',
    params: { id },
  })
}

const confirmDelete = (id) => {
  confirm.require({
    message: 'Are you sure you want to delete this note?',
    header: 'Confirm Deletion',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Yes',
    rejectLabel: 'No',
    acceptClass: 'p-button-danger',
    rejectClass: 'p-button-secondary',
    accept: () => {
      notes.value = notes.value.filter((n) => n.id !== id)
      localStorage.setItem('notes', JSON.stringify(notes.value))
    },
  })
}
</script>

<template>
  <div class="page">
    <div class="header">
      <Button label="Create" icon="pi pi-plus" raised @click="goToCreateNote" />
    </div>

    <div v-if="notes.length === 0" class="empty-state">
      <h2>No notes yet 📝</h2>
      <p>Create your first note to get started.</p>

      <Button label="Create a Note" icon="pi pi-plus" raised @click="goToCreateNote" />
    </div>

    <div v-else class="center">
      <Card
        v-for="note in notes"
        :key="note.id"
        class="note-card"
        @click="router.push({ name: 'show-note', params: { id: note.id } })"
      >
        <template #title>
          <div class="card-title">
            <span class="title-text">{{ note.title }}</span>

            <div class="actions">
              <Button
                icon="pi pi-pencil"
                severity="secondary"
                rounded
                text
                aria-label="Edit"
                @click.stop="goToEdit(note.id)"
              />

              <Button
                icon="pi pi-trash"
                severity="danger"
                rounded
                text
                aria-label="Delete"
                @click.stop="confirmDelete(note.id)"
              />
            </div>
          </div>
        </template>

        <template #subtitle>
          Created On: {{ new Date(note.createdAt).toLocaleDateString() }}
        </template>

        <template #content>
          <p class="m-0 note-content">
            {{ note.note }}
          </p>
        </template>

        <template #footer>
          <div class="tags-container">
            <Chip v-for="t in note.tags" :key="t" :label="t" class="tags" />
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 1rem;
}

.header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.5rem;
}

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
  cursor: pointer;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease;
  border: 1.8px dashed transparent;
}

.note-card:hover {
  transform: translateY(-1px);
  border-color: var(--p-primary-color);
}

.card-title {
  display: flex;
  align-items: center;
}

.title-text {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 18rem;
}

.note-content {
  display: -webkit-box;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tags {
  max-width: 14rem;
}

:deep(.tags .p-chip-label) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5rem;
  gap: 0.75rem;
  text-align: center;
  opacity: 0.85;
}

.empty-state p {
  margin: 0;
  font-size: 0.95rem;
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
