<template>
  <div>
    <div
      id="reminder"
      class="modal static-modal"
      data-keyboard="false"
      data-backdrop="static"
    >
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Set Reminder</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true" @click="closeModal">
                <CloseIcon />
              </span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="control-label">Reminder Date</label>
              <div class="project-brief-info">
                <div class="pb-value w-auto d-flex align-items-center">
                  <div class="date-with-icon reminderDate">
                    <ClockIcon2
                      :class="
                        reminderNotificationStatus === 'Pending'
                          ? 'green'
                          : reminderNotificationStatus === 'Send'
                          ? 'red'
                          : ''
                      "
                    />
                    <DatePicker
                      :style="{
                        color:
                          reminderNotificationStatus === 'Pending'
                            ? '#008000'
                            : reminderNotificationStatus === 'Send'
                            ? '#ff0000'
                            : '',
                      }"
                      :placeholder="'No Reminder'"
                      :class-obj="'datepicker form-control no-icon'"
                      :min-date="
                        reminderNotificationStatus === 'Send' ||
                        $moment(reminderDate).isSame(
                          $moment().local().format('YYYY-MM-DD'),
                          'day'
                        ) ||
                        $moment(reminderDate).isBefore(
                          $moment().local().format('YYYY-MM-DD'),
                          'day'
                        )
                          ? null
                          : $moment().local().add(1, 'day').format('YYYY-MM-DD')
                      "
                      :disabled="
                        reminderNotificationStatus === 'Send' ||
                        $moment(reminderDate).isSame(
                          $moment().local().format('YYYY-MM-DD'),
                          'day'
                        ) ||
                        $moment(reminderDate).isBefore(
                          $moment().local().format('YYYY-MM-DD'),
                          'day'
                        )
                      "
                      :start-date.sync="$v.reminderDate.$model"
                      :custom-event="true"
                    />
                    <DatePicker
                      v-if="
                        reminderNotificationStatus === 'Send' ||
                        $moment(reminderDate).isSame(
                          $moment().local().format('YYYY-MM-DD'),
                          'day'
                        ) ||
                        $moment(reminderDate).isBefore(
                          $moment().local().format('YYYY-MM-DD'),
                          'day'
                        )
                      "
                      :style="{
                        color:
                          reminderNotificationStatus === 'Pending'
                            ? '#008000'
                            : reminderNotificationStatus === 'Send'
                            ? '#ff0000'
                            : '',
                      }"
                      tooltip="Change Reminder Date"
                      :placeholder="'No Reminder'"
                      :class-obj="'datepicker form-control'"
                      :min-date="
                        $moment().local().add(1, 'day').format('YYYY-MM-DD')
                      "
                      :start-date.sync="$v.reminderDate.$model"
                      :custom-event="true"
                    />
                  </div>
                  <span v-if="date !== null" class="remove-date ml-1">
                    <svg
                      id="Layer_1"
                      v-tooltip="'Remove Reminder'"
                      class="close-icon h-red"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 18 18"
                      xml:space="preserve"
                      @click="removeReminder"
                    >
                      <g
                        id="Group_4358"
                        transform="translate(-69.745 -317.549)"
                      >
                        <path
                          id="Path_3424"
                          class="fill-color"
                          d="M70.5,335.5c-0.4,0-0.8-0.4-0.8-0.8c0-0.2,0.1-0.4,0.2-0.6l16.4-16.4c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0l-16.4,16.4C70.9,335.5,70.7,335.5,70.5,335.5z"
                        ></path>
                        <path
                          id="Path_3425"
                          class="fill-color"
                          d="M87,335.5c-0.2,0-0.4-0.1-0.6-0.2L70,318.9c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l16.4,16.4c0.3,0.3,0.3,0.8,0,1.1C87.4,335.5,87.2,335.5,87,335.5z"
                        ></path>
                      </g>
                    </svg>
                  </span>
                </div>
                <div
                  v-if="$v.reminderDate.$error && !$v.reminderDate.required"
                  class="input-error"
                >
                  Please select reminder date
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label">Notification Send to</label>
              <div class="owner-dropdown owner-multiple">
                <Select2Multiple
                  v-model="notificationSendTo"
                  :options="reminderNotificationUsersList"
                  :dropdown-css-class="'owner-select'"
                  placeholder="Select Users"
                  :custom-event="true"
                  :disabled="!canSaveDate"
                  @changeFollower="userChangeHandler(...arguments)"
                />
                <div
                  v-if="
                    $v.notificationSendTo.$error &&
                    !$v.notificationSendTo.required
                  "
                  class="input-error"
                >
                  Please select at least one user
                </div>
              </div>
            </div>
            <div v-if="canSaveDate" class="form-group mb0">
              <button
                type="button"
                name="submit"
                :class="['btn', saveLoader ? 'btn-disable' : '']"
                :disabled="saveLoader"
                @click="saveReminder"
              >
                <i v-if="saveLoader" class="fa fa-circle-o-notch fa-spin"></i>
                Save
              </button>
              <button
                type="reset"
                name="reset"
                class="btn btn-gray"
                :disabled="saveLoader"
                @click="closeModal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="remove_reminder_confirmation_modal" class="modal fade">
      <div
        class="modal-dialog modal-small modal-dialog-scrollable modal-dialog-centered"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Remove Reminder</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <CloseIcon />
            </button>
          </div>
          <div class="modal-body text-center">
            <p>Are you sure you wants to remove reminder?</p>
            <div class="btns">
              <a
                href="javascript:void(0);"
                class="btn"
                :disabled="removeLoader"
                @click="confirmRemoveReminder"
                ><i
                  v-if="removeLoader"
                  class="fa fa-circle-o-notch fa-spin"
                ></i>
                Yes</a
              >
              <a
                href="javascript:void(0);"
                class="btn btn-gray"
                data-dismiss="modal"
                :disabled="removeLoader"
                >Cancel</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import Select2Multiple from '~/components/plugins/Select2Multiple'
