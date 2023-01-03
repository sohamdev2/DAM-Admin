<template>
  <div class="attach-gallery-model" :class="{ open: active }">
    <div class="attach-gallery-model-wrapper">
      <div class="attach-gallery-header">
        <div class="attach-gallery-header-left">
          <div class="attach-gallery-details">
            <template v-if="currentFile">
              <div class="attach-gallery-attname">
                {{ currentFile.name }}
              </div>
              <div class="attach-gallery-atttime">
                {{ currentFile.ago || 'Just Now' }}
              </div>
            </template>
          </div>
          <div class="attach-gallery-button">
            <button
              v-if="currentFile"
              v-tooltip.left="{
                html: true,
                content: `<b>Assets link copied</b>`,
                trigger: 'focus',
                delay: { show: 0, hide: 1500 },
              }"
              class="btn btn-gray btn-icon"
              @click="copyAssets(currentFile)"
            >
              <CopyIcon />
              Copy Asset Link
            </button>
            <button
              v-if="currentFile"
              class="btn btn-icon"
              :class="{ 'btn-disable': currentFile.downloading }"
              :disabled="currentFile.downloading"
              @click="downloadFile(currentFile)"
            >
              <template v-if="currentFile.downloading">
                <i class="fa fa-circle-o-notch fa-spin"></i> &nbsp;
                downloading...
              </template>
              <template v-else>
                <svg
                  id="Layer_1"
                  class="download-icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 18 18"
                  xml:space="preserve"
                >
                  <g id="Group_4359" transform="translate(-153.745 -317.549)">
                    <path
                      id="Path_3427"
                      class="fill-color"
                      d="M156.4,335.5c-1.4,0-2.6-1.2-2.6-2.6v-3.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.7,0.3,0.8,0.8v3.7c0,0.6,0.5,1,1,1h12.8c0.6,0,1-0.5,1-1v-3.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8v3.7c0,1.4-1.2,2.6-2.6,2.6H156.4z"
                    ></path>
                    <path
                      id="Path_3428"
                      class="fill-color"
                      d="M157.6,325.3c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l4,4l4-4c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.1,5.1L157.6,325.3z"
                    ></path>
                    <path
                      id="Path_3429"
                      class="fill-color"
                      d="M162.7,330.1c-0.4,0-0.8-0.4-0.8-0.8v-11c0-0.4,0.3-0.8,0.8-0.8c0.4,0,0.8,0.3,0.8,0.8c0,0,0,0,0,0.1v11C163.5,329.7,163.2,330.1,162.7,330.1z"
                    ></path>
                  </g>
                </svg>

                Download
              </template>
            </button>
          </div>
        </div>
        <div class="attach-gallery-header-right">
          <a class="attach-close" @click="active = false">
            <!-- Close icon -->
            <svg focusable="false" viewBox="0 0 32 32">
              <path
                d="M18.1,16L27,7.1c0.6-0.6,0.6-1.5,0-2.1s-1.5-0.6-2.1,0L16,13.9l-8.9-9C6.5,4.3,5.6,4.3,5,4.9S4.4,6.4,5,7l8.9,8.9L5,24.8c-0.6,0.6-0.6,1.5,0,2.1c0.3,0.3,0.7,0.4,1.1,0.4s0.8-0.1,1.1-0.4l8.9-8.9l8.9,8.9c0.3,0.3,0.7,0.4,1.1,0.4s0.8-0.1,1.1-0.4c0.6-0.6,0.6-1.5,0-2.1L18.1,16z"
              ></path>
            </svg>
          </a>
        </div>
      </div>
      <div class="attach-gallery-img-view">
        <div class="attach-gallery-img-view-wrapper">
          <div v-if="currentFile" class="attach-gallery-img-preview">
            <!-- <i class="fa fa-circle-o-notch fa-spin"></i> -->
            <div v-if="isImage(currentFile.file_type)" class="preview-image">
              <img
                :src="currentFile.url"
                style="user-select: none"
                class="img-responsive"
              />
            </div>
            <div
              v-else-if="isPdf(currentFile.file_type)"
              id="pdf-preview-dialog"
              style="display: block; opacity: 1; visibility: visible"
            >
              <iframe
                id="pdf-preview"
                style="opacity: 1; visibility: visible"
                type="application/pdf"
                :src="currentFile.url"
                width="100%"
                height="100%"
              ></iframe>
            </div>

            <iframe
              v-else-if="isDoc(currentFile.file_type)"
              :src="`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
                currentFile.url
              )}`"
              width="100%"
              height="100%"
              frameborder="0"
            >
              This is an embedded
              <a target="_blank" href="http://office.com"> Microsoft Office </a>
              document, powered by
              <a target="_blank" href="http://office.com/webapps">
                Office Online </a
              >.
            </iframe>
            <iframe
              v-else-if="isTxt(currentFile.file_type)"
              type="application/txt"
              :src="currentFile.url"
              width="100%"
              height="100%"
              style="background-color: #ffffff"
            ></iframe>
            <client-only v-else-if="isVideo(currentFile.file_type)">
              <!-- :poster="videoThumbnail" -->
              <div
                class="d-flex align-items-center justify-content-center h-100"
              >
                <video
                  ref="video"
                  style="max-height: 100%; max-width: 100%"
                  controlsList="nodownload"
                  type="video/mp4"
                  controls
                  crossOrigin="anonymous"
                  disablepictureinpicture
                >
                  <source :src="currentFile.url" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </client-only>
            <client-only v-else-if="isAudio(currentFile.file_type)">
              <av-waveform
                ref="audio"
                :audio-src="currentFile.url"
                :canv-width="1200"
                :canv-height="200"
                :playtime-font-size="18"
                :played-line-width="2"
                :playtime-clickable="false"
                :noplayed-line-width="1"
                played-line-color="#ed703d"
                noplayed-line-color="#1a1d2556"
              ></av-waveform>
            </client-only>

            <div
              v-else
              class="no-preview-file"
              style="opacity: 1; visibility: visible"
            >
              <div class="inner-wrapper">
                <img
                  src="@/assets/img/icon/not-able-preview.svg"
                  alt=""
                  class="img-responsive"
                />
                <h5>We're not able to preview this file</h5>
                <div class="attachment-name">
                  {{ currentFile.name }}
                </div>
                <button
                  class="btn"
                  :class="{ 'btn-disable': currentFile.downloading }"
                  :disabled="currentFile.downloading"
                  @click="downloadFile(currentFile)"
                >
                  <template v-if="currentFile.downloading">
                    Downloading...
                  </template>
                  <template v-else>Open original</template>
                </button>
              </div>
            </div>
          </div>
          <div class="attach-gallery-arrow-left" @click.capture="prev">
            <div class="attach-gallery-arrow-icon">
              <svg focusable="false" viewBox="0 0 32 32">
                <path
                  d="M8.8,16c0-0.3,0.1-0.7,0.3-0.9l9-11c0.5-0.6,1.5-0.7,2.1-0.2s0.7,1.5,0.2,2.1l-8.2,10l8.2,10c0.5,0.6,0.4,1.6-0.2,2.1s-1.6,0.4-2.1-0.2l-9-11C8.9,16.7,8.8,16.3,8.8,16z"
                ></path>
              </svg>
            </div>
          </div>
          <div class="attach-gallery-arrow-right" @click.capture="next">
            <div class="attach-gallery-arrow-icon">
              <svg focusable="false" viewBox="0 0 32 32">
                <path
                  d="M23.2,16c0,0.3-0.1,0.7-0.3,0.9l-9,11c-0.5,0.6-1.5,0.7-2.1,0.2s-0.7-1.5-0.2-2.1l8.2-10L11.6,6c-0.5-0.6-0.4-1.6,0.2-2.1s1.6-0.4,2.1,0.2l9,11C23.1,15.3,23.2,15.7,23.2,16z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="attach-gallery-thumb">
        <template v-for="({ id, url, file_type, preview_image }, i) in files">
          <div
            v-if="isImage(file_type)"
            :key="id"
            class="gallery-thumg thumb-img"
            :class="{ active: i === currentFileIndex }"
            :style="{ backgroundImage: `url('${url}')` }"
            @click="currentFileIndex = i"
          ></div>
          <div
            v-else-if="isPdf(file_type)"
            :key="id"
            class="gallery-thumg thumb-pdf"
            :class="{ active: i === currentFileIndex }"
            @click="currentFileIndex = i"
          >
            <img src="@/assets/img/file/pdf.svg" />
          </div>
          <div
            v-else
            :key="id"
            class="gallery-thumg other-files"
            :class="{ active: i === currentFileIndex }"
            @click="currentFileIndex = i"
          >
            <img :src="preview_image" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import ValueModel from '@/components/theme/settings/ValueModel'
const imageExtensions = ['jpg', 'png', 'jpeg', 'svg', 'gif']
const pdfExtensions = ['pdf']
const docExtensions = ['doc', 'docx', 'ppt', 'pptx', 'xlsx', 'xls', 'dotx']
const videoExtensions = [
  'mp4',
  'mkv',
  'webm',
  'mov',
  'mpeg-4',
  'mov',
  // 'avi',
  '3gp',
]
const audioExtensions = ['mp3', 'wav', 'wma', 'aac', 'ogg']
const txtExtensions = ['txt']
export default {
  extends: ValueModel,
  props: {
    attactments: { type: Array, default: () => [] },
    activeId: { type: Number, default: null },
    open: { type: Boolean, default: false },
  },
  data() {
    return {
      currentFileIndex: 0,
      files: [],
    }
  },
  computed: {
    currentFile() {
      return this.files[this.currentFileIndex]
    },
  },
  watch: {
    activeId() {
      this.setIndex()
    },
    active(active) {
      if (active) document.addEventListener('keydown', this.handleKeys)
      else document.removeEventListener('keydown', this.handleKeys)
    },
    attactments() {
      this.initFiles()
      this.setIndex()
    },
    currentFileIndex() {
      if (this.files[this.currentFileIndex])
        this.$emit('update:activeId', this.files[this.currentFileIndex].id)
    },
  },
  mounted() {
    this.initFiles()
    this.setIndex()
  },
  methods: {
    isImage(ext) {
      return !!ext && imageExtensions.includes(ext.toLowerCase())
    },
    isPdf(ext) {
      return !!ext && pdfExtensions.includes(ext.toLowerCase())
    },
    isDoc(ext) {
      return !!ext && docExtensions.includes(ext.toLowerCase())
    },
    isVideo(ext) {
      return !!ext && videoExtensions.includes(ext.toLowerCase())
    },
    isTxt(ext) {
      return !!ext && txtExtensions.includes(ext.toLowerCase())
    },
    isAudio(ext) {
      return !!ext && audioExtensions.includes(ext.toLowerCase())
    },
    initFiles() {
      this.files = this.attactments
        .filter((ev) => !!ev)
        .map(
          ({
            id,
            display_file_name: displayFileName,
            display_file: displayFile,
            db_date: dbDate,
            created_date: createdDate,
            file_type: fileType,
            preview_image: previewImage,
            attachment_tag,
          }) => ({
            id,
            file_type: fileType,
            name: displayFileName,
            url: displayFile,
            ago: createdDate,
            createdAt: dbDate,
            preview_image: previewImage,
            downloading: false,
            attachment_tag,
          })
        )
    },
    handleKeys(event) {
      const keyCode = event.keyCode

      switch (keyCode) {
        case 27: // esc
          this.active = false
          break
        case 37: // left
          this.prev()
          break
        case 38: // top
          this.currentFileIndex = 0
          break
        case 39: // right
          this.next()
          break
        case 40: // bottom
          this.currentFileIndex = this.files.length && this.files.length - 1
          break

        default:
          break
      }
    },
    next() {
      this.currentFileIndex = (this.currentFileIndex + 1) % this.files.length
    },
    prev() {
      this.currentFileIndex =
        this.currentFileIndex - 1 < 0
          ? this.files.length - 1
          : this.currentFileIndex - 1
    },
    setIndex() {
      if (this.activeId) {
        const index = this.files.findIndex(
          ({ id }) => parseInt(this.activeId) === parseInt(id)
        )
        if (~index) return (this.currentFileIndex = index)
      }

      this.currentFileIndex = 0
    },
    downloadFile(file) {
      // if (!file.url || file.downloading) return

      this.$downloadAsset(file.attachment_tag, file.id)
    },
    copyAssets(attachment) {
      const url = `${
        window.location.origin
      }/preview_assets?${this.$toQueryString({
        attachment_type: attachment.attachment_tag,
        assets_id: attachment.id,
      })}`
      const el = document.createElement('textarea')
      // el.innerHTML = window.location.href
      el.innerHTML = url
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      this.$toast.global.success('Asset link copied')
    },
  },
}
</script>
