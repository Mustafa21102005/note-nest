<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Menubar from 'primevue/menubar'
import { ref } from "vue"
import AppFooter from './components/AppFooter.vue';

const items = ref([
  {
    label: 'Home',
    route: '/'
  }
]);
</script>

<template>
  <!-- Navbar -->
  <Menubar :model="items">
    <template #item="{ item, props }">
      <RouterLink v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
        <a :href="href" v-bind="props.action" @click="navigate">
          <span>{{ item.label }}</span>
        </a>
      </RouterLink>
    </template>
  </Menubar>

  <!-- Content -->
  <main>
    <RouterView />
  </main>

  <!-- Footer -->
  <AppFooter />
</template>

<style>
.rainbow-text {
  background: linear-gradient(90deg,
      #8b5cf6,
      #6366f1,
      #3b82f6,
      #06b6d4,
      #ec4899);
  background-size: 300% 300%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
  transition: filter 0.3s ease;
}

.rainbow-text:hover {
  animation: rainbow 2s ease infinite;
  filter: brightness(1.15);
}

@keyframes rainbow {
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