import CloseIcon from '@/components/svg/CloseIcon'
import ClockIcon2 from '@/components/svg/ClockIcon2'
import DatePicker from '@/components/plugins/DatePicker'

export default {
  name: 'ReminderModel',
  components: { DatePicker, ClockIcon2, CloseIcon, Select2Multiple },
  props: {
    type: {
      type: [String],
      default: 'project',
    },
    projectId: {
      type: [String, Number],
      required: true,
    },
    taskId: {
      type: [String, Number],
      default: null,
    },
    workspaceId: {
      type: [String, Number],
      required: true,
    },
    date: {
      type: [String],
      default: null,
    },
    notificationStatus: {
      type: [String],
      default: null,
    },
    showReminderModal: {
      type: [Boolean],
      default: null,
    },
    /* notificationUsersList: {
      type: [Array],
      default() {
        return []
      },
    }, */
    notificationSelectedUsers: {
      type: [Array],
      default() {
        return []
      },
    },
  },
  data() {
    return {
      // Start props initial value set to local variables
      reminderDate: this.date,
      reminderNotificationStatus: this.notificationStatus,
      // reminderNotificationUsersList: this.notificationUsersList,
      reminderNotificationUsersList: [],
      // End
      notificationSendTo: this.notificationSelectedUsers,
      saveLoader: false,
      removeLoader: false,
      usersListLoader: false,
    }
  },
  computed: {
    canSaveDate() {
      const checkDateIsTodayDate = this.$moment(this.reminderDate)
        .local()
        .isSame(new Date(), 'day')
      const checkDateIsPastDate = this.$moment(this.reminderDate)
        .local()
        .isBefore(new Date(), 'day')
      return !(checkDateIsPastDate || checkDateIsTodayDate)
    },
  },
  watch: {
    /* notificationUsersList(newVal) {
      this.reminderNotificationUsersList = newVal
    }, */

    reminderDate() {
      this.reminderNotificationStatus = 'Pending'
    },
  },
  mounted() {
    this.getReminderUsersList()
  },
  methods: {
    closeModal() {
      window.$('#reminder').modal('hide')
      setTimeout(() => {
        this.$emit('update:showReminderModal', false)
      }, 500)
    },
    userChangeHandler(data) {
      this.notificationSendTo = data === null ? [] : data
    },
    async getReminderUsersList() {
      try {
        this.usersListLoader = true
        const { data } = await this.$axios.$get(
          `project/reminder-user-list?workspace_id=${this.workspaceId}&project_id=${this.projectId}`
        )
        this.reminderNotificationUsersList = data.users
        this.usersListLoader = false
      } catch (e) {
        this.$toast.error(this.$getErrorMessage(e))
        this.usersListLoader = false
      }
    },
    async saveReminder() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return false
      }
      try {
        this.saveLoader = true
        const url =
          this.type === 'project'
            ? `project/update-reminder-with-user`
            : `project/task/update-reminder-with-user`

        let data = {
          workspace_id: this.workspaceId,
          project_id: this.projectId,
          reminder_date: this.reminderDate,
          reminder_user: this.notificationSendTo,
        }
        data =
          this.type === 'project'
            ? { ...data }
            : { ...data, task_id: this.taskId }

        await this.$axios.$post(`${url}`, data)
        this.saveLoader = false
        this.$emit('update:date', this.reminderDate)
        this.$emit('update:notificationStatus', 'Pending')
        this.$emit('update:notificationSelectedUsers', this.notificationSendTo)
        this.closeModal()
        this.$toast.success('Reminder saved successfully')
      } catch (e) {
        this.saveLoader = false
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
    removeReminder() {
      window.$('#remove_reminder_confirmation_modal').modal('show')
    },
    async confirmRemoveReminder() {
      const url =
        this.type === 'project'
          ? `project/update-reminder-with-user`
          : `project/task/update-reminder-with-user`

      let data = {
        workspace_id: this.workspaceId,
        project_id: this.projectId,
        reminder_date: null,
        reminder_user: [],
      }
      data =
        this.type === 'project'
          ? { ...data }
          : { ...data, task_id: this.taskId }

      try {
        this.removeLoader = true
        await this.$axios.$post(`${url}`, data)
        window.$('#remove_reminder_confirmation_modal').modal('hide')
        this.reminderDate = null
        this.removeLoader = false
        this.$emit('update:date', null)
        this.$emit('update:notificationStatus', 'NA')
        this.$emit('update:notificationSelectedUsers', [])
        this.closeModal()
        this.$toast.success('Reminder removed successfully')
      } catch (e) {
        this.removeLoader = false
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
  },

  validations: {
    reminderDate: { required },
    notificationSendTo: { required },
  },
}
</script>

<style scoped></style>
