<template>
  <div class="main">
    <!--Left Menu  -->
    <LeftMenu v-if="$auth.loggedIn" />
    <!-- right part  -->
    <div class="main-right">
      <!-- Top Header -->
      <CoreHeader v-if="$auth.loggedIn" />
      <overlay-loader :is-active="isLoading" :loading-text="getLoadingText" />
      <!-- Main content -->
      <div class="body-content p0">
        <div class="general-settings h-100 w-100">
          <SettingsLeftMenu
            v-if="
              $auth.loggedIn &&
              $route.name != 'workspace_id-client-settings-client_id-edit' &&
              $route.name !=
                'workspace_id-client-settings-client_id-contact-person' &&
              $route.name !=
                'workspace_id-client-settings-client_id-reset-password' &&
              $route.name !=
                'workspace_id-client-settings-client_id-company-client-list' &&
              $route.name !=
                'workspace_id-client-settings-client_id-company-client-add' &&
              $route.name !=
                'workspace_id-client-settings-client_id-company-client-company_client_id-edit'
            "
          />
          <nuxt v-if="$auth.loggedIn" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import LeftMenu from '@/components/theme/global/LeftMenu'
import CoreHeader from '@/components/theme/global/CoreHeader'
import SettingsLeftMenu from '@/components/theme/settings/SettingsLeftMenu'
export default {
  components: { SettingsLeftMenu, CoreHeader, LeftMenu },
  computed: {
    ...mapGetters({
      isLoading: 'loading/isLoading',
      getLoadingText: 'loading/getLoadingText',
    }),
  },
}
</script>
