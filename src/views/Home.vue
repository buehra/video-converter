<template>
  <div class="home">
    <video-converter />
  </div>
</template>

<script>
// @ is an alias to /src
import VideoConverter from '@/components/video-converter.vue';

export default {
  name: 'Home',
  components: {
    VideoConverter,
  },
};
</script>