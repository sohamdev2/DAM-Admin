<template>
  <div class="general-settings-right warning-massage h-100">
    <ProjectNotificationAlert />
    <div class="general-settings-title">
      <ul class="general-settings-tab">
        <li class="active"><a href="javascript:void(0)">Client Info</a></li>
      </ul>
    </div>
    <div class="workspace-settings">
      <div class="row no-gutters h-100">
        <div class="col-lg-5 col-md-12 h-100">
          <div class="general-settings-box customscrollbar pr10">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <div class="img-upload imgwidth-input">
                    <div class="img-upload-img">
                      <div class="v-center">
                        <img
                          v-if="!imageData"
                          src="~/assets/img/icon/building.svg"
                        />
                        <img v-if="imageData != null" :src="imageData" />
                      </div>
                    </div>
                    <div class="img-upload-alt">
                      <span>Company Logo</span>
                      <small class="upload-note"
                        >Upload Square Company Logo for best viewing
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
                <div class="form-group">
                  <WorkspaceNote />
                </div>
                <div class="form-group required">
                  <label class="control-label">Company Name</label>
                  <input
                    v-model.lazy="$v.company_name.$model"
                    type="text"
                    class="form-control"
                    data-lpignore="true"
                  />
                  <div
                    v-if="$v.company_name.$error && !$v.company_name.required"
                    class="input-error"
                  >
                    Please provide company name
                  </div>
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group">
                  <label class="control-label">Email Address</label>
                  <input
                    v-model.lazy="$v.company_email.$model"
                    type="email"
                    class="form-control"
                    data-lpignore="true"
                  />
                  <!--                  <div
                    v-if="$v.company_email.$error && !$v.company_email.required"
                    class="input-error"
                  >
                    Please provide company email
                  </div>
                  <div
                    v-if="$v.company_email.$error && !$v.company_email.email"
                    class="input-error"
                  >
                    Please provide valid email address.
                  </div>-->
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group">
                  <label class="control-label">Website URL</label>
                  <input
                    v-model="website_url"
                    type="text"
                    class="form-control"
                    data-lpignore="true"
                  />
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group">
                  <label class="control-label">Phone</label>
                  <input
                    v-model="$v.phone_number.$model"
                    type="text"
                    class="form-control"
                    data-lpignore="true"
                  />
                  <!--                  <div
                    v-if="$v.phone_number.$error && !$v.phone_number.required"
                    class="input-error"
                  >
                    Please provide phone number
                  </div>
                  <div
                    v-if="$v.phone_number.$error && !$v.phone_number.maxLength"
                    class="input-error"
                  >
                    Phone number should not be more than 20 characters
                  </div>-->
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group">
                  <label class="control-label">Address Line 1</label>
                  <input
                    v-model="address_line1"
                    type="text"
                    class="form-control"
                    data-lpignore="true"
                  />
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group">
                  <label class="control-label">Address Line 2</label>
                  <input
                    v-model="address_line2"
                    type="text"
                    class="form-control"
                    data-lpignore="true"
                  />
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group">
                  <label class="control-label">City</label>
                  <input
                    v-model="city"
                    type="text"
                    class="form-control"
                    data-lpignore="true"
                  />
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group">
                  <label class="control-label">Zip</label>
                  <input
                    v-model="$v.zip_code.$model"
                    type="text"
                    class="form-control"
                    data-lpignore="true"
                  />
                  <div
                    v-if="$v.zip_code.$error && !$v.zip_code.maxLength"
                    class="input-error"
                  >
                    Zip should not be more than 20 characters
                  </div>
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group">
                  <label class="control-label">State</label>
                  <input
                    v-model="state"
                    type="text"
                    class="form-control"
                    data-lpignore="true"
                  />
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group">
                  <label class="control-label">About Client</label>
                  <textarea
                    v-model="description"
                    class="form-control"
                    rows="7"
                  ></textarea>
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group">
                  <h4>Assign Account Manager</h4>
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group required">
                  <label class="control-label">Primary Account Manager</label>
                  <div class="owner-dropdown">
                    <Select2WithImage
                      v-model="$v.primaryAccountManager.$model"
                      :dropdown-css-class="'owner-select'"
                      :options="primaryAccountManagerList"
                      :custom-event="true"
                      @optionChangeHandler="
                        primaryAccountManagerHandler(...arguments)
                      "
                    >
                    </Select2WithImage>
                  </div>
                  <div
                    v-if="
                      $v.primaryAccountManager.$error &&
                      !$v.primaryAccountManager.required
                    "
                    class="input-error"
                  >
                    Please select primary account manager
                  </div>
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group">
                  <label class="control-label">Secondary Account Manager</label>
                  <div class="owner-dropdown owner-multiple">
                    <Select2Multiple
                      v-model="secondaryAccountManager"
                      :dropdown-css-class="'owner-select'"
                      :options="accountManagerList"
                      placeholder="Add Your Manager"
                      :custom-event="true"
                      @changeFollower="
                        secondaryAccountManagerHandler(...arguments)
                      "
                    >
                    </Select2Multiple>
                  </div>
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group mb0">
                  <button
                    type="button"
                    name="submit"
                    :disabled="loading"
                    :class="{ btn: true, 'btn-disable': loading }"
                    @click="submitHandler('add-client')"
                  >
                    <i v-if="spinner1" class="fa fa-circle-o-notch fa-spin"></i>
                    Add Client
                  </button>

                  <button
                    type="button"
                    name="submit"
                    :disabled="loading"
                    :class="{ 'btn btn-gray': true, 'btn-disable': loading }"
                    @click="submitHandler('add-and-edit')"
                  >
                    <i v-if="spinner2" class="fa fa-circle-o-notch fa-spin"></i>
                    Submit & Add Contact Person
                  </button>
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
import { required, maxLength } from 'vuelidate/lib/validators'
import WorkspaceNote from '~/components/theme/settings/WorkspaceNote'
import ProjectNotificationAlert from '~/components/theme/settings/ProjectNotificationAlert'
import Select2Multiple from '~/components/plugins/Select2Multiple'
import Select2WithImage from '~/components/plugins/Select2WithImage'
const checkZero = (value) => Number(value) >= 1
export default {
  components: {
    ProjectNotificationAlert,
    WorkspaceNote,
    Select2Multiple,
    Select2WithImage,
  },
  layout: 'generalSettingsLayout',
  middleware: ['authCheck'],
  data() {
    return {
      workspace_id: this.$route.params.workspace_id
        ? this.$route.params.workspace_id
        : this.$_auth().id,
      internal_workspace_id: this.$route.params.workspace_id
        ? this.$route.params.workspace_id
        : this.$_auth().id,
      company_name: '',
      phone_number: '',
      company_email: '',
      address_line1: '',
      address_line2: '',
      city: '',
      state: '',
      zip_code: '',
      description: '',
      company_logo: null,
      website_url: null,

      logo_preview: null,
      imageData: null,

      created_id: null,

      spinner1: false,
      spinner2: false,
      loading: false,
      primaryAccountManagerList: [
        {
          display_profile_image: this.$config.userPlaceHolderImg,
          email: '',
          id: '0',
          name: 'Select Account Manager',
          profile_image: 'domain-user.svg',
          text: 'Select Account Manager',
        },
      ],
      accountManagerList: [],
      primaryAccountManager: 0,
      secondaryAccountManager: [],
    }
  },
  computed: {
    clientAvatar() {
      return (
        (!this.imageData &&
          this.company_name !== '' &&
          `https://ui-avatars.com/api/?name=${encodeURI(
            this.company_name
          )}&size=128&background=e9ecef&bold=true`) ||
        null
      )
    },
  },
  async mounted() {
    try {
      const { data } = await this.$axios.$get(
        `/client/all-admin-user?workspace_id=${this.internal_workspace_id}`
      )
      this.primaryAccountManagerList = this.primaryAccountManagerList.concat(
        data.users
      )
      this.accountManagerList = data.users
    } catch (e) {
      const { data } = e.response
      this.loading = false
      this.$toast.error(data.message)
    }
  },
  methods: {
    changeLogo(event) {
      const twoMB = 2097152
      if (event.target.files[0]) {
        if (!event.target.files[0].type.match('image.*')) {
          this.$toast.global.error('Please choose an image file')
          return
        }
        if (event.target.files[0].size < twoMB) {
          this.company_logo = event.target.files[0]
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
    async submitHandler(action) {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return false
      }

      try {
        this.loading = true
        if (action === 'add-client') {
          this.spinner1 = true
        }
        if (action === 'add-and-edit') {
          this.spinner2 = true
        }
        const formData = new FormData()
        formData.append('company_name', this.company_name)
        formData.append('phone_number', this.phone_number)
        formData.append('company_email', this.company_email)
        if (this.website_url) {
          formData.append('website_link', this.website_url.replace(/\/$/, ''))
        } else {
          formData.append('website_link', null)
        }
        formData.append('address_line1', this.address_line1)
        formData.append('address_line2', this.address_line2)
        formData.append('city', this.city)
        formData.append('state', this.state)
        formData.append('zip_code', this.zip_code)
        formData.append('description', this.description)
        formData.append('company_logo', this.company_logo)
        formData.append('workspace_id', this.internal_workspace_id)
        formData.append('primary_account_manager', this.primaryAccountManager)
        for (let i = 0; i < this.secondaryAccountManager.length; i++) {
          formData.append(
            'secondary_account_manager[]',
            this.secondaryAccountManager[i]
          )
        }
        const { data, message } = await this.$axios.$post(
          'client/add',
          formData
        )
        this.$toast.global.success(message)
        if (action === 'add-client') {
          return this.$router.push({
            name: 'workspace_id-workspace-settings-client-list',
            params: { workspace_id: this.internal_workspace_id },
          })
        }
        if (action === 'add-and-edit') {
          return this.$router.push({
            name: 'workspace_id-workspace-settings-client-client_id-contact-person',
            params: {
              workspace_id: this.internal_workspace_id,
              client_id: data.id,
            },
          })
        }
      } catch (e) {
        this.loading = false
        this.spinner1 = false
        this.spinner2 = false
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
    primaryAccountManagerHandler(data) {
      this.primaryAccountManager = data.id
    },
    secondaryAccountManagerHandler(data) {
      this.secondaryAccountManager = data === null ? [] : data
    },
  },
  validations: {
    company_name: { required },
    company_email: {},
    phone_number: {},
    zip_code: { maxLength: maxLength(20) },
    primaryAccountManager: { checkZero },
  },
}
</script>
