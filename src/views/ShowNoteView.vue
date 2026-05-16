<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Button, Chip } from 'primevue'

const route = useRoute()
const router = useRouter()

const note = ref(null)

onMounted(() => {
  const notes = JSON.parse(localStorage.getItem('notes') || '[]')
  note.value = notes.find((n) => String(n.id) === String(route.params.id)) || null
})

const goBack = () => router.back()
</script>

<template>
  <div class="page">
    <Button icon="pi pi-arrow-left" label="Back" text @click="goBack" />

    <div v-if="!note" class="not-found">
      <h2>Note not found 😕</h2>
    </div>

    <div v-else class="note">
      <h1 class="title">{{ note.title }}</h1>
      <span class="date">Created On: {{ new Date(note.createdAt).toLocaleDateString() }}</span>
      <p class="content">{{ note.note }}</p>

      <div class="tags-container">
        <Chip v-for="t in note.tags" :key="t" :label="t" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 1.5rem;
  max-width: 50rem;
  margin: 0 auto;
}

.not-found {
  text-align: center;
  margin-top: 5rem;
  opacity: 0.75;
}

.note {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  word-break: break-word;
  overflow-wrap: break-word;
}

.content {
  font-size: 1rem;
  line-height: 1.7;
  white-space: pre-wrap;
  margin: 0;
  word-break: break-word;
  overflow-wrap: break-word;
}

.date {
  opacity: 0.6;
  font-size: 0.9rem;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
