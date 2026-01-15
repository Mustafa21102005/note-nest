<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer>
    &copy; Note-Nest {{ year }} By
    <span class="rainbow-text">
      <a href="https://github.com/Mustafa21102005" target="_blank">Mustafa</a>
    </span>
  </footer>
</template>

<style scoped>
footer {
  position: fixed;
  width: 100%;
  padding: 1rem 0;
  text-align: center;
  border-top: 1px solid #a4a4a4;
  bottom: 0;
}
</style>
