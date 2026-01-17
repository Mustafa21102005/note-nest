import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CreateNoteView from '@/views/CreateNoteView.vue'
import NotesView from '@/views/NotesView.vue'
import EditNoteView from '@/views/EditNoteView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/create/note',
      name: 'create-note',
      component: CreateNoteView,
    },
    {
      path: '/notes',
      name: 'notes',
      component: NotesView,
    },
    {
      path: '/edit/note/:id',
      name: 'edit-note',
      component: EditNoteView
    }
  ]
})

export default router
