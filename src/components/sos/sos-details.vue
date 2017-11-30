<template>
  <div class="sos-details">
    <vue-select-image :dataImages="photos" :is-multiple="true" 
      @onSelectMultipleImage="onSelectMultipleImage" />
  </div>
</template>

<script>
import VueSelectImage from 'vue-select-image'

export default {
  name: 'sos-details',
  data () {
    return {
      photos: [
        {
          id: '1',
          src: 'https://unsplash.it/200?random',
          alt: 'Alt Image 1'
        }, {
          id: '2',
          src: 'https://unsplash.it/200?random',
          alt: 'Alt Image 2'
        }
      ],
      imageMultipleSelected: []
    }
  },
  components: {
    VueSelectImage
  },
  methods: {
    onSelectMultipleImage (data) {
      this.imageMultipleSelected = data
      console.log(this.imageMultipleSelected)
    }
  }
}
</script>

<style scoped>
</style>
