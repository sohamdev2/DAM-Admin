<template>
  <AssetsTab />
</template>

<script>
import AssetsTab from '~/components/dam/Analytics/AssetsTab'
export default {
  components: {
    AssetsTab,
  },
  layout: 'damLayout',
  middleware: ['check-if-suspended'],
}
</script>
