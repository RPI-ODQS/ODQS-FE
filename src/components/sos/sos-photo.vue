<template>
  <div class="sos-photo">
    <el-form
      id="sos-photo-select-form"
      ref="queryForm"
      :model="queryForm"
      label-position="left"
      :inline="true"
    >
      <el-form-item class="sos-photo-form-item">
        <el-date-picker
          v-model="queryForm.timeRange"
          type="datetimerange"
          placeholder="选择时间范围"
        />
      </el-form-item>
      <el-form-item class="sos-photo-form-item">
        <el-button type="primary">Search</el-button>
      </el-form-item>
    </el-form>
    <vue-select-image
      :dataImages="photos"
      :is-multiple="true"
      @onSelectMultipleImage="onSelectMultipleImage"
    />
  </div>
</template>

<script>
import VueSelectImage from 'vue-select-image'

export default {
  name: 'sos-photo',
  data () {
    return {
      building: null,
      buildingId: null,
      queryForm: {
        timeRange: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)]
      },
      photos: [
        {
          id: '1',
          src: 'https://dummyimage.com/400x400/000/fff.png',
          alt: 'Alt Image 1'
        }, {
          id: '2',
          src: 'https://dummyimage.com/400x400/000/fff.png',
          alt: 'Alt Image 2'
        }, {
          id: '3',
          src: 'https://dummyimage.com/400x400/000/fff.png',
          alt: 'Alt Image 3'
        }, {
          id: '23',
          src: 'https://dummyimage.com/400x400/000/fff.png',
          alt: 'Alt Image 4'
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
      // console.log(this.imageMultipleSelected)
    },
    async getPhotos () {
      let request = {
        auth: this.$store.state.authInfo,
        param: {
          buildingId: 1,
          timeFrom: '2017-12-20 10',
          timeTo: ''
        }
      }
      try {
        let res = await this.$http.get('/picture', request)
        console.log(res)
      } catch (err) {
        console.err(err)
      }
    }
  },
  created () {
    this.building = this.$route.query.name
    this.buildingId = this.$route.query.id

    // this.getPhotos()
  }
}
</script>

<style scoped>
#sos-photo-select-form {
  text-align: left;
  margin-left: 3vw;
}
</style>

<style>
.VueSelectImage__img {
  width: 230px;
  height: 230px;
}
</style>

