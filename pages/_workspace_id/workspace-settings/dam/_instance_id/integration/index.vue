<template>
  <div
    class="general-settings-right h-100 position-relative"
    :class="{ 'warning-massage': !globalNotification }"
  >
    <div v-if="!globalNotification" class="search-result mt1 pl10 pr10">
      <div class="alert alert-warning alert-dismissible">
        Organization admin has disabled Email Notifications
      </div>
    </div>
    <div class="overlay" v-if="!subscriptionFetched">
      <div class="loader"></div>
    </div>
    <template v-else>
      <div class="general-settings-title">
        <ul class="general-settings-tab">
          <li :class="{ active: active === 'internal' }" @click="internalTab">
            <a>Internal</a>
          </li>
          <li
            :class="{ active: active === 'external' }"
            @click="active = 'external'"
          >
            <a>External</a>
          </li>
        </ul>
        <div
          v-show="
            active === 'internal' &&
            (!DROPBOX_TOKEN || !DRIVE_ACCESS_TOKEN || !BOX_ACCESS_TOKEN) &&
            !loading
          "
          class="right-side"
        >
          <div v-if="active === 'internal'" class="dropdown integration">
            <button
              type="button"
              class="btn dropdown-toggle"
              data-toggle="dropdown"
            >
              Add Integration
            </button>
            <!-- internal integration dropdown -->
            <ul class="dropdown-menu" style="will-change: transform">
              <li
                v-if="!DROPBOX_TOKEN"
                :style="
                  dropboxEnabled || dropboxEntEnabled ? '' : 'opacity:0.4'
                "
                v-tooltip="
                  dropboxEnabled || dropboxEntEnabled
                    ? ''
                    : 'Please upgrade your subscription plan to enable this feature'
                "
                @click="
                  () => {
                    if (dropboxEnabled || dropboxEntEnabled) {
                      addNewType = 'DROPBOX'
                    }
                  }
                "
              >
                <a
                  class="dropdown-item"
                  :class="{ disabled: !(dropboxEnabled || dropboxEntEnabled) }"
                  href="javascript:void(0);"
                >
                  <span class="dropdown-item-icon">
                    <img
                      style="vertical-align: middle"
                      :src="require('~/assets/img/dropbox-blue.svg')"
                      alt
                      width="16"
                    />
                  </span>
                  DropBox
                </a>
              </li>
              <li
                v-if="!DRIVE_ACCESS_TOKEN"
                :style="driveEnabled ? '' : 'opacity:0.4'"
                v-tooltip="
                  driveEnabled
                    ? ''
                    : 'Please upgrade your subscription plan to enable this feature'
                "
                @click="
                  () => {
                    if (driveEnabled) {
                      addNewType = 'GOOGLE_DRIVE'
                    }
                  }
                "
              >
                <a
                  class="dropdown-item"
                  :class="{ disabled: !driveEnabled }"
                  href="javascript:void(0);"
                >
                  <span class="dropdown-item-icon">
                    <img
                      style="vertical-align: middle"
                      :src="require('~/assets/img/google-drive.svg')"
                      alt
                      width="16"
                    />
                  </span>
                  Google Drive
                </a>
              </li>
              <li
                v-if="!BOX_ACCESS_TOKEN"
                :style="boxEnabled ? '' : 'opacity:0.4'"
                v-tooltip="
                  boxEnabled
                    ? ''
                    : 'Please upgrade your subscription plan to enable this feature'
                "
                @click="
                  () => {
                    if (boxEnabled) {
                      addNewType = 'BOX'
                    }
                  }
                "
              >
                <a
                  class="dropdown-item"
                  :class="{ disabled: !boxEnabled }"
                  href="javascript:void(0);"
                >
                  <span class="dropdown-item-icon">
                    <img
                      style="vertical-align: middle"
                      :src="BOX_ICON"
                      alt
                      width="16"
                    />
                  </span>
                  Box
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div v-if="active === 'external'" class="right-side">
          <!-- external integration dropdown -->
          <a
            v-if="externalIntegrationEnabled"
            class="btn"
            @click="
              () => {
                externalIntegration = { name: '', url: '' }
                showForm = true
                $nextTick(() => $refs.nameExternal.focus())
              }
            "
          >
            Add Integration
          </a>
        </div>
      </div>
      <div
        class="workspace-settings"
        :class="{
          'show-add-external': showForm,
          'show-add-internal': active === 'internal' && !!addNewType,
        }"
      >
        <!-- header section for internal integration -->
        <div
          v-if="
            active === 'internal' &&
            !!addNewType &&
            (!DROPBOX_TOKEN || !DRIVE_ACCESS_TOKEN || !BOX_ACCESS_TOKEN) &&
            !loading
          "
          class="general-settings-box p-3 h-auto mb20 d-flex align-items-center"
        >
          <template v-if="addNewType === 'DROPBOX'">
            <img :src="require('~/assets/img/dropbox-blue.svg')" width="36" />
            <span>Lariat Hub Dropbox</span>
            <a class="btn" :href="encodeURI(DROPBOX_CONNECT_URI)">Connect</a>
            <a title="Cancel" class="close-btn" @click="addNewType = ''"
              ><svg focusable="false" viewBox="0 0 32 32">
                <path
                  d="M18.1,16L27,7.1c0.6-0.6,0.6-1.5,0-2.1s-1.5-0.6-2.1,0L16,13.9l-8.9-9C6.5,4.3,5.6,4.3,5,4.9S4.4,6.4,5,7l8.9,8.9L5,24.8c-0.6,0.6-0.6,1.5,0,2.1c0.3,0.3,0.7,0.4,1.1,0.4s0.8-0.1,1.1-0.4l8.9-8.9l8.9,8.9c0.3,0.3,0.7,0.4,1.1,0.4s0.8-0.1,1.1-0.4c0.6-0.6,0.6-1.5,0-2.1L18.1,16z"
                ></path></svg
            ></a>
          </template>
          <template v-if="addNewType === 'GOOGLE_DRIVE'">
            <img :src="require('~/assets/img/google-drive.svg')" width="36" />
            <span>Lariat Hub Google Drive</span>
            <img
              height="36"
              :src="require('~/assets/img/google_signin_dark_normal_web.png')"
              style="cursor: pointer"
              class="google_connect"
              @click="authorize"
            />
            <a title="Cancel" class="close-btn" @click="addNewType = ''"
              ><svg focusable="false" viewBox="0 0 32 32">
                <path
                  d="M18.1,16L27,7.1c0.6-0.6,0.6-1.5,0-2.1s-1.5-0.6-2.1,0L16,13.9l-8.9-9C6.5,4.3,5.6,4.3,5,4.9S4.4,6.4,5,7l8.9,8.9L5,24.8c-0.6,0.6-0.6,1.5,0,2.1c0.3,0.3,0.7,0.4,1.1,0.4s0.8-0.1,1.1-0.4l8.9-8.9l8.9,8.9c0.3,0.3,0.7,0.4,1.1,0.4s0.8-0.1,1.1-0.4c0.6-0.6,0.6-1.5,0-2.1L18.1,16z"
                ></path></svg
            ></a>
          </template>
          <template v-if="addNewType === 'BOX'">
            <img :src="require('~/assets/img/box.svg')" width="36" />
            <span>Lariat Hub Box</span>
            <a class="btn" @click="connectBox">Connect</a>
            <a title="Cancel" class="close-btn" @click="addNewType = ''"
              ><svg focusable="false" viewBox="0 0 32 32">
                <path
                  d="M18.1,16L27,7.1c0.6-0.6,0.6-1.5,0-2.1s-1.5-0.6-2.1,0L16,13.9l-8.9-9C6.5,4.3,5.6,4.3,5,4.9S4.4,6.4,5,7l8.9,8.9L5,24.8c-0.6,0.6-0.6,1.5,0,2.1c0.3,0.3,0.7,0.4,1.1,0.4s0.8-0.1,1.1-0.4l8.9-8.9l8.9,8.9c0.3,0.3,0.7,0.4,1.1,0.4s0.8-0.1,1.1-0.4c0.6-0.6,0.6-1.5,0-2.1L18.1,16z"
                ></path></svg
            ></a>
          </template>
        </div>
        <!-- header section for external integration -->
        <div v-show="showForm" class="general-settings-box h-auto mb20">
          <TransitionExpand>
            <form @submit.prevent="handleSubmit">
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group">
                    <label class="control-label">Name</label>
                    <input
                      ref="nameExternal"
                      v-model.trim="externalIntegration.name"
                      type="text"
                      name=""
                      class="form-control"
                      placeholder=""
                      @keyup="
                        externalIntegration.name.length &&
                          externalIntegration.url.length &&
                          $v.$touch()
                      "
                    />
                    <div
                      v-if="$v.externalIntegration.name.$error"
                      class="input-error"
                    >
                      <template v-if="!$v.externalIntegration.name.required">
                        Please provide name
                      </template>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label class="control-label">URL (Website)</label>
                    <input
                      v-model="externalIntegration.url"
                      type="text"
                      name=""
                      class="form-control"
                      placeholder=""
                      @keyup="
                        externalIntegration.name.length &&
                          externalIntegration.url.length &&
                          $v.$touch()
                      "
                    />
                    <div
                      v-if="$v.externalIntegration.url.$error"
                      class="input-error"
                    >
                      <template v-if="!$v.externalIntegration.url.required">
                        URL is required.
                      </template>
                      <template v-else-if="!$v.externalIntegration.url.length">
                        URL must must contain 3 characters.
                      </template>
                      <template v-else-if="!$v.externalIntegration.url.format">
                        Enter Valid URL.
                      </template>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12">
                  <div class="form-group mb0">
                    <button
                      type="submit"
                      class="btn"
                      :disabled="
                        isSame ||
                        !externalIntegration.name.length ||
                        $v.externalIntegration.name.$error ||
                        !externalIntegration.url.length ||
                        $v.externalIntegration.url.$error
                      "
                    >
                      {{ loading ? 'Generating...' : 'Generate Secret Key' }}
                      <i
                        v-show="loading"
                        class="fa fa-circle-o-notch fa-spin"
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </TransitionExpand>
        </div>
        <div v-if="active === 'internal'" class="row no-gutters h-100">
          <internal-integration
            :subscription="subscriptionData"
            @reconnectDrive="authorize"
            @reconnectBox="connectBox"
          />
        </div>
        <external-integration
          :subscription="subscriptionData"
          v-if="active === 'external'"
          ref="externalIntegration"
        />
      </div>
    </template>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import axios from 'axios'
