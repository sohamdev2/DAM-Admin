<template>
  <div
    :class="{
      'general-settings-right h-100': true,
      'search-filter': (search_name || '').trim().length,
    }"
  >
    <div class="general-settings-title">
      <h4>User Groups</h4>
      <div class="right-side">
        <div class="search-pr">
          <form
            class="navbar-form search-navbar-form"
            role="search"
            @submit.prevent
          >
            <div class="input-group">
              <button class="btn-search hidden-xs" type="submit">
                <svg
                  id="Layer_1"
                  class="search-icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 18 18"
                  xml:space="preserve"
                >
                  <path
                    id="Icon_ionic-ios-search"
                    class="fill-color"
                    d="M17.8,16.7l-5-5.1c2.5-3.1,1.9-7.6-1.1-10.1C8.5-0.9,4-0.4,1.6,2.7c-2.5,3.1-1.9,7.6,1.1,10.1c2.6,2.1,6.4,2.1,9,0l5,5c0.3,0.3,0.8,0.3,1.1,0.1C18.1,17.5,18.1,17,17.8,16.7C17.8,16.7,17.8,16.7,17.8,16.7L17.8,16.7z M7.1,12.8c-3.1,0-5.7-2.5-5.7-5.7S4,1.5,7.1,1.5c3.1,0,5.7,2.5,5.7,5.7c0,1.5-0.6,2.9-1.7,4C10.1,12.2,8.6,12.8,7.1,12.8L7.1,12.8z"
                  ></path>
                </svg>
              </button>
              <input
                id="srch-term"
                v-model="search_name"
                class="form-control"
                placeholder="Search..."
                name="srch-term"
                type="text"
                data-lpignore="true"
              />
            </div>
          </form>
        </div>

        <nuxt-link
          class="btn btn-icon"
          :to="{
            name: 'workspace_id-workspace-settings-users-group-add',
            params: { workspace_id: internal_workspace_id },
          }"
        >
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
          Add Group
        </nuxt-link>
      </div>
    </div>
    <div v-if="(search_name || '').trim().length" class="search-result mb1 p20">
      <div class="alert alert-info alert-dismissible">
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          @click="clearSearch"
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
        </button>
        Showing results for <strong>"{{ search_name.trim() }}"</strong>
      </div>
    </div>
    <div class="workspace-settings">
      <div class="common-box bg-gray h-100">
        <div class="table-list-view userGroupList table-list-scrolling">
          <ul v-if="searchResult.length" class="thead">
            <li>
              <div
                :class="[
                  'sorting flex40',
                  searchResult.length && !isSortComplete ? 'sortarrow' : '',
                  sortingClass('group_name'),
                ]"
              >
                <span
                  @click="
                    searchResult.length &&
                      !isSortComplete &&
                      sortByColumn('group_name')
                  "
                  >Group Name</span
                >
              </div>
              <div class="sorting flex45">
                <span>Group Users</span>
              </div>
              <div class="sorting flex15">
                <span>Actions</span>
              </div>
            </li>
          </ul>
          <div class="customscrollbar no_footer">
            <ul class="tbody">
              <li
                v-for="(groupUser, index) in searchResult"
                :key="groupUser.id"
                :style="`--animation-order: ${index + 1}`"
              >
                <div class="tb-column flex40">
                  <div class="media">
                    <div class="media-left">
                      <div
                        v-if="groupUser.display_group_icon"
                        class="profile-bg"
                        :style="{
                          backgroundImage: `url(${groupUser.display_group_icon})`,
                        }"
                      ></div>
                      <div
                        v-else
                        :class="[
                          'profile-char',
                          'fl-as-imgtxt',
                          groupUser.group_name[0].toLowerCase(),
                        ]"
                      >
                        {{ groupUser.group_name[0].toUpperCase() }}
                      </div>
                    </div>
                    <div class="media-body">
                      <nuxt-link
                        class="table-a"
                        :to="{
                          name: 'workspace_id-workspace-settings-users-group-usergroupid-edit',
                          params: {
                            workspace_id: groupUser.workspaces.workspace_id,
                            usergroupid: groupUser.id,
                          },
                        }"
                      >
                        {{ groupUser.group_name }}</nuxt-link
                      >
                    </div>
                  </div>
                </div>
                <div class="tb-column flex45">
                  <ul class="groupTeam">
                    <li
                      v-for="user in groupUsersSearchResult(
                        groupUser.groups
                      )[0]"
                      :key="user.id"
                    >
                      <span v-tooltip="user.name">
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
                            user.name[0].toLowerCase(),
                          ]"
                        >
                          {{ user.name[0].toUpperCase() }}
                        </div>
                      </span>
                    </li>
                    <li v-if="groupUser.groups.length > 6">
                      <div class="dropdown">
                        <a
                          href="javascript:void(0);"
                          class="dropdown-toggle"
                          data-toggle="dropdown"
                          >+{{
                            groupUsersSearchResult(groupUser.groups)[1].length
                          }}
                        </a>
                        <ul class="dropdown-menu">
                          <li
                            v-for="user in groupUsersSearchResult(
                              groupUser.groups
                            )[1]"
                            :key="user.id"
                          >
                            <a href="javascript:void(0);" class="dropdown-item">
                              <div class="media">
                                <div class="media-left">
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
                                      user.name[0].toLowerCase(),
                                    ]"
                                  >
                                    {{ user.name[0].toUpperCase() }}
                                  </div>
                                </div>
                                <div class="media-body">
                                  <span>{{ user.name }}</span>
                                </div>
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="tb-column flex15">
                  <ul class="action">
                    <li>
                      <nuxt-link
                        :to="{
                          name: 'workspace_id-workspace-settings-users-group-usergroupid-edit',
                          params: {
                            workspace_id: groupUser.workspaces.workspace_id,
                            usergroupid: groupUser.id,
                          },
                        }"
                      >
                        <svg
                          id="Layer_1"
                          v-tooltip="'Edit Group'"
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
                      </nuxt-link>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0);"
                        data-toggle="modal"
                        data-target="#delete-group"
                        @click="
                          showDeleteGroupUserDialog(
                            groupUser.id,
                            groupUser.group_name,
                            groupUser.workspaces.workspace_id
                          )
                        "
                      >
                        <svg
                          id="Layer_1"
                          v-tooltip="'Delete Group'"
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
                    </li>
                  </ul>
                </div>
              </li>
              <div
                v-if="completelyLoaded && !searchResult.length"
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
                    <g id="Group_4457" transform="translate(-190.348 -177.624)">
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

                  <p>No Data Found</p>
                </div>
              </div>

              <client-only>
                <infinite-loading
                  :identifier="infiniteId"
                  @infinite="infiniteHandler"
                >
                  <div slot="spinner">
                    <ContentLoader
                      v-if="page == 1"
                      :speed="1"
                      :animate="true"
                      :width="400"
                      :height="100"
                    >
                      <rect
                        x="0"
                        y="-1"
                        rx="0"
                        ry="0"
                        width="400"
                        height="13"
                      />
                      <rect
                        x="0"
                        y="15"
                        rx="0"
                        ry="0"
                        width="400"
                        height="13"
                      />
                      <rect
                        x="0"
                        y="31"
                        rx="0"
                        ry="0"
                        width="400"
                        height="13"
                      />
                      <rect
                        x="0"
                        y="47"
                        rx="0"
                        ry="0"
                        width="400"
                        height="13"
                      />
                    </ContentLoader>
                    <div v-else class="no-data-found pb2 pt2">
                      <div class="inner w-100">
                        <p>Loading...</p>
                      </div>
                    </div>
                  </div>
                  <div slot="no-more" style="margin-top: 20px">
                    <div
                      v-if="groupUsersList.length"
                      class="no-data-found pb2 pt2"
                    >
                      <div class="inner w-100">
                        <p>
                          This is the end of the list, but just the beginning of
                          what’s to come!
                        </p>
                      </div>
                    </div>
                  </div>
                  <div v-if="!groupUsersList.length" slot="no-results">
                    <div class="no-data-found">
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

                        <p v-if="!show_add_group_btn">No Data Found</p>

                        <p v-if="show_add_group_btn">
                          You haven't added any Users Group, yet!
                        </p>
                        <nuxt-link
                          v-if="show_add_group_btn"
                          class="btn btn-icon"
                          :to="{
                            name: 'workspace_id-workspace-settings-users-group-add',
                            params: { workspace_id: internal_workspace_id },
                          }"
                        >
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
                            <g
                              id="Group_4454"
                              transform="translate(-1005 -577.999)"
                            >
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

                          Add Group
                        </nuxt-link>
                      </div>
                    </div>
                  </div>
                </infinite-loading>
              </client-only>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!--  Delete Group Modal  -->
    <div id="delete-group" class="modal fade">
      <div
        class="modal-dialog modal-small modal-dialog-scrollable modal-dialog-centered"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Delete Group</h5>
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
              Are you sure you want to delete <b>{{ getDeleteGroupName }}</b> as
              a group?
            </p>

            <p>
              This action will remove only group name where it is associated in
              Projects/Tasks. It won't remove any users which are added under
              this group.
            </p>
            <div class="btn-group">
              <a
                href="javascript:void(0);"
                class="btn btn-gray"
                data-dismiss="modal"
                >No</a
              >
              <a
                data-dismiss="modal"
                class="btn"
                @click="deleteGroupUser(getDeleteGroupUserId)"
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
import { ContentLoader } from 'vue-content-loader'
import scrolling from '~/mixins/scrolling'
export default {
  components: {
    ContentLoader,
  },
  mixins: [scrolling],
  layout: 'generalSettingsLayout',
  middleware: [
    'authCheck',
    'can-access-project-settings',
    'block-access-dealerAdmin',
  ],
  data() {
    return {
      workspace_id: this.$_auth().id,
      internal_workspace_id: this.$route.params.workspace_id
        ? this.$route.params.workspace_id
        : this.$_auth().id,
      api_internal_workspace_id: this.$route.params.workspace_id
        ? this.$route.params.workspace_id
        : this.$_auth().id,
      loading: false,
      groupUsersList: [],
      page: 1,
      lastPage: null,
      getDeleteGroupUserId: null,
      getDeleteGroupName: null,
      getWorkspaceId: null,
      search_name: '',
      sort_value: '',
      sort_by: '',
      infiniteId: +new Date(),
      isSortComplete: false,
      show_results_text: false,
      show_add_group_btn: true,
      completelyLoaded: false,
      selectedRoleType: 0,
    }
  },
  computed: {
    searchResult() {
      return this.groupUsersList
    },
  },
  watch: {
    search_name() {
      if (this.searchTimer) clearTimeout(this.searchTimer)

      this.searchTimer = setTimeout(() => {
        this.resetGroupUserList()
      }, 600)
    },
  },
  methods: {
    groupUsersSearchResult(users) {
      const usersList = []
      for (let i = 0; i < users.length; i += 6) {
        usersList.push(users.slice(i, i + 6))
      }
      return usersList
    },
    infiniteHandler($state) {
      if (this.completelyLoaded || this.isSortComplete) {
        $state.complete()
        return
      }
      this.$axios
        .$post(
          `/user/group/list?page=${this.page}&sort_value=${this.sort_value}&sort_by=${this.sort_by}&search_value=${this.search_name}`,
          {
            workspace_id: this.api_internal_workspace_id,
          }
        )
        .then(({ data }) => {
          this.lastPage = data.last_page
          this.show_add_group_btn = data.show_add_group_btn

          if (data.data && data.data.length) {
            if (parseInt(this.page) === parseInt(data.current_page)) {
              this.groupUsersList.push(...data.data)
              setTimeout(() => {
                this.tableListScrolling()
              }, 50)
              $state.loaded()

              if (parseInt(this.lastPage) === parseInt(this.page)) {
                this.completelyLoaded = true
                $state.complete()
              } else {
                this.page += 1
              }
            } else {
              $state.complete()
            }
          } else {
            $state.complete()
          }
        })
        .catch((e) => {
          $state.error()
        })
        .finally(() => this.$nextTick(() => (this.isSortComplete = false)))
    },
    showDeleteGroupUserDialog(userId, groupName, workspaceId) {
      this.getDeleteGroupUserId = userId
      this.getDeleteGroupName = groupName
      this.getWorkspaceId = workspaceId
    },
    async deleteGroupUser(userId) {
      try {
        const { message } = await this.$axios.$post('/user/group/delete', {
          group_id: userId,
          workspace_id: this.getWorkspaceId,
        })

        this.groupUsersList = this.groupUsersList.filter(
          ({ id }) => parseInt(id) !== parseInt(userId)
        )
        this.$toast.global.success(message)
      } catch (e) {
        this.$toast.error(this.$getErrorMessage(e))
      } finally {
        this.loading = false
      }
    },
    resetGroupUserList() {
      this.groupUsersList = []
      this.page = 1
      this.infiniteId += 1
      this.completelyLoaded = false
      this.isSortComplete = false
    },
    clearSearch() {
      this.search_name = ''
    },
    sortByColumn(column) {
      this.sort_value = column
      this.sort_by = this.sort_by === 'ASC' ? 'DESC' : 'ASC'
      this.resetGroupUserList()
    },
    sortingClass(sortValue) {
      return {
        active: this.sort_value === sortValue && this.sort_by === 'DESC',
      }
    },
  },
}
</script>

<style scoped></style>
