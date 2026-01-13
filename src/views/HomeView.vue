<script setup>
import { ref, onMounted } from 'vue'
import profileImage from '../../public/images/mustafa.png'
import websiteImage from '../../public/favicon/favicon.svg'
import { Button } from 'primevue'

const profileTitle = 'Hey That\'s Me!'
const websiteTitle = 'Note-Nest'

const profileAlt = 'Profile Picture'
const websiteAlt = 'Website Image'

const currentImage = ref(websiteImage)
const currentTitle = ref(websiteTitle)
const currentAlt = ref(websiteAlt)

const showProfile = () => {
    currentImage.value = profileImage
    currentTitle.value = profileTitle
    currentAlt.value = websiteAlt
}

const showWebsite = () => {
    currentImage.value = websiteImage
    currentTitle.value = websiteTitle
    currentAlt.value = profileAlt
}

// Preload images to avoid first hover lag
onMounted(() => {
    const imagesToPreload = [profileImage, websiteImage]
    imagesToPreload.forEach(src => {
        const img = new Image()
        img.src = src
    })
})
</script>

<template>
    <div class="home-container">
        <header>
            <div>
                <transition name="fade" mode="out-in">
                    <img :src="currentImage" :key="currentImage" :alt="currentAlt" :title="currentTitle">
                </transition>
            </div>
            <div>
                <h1>Welcome to <span class="rainbow-text" @mouseover="showWebsite">Note-Nest</span>!</h1>
                <h4>A note taking web app made by
                    <span @mouseover="showProfile" class="rainbow-text">Mustafa</span>
                    so he can learn <span class="vue-text"><a href="https://vuejs.org/" target="_blank">VUE</a></span>.
                </h4>
                <Button label="Start Now!" severity="contrast" raised />
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

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}

.vue-text {
    background: linear-gradient(90deg,
            #42b883,
            #3fb984,
            #35495e);
    background-size: 300% 300%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    cursor: pointer;
    transition: filter 0.3s ease;
}

.vue-text:hover {
    animation: vue 2s ease infinite;
    filter: brightness(1.15);
}

@keyframes vue {
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