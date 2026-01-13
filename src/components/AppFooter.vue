<script setup>
const year = new Date().getFullYear()
</script>

<template>
    <footer>
        Note-Nest &copy; {{ year }}
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