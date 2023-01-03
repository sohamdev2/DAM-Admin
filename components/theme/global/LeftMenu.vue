<template>
  <div class="main-left">
    <component :is="`style`" v-html="css"></component>
    <div class="logo-instance">
      <img
        v-if="getBrandingDetails && getBrandingDetails.branding.brand_favicon"
        :src="getBrandingDetails.branding.brand_favicon"
        alt=""
        class="logo-icon"
      />
      <span v-else class="text-logo-letter">{{
        getBrandingDetails ? getBrandingDetails.name.substring(0, 2) : ''
      }}</span>
      <nuxt-link
        :to="{
          name: auth.user.redirectPathName,
          params: { workspace_id: auth.id },
        }"
      >
        <img
          v-if="getBrandingDetails && getBrandingDetails.logo"
          :src="getBrandingDetails.logo"
          alt=""
          class="logo"
        />
        <span v-else class="text-logo">{{
          getBrandingDetails ? getBrandingDetails.name : ''
        }}</span>
      </nuxt-link>
    </div>
    <div class="side-menu">
      <div class="customscrollbar">
        <ul class="nav nav-main">
          <div style="color: white"></div>
          <li
            v-if="auth.user.hasDamAccess"
            id="dam-left-menu"
            :class="{
              'nav-parent': true,
              active:
                getCurrentModule.firstIndex == 'dam' ||
                getCurrentModule.secondIndex == 'dam'
                  ? true
                  : false,
            }"
          >
            <a href="javascript:;" class="nav-link">
              <svg
                id="Layer_1"
                class="dam-icon white"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 18 18"
                xml:space="preserve"
              >
                <g id="Group_4069" transform="translate(-332.448 -126.134)">
                  <path
                    id="Path_3348"
                    class="fill-color"
                    d="M350.2,126.4c-0.2-0.2-0.4-0.3-0.7-0.3h-16.1c-0.5,0-1,0.4-1,1v0v16.1c0,0.5,0.4,1,1,1h16.1c0.5,0,1-0.4,1-1c0,0,0,0,0,0v-16.1C350.4,126.8,350.3,126.6,350.2,126.4z M348.5,142.2h-14.1v-14.1h14.1L348.5,142.2z"
                  />
                  <path
                    id="Path_3349"
                    class="fill-color"
                    d="M341.4,136.1c0.3,0,0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4c-0.2-0.2-0.4-0.3-0.7-0.3c-0.3,0-0.5,0.1-0.7,0.3c-0.4,0.4-0.4,1,0,1.4C340.9,136,341.2,136.1,341.4,136.1z"
                  />
                </g>
              </svg>

              <span>Digital Asset Manager</span>
            </a>
            <ul v-if="!isInstance" class="nav nav-children">
              <template v-if="getInstance">
                <li>
                  <nuxt-link
                    exact
                    class="nav-link"
                    :to="{
                      name: 'workspace_id-dam',
                      params: { workspace_id: auth.id },
                    }"
                  >
                    <svg
                      id="Layer_1"
                      class="dashboard-icon white"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 18 18"
                      xml:space="preserve"
                    >
                      <g
                        id="Group_5350"
                        transform="translate(-501.711 -997.494)"
                      >
                        <path
                          id="Path_3166"
                          class="fill-color"
                          d="M518.2,999v1.5h-15V999H518.2 M518.6,997.5h-15.8c-0.6,0-1.1,0.5-1.1,1.1v2.2c0,0.6,0.5,1.1,1.1,1.1h15.8c0.6,0,1.1-0.5,1.1-1.1v-2.2C519.7,998,519.2,997.5,518.6,997.5z"
                        />
                        <path
                          id="Path_3167"
                          class="fill-color"
                          d="M508.5,1005v9h-5.2v-9H508.5 M508.8,1003.5h-6c-0.6,0-1.1,0.5-1.1,1.1v9.8c0,0.6,0.5,1.1,1.1,1.1h6c0.6,0,1.1-0.5,1.1-1.1v-9.8C510,1004,509.5,1003.5,508.8,1003.5z"
                        />
                        <path
                          id="Path_3168"
                          class="fill-color"
                          d="M518.2,1005v2.2H513v-2.2H518.2 M518.6,1003.5h-6c-0.6,0-1.1,0.5-1.1,1.1v3c0,0.6,0.5,1.1,1.1,1.1h6c0.6,0,1.1-0.5,1.1-1.1v-3C519.7,1004,519.2,1003.5,518.6,1003.5z"
                        />
                        <path
                          id="Path_3169"
                          class="fill-color"
                          d="M518.2,1011.7v2.2H513v-2.2H518.2 M518.6,1010.2h-6c-0.6,0-1.1,0.5-1.1,1.1v3c0,0.6,0.5,1.1,1.1,1.1h6c0.6,0,1.1-0.5,1.1-1.1v-3C519.7,1010.7,519.2,1010.2,518.6,1010.2z"
                        />
                      </g>
                    </svg>

                    <span>Dashboard</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link
                    class="nav-link"
                    :to="{
                      name: 'workspace_id-dam-share-urls',
                      params: { workspace_id: auth.id },
                    }"
                  >
                    <svg
                      id="Layer_1"
                      class="share-link-icon white"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 12 12"
                      xml:space="preserve"
                    >
                      <g
                        id="Icon_ionic-ios-link"
                        transform="translate(-3.375 -3.375)"
                      >
                        <path
                          id="Path_3757"
                          class="fill-color"
                          d="M10.1,11.9L10.1,11.9c-0.1,0-0.2,0.1-0.3,0.1l-1.9,1.9c-0.8,0.8-2.2,0.8-3,0s-0.8-2.2,0-3l0,0l2-2C7,8.8,7.1,8.7,7.2,8.6c0.1-0.1,0.3-0.2,0.4-0.2c0.1-0.1,0.3-0.1,0.4-0.1c0.1,0,0.2,0,0.3,0c0,0,0.1,0,0.1,0c0.5,0,1,0.2,1.4,0.6c0.2,0.2,0.4,0.5,0.5,0.8c0.1,0.2,0.3,0.4,0.6,0.3h0h0c0.2-0.1,0.4-0.3,0.3-0.6c-0.1-0.5-0.4-0.9-0.7-1.2c-0.5-0.4-1-0.7-1.7-0.8c-0.1,0-0.1,0-0.2,0c-0.1,0-0.2,0-0.3,0c-0.1,0-0.1,0-0.2,0c-0.2,0-0.3,0-0.5,0.1c0,0-0.1,0-0.1,0C7.4,7.5,7.2,7.6,7,7.7C6.7,7.8,6.5,8,6.2,8.2l-2,2c-0.6,0.6-0.9,1.3-0.9,2.2c0,1.7,1.4,3,3,3c0.8,0,1.6-0.3,2.1-0.9l1.9-1.9c0.2-0.2,0.2-0.5,0-0.6C10.3,11.9,10.2,11.8,10.1,11.9z"
                        />
                        <path
                          id="Path_3758"
                          class="fill-color"
                          d="M14.5,4.3c-1.2-1.2-3.1-1.2-4.3,0L8.4,6.1c-0.2,0.2-0.2,0.5,0,0.7c0.1,0.1,0.2,0.1,0.3,0.1c0.1,0,0.3,0,0.4-0.1l1.8-1.8c0.8-0.8,2.2-0.8,3,0.1c0.8,0.8,0.8,2.1,0,2.9l-2,2c-0.1,0.1-0.2,0.2-0.3,0.3c-0.1,0.1-0.3,0.2-0.4,0.2c-0.1,0.1-0.3,0.1-0.4,0.1c-0.1,0-0.2,0-0.3,0c0,0-0.1,0-0.1,0c-0.8,0-1.5-0.6-1.8-1.3C8.3,8.9,8.1,8.8,7.9,8.9C7.6,8.9,7.5,9.2,7.5,9.4c0,0,0,0,0,0c0.1,0.4,0.4,0.8,0.7,1.1l0,0l0,0c0.5,0.5,1.1,0.8,1.8,0.9c0.1,0,0.2,0,0.3,0c0.1,0,0.2,0,0.2,0c0.2,0,0.4,0,0.6-0.1c0.2-0.1,0.4-0.1,0.6-0.2c0.3-0.1,0.6-0.3,0.8-0.6l2-2C15.7,7.4,15.7,5.5,14.5,4.3L14.5,4.3z"
                        />
                      </g>
                    </svg>

                    <span>Shared URLs</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link
                    class="nav-link"
                    :to="{
                      name: 'workspace_id-dam-embed-urls',
                      params: { workspace_id: auth.id },
                    }"
                  >
                    <svg
                      id="Layer_1"
                      class="embed-icon white"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 18 9.8"
                      xml:space="preserve"
                    >
                      <g
                        id="Group_4360"
                        transform="translate(-199.745 -321.662)"
                      >
                        <path
                          id="Path_3430"
                          class="fill-color"
                          d="M204,330.9c-0.2,0-0.4-0.1-0.5-0.2l-3.5-3.5c-0.3-0.3-0.3-0.8,0-1.1l3.5-3.5c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1.1l-2.9,3l2.9,3c0.3,0.3,0.3,0.8,0,1.1C204.5,330.8,204.3,330.9,204,330.9L204,330.9z"
                        />
                        <path
                          id="Path_3431"
                          class="fill-color"
                          d="M213.4,330.9c-0.4,0-0.8-0.3-0.8-0.8c0-0.2,0.1-0.4,0.2-0.5l2.9-3l-2.9-3c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0c0,0,0,0,0,0l3.5,3.5c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0l-3.5,3.5C213.8,330.8,213.7,330.9,213.4,330.9z"
                        />
                        <path
                          id="Path_3432"
                          class="fill-color"
                          d="M207,331.4c-0.4,0-0.8-0.3-0.8-0.8c0-0.1,0-0.2,0.1-0.3l3.4-8.2c0.2-0.4,0.6-0.6,1-0.4c0.4,0.2,0.6,0.6,0.4,1l0,0l-3.4,8.2C207.6,331.3,207.4,331.4,207,331.4z"
                        />
                      </g>
                    </svg>
                    <span>Embed URLs</span></nuxt-link
                  >
                </li>
                <!--                <li>
                  <nuxt-link
                    class="nav-link"
                    :to="{
                      name: 'workspace_id-dam-analytics',
                      params: { workspace_id: auth.id },
                    }"
                  >
                    <svg
                      id="Layer_1"
                      class="analytics-icon white"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 11 11"
                      xml:space="preserve"
                    >
                      <path
                        id="spreadsheet-app"
                        class="fill-color st0"
                        d="M10.6,2.4H8.3C8,2.4,7.8,2.6,7.8,2.8v7.4H7.1V0.4C7.1,0.2,6.9,0,6.7,0c0,0,0,0,0,0H4.4C4.1,0,3.9,0.2,3.9,0.4l0,0v9.7H3.2V5.8c0-0.2-0.2-0.4-0.4-0.4H0.4C0.2,5.4,0,5.6,0,5.8v4.8C0,10.8,0.2,11,0.4,11h10.2c0.2,0,0.4-0.2,0.4-0.4V2.8C11,2.6,10.8,2.4,10.6,2.4z M2.3,10.2H0.9V6.2h1.5L2.3,10.2z M4.8,0.9h1.5v9.3H4.8V0.9z M10.2,10.2H8.7V3.2h1.5L10.2,10.2z"
                      />
                    </svg>
                    <span>Analytics</span>
                  </nuxt-link>
                </li>-->
                <li>
                  <nuxt-link
                    class="nav-link"
                    :to="{
                      name: 'workspace_id-dam-damAnalytics-damInsights',
                      params: { workspace_id: auth.id },
                    }"
                  >
                    <svg
                      id="Layer_1"
                      class="analytics-icon white"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 11 11"
                      xml:space="preserve"
                    >
                      <path
                        id="spreadsheet-app"
                        class="fill-color st0"
                        d="M10.6,2.4H8.3C8,2.4,7.8,2.6,7.8,2.8v7.4H7.1V0.4C7.1,0.2,6.9,0,6.7,0c0,0,0,0,0,0H4.4C4.1,0,3.9,0.2,3.9,0.4l0,0v9.7H3.2V5.8c0-0.2-0.2-0.4-0.4-0.4H0.4C0.2,5.4,0,5.6,0,5.8v4.8C0,10.8,0.2,11,0.4,11h10.2c0.2,0,0.4-0.2,0.4-0.4V2.8C11,2.6,10.8,2.4,10.6,2.4z M2.3,10.2H0.9V6.2h1.5L2.3,10.2z M4.8,0.9h1.5v9.3H4.8V0.9z M10.2,10.2H8.7V3.2h1.5L10.2,10.2z"
                      />
                    </svg>
                    <span>DAM Insights</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link class="nav-link" :to="getIntegrationSource(auth)">
                    <svg
                      id="Layer_1"
                      class="integration-icon white"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 18 18"
                      xml:space="preserve"
                    >
                      <g id="integration_1">
                        <path
                          id="combine"
                          class="fill-color"
                          d="M16.3,4.5h-2.9V1.7c0-0.9-0.7-1.7-1.7-1.7c0,0,0,0,0,0H1.7C0.7,0,0,0.7,0,1.7c0,0,0,0,0,0v10.2c0,0.9,0.7,1.7,1.7,1.7h2.9v2.9c0,0.9,0.7,1.7,1.7,1.7c0,0,0,0,0,0h10.2c0.9,0,1.7-0.7,1.7-1.7c0,0,0,0,0,0V6.2C18,5.3,17.3,4.5,16.3,4.5z M6.3,12.4l6.1-6.1v2.5l-3.6,3.6H6.3z M11.7,5.6l-6.1,6.1V9.2l3.6-3.6L11.7,5.6z M5.6,7.7V6.2c0-0.3,0.3-0.6,0.6-0.6h1.6L5.6,7.7z M12.4,10.3v1.6c0,0.3-0.3,0.6-0.6,0.6h0h-1.6L12.4,10.3z M1.7,12.4c-0.3,0-0.6-0.3-0.6-0.6l0,0V1.7c0-0.3,0.3-0.6,0.6-0.6l0,0h10.2c0.3,0,0.6,0.3,0.6,0.6c0,0,0,0,0,0v2.9H6.2c-0.9,0-1.7,0.7-1.7,1.7c0,0,0,0,0,0v6.3H1.7zM16.9,16.3c0,0.3-0.3,0.6-0.6,0.6l0,0H6.2c-0.3,0-0.6-0.3-0.6-0.6l0,0v-2.9h6.3c0.9,0,1.7-0.7,1.7-1.7c0,0,0,0,0,0V5.6h2.9c0.3,0,0.6,0.3,0.6,0.6c0,0,0,0,0,0L16.9,16.3z"
                        />
                      </g></svg
                    ><span>Integrations</span></nuxt-link
                  >
                </li>
                <!-- <li>
                  <nuxt-link
                    :class="{
                      'nav-link': true,
                      'nuxt-link-exact-active': damSettingsActiveStatus,
                    }"
                    :to="{
                      name: 'workspace_id-workspace-settings-dam',
                      params: { workspace_id: auth.id },
                    }"
                  >
                    Settings
                  </nuxt-link>
                </li> -->
              </template>
              <template v-else>
                <li>
                  <nuxt-link
                    class="nav-link"
                    :to="{
                      name: 'workspace_id-add-dam-instance',
                      params: { workspace_id: auth.id },
                    }"
                  >
                    <svg
                      id="Layer_1"
                      class="new-project-icon white"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 18 18"
                      xml:space="preserve"
                    >
                      <g id="Group_5341" transform="translate(-1005 -577.999)">
                        <path
                          id="Path_3394"
                          class="fill-color"
                          d="M1014,596c-0.4,0-0.8-0.3-0.8-0.8v-16.5c0-0.4,0.3-0.8,0.8-0.8c0.4,0,0.8,0.3,0.8,0.8v16.5C1014.8,595.7,1014.4,596,1014,596z"
                        />
                        <path
                          id="Path_3395"
                          class="fill-color"
                          d="M1005.8,587.5c-0.4,0-0.8-0.3-0.8-0.7c0-0.4,0.3-0.8,0.7-0.8c0,0,0,0,0.1,0h16.5c0.4,0,0.8,0.4,0.7,0.8c0,0.4-0.3,0.7-0.7,0.7H1005.8z"
                        />
                      </g>
                    </svg>
                    <span>Create DAM Instance</span>
                  </nuxt-link>
                </li>
              </template>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="feedback">
      <nuxt-link
        :to="{
          name: 'workspace_id-feedback',
          params: { workspace_id: internal_workspace_id },
        }"
        >Submit feedback</nuxt-link
      >
    </div>
    <div class="power-by">
      <span>Powered by</span>
      <img src="~/assets/img/lariat-logo.svg" alt="Lariat Logo" />
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import { compact } from 'lodash'
import currentWorkspace from '~/mixins/currentWorkspace'