import { mapGetters } from 'vuex'
import { TransitionExpand } from 'vue-transition-expand'
import 'vue-transition-expand/dist/vue-transition-expand.css'
import InternalIntegration from './internal'
import ExternalIntegration from './external'
export default {
  components: { InternalIntegration, ExternalIntegration, TransitionExpand },
  layout: 'generalSettingsLayout',
  middleware: ['authCheck', 'checkWorkspace', 'can-access-dam-settings'],
  data() {
    return {
      DROPBOX_CONNECT_URI:
        process.env.DROPBOX_OAUTH_URI +
        '?client_id=' +
        process.env.DROPBOX_APP_ID +
        '&response_type=code' +
        '&redirect_uri=' +
        process.env.DROPBOX_AUTH_REDIRECT +
        '&state=' +
        [
          this.$route.params.workspace_id,
          this.$store.state.dam.damInstance?.id,
        ].join('_'),
      active: '',
      addNewType: '',
      addNewSource: false,
      loading: false,
      showForm: false,
      externalIntegration: {
        name: '',
        url: '',
      },
      extIntOriginal: null,
      formKey: 0,
      subscriptionFetched: false,
      subscriptionData: {},
    }
  },
  computed: {
    ...mapGetters({
      DROPBOX_TOKEN: 'dropbox/token',
      DROPBOX_ICON: 'dropbox/icon',
      DROPBOX_USER: 'dropbox/user',
      DROPBOX_DISCONNECTED: 'dropbox/disconnected',
      DRIVE_ACCESS_TOKEN: 'drive/accessToken',
      DRIVE_REFRESH_TOKEN: 'drive/refreshToken',
      DRIVE_ICON: 'drive/icon',
      DRIVE_USER: 'drive/user',
      BOX_ACCESS_TOKEN: 'box/accessToken',
      BOX_REFRESH_TOKEN: 'box/refreshToken',
      BOX_ICON: 'box/icon',
      BOX_USER: 'box/user',
    }),
    // generate key button enable on change in external integration form
    isSame() {
      return this.$isSame(this.externalIntegration, this.extIntOriginal)
    },
    globalNotification() {
      return this.$store.state.dam.notifications.notification_status
    },
    internalIntegrationEnabled() {
      return (
        this.dropboxEnabled ||
        this.dropboxEntEnabled ||
        this.boxEnabled ||
        this.driveEnabled
      )
    },
    externalIntegrationEnabled() {
      return !!this.subscriptionData.features.external_website_integration
        ?.enable
    },
    dropboxEnabled() {
      const features = this.subscriptionData.features
      return features.dropbox_integration?.enable
    },
    dropboxEntEnabled() {
      const features = this.subscriptionData.features
      return features.dropbox_enterprise_integration?.enable
    },
    boxEnabled() {
      const features = this.subscriptionData.features
      return features.box_integration?.enable
    },
    driveEnabled() {
      const features = this.subscriptionData.features
      return features.google_drive_integration?.enable
    },
  },
  async mounted() {
    await this.fetchSubscription()
    if (!this.internalIntegrationEnabled && this.externalIntegrationEnabled)
      this.active = 'external'
    else this.active = 'internal'
    this.$watch('$route.params.workspace_id', this.fetchSubscription, {
      deep: true,
      immediate: true,
    })
  },
  created() {
    // keeping the old form to compare for enabling generate key button
    this.extIntOriginal = Object.freeze({ ...this.externalIntegration })
    this.$store.dispatch('dam/getNotifications')
  },
  methods: {
    fetchSubscription() {
      this.subscriptionFetched = false
      return this.$axios
        .$get('digital-assets/subscription/get')
        .then(({ data }) => (this.subscriptionData = data))
        .catch((e) => {
          this.subscriptionData = {}
        })
        .finally(() => {
          this.subscriptionFetched = true
        })
    },
    /**
     * Initiates box integration
     */
    connectBox() {
      axios
        .get('/box/connect', {
          params: {
            workspaceId: this.$route.params.workspace_id,
            instanceId: this.$store.state.dam.damInstance?.id,
          },
        })
        .then((r) => {
          location.href = r.data
        })
        .catch(console.error)
    },
    /**
     * Initiates google drive integration
     */
    internalTab() {
      this.active = 'internal'
      this.showForm = false
      this.addNewType = ''
    },
    // adding new external integration
    async handleSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      this.loading = true
      this.externalIntegration.workspace_id = this.$getWorkspaceId()
      await this.$axios
        .$post(`generate-app-key`, this.externalIntegration)
        .then((response) => {
          this.$toast.global.success(response.message)
          this.$refs.externalIntegration.getList()
          this.$v.$reset()
          this.externalIntegration = { name: '', url: '' }
          this.loading = false
          this.extIntOriginal = Object.freeze({ ...this.externalIntegration })
          this.showForm = false
        })
        .catch((e) => {
          const urlError = (e?.response?.data?.error?.url || [])[0]
          this.$toast.global.error(urlError || this.$getErrorMessage(e))
        })
        .finally(() => {
          this.loading = false
        })
    },
    authorize() {
      const workspace_id = this.$route.params.workspace_id
      const dam_id = this.$store.state.dam.damInstance?.id
      const uri =
        window.location.origin +
        '/driveapi/access-drive' +
        `?dam_id=${dam_id}&workspace_id=${workspace_id}`
      axios
        .get(uri)
        .then((res) => {
          if (res) {
            this.client = res.data.client
            location.href = res.data.url
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
  validations: {
    externalIntegration: {
      name: {
        required,
        length: minLength(1),
      },
      url: {
        required,
        length: minLength(3),
        format(v) {
          // eslint-disable-next-line no-useless-escape
          return /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/gi.test(
            v
          )
        },
      },
    },
  },
}
</script>
<style scoped>
img.google_connect:hover {
  content: url('~/assets/img/google_signin_dark_focus_web.png');
}
img.google_connect:active {
  content: url('~/assets/img/google_signin_dark_pressed_web.png');
}
img.google_connect:focus {
  content: url('~/assets/img/google_signin_dark_pressed_web.png');
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fbfbfb33;
}

.overlay > .loader {
  border-left: 2px solid transparent;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border-top: 2px solid #0c0c0c40;
  border-bottom: 2px solid #0c0c0c40;
  border-right: 2px solid transparent;
  animation: loader 0.5s linear infinite both;
}

@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
