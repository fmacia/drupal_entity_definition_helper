<script setup>
const shareUrl = encodeURI(window.location.href)
const title = encodeURI(document.title)
</script>

<template>
  <footer class="bg-[#101010] p-4 flex justify-between">
    <a class="underline" href="https://github.com/fmacia" target="_blank">
      Made by fmacia (Github link)
    </a>

    <div class="flex gap-2">
      <span> Share: </span>

      <div class="space-x-2">
        <a
          class="underline"
          :href="`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`"
          target="_blank"
        >
          Facebook
        </a>
        <a
          class="underline"
          :href="`https://twitter.com/intent/tweet?text=${title}&url=${shareUrl}`"
          target="_blank"
        >
          Twitter
        </a>
        <a class="underline" :href="`mailto:?body=${shareUrl}`" target="_blank"> Email </a>
        <a
          class="underline"
          :href="`https://api.whatsapp.com/send?text=${title}%0A${shareUrl}`"
          target="_blank"
        >
          Whatsapp
        </a>
        <a
          class="underline"
          :href="`https://telegram.me/share/url?url=${shareUrl}&text=${title}`"
          target="_blank"
        >
          Telegram
        </a>
      </div>
    </div>
  </footer>
</template>