export default {
  name: 'LeftMenu',
  components: {},
  mixins: [currentWorkspace],
  data() {
    return {
      internal_workspace_id: this.$route.params.workspace_id
        ? this.$route.params.workspace_id
        : this.$_auth().id,
    }
  },
  async fetch() {
    await this.$store.dispatch('dam/setBranding', {
      workspace_id: this.internal_workspace_id,
      isSetFavicon: false,
    })
  },
  head() {
    return {
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href:
            (this.getBrandingDetails &&
              this.getBrandingDetails.branding.brand_favicon) ||
            '/favicon.png',
        },
      ],
    }
  },
  computed: {
    isInstance() {
      return this.$store.state.dam.fetchingInstances
    },
    getInstance() {
      return Object.keys(this.$store.state.dam.damInstance).length
    },
    getCurrentModule() {
      const path = compact(this.$route.path.split('/'))
      return { firstIndex: path[1], secondIndex: path[2] }
    },
    getBrandingDetails() {
      return this.$store.state.dam.brandingDetails
    },
    css() {
      return `
      :root {
--primary: ${
        this.getBrandingDetails
          ? this.getBrandingDetails.branding.primary_color
            ? this.getBrandingDetails.branding.primary_color
            : '#070E22'
          : '#070E22'
      };
--secondary: ${
        this.getBrandingDetails
          ? this.getBrandingDetails.branding.secondary_color
            ? this.getBrandingDetails.branding.secondary_color
            : '#ffffff'
          : '#ffffff'
      };
--submenu-default: ${this.hex2rgba(
        this.getBrandingDetails
          ? this.getBrandingDetails.branding.secondary_color
            ? this.getBrandingDetails.branding.secondary_color
            : '#ffffff'
          : '#ffffff',
        0.7
      )};
--menu-background: ${this.hex2rgba(
        this.getBrandingDetails
          ? this.getBrandingDetails.branding.secondary_color
            ? this.getBrandingDetails.branding.secondary_color
            : '#ffffff'
          : '#ffffff',
        0.15
      )};
}
.main-left{background-color: var(--primary);}
.main-left .text-logo-letter,
.main-left .logo-instance .text-logo,
ul.nav-main li.nav-parent > .nav-link span{color:  var(--secondary);}
ul.nav-main li.nav-parent > .nav-link:after{border-color:  var(--secondary);}
ul.nav-main li.nav-parent > .nav-link svg .fill-color{fill:  var(--secondary);}
ul.nav-main li.nav-parent.active > .nav-link,
ul.nav-main li.nav-parent > .nav-link:hover,
ul.nav-main li.nav-parent > .nav-link:focus{background-color: var(--menu-background);}
ul.nav-main ul.nav-children li > .nav-link{color: var(--submenu-default);}
ul.nav-main ul.nav-children li.active > .nav-link,
ul.nav-main ul.nav-children li > .nav-link.active,
ul.nav-main ul.nav-children li > .nav-link:hover,
ul.nav-main ul.nav-children li > .nav-link:focus{color: var(--secondary);}
ul.nav-main ul.nav-children li > .nav-link svg.report-icon .fill-color,
ul.nav-main ul.nav-children li > .nav-link svg.my-task-icon .st2{stroke: var(--submenu-default);}
ul.nav-main ul.nav-children li > .nav-link svg .fill-color{fill:  var(--submenu-default);}
         `
    },
    damSettingsActiveStatus() {
      const routeName = this.$route.name
      return (
        routeName === 'workspace_id-workspace-settings-dam-instance_id' ||
        routeName ===
          'workspace_id-workspace-settings-dam-instance_id-manage-banner' ||
        routeName === 'workspace_id-workspace-settings-dam-instance_id-users'
      )
    },
  },
  watch: {
    async workspaceId(workspaceId) {
      if (
        this.$_auth()?.user?.hasDamAccess &&
        !Object.keys(this.$store.state.dam.damInstance).length
      ) {
        await this.$store.dispatch('dam/getInstances', workspaceId)
      }
    },
  },
  async mounted() {
    this.loadJs()
    if (
      this.$_auth()?.user?.hasDamAccess &&
      !Object.keys(this.$store.state.dam.damInstance).length
    ) {
      await this.$store.dispatch('dam/getInstances', this.workspaceId)
    }
  },
  updated() {
    this.loadJs()
  },
  methods: {
    hex2rgba(hex, code) {
      let c
      if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('')
        if (c.length === 3) {
          c = [c[0], c[0], c[1], c[1], c[2], c[2]]
        }
        c = '0x' + c.join('')
        return (
          'rgba(' +
          [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') +
          ',' +
          code +
          ')'
        )
      }
    },
    getIntegrationSource(auth) {
      const { dropbox = {}, drive = {}, box = {} } = this.$store.state
      const query = dropbox.token
        ? { source: 'dropbox' }
        : drive.accessToken
        ? { source: 'google_drive' }
        : box.accessToken
        ? { source: 'box' }
        : {}
      return {
        name: 'workspace_id-dam-integrations',
        params: { workspace_id: auth.id },
        query,
      }
    },
    loadJs() {
      // Main Menu Click Hide Show JS----------------
      window.$(document).on('click', '.main-left:not(.show)', function () {
        $(this).addClass('show')
      })
      window
        .$(document)
        .on(
          'click',
          '.main-left .nav.nav-children > li:not(.sub-nav) > .nav-link',
          function () {
            window.$(this).parents('.main-left').removeClass('show')
          }
        )
      window.$(document).mouseup(function (e) {
        const container = window.$('.main-left')
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          container.removeClass('show')
        }
      })

      /* Navigation ----------------------- */
      $(document).ready(function () {
        // $(document).on('click', '.nav-main > li', function () {
        //   $('.nav-main > li').removeClass('active')
        //   $(this).addClass('active')
        // })
        // Menu Active Class----------------
        $('.nav-main li a')
          .filter(function () {
            'use strict'
            return this.href === location.href.replace(/#.*/, '')
          })
          .parents('li.nav-parent')
          .addClass('active')
      })
      $(document).ready(function () {
        const $items = $('.nav-main li.nav-parent')

        function expand($li) {
          $li.children('ul.nav-children').slideDown('fast', function () {
            $li.addClass('nav-expanded')
            $(this).css('display', '')
            ensureVisible($li)
          })
        }

        function collapse($li) {
          $li.children('ul.nav-children').slideUp('fast', function () {
            $(this).css('display', '')
            $li.removeClass('nav-expanded')
          })
        }

        function ensureVisible($li) {
          const scroller = $li.offsetParent()
          if (!scroller.get(0)) {
            return false
          }
          const top = $li.position().top
          if (top < 0) {
            scroller.animate(
              {
                scrollTop: scroller.scrollTop() + top,
              },
              'fast'
            )
          }
        }

        function buildSidebarNav(anchor, prev, next, ev) {
          if (anchor.prop('href')) {
            const arrowWidth =
              parseInt(
                window.getComputedStyle(anchor.get(0), ':after').width,
                10
              ) || 0
            if (ev.offsetX > anchor.get(0).offsetWidth - arrowWidth) {
              ev.preventDefault()
            }
          }
          if (prev.get(0) !== next.get(0)) {
            collapse(prev)
            expand(next)
          } else {
            collapse(prev)
          }
        }

        $items.find('> a').on('click', function (ev) {
          const $html = $('html')
          const $window = $(window)
          const $anchor = $(this)
          const $prev = $anchor.closest('ul.nav').find('> li.nav-expanded')
          const $next = $anchor.closest('li')
          const $ev = ev
          if ($anchor.attr('href') === '#') {
            ev.preventDefault()
          }
          if (!$html.hasClass('sidebar-left-big-icons')) {
            buildSidebarNav($anchor, $prev, $next, $ev)
          } else if (
            $html.hasClass('sidebar-left-big-icons') &&
            $window.width() < 768
          ) {
            buildSidebarNav($anchor, $prev, $next, $ev)
          }
        })
      })
    },
  },
}
</script>
