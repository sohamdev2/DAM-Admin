<template>
  <div class="main">
    <!--Left Menu  -->
    <LeftMenu v-if="$auth.loggedIn" />
    <!-- right part  -->
    <div class="main-right">
      <!-- Top Header -->
      <ProjectTimeTrackHeader v-if="$auth.loggedIn" />
      <!-- Main content -->
      <nuxt v-if="$auth.loggedIn" />
    </div>
  </div>
</template>
<script>
import LeftMenu from '@/components/theme/global/LeftMenu'
import ProjectTimeTrackHeader from '@/components/theme/global/ProjectTimeTrackHeader'
export default {
  components: { ProjectTimeTrackHeader, LeftMenu },
  computed: {},
  async mounted() {},
}
</script>
