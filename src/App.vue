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
  <main class="main-content">
    <RouterView />
  </main>

  <!-- Footer -->
  <AppFooter />
</template>
