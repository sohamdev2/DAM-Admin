<template>
  <li>
    <div class="tb-column flex21">
      <div class="media">
        <div class="media-left">
          <!-- <div
            class="profile-bg"
            :style="{
              'background-image': getUserImage(user),
            }"
          ></div> -->
          <div
            v-if="user.display_profile_image"
            class="profile-bg"
            :style="{
              backgroundImage: `url(${user.display_profile_image})`,
            }"
          ></div>
          <div
            v-else
            :class="[
              'profile-char',
              'fl-as-imgtxt',
              'bg-gray',
              user.user_name[0].toLowerCase(),
            ]"
          >
            {{ user.user_name[0].toUpperCase() }}
          </div>
        </div>
        <div v-if="user.user_id != $auth.user.id" class="media-body">
          <nuxt-link
            class="table-a"
            :to="{
              name: 'workspace_id-workspace-settings-user-userid-edit',
              params: {
                workspace_id: user.workspace_id,
                userid: user.user_id,
              },
            }"
            v-html="$getSearchedMarkedText(user.user_name, query)"
          ></nuxt-link>
        </div>
        <div v-if="user.user_id == $auth.user.id" class="media-body">
          <label
            class="table-a"
            style="font-weight: 600 !important"
            v-html="$getSearchedMarkedText(user.user_name, query)"
          ></label>
        </div>
      </div>
    </div>

    <div class="Email tb-column flex26">
      <label v-html="$getSearchedMarkedText(user.user_email, query)"></label>
    </div>
    <div class="Workspace tb-column flex12">
      <label>{{ user.workspace_name }}</label>
    </div>
    <div class="pdl tb-column flex10">
      <div class="media">
        <div v-if="user.pm_role === 'Super Admin'" class="media-left">
          <img src="~/assets/img/icon/supper-admin.svg" alt="" />
        </div>
        <div class="media-body">
          <label>{{ user.pm_role }}</label>
        </div>
      </div>
    </div>
    <div class="pdl tb-column flex10">
      <div class="media">
        <div class="media-body">
          <label>{{ user.dam_role }}</label>
        </div>
      </div>
    </div>
    <div class="pdl tb-column flex10">
      <div class="media">
        <div v-if="user.lm_role === 'Super Admin'" class="media-left">
          <img src="~/assets/img/icon/supper-admin.svg" alt="" />
        </div>

        <div class="media-body">
          <label>{{ user.lm_role }}</label>
        </div>
      </div>
    </div>
    <div class="tb-column flex11">
      <ul class="action">
        <li v-if="user.user_id != $auth.user.id">
          <nuxt-link
            :to="{
              name: 'workspace_id-workspace-settings-user-userid-edit',
              params: {
                workspace_id: user.workspace_id,
                userid: user.user_id,
              },
            }"
          >
            <svg
              id="Layer_1"
              v-tooltip="'Edit User'"
              class="edit-icon h-orange"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 18 18"
              xml:space="preserve"
            >
              <g id="Group_4350" transform="translate(-397.961 -147.331)">
                <path
                  id="Path_3408"
                  class="fill-color"
                  d="M400.4,165.3c-1.3,0-2.4-1.1-2.4-2.4v-11.4c0-1.3,1.1-2.4,2.4-2.4h5.7c0.4,0,0.8,0.4,0.8,0.8c0,0.4-0.4,0.8-0.8,0.8h-5.7c-0.5,0-0.8,0.4-0.9,0.8v11.4c0,0.5,0.4,0.8,0.9,0.9h11.4c0.5,0,0.8-0.4,0.9-0.9v-5.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.7,0.3,0.8,0.8v5.7c0,1.3-1.1,2.4-2.4,2.4L400.4,165.3z"
                ></path>
                <path
                  id="Path_3409"
                  class="fill-color"
                  d="M403.6,160.4c-0.2,0-0.4-0.1-0.6-0.2c-0.2-0.2-0.3-0.5-0.2-0.7l0.8-3.3c0-0.1,0.1-0.3,0.2-0.4l7.8-7.8c1-1,2.6-1,3.6,0c1,1,1,2.6,0,3.5l-7.8,7.8c-0.1,0.1-0.2,0.2-0.4,0.2l-3.3,0.8C403.8,160.4,403.7,160.4,403.6,160.4zM413.4,148.9c-0.3,0-0.5,0.1-0.7,0.3l-7.6,7.6l-0.4,1.8l1.8-0.4l7.6-7.6c0.4-0.4,0.4-1,0-1.3C413.9,149,413.7,148.9,413.4,148.9L413.4,148.9z"
                ></path>
              </g>
            </svg>
          </nuxt-link>
        </li>
        <li v-if="user.user_id != $auth.user.id">
          <nuxt-link
            :to="{
              name: 'workspace_id-workspace-settings-user-userid-reset-password',
              params: {
                workspace_id: user.workspace_id,
                userid: user.user_id,
              },
            }"
          >
            <svg
              id="Layer_1"
              v-tooltip="'Change Password'"
              class="change-password-icon h-orange"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 19.5 18"
              xml:space="preserve"
            >
              <g id="Group_4352" transform="translate(-486.506 -147.705)">
                <path
                  id="Path_3412"
                  class="fill-color"
                  d="M495.5,165.7c-0.1,0-0.3,0-0.4,0c-2.9-0.1-5.6-1.7-7.2-4.1c-0.6-1-1.1-2.1-1.3-3.2c-0.4-2.2,0-4.5,1.2-6.4c0.6-0.9,1.3-1.8,2.2-2.4c1.1-0.9,2.4-1.4,3.8-1.7c0.5-0.1,1.1-0.2,1.6-0.2c0.2,0,0.3,0,0.5,0c1.3,0.1,2.6,0.4,3.8,1.1c2.1,1.1,3.6,3,4.3,5.3l0,0.1h1.8l-2.4,4.3l-2.6-4.3l1.9-0.1l-0.1-0.3c-1.1-2.6-3.4-4.4-6.1-4.8c-0.4-0.1-0.8-0.1-1.2-0.1c-4.2,0-7.7,3.5-7.6,7.7c0,4.2,3.4,7.6,7.6,7.6c0.3,0,0.7,0,1-0.1c2.1-0.3,4.1-1.4,5.3-3.2l0.2-0.2l1.1,0.7l-0.4,0.5c-0.1,0.2-0.2,0.3-0.3,0.4c-1.1,1.3-2.5,2.2-4.1,2.7C497.4,165.6,496.5,165.7,495.5,165.7z"
                />
                <path
                  id="Path_3413"
                  class="fill-color"
                  d="M492.7,161.3c-0.5,0-0.9-0.3-0.9-0.8c0,0,0-0.1,0-0.1c0-1,0-1.9,0-2.9l0-1.2c0-0.4,0.3-0.8,0.7-0.8c0,0,0.1,0,0.1,0h0.3l-0.1-0.3c0-0.2-0.1-0.5,0-0.7c0.1-0.9,0.6-1.7,1.4-2.1c0.4-0.2,0.8-0.3,1.2-0.3c0.7,0,1.4,0.3,2,0.8c0.5,0.5,0.8,1.1,0.8,1.8l0,0.7l0.2,0c0.5,0,0.8,0.4,0.8,0.8c0,0,0,0,0,0c0,0.2,0,1.1,0,1.1l0,3c0,0.4-0.3,0.8-0.7,0.9c0,0-0.1,0-0.1,0l-2.7,0C494.7,161.3,493.7,161.3,492.7,161.3L492.7,161.3z M493.2,156.8v3.2l4.8-0.1l-0.1-3.2L493.2,156.8z M495.4,153.5c-0.7,0.1-1.2,0.6-1.2,1.4v0.7l0.2,0c0.6-0.1,2-0.1,2.4-0.1h0.2l-0.1-0.7c0-0.7-0.6-1.3-1.4-1.3C495.5,153.5,495.4,153.5,495.4,153.5z"
                />
              </g>
            </svg>
          </nuxt-link>
        </li>

        <li v-if="user.user_id != $auth.user.id">
          <a @click="$emit('delete', user)">
            <svg
              id="Layer_1"
              v-tooltip="'Deactivate User'"
              class="inactive-icon h-orange"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 18 18"
              style="enable-background: new 0 0 18 18"
              xml:space="preserve"
            >
              <g>
                <g id="turn-off" transform="translate(-20.581)">
                  <g id="Group_39280" transform="translate(21.331)">
                    <g id="Group_39279" transform="translate(0)">
                      <path
                        id="Path_40169"
                        class="fill-color"
                        d="M11.6,2.2c-0.4-0.2-0.8,0-1,0.4c-0.2,0.4,0,0.8,0.4,1c3.4,1.5,5,5.5,3.5,8.9c-1.5,3.4-5.5,5-8.9,3.5c-3.4-1.5-5-5.5-3.5-8.9C2.7,5.5,4,4.2,5.6,3.6C5.9,3.4,6.1,3,6,2.6S5.4,2,5,2.2c0,0,0,0,0,0C0.8,4-1.1,8.9,0.7,13s6.7,6.1,10.9,4.3c4.2-1.8,6.1-6.7,4.3-10.9C15,4.5,13.5,3,11.6,2.2L11.6,2.2z"
                      />
                      <path
                        id="Path_40170"
                        class="fill-color"
                        d="M8.2,8.2C8.7,8.2,9,7.9,9,7.5V0.8C9,0.3,8.7,0,8.2,0S7.5,0.3,7.5,0.8v6.8C7.5,7.9,7.8,8.2,8.2,8.2z"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </a>
        </li>
      </ul>
    </div>
  </li>
</template>
<script>
export default {
  props: {
    user: { type: Object, required: true },
    index: Number,
  },
  computed: {
    query() {
      return this.$route.query.q
    },
  },
  methods: {
    showDeleteUserDialog() {},
    activeInvitation() {},
    getUserImage(user) {
      if (user.display_profile_image) {
        return ` url(${user.display_profile_image})`
      }
      if (!user.display_profile_image && user.user_name) {
        return ` url('https://ui-avatars.com/api/?name=${encodeURI(
          user.user_name
        )}&size=128&background=EFF1F3&font-size=0.5&bold=true')`
      }
    },
  },
}
</script>

<style></style>
