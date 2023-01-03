<template>
  <div class="col-md-5 h-100">
    <div ref="scroll" class="project-body-right table-list-scrolling h-100">
      <ContentLoader
        v-if="isTicketLoading || isActivitiesLoading || isCommentLoading"
        :width="700"
        :height="550"
        :speed="1"
        style="padding: 10px"
        class="normalLoader"
      >
        <circle cx="197" cy="70" r="15" />
        <rect x="6" y="277" rx="3" ry="3" width="143" height="35" />
        <rect x="-1" y="326" rx="3" ry="3" width="750" height="105" />
        <rect x="0" y="450" rx="3" ry="3" width="750" height="36" />
        <rect x="1" y="507" rx="4" ry="4" width="103" height="32" />
        <rect x="128" y="508" rx="4" ry="4" width="103" height="32" />
        <circle cx="193" cy="296" r="12" />
        <circle cx="216" cy="296" r="12" />
        <circle cx="194" cy="242" r="12" />
        <circle cx="216" cy="242" r="12" />
        <circle cx="238" cy="242" r="12" />
        <rect x="184" y="123" rx="4" ry="4" width="206" height="6" />
        <rect x="6" y="220" rx="3" ry="3" width="143" height="35" />
        <rect x="8" y="167" rx="3" ry="3" width="143" height="35" />
        <rect x="6" y="113" rx="3" ry="3" width="143" height="35" />
        <rect x="7" y="59" rx="3" ry="3" width="143" height="35" />
        <rect x="186" y="175" rx="4" ry="4" width="99" height="7" />
        <rect x="304" y="174" rx="4" ry="4" width="99" height="7" />
        <rect x="6" y="8" rx="3" ry="3" width="750" height="36" />
      </ContentLoader>
      <template v-else>
        <div class="common-box bg-gray h-100">
          <div id="scroll_comment" class="customscrollbar">
            <div class="tbody">
              <div class="task-info bg-white">
                <div class="profile-box d-flex">
                  <div class="taskinfo-label flex-fill">Title:</div>
                  <div class="pb-value flex-fill">
                    <h3>{{ quickviewData.title }}</h3>
                  </div>
                </div>
                <div class="profile-box d-flex">
                  <div class="taskinfo-label flex-fill">Workspace Name:</div>
                  <div class="pb-value flex-fill">
                    <label>{{ quickviewData.workspace_name }}</label>
                  </div>
                </div>
                <div class="profile-box d-flex">
                  <div class="taskinfo-label flex-fill">Module Name:</div>
                  <div class="pb-value flex-fill">
                    <label>{{ quickviewData.module_name }}</label>
                  </div>
                </div>
                <div class="profile-box d-flex">
                  <div class="taskinfo-label flex-fill">Ticket Type:</div>
                  <div class="pb-value flex-fill">
                    <div class="ticket-info">
                      <span
                        class="bg"
                        :style="`background-color: ${quickviewData.ticket_type_color}`"
                      >
                        <span class="text">{{
                          quickviewData.ticket_type_name
                        }}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="profile-box d-flex">
                  <div class="taskinfo-label flex-fill">Status:</div>
                  <div class="pb-value flex-fill">
                    <div class="ticket-info">
                      <span
                        class="bg"
                        :style="`background-color: ${quickviewData.status_color}`"
                      >
                        <span class="text">{{
                          quickviewData.status_name
                        }}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="profile-box d-flex">
                  <div class="taskinfo-label flex-fill">Priority:</div>
                  <div class="pb-value flex-fill">
                    <div class="ticket-info">
                      <span
                        class="bg"
                        :style="`background-color: ${quickviewData.priority_color}`"
                      >
                        <span class="text">{{
                          quickviewData.priority_name
                        }}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="profile-box d-flex">
                  <div class="taskinfo-label flex-fill">Requested:</div>
                  <div class="pb-value flex-fill">
                    <label>{{ quickviewData.requested }}</label>
                  </div>
                </div>
                <!-- <div class="profile-box d-flex">
                  <div class="taskinfo-label flex-fill">Rating:</div>
                  <div class="pb-value flex-fill">
                    <label>4.2</label>
                  </div>
                </div> -->
                <div class="profile-box d-flex">
                  <div class="taskinfo-label flex-fill">Tags:</div>
                  <div class="pb-value flex-fill">
                    <div class="tag-add-box">
                      <span
                        v-for="tag in info.tags"
                        :key="tag.id"
                        class="added-tag"
                        >{{ tag.name }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="task-description">
                <!-- eslint-disable-next-line vue/no-v-html -->
                <p v-html="info.body"></p>
              </div>
              <div class="row">
                <div class="col-sm-12">
                  <div class="attachmentcard-info-wrapper">
                    <div
                      v-for="attachment in info.attachments"
                      :key="attachment.id"
                      class="attachmentcard-info attachmentcard-img"
                    >
                      <div
                        v-tooltip="attachment.file_name"
                        class="attachmentcard-img-wrapper"
                      >
                        <a
                          v-if="$isImage(attachment.file_type)"
                          href="javascript:void(0);"
                          class="pp-img"
                          :style="`background-image: url(${attachment.display_file_image})`"
                        ></a>
                        <img
                          v-else
                          :src="require('~/assets/img/file/pdf.svg')"
                          class="img-responsive"
                        />
                        <a
                          class="dwn-atchmnt"
                          :href="attachment.display_file_image"
                          download
                          >Download</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="profile-comment-box">
                <div class="activity-title">
                  <a
                    href="#activity"
                    class="accordion-toggle"
                    aria-expanded="true"
                    data-toggle="collapse"
                  >
                    <span>Older Threads ({{ totalComment }})</span>
                    <div class="activity-arrow">
                      <svg
                        id="Layer_1"
                        class="toggle-icon white"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 18 18"
                        xml:space="preserve"
                      >
                        <g id="Group_4481" transform="translate(-871 -754)">
                          <rect
                            id="Rectangle_3019"
                            x="871"
                            y="754"
                            class="fill-hide"
                            width="18"
                            height="18"
                          ></rect>
                          <path
                            id="Path_3404"
                            class="fill-color"
                            d="M880,768.6c-0.5,0-1-0.2-1.3-0.6l-7.1-7.1c-0.7-0.7-0.7-1.9,0-2.7c0.4-0.3,0.8-0.5,1.3-0.5h14.2c1,0,1.9,0.9,1.9,1.9c0,0.5-0.2,1-0.6,1.3l-7.1,7.1C881,768.4,880.5,768.6,880,768.6L880,768.6z M872.9,759.3c-0.2,0-0.3,0.1-0.3,0.3c0,0.1,0,0.2,0.1,0.2l7.1,7.1c0.1,0.1,0.1,0.1,0.2,0.1c0.1,0,0.2,0,0.2-0.1l7.1-7.1c0.1-0.1,0.1-0.3,0-0.4c0,0,0,0,0,0c0-0.1-0.1-0.1-0.2-0.1L872.9,759.3z"
                          ></path>
                        </g>
                      </svg>
                    </div>
                  </a>
                </div>
                <div id="activity" class="activity-groups collapse show">
                  <div
                    v-for="activity in activities"
                    :key="activity.id"
                    class="task-activity-box"
                  >
                    <div class="media">
                      <div class="media-body media-middle">
                        <div class="taskactivity">
                          {{ activity.body }}
                          <span class="activity-time">{{
                            activity.created_date
                          }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  v-for="comment in comments"
                  :key="comment.id"
                  class="comment-box bg-white"
                >
                  <div class="comment-header">
                    <div class="title-time">
                      <label>{{ comment.author.name }}</label>
                      <span>{{ comment.created_date }}</span>
                    </div>
                  </div>
                  <div
                    v-if="
                      comment.attachment_details.length &&
                      $isImage(comment.attachment_details[0].file_type)
                    "
                    class="attachmentcard-img"
                  >
                    <div class="attach-image">
                      <a
                        :href="comment.attachment_details[0].display_file_image"
                        class="pp-img"
                        data-fancybox
                      >
                        <img
                          :src="
                            comment.attachment_details[0].display_file_image
                          "
                          alt=""
                        />
                      </a>
                    </div>
                    <div class="attachment-title">
                      <span
                        >{{ comment.attachment_details[0].display_file_name
                        }}<span class="file-size">{{
                          getReadableSize(
                            comment.attachment_details[0].file_size
                          )
                        }}</span></span
                      ><a
                        :href="comment.attachment_details[0].display_file_image"
                        download
                        >Download</a
                      >
                    </div>
                  </div>
                  <div
                    v-else-if="
                      comment.attachment_details.length &&
                      $isDoc(comment.attachment_details[0].file_type)
                    "
                    class="attachment-card"
                  >
                    <div
                      v-tooltip="
                        comment.attachment_details[0].display_file_name
                      "
                      class="card-left pp-img"
                    >
                      <img
                        :src="comment.attachment_details[0].preview_image"
                        alt=""
                      />
                      <span
                        >{{ comment.attachment_details[0].display_file_name
                        }}<span class="file-size">{{
                          getReadableSize(
                            comment.attachment_details[0].file_size
                          )
                        }}</span></span
                      >
                    </div>
                    <div class="card-right">
                      <a
                        :href="comment.attachment_details[0].display_file_image"
                        download
                        >Download</a
                      >
                    </div>
                  </div>
                  <!-- eslint-disable-next-line vue/no-v-html -->
                  <p v-html="comment.body"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="side-baar-comment-box bg-gray">
          <div class="comment-title">Add Response</div>
          <div class="tab-pane">
            <div class="TabCommentBox">
              <div class="ck-editor">
                <div class="ck-editor__main">
                  <Ckeditor
                    ref="editor"
                    v-model="newComment"
                    placeholder="Please write comment..."
                    class="form-control ck-content"
                  />
                  <div
                    v-if="$v.$error && !$v.newComment.required"
                    class="input-error"
                  >
                    Comment is required
                  </div>
                </div>
              </div>
              <div class="btn-groups">
                <button
                  :disabled="commentAdding"
                  href="javascript:void(0);"
                  class="btn"
                  @click="addComment"
                >
                  <i v-if="commentAdding" class="fa fa-circle-o-notch fa-spin">
                  </i>
                  Send
                </button>
                <div class="file-upload medium">
                  <div class="file-select">
                    <div id="fileName" class="file-select-button">
                      Browse File
                    </div>
                    <div id="noFile" class="file-select-name">
                      {{
                        newAttachments.length
                          ? newAttachments[0].org_file_name
                          : 'No File Choosen...'
                      }}
                    </div>
                    <input
                      id="chooseFile"
                      ref="attachment"
                      type="file"
                      name="chooseFile"
                      @change="fileChange()"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { ContentLoader } from 'vue-content-loader'
import axios from './../../utils'
import { formatBytes } from '@/pages/_workspace_id/dam/integrations/utils/index'
import Ckeditor from '~/components/plugins/Ckeditor'

export default {
  name: 'TicketDetails',
  components: {
    ContentLoader,
    Ckeditor,
  },
  data() {
    return {
      quickviewData: {},
      info: {},
      isTicketLoading: false,
      isActivitiesLoading: false,
      isCommentLoading: false,
      activities: [],
      comments: [],
      newComment: '',
      newAttachments: [],
      email: this.$auth.user.email,
      user_id: this.$auth.user.id,
      commentAdding: false,
      totalComment: 0,
    }
  },
  computed: {
    getReadableSize() {
      return (size) => formatBytes(size, 0)
    },
  },
  watch: {
    $route: {
      handler(to, from) {
        this.getTicketDetails()
        this.getActivities()
        this.getTicketComments()
      },
      immediate: true,
    },
  },
  methods: {
    fileChange() {
      const file = this.$refs.attachment.files[0]
      const maxSize = 26214400 // Twenty five megabyete in bytes
      if (file.size > maxSize) {
        this.$toast.error('File size should not be more than 25mb')
        return
      }
      this.newAttachments.push({
        org_file_name: file.name,
        file,
      })
      this.$refs.attachment.value = ''
    },
    addComment() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      this.commentAdding = true
      const commentForm = new FormData()
      commentForm.append('email', this.email)
      commentForm.append('user_id', this.user_id)
      commentForm.append('ticket_id', this.$route.params.ticket_id)
      commentForm.append('comment', this.newComment)
      this.newAttachments.forEach((e) => {
        commentForm.append('attachment', e.file)
      })
      axios
        .post('ticket/comment/add', commentForm)
        .then(({ data }) => {
          this.$toast.success(data.message)
          // console.log(data)
          this.comments.push({
            author: data.data.author,
            body: data.data.body,
            created_date: data.data.created_at,
            id: data.data.id,
          })
          this.$nextTick(() =>
            window.$('#scroll_comment').animate({
              scrollTop: window.$('#scroll_comment').get(0).scrollHeight,
            })
          )
          this.newAttachments = []
          this.$v.$reset()
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.newComment = ''
          this.commentAdding = false
        })
    },
    getActivities() {
      this.isActivitiesLoading = true
      axios
        .post('ticket/activity', {
          email: this.email,
          user_id: this.user_id,
          ticket_id: this.$route.params.ticket_id,
        })
        .then(({ data }) => {
          this.activities = data.data.activity_list
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.isActivitiesLoading = false
        })
    },
    getTicketComments() {
      this.isCommentLoading = true
      axios
        .post('ticket/comment/list', {
          email: this.email,
          user_id: this.user_id,
          ticket_id: this.$route.params.ticket_id,
        })
        .then(({ data }) => {
          this.totalComment = data.data.total_count
          this.comments = data.data.data
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.isCommentLoading = false
        })
    },
    getTicketDetails() {
      this.isTicketLoading = true
      axios
        .post('ticket/view', {
          email: this.email,
          user_id: this.user_id,
          ticket_id: this.$route.params.ticket_id,
        })
        .then(({ data }) => {
          this.quickviewData = data.data
          this.info = data.data
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.isTicketLoading = false
        })
    },
  },
  validations() {
    return {
      newComment: {
        required,
      },
    }
  },
}
</script>

<style></style>
