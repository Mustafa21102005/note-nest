<script setup>
import { ref } from 'vue'
import profileImage from '../../public/images/mustafa.png'
import websiteImage from '../../public/favicon/favicon.svg'
import { Button } from 'primevue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isFading = ref(false)

const profileTitle = "Hey That's Me!"
const websiteTitle = 'Note-Nest'

const profileAlt = 'Profile Picture'
const websiteAlt = 'Website Image'

const currentImage = ref(websiteImage)
const currentTitle = ref(websiteTitle)
const currentAlt = ref(websiteAlt)

const goToCreateNote = () => {
  router.push({ name: 'create-note' })
}

const preload = (src) => {
  const img = new Image()
  img.src = src
  img.decode?.()
}

preload(profileImage)
preload(websiteImage)

const showProfile = () => {
  if (currentImage.value === profileImage) return

  isFading.value = true
  setTimeout(() => {
    currentImage.value = profileImage
    currentTitle.value = profileTitle
    currentAlt.value = profileAlt
    isFading.value = false
  }, 300)
}

const showWebsite = () => {
  if (currentImage.value === websiteImage) return

  isFading.value = true
  setTimeout(() => {
    currentImage.value = websiteImage
    currentTitle.value = websiteTitle
    currentAlt.value = websiteAlt
    isFading.value = false
  }, 300)
}
</script>

<template>
  <div class="home-container">
    <header>
      <div>
        <img
          :src="currentImage"
          :alt="currentAlt"
          :title="currentTitle"
          class="fade-img"
          :class="{ fading: isFading }"
        />
      </div>
      <div>
        <h1>Welcome to <span class="rainbow-text" @mouseover="showWebsite">Note-Nest</span>!</h1>
        <h4>
          A note taking web app made by
          <span @mouseover="showProfile" class="rainbow-text">
            <a href="https://github.com/Mustafa21102005" target="_blank">Mustafa</a>
          </span>
          so he can learn
          <span class="vue-text"><a href="https://vuejs.org/" target="_blank">VUE</a></span
          >.
        </h4>
        <Button label="Start Now!" severity="primary" raised @click="goToCreateNote" />
      </div>
    </header>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
}

header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
}

header img {
  height: 30rem;
  border-radius: 50%;
}

.fade-img {
  opacity: 1;
  transition: opacity 0.3s ease;
}

.fade-img.fading {
  opacity: 0;
}
</style>
