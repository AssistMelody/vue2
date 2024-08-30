// mouse.js
import { reactive } from '@vue/composition-api'
import { onMounted, ref, onUnmounted } from '@vue/composition-api'
import mediaInfo from 'mediainfo.js'

// 按照惯例，组合式函数名以“use”开头
export function useMouse() {
  // 被组合式函数封装和管理的状态
  const x = ref(0)
  const y = ref(0)

  // 组合式函数可以随时更改其状态。
  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  // 一个组合式函数也可以挂靠在所属组件的生命周期上
  // 来启动和卸载副作用
  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  // 通过返回值暴露所管理的状态
  return { x, y }
}

/**
 * @description:
 * @return {*}
 */
export function useBoolean(defaultValue = false) {
  const state = ref(defaultValue)
  const actions = {
    set: v => (state.value = v),
    setTrue: () => (state.value = true),
    setFalse: () => (state.value = false)
  }
  return [state, actions]
}

export function useUploadVideo() {
  const videoFile = reactive({
    file: null,
    fileUrl: '',
    videoInfo: null,
    parserLoading: false
  })
  // eslint-disable-next-line no-unused-vars
  const allowVideoFormat = ['HEVC', 'AVC']
  // eslint-disable-next-line no-unused-vars
  const allowAudioFormat = ['AAC', 'MP3', 'PCM']
  // eslint-disable-next-line no-unused-vars
  const aspectRatio = 16 / 9
  const beforeUpload = file => {
    videoFile.file = file
    videoFile.fileUrl = URL.createObjectURL(file)
    videoFile.parserLoading = false
    mediaInfo({
      format: 'object'
    })
      .then(parser => {
        const getSize = () => file.size
        const readChunk = (chunkSize, offset) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = event => {
              if (event.target.error) {
                reject(event.target.error)
              }
              resolve(new Uint8Array(event.target.result))
            }
            reader.readAsArrayBuffer(file.slice(offset, offset + chunkSize))
          })
        return parser.analyzeData(getSize, readChunk).then(info => {
          console.log(info)
          return {}
        })
      })
      .then(info => {
        videoFile.videoInfo = info
      })
      .catch(() => {})
      .finally(() => {
        videoFile.parserLoading = true
      })
    return false
  }
  return [videoFile, beforeUpload]
}

export function useUploadTrack() {
  const trackFile = reactive({
    file: null,
    fileUrl: '',
    parserLoading: false
  })
  function srtToVtt(srtText) {
    // 将 SRT 文本按行拆分为数组
    const lines = srtText.trim().split('\n')
    // 移除 SRT 文件头部
    lines.shift()
    // 将 SRT 的时间格式转换为 WebVTT 的时间格式
    const vttLines = lines.map(line => {
      if (/^\d\d:\d\d:\d\d,\d\d\d --> \d\d:\d\d:\d\d,\d\d\d$/.test(line)) {
        // 将 SRT 时间格式转换为 WebVTT 时间格式
        return line.replace(/,/g, '.').replace(' --> ', ' --> ')
      } else {
        // 其他行保持不变
        return line
      }
    })
    // 将处理后的行连接起来，并添加 WebVTT 文件头
    const vttText = 'WEBVTT FILE\n' + vttLines.join('\n')
    return vttText
  }

  /**
   * @param {File} file
   */
  const beforeUpload = file => {
    trackFile.file = file
    if (file.name.split('.').pop() == 'vtt') {
      trackFile.fileUrl = URL.createObjectURL(file)
    } else {
      new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = event => {
          if (event.target.error) {
            reject(event.target.error)
          }
          resolve(event.target.result)
        }
        reader.readAsText(file)
      }).then(res => {
        const vtt = srtToVtt(res)
        trackFile.fileUrl = URL.createObjectURL(new Blob([vtt], { type: 'text/vtt' }))
      })
    }
    return false
  }

  return [trackFile, beforeUpload]
}

export function useUploadSubtitle() {
  const info = reactive({
    file: null,
    fileUrl: '',
    parserLoading: false
  })
  return info
}

class a {
  set a(v) {
    try {
      const test = [, ,]
      console.log(test)
      a.set(v)
    } catch (e) {
      console.log(e)
    }
  }
}
