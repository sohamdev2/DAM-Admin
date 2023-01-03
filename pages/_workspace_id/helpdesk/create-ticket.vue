<template>
  <div class="body-content p0">
    <div class="general-settings-right h-100 w-100">
      <div class="workspace-settings">
        <div class="row no-gutters h-100">
          <div class="col-lg-8 col-md-12 h-100">
            <div class="general-settings-box customscrollbar">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group required">
                    <text-field
                      v-model="ticketData.name"
                      label="Name"
                      disabled
                      :v="$v.ticketData.name"
                      required
                    ></text-field>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <text-field
                      v-model="ticketData.email"
                      label="Email"
                      disabled
                      :v="$v.ticketData.email"
                      required
                    ></text-field>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="control-label">Workspace</label>
                    <Select2
                      v-model="ticketData.workspace_id"
                      :options="$allowedWorkspaces('slug').general.list"
                      placeholder="Workspace"
                      custom-event
                    />
                    <div
                      v-if="
                        $v.ticketData.$error &&
                        !$v.ticketData.workspace_id.required
                      "
                      class="input-error"
                    >
                      Workspace is required
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="control-label">Module</label>
                    <Select2
                      v-model="ticketData.moduel_id"
                      :options="modules"
                      placeholder="Module"
                      custom-event
                    />
                    <div
                      v-if="
                        $v.ticketData.$error &&
                        !$v.ticketData.moduel_id.required
                      "
                      class="input-error"
                    >
                      Module is required
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <text-field
                      v-model="ticketData.title"
                      label="Title"
                      :v="$v.ticketData.title"
                      required
                    ></text-field>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group required">
                    <label class="control-label">Comment</label>
                    <client-only>
                      <vue-editor
                        ref="editor"
                        v-model.lazy="ticketData.comment"
                      />
                      <div
                        v-if="
                          $v.ticketData.$error &&
                          !$v.ticketData.comment.required
                        "
                        class="input-error"
                      >
                        Comment is required
                      </div>
                    </client-only>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <label class="control-label">Tags</label>
                    <TagInput
                      :tags="ticketData.tags"
                      @update:tags="(tag) => (ticketData.tags = tag)"
                    />
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group required">
                    <label class="control-label">Ticket Type</label>
                    <Select2
                      v-model="ticketData.ticket_type_id"
                      :options="ticketTypes"
                      placeholder="Ticket Type"
                      custom-event
                    />
                    <div
                      v-if="
                        $v.ticketData.$error &&
                        !$v.ticketData.ticket_type_id.required
                      "
                      class="input-error"
                    >
                      Ticket Type is required
                    </div>
                  </div>
                </div>
                <div class="col-md-8">
                  <div class="form-group">
                    <label class="control-label">Attachment</label>
                    <div class="file-upload big">
                      <div class="file-select">
                        <div id="fileName" class="file-select-button">
                          Browse File
                        </div>
                        <div id="noFile" class="file-select-name">
                          No file chosen...
                        </div>
                        <input
                          id="chooseFile"
                          ref="attachments"
                          type="file"
                          name="chooseFile"
                          @change="fileChange()"
                        />
                      </div>
                    </div>
                    <div
                      v-for="(atc, atc_index) in ticketData.attachments"
                      :key="atc.org_file_name + atc_index"
                      class="preview-upload mt1 d-flex align-items-center"
                    >
                      <input
                        type="text"
                        name=""
                        :value="atc.org_file_name"
                        class="form-control"
                        disabled=""
                      />
                      <button
                        type="button"
                        class="btn btn-big btn-danger ml-2"
                        @click="ticketData.attachments.splice(atc_index, 1)"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
                <div class="col-md-10">
                  <div class="form-group">
                    <button
                      :disabled="creating"
                      type="submit"
                      name="submit"
                      class="btn"
                      @click="createTicket"
                    >
                      <i v-if="creating" class="fa fa-circle-o-notch fa-spin">
                      </i>
                      Save Ticket
                    </button>
                    <button
                      type="reset"
                      name="reset"
                      class="btn btn-gray"
                      @click="cancel"
                    >
                      Cancel
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
import { required, email } from 'vuelidate/lib/validators'
import axios from './utils'
import TagInput from '~/components/lead/TagInput'
import Select2 from '~/components/plugins/Select2'
import TextField from '~/components/lead/TextField.vue'
export default {
  components: {
    Select2,
    TagInput,
    TextField,
  },
  layout: 'supportLayout',
  middleware: ['authCheck'],
  data() {
    return {
      // Ticket
      ticketData: this.newTicketData(),
      creating: false,
      // Api data
      ticketTypes: [],
      modules: [],
      workSpaces: [],
    }
  },
  created() {
    this.getTicketTypes()
    this.getModules()
  },
  methods: {
    getModules() {
      const wp = this.$auth.user.accessibleWorkspaces.find((wp) => {
        return wp.id === this.$route.params.workspace_id
      })
      this.modules = wp.module.map((e) => {
        return {
          text: e.module_name,
          id: e.module_id,
        }
      })
      if (this.modules.length < 2) {
        this.ticketData.moduel_id = this.modules[0].id
      }
    },
    newTicketData() {
      return {
        name: this.$auth.user.name,
        email: this.$auth.user.email,
        user_id: this.$auth.user.id,
        title: '',
        comment: '',
        tags: [],
        attachments: [],
        // not binding
        moduel_id: '',
        ticket_type_id: '',
        workspace_id: this.$route.params.workspace_id
          ? this.$route.params.workspace_id
          : this.$_auth().id,
        workspace_name: '',
        module_name: '',
      }
    },
    cancel() {
      const isConfirm = confirm('Are you sure you want to cancel ?')
      if (isConfirm) {
        this.$router.replace({
          name: 'workspace_id-helpdesk-list-tickets',
        })
      }
    },
    fileChange() {
      const file = this.$refs.attachments.files[0]
      const maxSize = 26214400 // Twenty five megabyete in bytes
      if (file.size > maxSize) {
        this.$toast.error('File size should not be more than 25mb')
        return
      }
      this.ticketData.attachments.push({
        org_file_name: file.name,
        file,
      })
      // clear file input
      this.$refs.attachments.value = ''
    },
    getTicketTypes() {
      axios
        .get('ticket/type')
        .then(({ data }) => {
          this.ticketTypes = data.data.map((e) => {
            return {
              text: e.name,
              id: e.id,
            }
          })
        })
        .catch(console.log)
    },
    createTicket() {
      this.$v.$touch()
      if (this.$v.ticketData.$invalid) {
        return
      }
      this.creating = true
      const formData = new FormData()
      const workspace_name = this.$allowedWorkspaces('slug').general.list.find(
        (e) => e.id === this.ticketData.workspace_id
      )?.text
      const module_name = this.modules.find(
        (e) => parseInt(e.id) === parseInt(this.ticketData.moduel_id)
      )?.text
      const tags = this.ticketData.tags.join(',')
      formData.append('name', this.ticketData.name)
      formData.append('email', this.ticketData.email)
      formData.append('user_id', this.ticketData.user_id)
      formData.append('title', this.ticketData.title)
      formData.append('comment', this.ticketData.comment)
      formData.append('tags', tags)
      formData.append('workspace_name', workspace_name)
      formData.append('module_name', module_name)
      formData.append('ticket_type_id', this.ticketData.ticket_type_id)
      this.ticketData.attachments.forEach((e) => {
        formData.append('attachment[]', e.file)
      })
      axios
        .post('ticket/add', formData)
        .then(({ data }) => {
          this.$toast.success(data.message)
          this.$v.$reset()
        })
        .catch((err) => {
          this.$toast.error(err)
        })
        .finally(() => {
          this.creating = false
          this.ticketData = this.newTicketData()
        })
    },
  },
  validations: {
    ticketData: {
      name: { required },
      email: { required, email },
      title: { required },
      ticket_type_id: { required },
      moduel_id: { required },
      workspace_id: { required },
      comment: { required },
    },
  },
}
</script>

<style></style>
