<template>
  <div>
    <el-upload action="xx" class="upload-demo" :limit="1" :before-upload="beforeUploadVideo">
      <el-button size="small" type="primary"> 上传视频{{ videoFile.parserLoading }} </el-button>
    </el-upload>
    <el-upload action="xx" class="upload-demo" :limit="1" :before-upload="beforeUploadTrack">
      <el-button size="small" type="primary">
        上传字幕
      </el-button>
    </el-upload>
    <input v-model="info.fileUrl" type="text" />
    <p>{{ info.fileUrl }}</p>
    <el-button size="small" type="primary" @click="showMessage(123)">
      showMessage
    </el-button>
    <el-button size="small" type="primary" @click="showMessage(444)">
      showMessage
    </el-button>
    <video style="width: 200px;" :src="videoFile.fileUrl" v-if="videoFile.fileUrl" disablePictureInPicture="true" controlsList="nodownload" controls>
      <track v-if="trackFile.fileUrl" default :src="trackFile.fileUrl" />
    </video>
    <!-- <p>video code:{{ videoFile.videoInfo. }}</p>
    <p>audio code:{{ videoFile.videoInfo. }}</p> -->
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { useUploadVideo, useUploadTrack, useUploadSubtitle } from './hooks'

export default defineComponent({
  setup() {
    const [videoFile, beforeUploadVideo] = useUploadVideo()
    const [trackFile, beforeUploadTrack] = useUploadTrack()
    const info = useUploadSubtitle()
    function showMessage(code) {
      console.log(this.$te(`message.${code}`), this.$t(`message.${code}`, ['hahah']))
    }
    return {
      videoFile,
      trackFile,
      beforeUploadVideo,
      beforeUploadTrack,
      info,
      showMessage
    }
  },
  methods: {}
})
</script>
