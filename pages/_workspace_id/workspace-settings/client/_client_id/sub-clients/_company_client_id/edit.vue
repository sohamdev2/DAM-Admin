<template>
  <div class="general-settings h-100 w-100">
    <div class="general-settings-right h-100 w-100">
      <div class="general-settings-title">
        <ul class="general-settings-tab">
          <li>
            <nuxt-link
              :to="{
                name: 'workspace_id-workspace-settings-client-client_id-edit',
                params: {
                  workspace_id: internal_workspace_id,
                  client_id: client_id,
                },
              }"
            >
              Client Info
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              :to="{
                name: 'workspace_id-workspace-settings-client-client_id-contact-person',
                params: {
                  workspace_id: internal_workspace_id,
                  client_id: client_id,
                },
              }"
            >
              Contact Person Info
            </nuxt-link>
          </li>
          <li class="active">
            <nuxt-link
              :to="{
                name: 'workspace_id-workspace-settings-client-client_id-sub-clients',
                params: {
                  workspace_id: internal_workspace_id,
                  client_id: client_id,
                },
              }"
            >
              Sub Clients
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div class="workspace-settings">
        <div class="row">
          <div class="col-lg-6 col-md-7">
            <div class="general-settings-box customscrollbar">
              <div class="row">
                <div class="col-sm-12">
                  <div class="form-group">
                    <div class="img-upload imgwidth-input">
                      <div class="img-upload-img">
                        <div class="v-center">
                          <img
                            v-if="!imageData && !client.logo_preview"
                            src="~/assets/img/icon/building.svg"
                          />
                          <img v-if="imageData != null" :src="imageData" />
                          <img
                            v-if="client.logo_preview"
                            :src="client.logo_preview"
                          />
                        </div>
                      </div>
                      <div class="img-upload-alt">
                        <span>Profile Picture</span>
                        <small class="upload-note"
                          >Upload Square picture for best viewing
                          experience</small
                        >
                        <div class="file-select">
                          <div class="file-select-name">Edit</div>
                          <div class="file-field-box">
                            <input
                              type="file"
                              name="upload"
                              accept=".jpg, .png, .svg, .gif, .jpeg"
                              data-lpignore="true"
                              @change="changeLogo"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group w-75 required">
                    <label class="control-label">Sub Client Name</label>
                    <input
                      v-model.lazy="$v.client.company_name.$model"
                      type="text"
                      class="form-control"
                      data-lpignore="true"
                    />
                    <div
                      v-if="
                        $v.client.company_name.$error &&
                        !$v.client.company_name.required
                      "
                      class="input-error"
                    >
                      Please provide sub client name
                    </div>
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group w-75">
                    <label class="control-label">Email</label>
                    <input
                      v-model.lazy="$v.client.company_email.$model"
                      class="form-control"
                      data-lpignore="true"
                    />
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group w-75">
                    <label class="control-label">Phone</label>
                    <input
                      v-model.lazy="$v.client.phone_number.$model"
                      type="text"
                      class="form-control"
                      data-lpignore="true"
                    />
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group mb0">
                    <button
                      type="button"
                      name="submit"
                      :disabled="loading"
                      :class="{ btn: true, 'btn-disable': loading }"
                      @click="submitHandler()"
                    >
                      <i
                        v-if="loading"
                        class="fa fa-circle-o-notch fa-spin"
                      ></i>
                      Update Sub Client
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
export default {
  layout: 'generalSettingsLayout',
  middleware: ['authCheck'],
  data() {
    return {
      loading: false,
      workspace_id: this.$route.params.workspace_id
        ? this.$route.params.workspace_id
        : this.$_auth().id,
      internal_workspace_id: this.$route.params.workspace_id
        ? this.$route.params.workspace_id
        : this.$_auth().id,
      client_id: this.$route.params.client_id
        ? this.$route.params.client_id
        : null,
      sub_client_id: this.$route.params.company_client_id
        ? this.$route.params.company_client_id
        : null,
      client: {
        company_name: '',
        phone_number: '',
        company_email: '',
        company_logo: '',
        logo_preview: null,
      },
      imageData: null,
      deletePersonIndex: null,
      deletePersonId: null,
      sort_value: '',
      sort_by: '',
      isSortComplete: false,
    }
  },
  mounted() {
    this.getClientDetails()
  },
  methods: {
    changeLogo(event) {
      // const oneMB = 7000
      const twoMB = 2097152
      if (event.target.files[0]) {
        if (!event.target.files[0].type.match('image.*')) {
          // check whether the upload is an image
          this.$toast.global.error('Please choose an image file')
          return
        }
        if (event.target.files[0].size < twoMB) {
          this.client.company_logo = event.target.files[0]
          this.client.logo_preview = null
          const input = event.target
          if (input.files && input.files[0]) {
            const reader = new FileReader()
            reader.onload = (e) => {
              this.imageData = e.target.result
            }
            reader.readAsDataURL(input.files[0])
          }
        } else {
          event.target.value = null
          this.$toast.error('File size should not be more than 2MB')
        }
      }
    },
    async getClientDetails() {
      this.contactPersonDataFound = false
      try {
        const { data } = await this.$axios.$post(`sub-client/view`, {
          workspace_id: this.internal_workspace_id,
          client_id: this.sub_client_id,
        })
        this.client.company_name = data.company_name
        this.client.company_email = data.company_email
        this.client.phone_number = data.phone_number
        this.client.logo_preview = data.display_company_logo
        this.$nextTick(() => {
          this.isSortComplete = false
        })
      } catch (e) {
        const { data } = e.response
        if (data.code === 403) {
          return this.$router.push({
            name: 'workspace_id-client-settings-client_id-company-client-list',
            params: {
              workspace_id: this.internal_workspace_id,
            },
          })
        }
      }
    },
    async submitHandler() {
      this.$v.client.$touch()
      if (this.$v.client.$invalid) {
        return false
      }
      try {
        this.loading = true
        const formData = new FormData()
        formData.append('company_name', this.client.company_name)
        formData.append('phone_number', this.client.phone_number)
        formData.append('company_email', this.client.company_email)
        formData.append('company_logo', this.client.company_logo)
        formData.append('workspace_id', this.internal_workspace_id)
        formData.append('client_id', this.sub_client_id)
        await this.$axios.$post('sub-client/edit', formData)
        this.loading = false
        this.$toast.global.success('Client Details Successfully Updated')
        return this.$router.push({
          name: 'workspace_id-workspace-settings-client-client_id-sub-clients',
          params: {
            workspace_id: this.internal_workspace_id,
            client_id: this.client_id,
          },
        })
      } catch (e) {
        this.loading = false
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
  },
  validations: {
    client: {
      company_name: { required },
      /* company_email: { required, email }, */
      company_email: {},
      /* phone_number: { required, maxLength: maxLength(20) }, */
      phone_number: {},
    },
  },
}
</script>
