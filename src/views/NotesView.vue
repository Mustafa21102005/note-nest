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
      <Card v-for="note in notes" :key="note.id" class="note-card">
        <template #title>
          <div class="card-title">
            <span class="title-text">{{ note.title }}</span>

            <div class="actions">
              <Button icon="pi pi-pencil" severity="secondary" rounded text aria-label="Edit"
                @click="goToEdit(note.id)" />

              <Button icon="pi pi-trash" severity="danger" rounded text aria-label="Delete"
                @click="confirmDelete(note.id)" />
            </div>
          </div>
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
}

.card-title {
  display: flex;
  align-items: center;
}

.title-text {
  flex: 1;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.tags:nth-child(n + 2) {
  margin-left: 0.5rem;
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
