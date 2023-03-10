<template>
  <transition name="slide-up">
    <div
      v-if="downloadCount"
      class="downloading-indicator"
      :class="{ hover, pinned }"
      @mouseleave="hover = false"
      @mouseenter="hover = true"
    >
      <transition-expand>
        <div v-if="toExpand" class="downloading-indicator--wrapper">
          <div
            v-for="item in items"
            :key="item.id"
            class="downloading-indicator--list"
          >
            <div class="downloading-indicator--item">
              <div class="downloading-indicator--item-container">
                <div class="downloading-indicator--name">{{ item.name }}</div>
                <small v-if="item.total != 0">
                  {{ $toHumanlySize(item.loaded) }} /
                  {{ $toHumanlySize(item.total) }}
                </small>
              </div>
              <SpinLoading />
            </div>
          </div>
        </div>
      </transition-expand>
      <div class="downloading-indicator--header">
        <img
          class="dam-pin"
          :class="{ active: pinned }"
          :src="
            require(pinned ? '~/assets/img/pinned.svg' : '~/assets/img/pin.svg')
          "
          height="18"
          width="18"
          @click="pinned = !pinned"
        />
        <RadialProgressBar
          v-if="progress"
          :completed-steps="progress"
          :total-steps="100"
          :diameter="32"
          :stroke-width="4"
          :inner-stroke-width="5"
          start-color="#ED703D"
          stop-color="#ED703D"
          inner-stroke-color="#EEE"
        />
        <span> Downloading ({{ downloadCount }}) items </span>

        <img
          class="dam-toggle"
          :class="{ active: toExpand }"
          src="~/assets/img/chevron-arrow-up.svg"
          height="18"
          width="18"
          @click="expanded = !expanded"
        />
      </div>
    </div>
  </transition>
</template>

<script>
import { TransitionExpand } from 'vue-transition-expand'

import 'vue-transition-expand/dist/vue-transition-expand.css'

let RadialProgressBar
if (process.client)
  RadialProgressBar = require('vue-radial-progress/dist/vue-radial-progress.min.js')

export default {
  components: {
    TransitionExpand,
    RadialProgressBar,
  },
  data() {
    return {
      hover: false,
    }
  },
  computed: {
    expanded: {
      get() {
        return this.$store.state.dam.downloadIndicator.expanded
      },
      set(v) {
        this.$store.commit('dam/downloadIndicator.expanded', v)
      },
    },
    pinned: {
      get() {
        return this.$store.state.dam.downloadIndicator.pinned
      },
      set(v) {
        this.$store.commit('dam/downloadIndicator.pinned', v)
      },
    },
    toExpand() {
      return this.expanded && (this.pinned || this.hover)
    },
    downloadCount() {
      return this.$store.state.dam.downloadIndicator.count
    },
    progress() {
      const items = Object.values(this.items)
      return (
        Math.round(
          (items.reduce((sum, { progress }) => sum + progress, 0) /
            items.length) *
            100
        ) / 100
      )
    },
    items() {
      return this.$store.state.dam.downloadIndicator.files
    },
  },
}
</script>

<style>
.downloading-indicator {
  position: fixed;
  bottom: 48px;
  right: 2rem;
  width: 240px;
  box-shadow: 1px 3px 6px rgba(0, 0, 0, 0.12);
  z-index: 12;
  min-height: 54px;
  border-radius: 6px;
  padding: 4px;
  background: white;
  opacity: 0.76;
  transition: all 240ms cubic-bezier(0.165, 0.84, 0.844, 1);
}
.selectBaractive .downloading-indicator {
  margin-bottom: 80px;
}

.downloading-indicator--header .radial-progress-container .radial-progress-bar {
  height: 32px !important;
}

.downloading-indicator.pinned,
.downloading-indicator:hover {
  opacity: 1;
  width: 380px;
  z-index: 999999;
  box-shadow: 2px 6px 12px rgba(0, 0, 0, 0.12);
}
.downloading-indicator--header {
  height: 48px;
  font-weight: 800;
  color: #4d4d4d;
}
.downloading-indicator--header .dam-pin {
  display: none;
}

.downloading-indicator.pinned .dam-pin,
.downloading-indicator--header:hover .dam-pin {
  display: block;
}
.downloading-indicator--header,
.downloading-indicator--item {
  display: flex;
  align-items: center;
  margin: auto;
  padding: 8px;
}
.downloading-indicator--item {
  height: 48px;
}
.downloading-indicator--item-container {
  flex: 1;
  width: 100%;
  overflow: hidden;
}
.downloading-indicator--item-container .downloading-indicator--name {
  font-weight: 600;
}
.downloading-indicator--item-container .downloading-indicator--name,
.downloading-indicator--header span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.downloading-indicator--header span {
  flex: 1;
  padding: 8px;
}
.downloading-indicator--header .dam-toggle,
.dam-pin {
  cursor: pointer;
  opacity: 0.6;
}
.downloading-indicator--header .dam-toggle {
  margin-right: 8px;
}
.downloading-indicator--header .dam-toggle.active {
  transform: rotate(180deg);
}
.downloading-indicator--header .dam-toggle.active {
  fill: #ed703d;
}
.downloading-indicator--header .dam-toggle:hover,
.downloading-indicator--header .dam-pin:hover {
  opacity: 1;
}

.downloading-indicator--wrapper {
  max-height: 400px;
  overflow: auto;
  border-bottom: 2px solid #4d4d4d0e;
  transition: height 240ms cubic-bezier(0.165, 0.84, 0.844, 1) !important;
}

.expand-enter-active.downloading-indicator--wrapper,
.expand-leave-active.downloading-indicator--wrapper {
  overflow: hidden !important;
}
.downloading-indicator--list {
  padding: 8px 0;
}
</style>
