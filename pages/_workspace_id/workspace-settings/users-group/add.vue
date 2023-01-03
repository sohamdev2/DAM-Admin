<template>
  <div class="general-settings-right h-100">
    <div class="general-settings-title">
      <h4>Add Group</h4>
    </div>
    <div class="workspace-settings">
      <div class="row no-gutters h-100">
        <div class="col-lg-10 col-md-12 h-100">
          <div class="workspace-setting-left addGroups">
            <div class="general-settings-box customscrollbar">
              <div class="row">
                <div class="col-sm-12">
                  <div class="form-group">
                    <div class="img-upload imgwidth-input">
                      <div class="img-upload-img">
                        <!-- <span>k</span> -->
                        <div class="v-center">
                          <img
                            v-if="!imageData"
                            src="~/assets/img/icon/add-user.svg"
                          />
                          <img v-if="imageData != null" :src="imageData" />
                        </div>
                      </div>
                      <div class="img-upload-alt">
                        <span>Group Picture</span>
                        <small class="upload-note"
                          >Upload Square picture for best viewing
                          experience</small
                        >
                        <div class="file-select">
                          <div class="file-select-name">Edit</div>
                          <div class="file-field-box">
                            <input
                              id="resume"
                              type="file"
                              name="myfile"
                              accept=".jpg, .png, .svg, .gif, .jpeg"
                              data-lpignore="true"
                              @change="profileChange"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group w-75">
                    <WorkspaceNote />
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group required w-75">
                    <label class="control-label">Group Name</label>
                    <input
                      v-model.lazy="$v.form.groupName.$model"
                      type="text"
                      class="form-control"
                      data-lpignore="true"
                    />
                    <div
                      v-if="
                        $v.form.groupName.$error && !$v.form.groupName.required
                      "
                      class="input-error"
                    >
                      Please enter group name
                    </div>
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group required">
                    <label class="control-label">Group Users</label>
                    <div class="owner-dropdown owner-multiple">
                      <Select2Multiple
                        v-model="form.groupUsers"
                        :dropdown-css-class="'owner-select'"
                        :options="form.groupUsersList"
                        placeholder="Add Your Team"
                        :custom-event="true"
                        @changeFollower="groupUsersChangeHandler(...arguments)"
                      >
                      </Select2Multiple>
                      <div
                        v-if="
                          $v.form.groupUsers.$error &&
                          !$v.form.groupUsers.required
                        "
                        class="input-error"
                      >
                        Please select at least one user to add in group
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group w-50">
                    <label class="control-label">Group Color</label>
                    <div>
                      <Colorpicker
                        v-model="form.groupColor"
                        :color="form.groupColor"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group mb0">
                    <button
                      type="submit"
                      name="submit"
                      :class="{
                        btn: true,
                        'btn-disable': loading,
                      }"
                      :disabled="loading"
                      @click="submit()"
                    >
                      <i
                        v-if="loading"
                        class="fa fa-circle-o-notch fa-spin"
                      ></i>
                      Add Group
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
import $ from 'jquery'
import { required } from 'vuelidate/lib/validators'
import WorkspaceNote from '~/components/theme/settings/WorkspaceNote'
import Select2Multiple from '~/components/plugins/Select2Multiple'
import Colorpicker from '~/components/plugins/Colorpicker'
export default {
  components: { WorkspaceNote, Select2Multiple, Colorpicker },
  layout: 'generalSettingsLayout',
  middleware: [
    'authCheck',
    'can-access-project-settings',
    'block-access-dealerAdmin',
  ],
  data() {
    return {
      loading: false,
      form: {
        groupIcon: null,
        groupName: null,
        groupUsers: [],
        groupUsersList: [],
        groupColor: null,
        workspace_id: this.$_auth().id,
        internal_workspace_id: this.$route.params.workspace_id
          ? this.$route.params.workspace_id
          : this.$_auth().id,
      },
      imageData: null,
    }
  },
  updated() {
    this.loadJs()
  },
  async mounted() {
    this.loadJs()
    try {
      const { data } = await this.$axios.$get(
        `/user/group/user-list?workspace_id=${this.form.internal_workspace_id}`
      )
      this.form.groupUsersList = data.users
    } catch (e) {
      const { data } = e.response
      this.loading = false
      this.$toast.error(data.message)
    }
  },
  methods: {
    loadJs() {
      function dashboard() {
        const gsb = $('.general-settings-box').outerHeight()
        const tt = $('.general-settings-box .top-title').outerHeight()
        const wab = gsb - (tt + 40)
        $('.general-settings-box .customscrollbar').height(wab)
      }
      dashboard()
    },
    groupUsersChangeHandler(data) {
      this.form.groupUsers = data === null ? [] : data
    },
    async submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      try {
        this.loading = true
        const formData = new FormData()
        formData.append('group_icon', this.form.groupIcon)
        formData.append('group_name', this.form.groupName)
        formData.append('group_color', this.form.groupColor)
        formData.append('workspace_id', this.form.internal_workspace_id)
        for (let i = 0; i < this.form.groupUsers.length; i++) {
          formData.append('group_user[]', this.form.groupUsers[i])
        }
        const { message } = await this.$axios.$post('user/group/add', formData)
        this.$toast.global.success(message)

        await this.$router.push({
          name: 'workspace_id-workspace-settings-users-group-list',
          params: { workspace_id: this.form.internal_workspace_id },
        })
      } catch (e) {
        const { data } = e.response
        this.loading = false
        this.$toast.error(data.message)
      }
    },
    profileChange(event) {
      // const testSize = 7000
      const twoMb = 2097152
      if (event.target.files[0]) {
        if (!event.target.files[0].type.match('image.*')) {
          // check whether the upload is an image
          this.$toast.global.error('Please choose an image file')
          return
        }
        if (event.target.files[0].size < twoMb) {
          this.form.groupIcon = event.target.files[0]
          const input = event.target
          if (input.files && input.files[0]) {
            // create a new FileReader to read this image and convert to base64 format
            const reader = new FileReader()
            // Define a callback function to run, when FileReader finishes its job
            reader.onload = (e) => {
              // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
              // Read image as base64 and set to imageData
              this.imageData = e.target.result
            }
            // Start the reader job - read file as a data url (base64 format)
            reader.readAsDataURL(input.files[0])
          }
        } else {
          event.target.value = null
          this.$toast.error('File size should not be more than 2MB')
        }
      }
    },
  },

  validations: {
    form: {
      groupName: { required },
      groupUsers: {
        required,
      },
    },
  },
}
</script>

<style scoped></style>
