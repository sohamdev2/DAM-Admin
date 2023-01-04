<template>
  <div class="general-settings-right warning-massage h-100">
    <ProjectNotificationAlert />
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
        <li class="active">
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
      <div class="right-side">
        <Select2
          v-model="selectedUserType"
          :class="'select'"
          :options="userListType"
          :custom-event="true"
          :attrs="{ minimumResultsForSearch: -1 }"
          @changeSelect2="changeUserTypeFilter(...arguments)"
        ></Select2>
        <a class="btn btn-icon" @click="addNewPeople">
          <svg
            id="Layer_1"
            class="plus-icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 18 18"
            xml:space="preserve"
          >
            <g id="Group_4454" transform="translate(-1005 -577.999)">
              <path
                id="Path_3394"
                class="fill-color"
                d="M1014,596c-0.4,0-0.8-0.3-0.8-0.8v-16.5c0-0.4,0.3-0.8,0.8-0.8c0.4,0,0.8,0.3,0.8,0.8v16.5C1014.8,595.7,1014.4,596,1014,596z"
              ></path>
              <path
                id="Path_3395"
                class="fill-color"
                d="M1005.8,587.5c-0.4,0-0.8-0.3-0.8-0.7c0-0.4,0.3-0.8,0.7-0.8c0,0,0,0,0.1,0h16.5c0.4,0,0.8,0.4,0.7,0.8c0,0.4-0.3,0.7-0.7,0.7H1005.8z"
              ></path>
            </g>
          </svg>
          Add Contact Person
        </a>
      </div>
    </div>
    <div class="workspace-settings contact-person">
      <div class="customscrollbar">
        <div class="row no-gutters h-100">
          <div class="col-md-12 h-100">
            <div class="add-mode">
              <div
                v-for="(p, index) in $v.addPeople.$each.$iter"
                :key="index"
                class="add-user-form"
              >
                <div class="row no-gutters">
                  <div class="form-group flex19">
                    <label class="control-label">Title</label>
                    <input
                      v-model="p.title.$model"
                      type="text"
                      name="company-name"
                      class="form-control"
                      data-lpignore="true"
                    />
                  </div>
                  <div class="form-group flex20 required">
                    <label class="control-label">Name</label>
                    <input
                      v-model="p.full_name.$model"
                      type="text"
                      name="company-name"
                      class="form-control"
                      data-lpignore="true"
                    />
                    <div
                      v-if="p.full_name.$error && !p.full_name.required"
                      class="input-error"
                    >
                      Please provide name
                    </div>
                  </div>
                  <div class="form-group flex20 required">
                    <label class="control-label">Email</label>
                    <input
                      v-model.lazy="p.email.$model"
                      type="email"
                      name="email"
                      class="form-control"
                      data-lpignore="true"
                    />
                    <div
                      v-if="p.email.$error && !p.email.required"
                      class="input-error"
                    >
                      Please provide email
                    </div>
                    <div
                      v-if="p.email.$error && !p.email.email"
                      class="input-error"
                    >
                      Please enter valid email
                    </div>
                    <div
                      v-if="
                        p.email.required &&
                        p.email.email &&
                        !p.email.isUniqueEmail
                      "
                      class="input-error"
                    >
                      User already registered with this email.
                    </div>
                  </div>
                  <div class="form-group flex19">
                    <label class="control-label">Phone</label>
                    <input
                      v-model="p.phone_number.$model"
                      type="text"
                      name="contact"
                      class="form-control"
                      data-lpignore="true"
                    />
                    <!--                    <div
                      v-if="p.phone_number.$error && !p.phone_number.required"
                      class="input-error"
                    >
                      Please provide phone number
                    </div>
                    <div
                      v-if="p.phone_number.$error && !p.phone_number.maxLength"
                      class="input-error"
                    >
                      Phone number should not be more than 20 characters
                    </div>-->
                  </div>
                  <div
                    class="form-group d-flex flex-column justify-content-center text-center flex15"
                  >
                    <label class="control-label">Add as user?</label>
                    <label class="check-label">
                      <input
                        v-model="p.user_or_not.$model"
                        type="checkbox"
                        :true-value="1"
                        :false-value="0"
                        data-lpignore="true"
                      />
                      <span class="check-span"></span>
                    </label>
                  </div>
                  <div
                    class="form-group d-flex flex-column justify-content-center text-center flex7"
                  >
                    <a
                      href="javascript:void(0);"
                      class="add-user-form-close"
                      @click="deleteNewPeople(p, index)"
                    >
                      <svg
                        id="Layer_1"
                        class="close-icon h-red"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 18 18"
                        xml:space="preserve"
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
                    </a>
                  </div>
                </div>
              </div>
              <div v-if="addPeople.length" class="text-right mb2">
                <button
                  :class="{ btn: true, 'btn-disable': saving }"
                  :disabled="saving"
                  @click="savePeople"
                >
                  <i v-if="saving" class="fa fa-circle-o-notch fa-spin"></i>
                  Submit
                </button>
              </div>
            </div>
            <div class="common-box bg-gray h-auto">
              <div class="table-list-view small-height">
                <ul v-if="people.length" class="thead">
                  <li>
                    <div
                      v-if="userType == 'Clients'"
                      class="favorite sorting flex5"
                    >
                      <span>
                        <svg
                          id="Layer_1"
                          class="flag-icon"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 12 16"
                          xml:space="preserve"
                        >
                          <path
                            id="Path_3486"
                            class="fill-color"
                            d="M0.6,16C0.3,16,0,15.7,0,15.3V0.6C0,0.3,0.3,0,0.7,0C1,0,1.3,0.3,1.3,0.6v0.7h10C11.7,1.3,12,1.6,12,2c0,0,0,0,0,0c0,0.1,0,0.2-0.1,0.4L9.5,6l2.4,3.6c0.2,0.3,0.1,0.7-0.2,0.9c-0.1,0.1-0.2,0.1-0.4,0.1h-10v4.7C1.3,15.7,1,16,0.6,16L0.6,16L0.6,16z M10.1,9.3l-2-3C8,6.1,8,5.8,8.1,5.6l2-3H1.3v6.7L10.1,9.3z"
                          ></path>
                        </svg>
                      </span>
                    </div>
                    <div class="sorting flex10">
                      <span>Title</span>
                    </div>
                    <div
                      :class="[
                        'sorting sortarrow flex20',
                        sortingClass('full_name'),
                      ]"
                      :disabled="isSortComplete"
                    >
                      <span @click="sortByColumn('full_name')">Name</span>
                    </div>
                    <div
                      :class="[
                        'sorting sortarrow flex20',
                        sortingClass('email'),
                      ]"
                    >
                      <span @click="sortByColumn('email')">Email</span>
                    </div>
                    <div
                      :class="[
                        'sorting sortarrow flex10',
                        sortingClass('phone_number'),
                      ]"
                    >
                      <span @click="sortByColumn('phone_number')">Phone</span>
                    </div>
                    <div class="sorting text-center flex11">
                      <span>Contact type?</span>
                    </div>
                    <div class="sorting flex14">
                      <span>Invitation</span>
                    </div>
                    <div class="sorting flex10">
                      <span>Actions</span>
                    </div>
                  </li>
                </ul>

                <div
                  class="customscrollbar no_footer"
                  style="min-height: 200px"
                >
                  <ul class="tbody list-animation">
                    <li
                      v-for="(p, index) in people"
                      :key="index"
                      :class="[p.editMode ? 'edit-mode' : '']"
                      :style="`--animation-order: ${index + 1}`"
                    >
                      <div v-if="userType == 'Clients'" class="tb-column flex5">
                        <a
                          :class="{
                            'fav-icon': true,
                          }"
                          @click="addToFavourite(index)"
                        >
                          <svg
                            v-if="p.show_in_list == '1'"
                            id="Layer_1"
                            class="flag-fill-icon orange"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 13.5 18"
                            xml:space="preserve"
                          >
                            <path
                              id="Path_3485"
                              class="fill-color"
                              d="M0.7,18C0.3,18,0,17.7,0,17.3V0.7C0,0.3,0.3,0,0.7,0c0.4,0,0.7,0.3,0.7,0.7v0.8h11.3c0.4,0,0.7,0.3,0.7,0.7c0,0,0,0,0,0c0,0.1,0,0.3-0.1,0.4l-2.7,4.1l2.7,4.1c0.2,0.3,0.1,0.8-0.2,1c-0.1,0.1-0.3,0.1-0.4,0.1H1.5v5.3C1.5,17.7,1.2,18,0.7,18L0.7,18L0.7,18z"
                            ></path>
                          </svg>
                          <svg
                            v-else
                            id="Layer_1"
                            class="flag-icon"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 12 16"
                            xml:space="preserve"
                          >
                            <path
                              id="Path_3486"
                              class="fill-color"
                              d="M0.6,16C0.3,16,0,15.7,0,15.3V0.6C0,0.3,0.3,0,0.7,0C1,0,1.3,0.3,1.3,0.6v0.7h10C11.7,1.3,12,1.6,12,2c0,0,0,0,0,0c0,0.1,0,0.2-0.1,0.4L9.5,6l2.4,3.6c0.2,0.3,0.1,0.7-0.2,0.9c-0.1,0.1-0.2,0.1-0.4,0.1h-10v4.7C1.3,15.7,1,16,0.6,16L0.6,16L0.6,16z M10.1,9.3l-2-3C8,6.1,8,5.8,8.1,5.6l2-3H1.3v6.7L10.1,9.3z"
                            ></path>
                          </svg>
                        </a>
                      </div>
                      <div class="tb-column flex10">
                        <label>{{ p.title ? p.title : '--' }}</label>
                      </div>
                      <div class="tb-column flex20">
                        <label class="table-a">{{ p.full_name }}</label>
                      </div>
                      <div class="tb-column flex20">
                        <label>{{ p.email }}</label>
                      </div>
                      <div class="tb-column flex10">
                        <label>{{
                          p.phone_number ? p.phone_number : '--'
                        }}</label>
                      </div>
                      <div class="tb-column text-center flex11">
                        <label
                          >{{
                            parseInt(p.user_or_not) === 0
                              ? 'Contact Record'
                              : 'Client User Account'
                          }}
                        </label>
                      </div>
                      <div class="tb-column flex14">
                        <div class="media">
                          <div class="media-left">
                            <a
                              v-if="
                                p.user_or_not != 0 &&
                                p.is_invitation_accepted != 0
                              "
                              v-tooltip="'Invitation Accepted'"
                            >
                              <svg
                                id="Layer_1"
                                class="invitation-accepted lime"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 18 18"
                                xml:space="preserve"
                              >
                                <g
                                  id="Group_4484"
                                  transform="translate(-872 -896)"
                                >
                                  <path
                                    id="Path_3407"
                                    class="fill-color"
                                    d="M878.2,911.2c-0.3,0-0.5-0.1-0.7-0.3l-5.3-5.3c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l4.9,4.9l10.3-10.4c0.2-0.2,0.4-0.3,0.6-0.2c0.2,0,0.4,0.1,0.5,0.2c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0L878.9,911C878.7,911.1,878.5,911.2,878.2,911.2z"
                                  ></path>
                                </g>
                              </svg>
                            </a>
                            <a
                              v-else-if="
                                p.user_or_not != 0 &&
                                p.is_invitation_accepted == 0
                              "
                              v-tooltip="'Resend Invitation'"
                              @click="
                                resendInvitation(
                                  p.user_id,
                                  p.workspace_id,
                                  index
                                )
                              "
                            >
                              <svg
                                id="Layer_1"
                                class="resend-invitation-icon"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 18 12.5"
                                xml:space="preserve"
                              >
                                <g
                                  id="Group_5364"
                                  transform="translate(-0.073 -0.018)"
                                >
                                  <g
                                    id="Group_5364-2"
                                    transform="translate(0.073 0.018)"
                                  >
                                    <g
                                      id="Group_4408"
                                      transform="translate(0 0)"
                                    >
                                      <path
                                        id="Path_3512"
                                        class="fill-color"
                                        d="M8,6.7c-0.3,0-0.6-0.1-0.9-0.3l-7-5.2l0.8-1.1l7,5.2l0.2,0.1V5.4l7-5.2l0.8,1.1l-7,5.2C8.6,6.7,8.3,6.7,8,6.7z"
                                      />
                                      <path
                                        id="Path_3513"
                                        class="fill-color"
                                        d="M14.7,0H1.4C0.7,0,0,0.6,0,1.4c0,0,0,0,0,0v9.2C0,11.4,0.6,12,1.4,12c0,0,0,0,0,0h9.8c-0.5-0.4-0.8-0.8-1.1-1.3H1.4c0,0-0.1,0-0.1-0.1c0,0,0,0,0,0V1.4c0-0.1,0-0.1,0.1-0.1h13.2c0.1,0,0.1,0,0.1,0.1v3.3c0.5,0.1,0.9,0.3,1.3,0.5V1.4C16.1,0.7,15.5,0,14.7,0C14.7,0,14.7,0,14.7,0z"
                                      />
                                    </g>
                                  </g>
                                  <path
                                    id="Path_3807"
                                    class="fill-color"
                                    d="M17.9,7.7h-0.5c-0.3-0.8-0.9-1.5-1.6-2c-0.5-0.2-1-0.3-1.5-0.4H14c-0.2,0-0.4,0-0.6,0.1c-0.5,0.1-1.1,0.3-1.5,0.6c-0.4,0.3-0.7,0.6-0.9,1c-0.5,0.8-0.6,1.7-0.4,2.5c0.1,0.5,0.3,0.9,0.5,1.3c0.6,0.9,1.7,1.5,2.8,1.6H14c0.4,0,0.7-0.1,1.1-0.2c0.6-0.2,1.2-0.6,1.6-1.1c0-0.1,0.1-0.1,0.1-0.2l0.2-0.2c0-0.1,0.1-0.1,0-0.2c0-0.1-0.1-0.1-0.1-0.2l-0.4-0.3h-0.1c-0.1,0-0.1,0-0.2,0.1l-0.1,0.1c-0.4,0.6-1.1,1-1.8,1.1H14c-1.4,0-2.5-1.1-2.5-2.5c0,0,0,0,0-0.1c-0.1-1.4,1-2.5,2.4-2.6c0.1,0,0.1,0,0.2,0h0.4c0.9,0.1,1.6,0.6,2,1.4H16c-0.1,0-0.1,0-0.2,0.1v0.3l1,1.1c0,0.1,0.1,0.1,0.2,0.1l0,0c0.1,0,0.1,0,0.2-0.1L18,8.1c0,0,0.1-0.1,0.1-0.2C18.1,7.8,18,7.7,17.9,7.7z"
                                  />
                                </g>
                              </svg>
                            </a>
                            <!-- <label
                              v-if="p.user_or_not != 0"
                              v-tooltip="
                                p.is_invitation_accepted != 0
                                  ? 'Invitation Accepted'
                                  : 'User Side Pending'
                              "
                              >{{
                                p.is_invitation_accepted != 0
                                  ? 'Invitation Accepted'
                                  : 'User Side Pending'
                              }}</label
                            >-->
                            <label v-else> -- </label>
                          </div>
                          <div
                            v-if="
                              p.user_or_not != 0 &&
                              p.is_invitation_accepted == 0
                            "
                            class="media-body"
                          >
                            <a
                              v-if="p.is_revoked == 0"
                              class="revokelink"
                              @click="
                                revokeContactPerson(
                                  p.user_id,
                                  p.workspace_id,
                                  index
                                )
                              "
                              >Revoke Access</a
                            >
                            <span v-if="p.is_revoked == 1" class="revokelink"
                              >Revoke Access</span
                            >
                          </div>
                        </div>
                      </div>
                      <div class="tb-column flex10">
                        <!--                        <ul
                          v-if="
                            p.user_or_not != 0 && p.is_invitation_accepted == 0
                          "
                          class="action"
                        >
                          -
                        </ul>-->

                        <ul class="action action-left">
                          <li
                            v-if="
                              (p.user_or_not == 0 ||
                                p.is_invitation_accepted != 0) &&
                              userType == 'Clients'
                            "
                            v-tooltip="'Edit Contact Person'"
                          >
                            <a @click="editContactPerson(index)"
                              ><svg
                                id="Layer_1"
                                class="edit-icon h-orange"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 18 18"
                                xml:space="preserve"
                              >
                                <g
                                  id="Group_4350"
                                  transform="translate(-397.961 -147.331)"
                                >
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
                            </a>
                          </li>
                          <li
                            v-if="
                              p.user_or_not != 0 &&
                              p.is_invitation_accepted != 0 &&
                              userType == 'Clients'
                            "
                            v-tooltip="'Change Password'"
                          >
                            <nuxt-link
                              :to="{
                                name: 'workspace_id-workspace-settings-client-client_id-reset-password',
                                params: {
                                  workspace_id: p.workspace_id,
                                  client_id: p.user_id,
                                },
                              }"
                            >
                              <svg
                                id="Layer_1"
                                class="change-password-icon h-orange"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 19.5 18"
                                xml:space="preserve"
                              >
                                <g
                                  id="Group_4352"
                                  transform="translate(-486.506 -147.705)"
                                >
                                  <path
                                    id="Path_3412"
                                    class="fill-color"
                                    d="M495.5,165.7c-0.1,0-0.3,0-0.4,0c-2.9-0.1-5.6-1.7-7.2-4.1c-0.6-1-1.1-2.1-1.3-3.2c-0.4-2.2,0-4.5,1.2-6.4c0.6-0.9,1.3-1.8,2.2-2.4c1.1-0.9,2.4-1.4,3.8-1.7c0.5-0.1,1.1-0.2,1.6-0.2c0.2,0,0.3,0,0.5,0c1.3,0.1,2.6,0.4,3.8,1.1c2.1,1.1,3.6,3,4.3,5.3l0,0.1h1.8l-2.4,4.3l-2.6-4.3l1.9-0.1l-0.1-0.3c-1.1-2.6-3.4-4.4-6.1-4.8c-0.4-0.1-0.8-0.1-1.2-0.1c-4.2,0-7.7,3.5-7.6,7.7c0,4.2,3.4,7.6,7.6,7.6c0.3,0,0.7,0,1-0.1c2.1-0.3,4.1-1.4,5.3-3.2l0.2-0.2l1.1,0.7l-0.4,0.5c-0.1,0.2-0.2,0.3-0.3,0.4c-1.1,1.3-2.5,2.2-4.1,2.7C497.4,165.6,496.5,165.7,495.5,165.7z"
                                  ></path>
                                  <path
                                    id="Path_3413"
                                    class="fill-color"
                                    d="M492.7,161.3c-0.5,0-0.9-0.3-0.9-0.8c0,0,0-0.1,0-0.1c0-1,0-1.9,0-2.9l0-1.2c0-0.4,0.3-0.8,0.7-0.8c0,0,0.1,0,0.1,0h0.3l-0.1-0.3c0-0.2-0.1-0.5,0-0.7c0.1-0.9,0.6-1.7,1.4-2.1c0.4-0.2,0.8-0.3,1.2-0.3c0.7,0,1.4,0.3,2,0.8c0.5,0.5,0.8,1.1,0.8,1.8l0,0.7l0.2,0c0.5,0,0.8,0.4,0.8,0.8c0,0,0,0,0,0c0,0.2,0,1.1,0,1.1l0,3c0,0.4-0.3,0.8-0.7,0.9c0,0-0.1,0-0.1,0l-2.7,0C494.7,161.3,493.7,161.3,492.7,161.3L492.7,161.3z M493.2,156.8v3.2l4.8-0.1l-0.1-3.2L493.2,156.8z M495.4,153.5c-0.7,0.1-1.2,0.6-1.2,1.4v0.7l0.2,0c0.6-0.1,2-0.1,2.4-0.1h0.2l-0.1-0.7c0-0.7-0.6-1.3-1.4-1.3C495.5,153.5,495.4,153.5,495.4,153.5z"
                                  ></path>
                                </g>
                              </svg>
                            </nuxt-link>
                          </li>
                          <li>
                            <a
                              v-if="userType == 'Inactive'"
                              v-tooltip="'Active Contact Person'"
                              @click="
                                activeInvitation(p.user_id, p.workspace_id)
                              "
                            >
                              <svg
                                id="Layer_1"
                                class="active-user-icon h-orange"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 17.5 17.5"
                                xml:space="preserve"
                              >
                                <g
                                  id="incomplete-tasks"
                                  transform="translate(422.202 87.935)"
                                >
                                  <circle
                                    id="Ellipse_98"
                                    class="fill-color"
                                    cx="-413.5"
                                    cy="-79.2"
                                    r="8"
                                  ></circle>
                                  <path
                                    id="Path_2644"
                                    class="fill-color"
                                    d="M-410-81.5l-4.6,4.6l-2.3-2.3"
                                  ></path>
                                </g>
                              </svg>
                            </a>
                            <a
                              v-else-if="
                                userType == 'Clients' && p.user_or_not != 0
                              "
                              data-toggle="modal"
                              data-target="#delete-client-contact-person"
                              @click="
                                confirmDeletePerson(p.id, index, 'Deactivate')
                              "
                              ><svg
                                id="Layer_1"
                                v-tooltip="'Deactivate Contact Person'"
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
                                  <g
                                    id="turn-off"
                                    transform="translate(-20.581)"
                                  >
                                    <g
                                      id="Group_39280"
                                      transform="translate(21.331)"
                                    >
                                      <g
                                        id="Group_39279"
                                        transform="translate(0)"
                                      >
                                        <path
                                          id="Path_40169"
                                          class="fill-color"
                                          d="M11.6,2.2c-0.4-0.2-0.8,0-1,0.4c-0.2,0.4,0,0.8,0.4,1c3.4,1.5,5,5.5,3.5,8.9c-1.5,3.4-5.5,5-8.9,3.5c-3.4-1.5-5-5.5-3.5-8.9C2.7,5.5,4,4.2,5.6,3.6C5.9,3.4,6.1,3,6,2.6S5.4,2,5,2.2c0,0,0,0,0,0C0.8,4-1.1,8.9,0.7,13s6.7,6.1,10.9,4.3c4.2-1.8,6.1-6.7,4.3-10.9C15,4.5,13.5,3,11.6,2.2L11.6,2.2z"
                                        ></path>
                                        <path
                                          id="Path_40170"
                                          class="fill-color"
                                          d="M8.2,8.2C8.7,8.2,9,7.9,9,7.5V0.8C9,0.3,8.7,0,8.2,0S7.5,0.3,7.5,0.8v6.8C7.5,7.9,7.8,8.2,8.2,8.2z"
                                        ></path>
                                      </g>
                                    </g>
                                  </g>
                                </g>
                              </svg>
                            </a>
                            <a
                              v-else-if="
                                userType == 'Clients' && p.user_or_not == 0
                              "
                              v-tooltip="'Delete Contact Person'"
                              data-toggle="modal"
                              data-target="#delete-client-contact-person"
                              @click="
                                confirmDeletePerson(p.id, index, 'Delete')
                              "
                              ><svg
                                id="Layer_1"
                                class="delete-icon h-orange"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 15.3 18"
                                xml:space="preserve"
                              >
                                <g
                                  id="Group_4351"
                                  transform="translate(-443.472 -147.331)"
                                >
                                  <path
                                    id="Path_3410"
                                    class="fill-color"
                                    d="M448.6,165.3c-1.2,0-2.3-0.9-2.4-2.1l-1.1-9.5c0-0.2,0-0.5,0.2-0.6c0.1-0.1,0.3-0.2,0.5-0.2h10.7c0.2,0,0.4,0.1,0.5,0.2c0.2,0.1,0.2,0.4,0.2,0.6l-0.9,9.5c-0.1,1.3-1.2,2.2-2.4,2.2L448.6,165.3z M447.7,163c0,0.4,0.4,0.7,0.8,0.7h5.3c0.5,0,0.8-0.3,0.9-0.8l0.8-8.6h-8.9L447.7,163z"
                                  ></path>
                                  <path
                                    id="Path_3411"
                                    class="fill-color"
                                    d="M457.9,151.7h-13.8c-0.4,0-0.7-0.4-0.7-0.9c0-0.4,0.4-0.7,0.8-0.7h4v-1.2c0-0.9,0.7-1.6,1.5-1.6h2.7c0.9,0,1.5,0.7,1.5,1.6c0,0,0,0,0,0v1.2h4.1c0.4,0,0.7,0.4,0.7,0.9C458.7,151.4,458.4,151.7,457.9,151.7L457.9,151.7z M452.4,150.1v-1.2l-2.7,0l0,1.2H452.4z"
                                  ></path>
                                </g>
                              </svg>
                            </a>
                            <a v-else>- </a>
                          </li>
                        </ul>
                      </div>
                      <div v-if="p.editMode" class="edit-user-form">
                        <div class="row no-gutters">
                          <div class="form-group flex15">
                            <input
                              v-model="$v.editMode.$each[index].title.$model"
                              type="text"
                              name="company-name"
                              class="form-control"
                              data-lpignore="true"
                            />
                          </div>
                          <div class="form-group flex20 required">
                            <input
                              v-model="
                                $v.editMode.$each[index].full_name.$model
                              "
                              type="text"
                              name="company-name"
                              class="form-control"
                              data-lpignore="true"
                            />
                            <div
                              v-if="
                                $v.editMode.$each[index].full_name.$error &&
                                !$v.editMode.$each[index].full_name.required
                              "
                              class="input-error"
                            >
                              Please provide name
                            </div>
                          </div>
                          <div class="form-group flex20 required">
                            <span class="input-control">{{
                              $v.editMode.$each[index].email.$model
                            }}</span>
                            <!--                            <input
                              v-else
                              v-model="$v.editMode.$each[index].email.$model"
                              type="email"
                              name="email"
                              class="form-control"
                              data-lpignore="true"
                            />-->
                            <div
                              v-if="
                                $v.editMode.$each[index].email.$error &&
                                !$v.editMode.$each[index].email.required
                              "
                              class="input-error"
                            >
                              Email Address is required
                            </div>
                            <div
                              v-if="
                                $v.editMode.$each[index].email.$error &&
                                !$v.editMode.$each[index].email.email
                              "
                              class="input-error"
                            >
                              Please enter valid email
                            </div>
                          </div>
                          <div class="form-group flex14 required">
                            <input
                              v-model="
                                $v.editMode.$each[index].phone_number.$model
                              "
                              type="text"
                              name="contact"
                              class="form-control"
                              data-lpignore="true"
                            />
                            <!--                            <div
                              v-if="
                                $v.editMode.$each[index].phone_number.$error &&
                                !$v.editMode.$each[index].phone_number.required
                              "
                              class="input-error"
                            >
                              Please provide phone
                            </div>
                            <div
                              v-if="
                                $v.editMode.$each[index].phone_number.$error &&
                                !$v.editMode.$each[index].phone_number.maxLength
                              "
                              class="input-error"
                            >
                              Phone number should not be more than 20 characters
                            </div>-->
                          </div>
                          <div class="form-group text-center flex11">
                            <label
                              v-if="!parseInt(p.user_or_not)"
                              class="check-label"
                            >
                              <input
                                v-model="
                                  $v.editMode.$each[index].user_or_not.$model
                                "
                                type="checkbox"
                                :true-value="1"
                                :false-value="0"
                                data-lpignore="true"
                              />
                              <span class="check-span"></span>
                            </label>
                          </div>
                          <div class="form-group flex20">
                            <button
                              :disabled="updating"
                              :class="{
                                btn: true,
                                'btn-disable': updating,
                              }"
                              @click="updatePerson(index)"
                            >
                              <i
                                v-if="updating"
                                class="fa fa-circle-o-notch fa-spin"
                              ></i>
                              Update
                            </button>
                            <a
                              href="javascript:void(0);"
                              class="add-user-form-close"
                              @click="cancelEdit(index)"
                            >
                              <svg
                                id="Layer_1"
                                class="close-icon h-red"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 18 18"
                                xml:space="preserve"
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
                            </a>
                          </div>
                        </div>
                      </div>
                    </li>
                    <div
                      v-if="!fetching && !people.length"
                      class="no-data-found"
                    >
                      <div class="inner w-100">
                        <svg
                          id="Layer_1"
                          class="no-record-icon darkgray"
                          style="height: 150px"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 131.3 156.8"
                          xml:space="preserve"
                        >
                          <g
                            id="Group_4457"
                            transform="translate(-190.348 -177.624)"
                          >
                            <path
                              id="Path_3564"
                              class="fill-color"
                              d="M285.2,214.4c-1.5,0-2.6,1.2-2.6,2.6c0,1.5,1.2,2.6,2.6,2.6h4.4v4.4c0,1.5,1.2,2.6,2.6,2.6s2.6-1.2,2.6-2.6l0,0l0,0v-4.4h4.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0h-4.4V210c0-1.5-1.2-2.6-2.6-2.6s-2.6,1.2-2.6,2.6v4.4H285.2z"
                            />
                            <path
                              id="Path_3565"
                              class="fill-color"
                              d="M321.6,199.8c0.3-1.5-9.1-9.6-15.5-16.4c-3.9-3.7-7.4-9-9.5-3.1v15.5c0,3.8,3.1,6.8,6.8,6.8h12.8v95.1c0,0.9-0.7,1.6-1.6,1.6H227c-0.9,0-1.6-0.7-1.6-1.6V184.5c0-0.9,0.7-1.6,1.6-1.6h59.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0H227c-3.8,0-6.8,3.1-6.8,6.8v8.1h-8.1c-3.8,0-6.8,3.1-6.8,6.8v8.1h-8.1c-3.8,0-6.8,3.1-6.8,6.8v113.2c0,3.8,3.1,6.8,6.8,6.8H285c3.8,0,6.8-3.1,6.8-6.8v-8.1h8.1c3.8,0,6.8-3.1,6.8-6.8v-8.1h8.1c3.8,0,6.8-3.1,6.8-6.8V200C321.7,199.9,321.7,199.9,321.6,199.8L321.6,199.8z M301.5,312.6c0,0.9-0.7,1.6-1.6,1.6h-65.2c-1.5,0-2.6,1.2-2.6,2.6s1.2,2.6,2.6,2.6h51.8v8.1c0,0.9-0.7,1.6-1.6,1.6h-87.8c-0.9,0-1.6-0.7-1.6-1.6V214.3c0-0.9,0.7-1.6,1.6-1.6h8.1v99.9c0,3.8,3.1,6.8,6.8,6.8h10.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0h-10.4c-0.9,0-1.6-0.7-1.6-1.6V199.4c0-0.9,0.7-1.6,1.6-1.6h8.1v99.9c0,3.8,3.1,6.8,6.8,6.8h74.4L301.5,312.6L301.5,312.6z M303.5,197.3c-0.9,0-1.6-0.7-1.6-1.6v-9.1l10.7,10.7L303.5,197.3z"
                            />
                          </g>
                        </svg>

                        <p v-if="client.contact_persons_count == 0">
                          You haven't added any contact persons yet!
                        </p>
                        <p v-if="client.contact_persons_count > 0">
                          No Data Found
                        </p>
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--  Delete ContactPerson Modal  -->
    <div id="delete-client-contact-person" class="modal fade">
      <div
        class="modal-dialog modal-small modal-dialog-scrollable modal-dialog-centered"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="exampleModalLongTitle" class="modal-title">
              {{
                deletePersonType == 'Deactivate'
                  ? 'Deactivate Contact Person'
                  : 'Delete Contact Person'
              }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">
                <svg
                  id="Layer_1"
                  class="close-icon h-red"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 18 18"
                  xml:space="preserve"
                >
                  <g id="Group_4358" transform="translate(-69.745 -317.549)">
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
            </button>
          </div>
          <div class="modal-body text-center">
            <p>
              {{
                deletePersonType == 'Deactivate'
                  ? 'Are you sure you want to deactivate this Contact Person?'
                  : 'Are you sure you want to delete this Contact Person?'
              }}
            </p>
            <div class="btn-group">
              <a
                href="javascript:void(0);"
                class="btn btn-gray"
                data-dismiss="modal"
                >No</a
              >
              <a
                href="javascript:void(0);"
                class="btn"
                @click="
                  deleteContactPeople(
                    deletePersonId,
                    deletePersonIndex,
                    deletePersonType
                  )
                "
                >Yes</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import ProjectNotificationAlert from '~/components/theme/settings/ProjectNotificationAlert'
import Select2 from '~/components/plugins/Select2'
export default {
  components: { ProjectNotificationAlert, Select2 },
  layout: 'generalSettingsLayout',
  middleware: ['authCheck'],
  data() {
    return {
      saving: false,
      updating: false,
      fetching: false,
      addPeople: [],
      people: [],
      editMode: [],
      workspace_id: this.$route.params.workspace_id
        ? this.$route.params.workspace_id
        : this.$_auth().id,
      internal_workspace_id: this.$route.params.workspace_id
        ? this.$route.params.workspace_id
        : this.$_auth().id,
      client_id: this.$route.params.client_id
        ? this.$route.params.client_id
        : null,
      client: '',
      deletePersonIndex: null,
      deletePersonId: null,
      deletePersonType: null,
      sort_value: '',
      sort_by: '',
      isSortComplete: false,
      selectedUserType: '1',
      userType: 'Clients',
      userListType: [
        { id: 1, text: 'Active Clients', name: 'Clients' },
        { id: 2, text: 'Pending Approval', name: 'Pending approval' },
        { id: 3, text: 'Deactivated Clients', name: 'Inactive' },
      ],
    }
  },

  mounted() {
    this.getContactPersonList()
  },

  methods: {
    async addToFavourite(index) {
      try {
        this.people.forEach((el) => (el.show_in_list = 0))
        this.people[index].show_in_list = 1

        const reQData = {
          data: this.people,
          client_id: this.client_id,
          workspace_id: this.internal_workspace_id,
        }
        await this.$axios.$post('client/add_update_invite-people', reQData)
        this.getContactPersonList()
      } catch (e) {
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
    confirmDeletePerson(personId, index, type) {
      this.deletePersonId = personId
      this.deletePersonIndex = index
      this.deletePersonType = type
    },
    deleteContactPeople(personId, index, type) {
      if (!this.people[index].id) {
        this.people.splice(index, 1)
        return
      }
      this.$axios
        .$post('client/delete-person', {
          workspace_id: this.internal_workspace_id,
          client_id: this.client_id,
          person_id: personId,
        })
        .then(() => {
          window.$('.close').trigger('click')
          this.people.splice(index, 1)
          this.editMode = this.people
          if (type === 'Deactivate') {
            this.$toast.global.success('User deactivated successfully!')
          } else {
            this.$toast.global.success('User deleted successfully!')
          }
        })
        .catch((e) => {
          this.$toast.error(this.$getErrorMessage(e))
        })
    },
    async updatePerson(index) {
      this.$v.editMode.$touch()
      if (this.$v.editMode.$each[index].$invalid) {
        return false
      }
      try {
        this.updating = true
        const { message } = await this.$axios.$post(
          `client/update-contact-person`,
          {
            workspace_id: this.internal_workspace_id,
            client_id: this.client_id,
            person_id: this.$v.editMode.$each[index].id.$model,
            title: this.$v.editMode.$each[index].title.$model,
            full_name: this.$v.editMode.$each[index].full_name.$model,
            email: this.$v.editMode.$each[index].email.$model,
            phone_number: this.$v.editMode.$each[index].phone_number.$model,
            user_or_not: this.$v.editMode.$each[index].user_or_not.$model,
            show_in_list: this.$v.editMode.$each[index].show_in_list.$model,
          }
        )
        this.getContactPersonList()
        this.$toast.global.success(message)
        this.closeAllEdit()
        this.updating = false
      } catch (e) {
        this.$toast.error(this.$getErrorMessage(e))
        this.updating = false
      }
    },
    editContactPerson(index) {
      this.closeAllEdit()
      this.people[index].editMode = true
    },
    cancelEdit(index) {
      this.people[index].editMode = false
      this.editMode = this.people
    },
    closeAllEdit() {
      this.people = this.people.map((data) => ({
        ...data,
        editMode: false,
      }))
    },
    async getContactPersonList() {
      try {
        this.fetching = true
        const { data } = await this.$axios.$post(
          `client/view?&type=${this.userType}&sort_value=${this.sort_value}&sort_by=${this.sort_by}`,
          {
            workspace_id: this.internal_workspace_id,
            client_id: this.client_id,
          }
        )
        this.fetching = false
        this.client = data
        this.$nextTick(() => {
          this.isSortComplete = false
        })
        if (data.contactPerson.length) {
          this.people = data.contactPerson.map((data) => ({
            ...data,
            editMode: false,
          }))
          this.editMode = this.people
        } else {
          this.people = []
        }
      } catch (e) {
        this.fetching = false
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
    sortByColumn(column) {
      if (this.isSortComplete) return

      this.isSortComplete = true
      this.sort_value = column
      this.sort_by = this.sort_by.toString() === 'ASC' ? 'DESC' : 'ASC'
      this.people = []
      this.getContactPersonList()
    },
    sortingClass(sortValue) {
      return {
        active: this.sort_value === sortValue && this.sort_by === 'DESC',
      }
    },
    addNewPeople() {
      this.addPeople.push({
        id: 0,
        title: null,
        full_name: null,
        email: null,
        phone_number: null,
        user_or_not: 0,
        show_in_list: 0,
        user_id: null,
      })
    },
    deleteNewPeople(p, index) {
      if (!this.addPeople[index].id) {
        this.addPeople.splice(index, 1)
      }
    },
    isEmpty: (p) => p.email != null && p.full_name != null,
    async savePeople() {
      this.$v.addPeople.$touch()
      if (this.$v.addPeople.$invalid) {
        return false
      }
      try {
        if (this.addPeople.some(this.isEmpty)) {
          this.saving = true
          const reQData = {
            data: this.addPeople,
            client_id: this.client_id,
            workspace_id: this.internal_workspace_id,
          }
          const { message } = await this.$axios.$post(
            'client/add_update_invite-people',
            reQData
          )
          this.addPeople = []
          this.people = []
          this.getContactPersonList()
          this.$toast.global.success(message)

          this.saving = false
        } else {
          this.$toast.error('Please invite at least one name & valid email')
        }
      } catch (e) {
        this.$toast.error(this.$getErrorMessage(e))
        this.saving = false
      }
    },
    resendInvitation(userId, workspaceId, index) {
      this.$axios
        .$post('resend-invitations', {
          workspace_id: workspaceId,
          uesr_id: userId,
        })
        .then((data) => {
          this.people[index].is_revoked = data.data.is_revoked

          this.$toast.global.success(data.message)
        })
        .catch((e) => this.$toast.error(this.$getErrorMessage(e)))
    },
    revokeContactPerson(userId, workspaceId, index) {
      this.$axios
        .$post('client/revoke-contact-person', {
          workspace_id: workspaceId,
          user_id: userId,
          client_id: this.client_id,
        })
        .then((data) => {
          this.people[index].is_revoked = data.data.contactPerson.is_revoked
          this.$toast.global.success(data.message)
        })
        .catch((e) => this.$toast.error(this.$getErrorMessage(e)))
    },
    changeUserTypeFilter(data) {
      this.userType = data.name
      this.getContactPersonList()
    },
    activeInvitation(userId, workspaceId) {
      this.$axios
        .$post('user/workspace-active-user', {
          workspace_id: workspaceId,
          user_id: userId,
        })
        .then((data) => {
          this.$toast.global.success(data.message)
          this.people = this.people.filter(
            ({ user_id }) => parseInt(user_id) !== parseInt(userId)
          )
        })
        .catch((e) => this.$toast.error(this.$getErrorMessage(e)))
    },
  },
  validations: {
    addPeople: {
      $each: {
        id: {},
        title: {},
        email: {
          required,
          email,
          async isUniqueEmail(val) {
            if (val) {
              const response = await this.$axios.$post(
                'client/check-exist-user',
                {
                  email: val,
                }
              )
              return !response.status
            }
            return true
          },
        },
        full_name: { required },
        phone_number: {},
        user_or_not: {},
        show_in_list: {},
        user_id: {},
      },
    },
    editMode: {
      $each: {
        id: {},
        title: {},
        email: { required, email },
        full_name: { required },
        phone_number: {},
        user_or_not: {},
        show_in_list: {},
        user_id: {},
        editMode: {},
      },
    },
  },
}
</script>
