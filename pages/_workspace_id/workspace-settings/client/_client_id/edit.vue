<template>
  <div class="general-settings-right warning-massage h-100">
    <ProjectNotificationAlert />
    <div class="general-settings-title">
      <ul class="general-settings-tab">
        <li class="active">
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
        <li>
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
      <div class="row no-gutters h-100">
        <div class="col-lg-5 col-md-12 h-100">
          <div class="general-settings-box customscrollbar pr10">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <div class="img-upload imgwidth-input">
                    <div class="img-upload-img">
                      <!-- <span
                        v-if="!imageData && !logo_preview && ifNotImageChar"
                        :class="[
                          'profile-char',
                          'fl-as-imgtxt',
                          'bg-gray',
                          ifNotImageChar.toLowerCase(),
                        ]"
                        >{{ ifNotImageChar }}</span
                      > -->
                      <div class="v-center">
                        <!-- <img
                          v-if="
                            !imageData && !client.logo_preview && !clientAvatar
                          "
                          src="~/assets/img/icon/building.svg"
                        />
                        <img
                          v-if="
                            !imageData && !client.logo_preview && clientAvatar
                          "
                          :src="clientAvatar"
                        /> -->
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
                      <span>Company Logo</span>
                      <small class="upload-note"
                        >Upload Square Company Logo for best viewing
                        experience</small
                      >
                      <div class="file-select">
                        <div class="file-select-name">Update Company Logo</div>
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
                <div class="form-group required">
                  <label class="control-label">Company Name</label>
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
                    Please provide company name
                  </div>
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group">
                  <label class="control-label">Email Address</label>
                  <input
                    v-model.lazy="$v.client.company_email.$model"
                    class="form-control"
                    data-lpignore="true"
                  />
                  <!--                  <div
                    v-if="
                      $v.client.company_email.$error &&
                      !$v.client.company_email.required
                    "
                    class="input-error"
                  >
                    Please provide company email
                  </div>
                  <div
                    v-if="
                      $v.client.company_email.$error &&
                      !$v.client.company_email.email
                    "
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
                    v-model="client.website_url"
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
                    v-model.lazy="$v.client.phone_number.$model"
                    type="text"
                    class="form-control"
                    data-lpignore="true"
                  />
                  <!--                  <div
                    v-if="
                      $v.client.phone_number.$error &&
                      !$v.client.phone_number.required
                    "
                    class="input-error"
                  >
                    Please provide phone number
                  </div>
                  <div
                    v-if="
                      $v.client.phone_number.$error &&
                      !$v.client.phone_number.maxLength
                    "
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
                    v-model="client.address_line1"
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
                    v-model="client.address_line2"
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
                    v-model="client.city"
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
                    v-model="$v.client.zip_code.$model"
                    type="text"
                    data-lpignore="true"
                    class="form-control"
                  />
                  <div
                    v-if="
                      $v.client.zip_code.$error && !$v.client.zip_code.maxLength
                    "
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
                    v-model="client.state"
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
                    v-model="client.description"
                    name=""
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
                      v-if="is_primary_account"
                      v-model="$v.client.primaryAccountManager.$model"
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
                      $v.client.primaryAccountManager.$error &&
                      !$v.client.primaryAccountManager.required
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
                    @click="submitHandler()"
                  >
                    <i v-if="loading" class="fa fa-circle-o-notch fa-spin"></i>
                    Update Client
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
import { maxLength, required } from 'vuelidate/lib/validators'
import ProjectNotificationAlert from '~/components/theme/settings/ProjectNotificationAlert'
import Select2Multiple from '~/components/plugins/Select2Multiple'
import Select2WithImage from '~/components/plugins/Select2WithImage'
const checkZero = (value) => Number(value) >= 1
export default {
  components: { ProjectNotificationAlert, Select2Multiple, Select2WithImage },
  layout: 'generalSettingsLayout',
  middleware: ['authCheck', 'can-access-client-module'],
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
      contact_persons: null,
      client: {
        company_name: '',
        phone_number: '',
        company_email: '',
        address_line1: '',
        address_line2: '',
        website_url: null,
        city: '',
        state: '',
        zip_code: '',
        description: '',
        company_logo: '',
        logo_preview: null,
        is_internal_client: 1,
        primaryAccountManager: 0,
      },
      imageData: null,
      deletePersonIndex: null,
      deletePersonId: null,
      sort_value: '',
      sort_by: '',
      isSortComplete: false,
      contactPersonDataFound: false,
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
      secondaryAccountManager: [],
      removePrimaryAccountManager: 0,
      removeSecondaryAccountManager: [],
      is_primary_account: false,
    }
  },
  computed: {
    clientAvatar() {
      return (
        (!this.imageData &&
          this.client.company_name !== '' &&
          `https://ui-avatars.com/api/?name=${encodeURI(
            this.client.company_name
          )}&size=128&background=e9ecef&bold=true`) ||
        null
      )
    },
  },
  mounted() {
    this.getAccountManagerList()
    this.getClient()
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
    addNewPerson() {
      this.persons.push({
        id: 0,
        full_name: null,
        email: null,
        phone_number: null,
        user_or_not: 0,
        show_in_list: 0,
        user_id: null,
      })
    },
    deleteContactPeople(id, index) {
      if (!this.persons[index].id) {
        this.persons.splice(index, 1)
      }
    },
    async getClient() {
      this.contactPersonDataFound = false
      try {
        const { data } = await this.$axios.$post(
          `client/view?&sort_value=${this.sort_value}&sort_by=${this.sort_by}`,
          {
            workspace_id: this.internal_workspace_id,
            client_id: this.client_id,
          }
        )
        this.client.company_name = data.company_name
        this.client.company_email = data.company_email
        this.client.phone_number = data.phone_number
        this.client.website_url = data.website_link
        this.client.address_line1 = data.address_line1
        this.client.address_line2 = data.address_line2
        this.client.state = data.state
        this.client.city = data.city
        this.client.zip_code = data.zip_code
        this.client.description = data.description
        this.client.logo_preview = data.display_company_logo
        this.client.is_internal_client = data.internal_client
        this.client.primaryAccountManager = data.primary_account_manager
        this.removePrimaryAccountManager = data.primary_account_manager
        this.secondaryAccountManager = data.secondary_account_manager
        this.removeSecondaryAccountManager = data.secondary_account_manager
        if (data.contactPerson && data.contactPerson.length) {
          this.contact_persons = data.contactPerson
        } else {
          this.contactPersonDataFound = true
        }
        this.$nextTick(() => {
          this.isSortComplete = false
        })
      } catch (e) {
        const { data } = e.response
        if (data.code === 403) {
          return this.$router.push({
            name: 'workspace_id-workspace-settings-client-list',
            params: {
              workspace_id: this.internal_workspace_id,
            },
          })
        }
      }
    },
    async getAccountManagerList() {
      try {
        const { data } = await this.$axios.$get(
          `/client/all-admin-user?workspace_id=${this.internal_workspace_id}`
        )
        this.is_primary_account = true
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
        if (this.client.website_url) {
          formData.append(
            'website_link',
            this.client.website_url.replace(/\/$/, '')
          )
        } else {
          formData.append('website_link', null)
        }

        formData.append('address_line1', this.client.address_line1)
        formData.append('address_line2', this.client.address_line2)
        formData.append('city', this.client.city)
        formData.append('state', this.client.state)
        formData.append('zip_code', this.client.zip_code)
        formData.append('description', this.client.description)
        formData.append('company_logo', this.client.company_logo)
        formData.append('workspace_id', this.internal_workspace_id)
        formData.append('client_id', this.client_id)
        formData.append(
          'primary_account_manager',
          this.client.primaryAccountManager
        )
        if (
          parseInt(this.removePrimaryAccountManager) !==
          parseInt(this.client.primaryAccountManager)
        ) {
          formData.append(
            'remove_primary_account_manager',
            this.removePrimaryAccountManager
          )
          this.removePrimaryAccountManager = this.client.primaryAccountManager
        } else {
          formData.append('remove_primary_account_manager', 0)
        }
        for (let i = 0; i < this.secondaryAccountManager.length; i++) {
          formData.append(
            'secondary_account_manager[]',
            this.secondaryAccountManager[i]
          )
        }

        this.secondaryAccountManager = this.secondaryAccountManager.map((i) =>
          Number(i)
        )
        this.removeSecondaryAccountManager =
          this.removeSecondaryAccountManager.map((i) => Number(i))
        const removeSecondaryMember = this.removeSecondaryAccountManager.filter(
          (m) => !this.secondaryAccountManager.includes(m)
        )
        if (removeSecondaryMember.length) {
          for (let i = 0; i < removeSecondaryMember.length; i++) {
            formData.append(
              'remove_secondary_account_manager[]',
              removeSecondaryMember[i]
            )
          }
          this.removeSecondaryAccountManager = this.secondaryAccountManager
        }
        this.removeSecondaryAccountManager = this.secondaryAccountManager

        await this.$axios.$post('client/edit', formData)
        this.loading = false
        this.$toast.global.success('Client Details Successfully Updated')
      } catch (e) {
        this.loading = false
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
    primaryAccountManagerHandler(data) {
      this.client.primaryAccountManager = data.id
    },
    secondaryAccountManagerHandler(data) {
      this.secondaryAccountManager = data === null ? [] : data
    },
  },
  validations: {
    client: {
      company_name: { required },
      company_email: {},
      phone_number: {},
      zip_code: { maxLength: maxLength(20) },
      primaryAccountManager: { checkZero },
    },
  },
}
</script>
