<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { Toast, Menubar, ConfirmDialog } from 'primevue'
import { ref } from 'vue'
import AppFooter from './components/AppFooter.vue'

const items = ref([
  {
    label: 'Home',
    route: { name: 'home' },
  },
  {
    label: 'Notes',
    route: { name: 'notes' },
  },
])
</script>

<template>
  <Menubar :model="items">
    <template #item="{ item, props }">
      <RouterLink v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
        <a :href="href" v-bind="props.action" @click="navigate">
          <span>{{ item.label }}</span>
        </a>
      </RouterLink>
    </template>
  </Menubar>

  <main>
    <Toast />
    <ConfirmDialog />
    <RouterView />
  </main>

  <AppFooter />
</template>

<style>
.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem 0;
}

.mt-1 {
  margin-top: 1rem;
}

.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  max-width: 380px;
  margin: 0.75rem 0 1rem;
}

.save-btn {
  min-width: 140px;
}

.field {
  flex: 1;
}

.button-row {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
}

.row {
  display: flex;
  gap: 1rem;
  width: 100%;
}

@media (max-width: 640px) {
  .row {
    flex-direction: column;
  }
}

.rainbow-text {
  background: linear-gradient(90deg, #8b5cf6, #6366f1, #3b82f6, #06b6d4, #ec4899);
}

.vue-text {
  background: linear-gradient(90deg, #42b883, #3fb984, #35495e);
}

.rainbow-text,
.vue-text {
  background-size: 300% 300%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
  transition: filter 0.3s ease;
}

.rainbow-text:hover,
.vue-text:hover {
  filter: brightness(1.15);
  animation: text-movement 2s ease infinite;
}

@keyframes text-movement {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}
</style>
