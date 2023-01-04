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

        <div class="right-side">
          <Select2
            v-model="selectedClientType"
            :options="clientListType"
            custom-event
            :attrs="{ minimumResultsForSearch: -1 }"
            @changeSelect2="changeClientTypeFilter(...arguments)"
          />
          <nuxt-link
            class="btn btn-icon"
            :to="{
              name: 'workspace_id-workspace-settings-client-client_id-sub-clients-add',
              params: {
                workspace_id: internal_workspace_id,
                client_id: client_id,
              },
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
            Add Sub Client
          </nuxt-link>
        </div>
      </div>
      <div class="workspace-settings">
        <div class="common-box bg-gray h-100">
          <div class="table-list-view small-height table-list-scrolling">
            <ul v-if="searchResult.length" class="thead">
              <li>
                <div
                  :class="[
                    'flex45 sorting',
                    searchResult.length ? 'sortarrow' : '',
                    sortingClass('company_name'),
                  ]"
                >
                  <span
                    @click="
                      searchResult.length &&
                        !isSortComplete &&
                        sortByColumn('company_name')
                    "
                    >Sub Client Name</span
                  >
                </div>
                <div class="sorting flex20">
                  <span>Email</span>
                </div>
                <div class="sorting flex10">
                  <span>Phone Number</span>
                </div>
                <div
                  :class="[
                    'sorting flex15 text-center',
                    searchResult.length ? 'sortarrow' : '',
                    sortingClass('total_active_project'),
                  ]"
                >
                  <span
                    @click="
                      searchResult.length &&
                        !isSortComplete &&
                        sortByColumn('total_active_project')
                    "
                    >Associated Projects</span
                  >
                </div>
                <div class="sorting flex10">
                  <span>Actions</span>
                </div>
              </li>
            </ul>
            <div class="customscrollbar no_footer">
              <ul class="tbody list-animation">
                <li
                  v-for="(client, index) in searchResult"
                  :key="client.id"
                  :style="`--animation-order: ${index + 1}`"
                >
                  <div class="tb-column flex45">
                    <div class="media">
                      <div class="media-left">
                        <div
                          v-if="client.display_company_logo != null"
                          class="profile-bg"
                          :style="{
                            'background-image': getClientImage(client),
                          }"
                        ></div>
                        <div
                          v-else
                          class="profile-icon"
                          :style="{
                            'background-image': getClientImage(client),
                          }"
                        ></div>
                      </div>
                      <div class="media-body">
                        <template v-if="parseInt(clientTypeId) === 1">
                          <nuxt-link
                            class="table-a"
                            :to="{
                              name: 'workspace_id-workspace-settings-client-client_id-sub-clients-company_client_id-edit',
                              params: {
                                workspace_id: client.workspace_id,
                                client_id: client_id,
                                company_client_id: client.id,
                              },
                            }"
                            >{{ client.company_name }}</nuxt-link
                          >
                        </template>
                        <template v-if="parseInt(clientTypeId) === 0">
                          <a>{{ client.company_name }}</a>
                        </template>
                      </div>
                    </div>
                  </div>
                  <div class="tb-column flex20">
                    <a :href="`mailto:${client.company_email}`" class="sc">
                      {{ client.company_email }}
                    </a>
                    <!--                    <label>matthew.mitchell@example.com</label>-->
                  </div>
                  <div class="tb-column flex10">
                    <a :href="`tel:${client.phone_number}`" class="sc">
                      {{ client.phone_number }}
                    </a>
                    <!--                    <label>(956)-648-8106</label>-->
                  </div>
                  <div class="tb-column flex15 text-center">
                    <label>{{ client.total_active_project }}</label>
                  </div>
                  <div class="tb-column flex10">
                    <ul v-if="parseInt(clientTypeId) === 1" class="action">
                      <li v-tooltip="'Edit Sub Client'">
                        <nuxt-link
                          :to="{
                            name: 'workspace_id-workspace-settings-client-client_id-sub-clients-company_client_id-edit',
                            params: {
                              workspace_id: client.workspace_id,
                              client_id: client_id,
                              company_client_id: client.id,
                            },
                          }"
                        >
                          <svg
                            id="Layer_1"
                            v-tooltip="'Edit Sub Client'"
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
                      <li v-tooltip="'Deactivate Sub Client'">
                        <a
                          href="javascript:void(0);"
                          data-toggle="modal"
                          data-target="#delete-client"
                          @click="
                            showDeleteClientDialog(
                              client.id,
                              client.workspace_id,
                              true
                            )
                          "
                        >
                          <svg
                            id="Layer_1"
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
                                <g
                                  id="Group_39280"
                                  transform="translate(21.331)"
                                >
                                  <g id="Group_39279" transform="translate(0)">
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
                      </li>
                    </ul>
                    <ul v-if="parseInt(clientTypeId) === 0" class="action">
                      <li v-tooltip="'Active Sub Client'">
                        <a
                          href="javascript:void(0);"
                          data-toggle="modal"
                          data-target="#delete-client"
                          @click="
                            showDeleteClientDialog(
                              client.id,
                              client.workspace_id,
                              false
                            )
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

                    <p>No data found</p>
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
                        v-if="searchResult.length"
                        class="no-data-found pb2 pt2"
                      >
                        <div class="inner w-100">
                          <p>
                            This is the end of the list, but just the beginning
                            of what’s to come!
                          </p>
                        </div>
                      </div>
                    </div>
                    <div slot="no-results">
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

                          <p v-if="!show_add_client_btn">No Data Found</p>
                          <p v-if="show_add_client_btn">
                            You haven't added any Clients yet!
                          </p>

                          <nuxt-link
                            v-if="show_add_client_btn"
                            class="btn btn-icon"
                            :to="{
                              name: 'workspace_id-workspace-settings-client-client_id-sub-clients-add',
                              params: {
                                workspace_id: internal_workspace_id,
                                client_id: client_id,
                              },
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
                            Add Sub Client
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
    </div>
    <!--  Delete Client Modal  -->
    <div id="delete-client" class="modal fade">
      <div
        class="modal-dialog modal-small modal-dialog-scrollable modal-dialog-centered"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="exampleModalLongTitle" class="modal-title">
              <template v-if="deleteStatus">Deactivate Sub Client</template>
              <template v-if="!deleteStatus">Active Sub Client</template>
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
            <p v-if="deleteStatus">
              Are you sure you want to deactivate the sub client? Deactivate sub
              client will also remove its associated projects.
            </p>
            <p v-if="!deleteStatus">
              Are you sure you want to active the sub client?
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
                  deleteClient(getDeteleClientId, deleteClientWorkspaceId)
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
import { ContentLoader } from 'vue-content-loader'
import BuildingImage from 'assets/img/icon/building-black.svg'
import Select2 from '@/components/plugins/Select2'
export default {
  components: {
    ContentLoader,
    Select2,
  },
  layout: 'generalSettingsLayout',
  middleware: ['authCheck'],
  data() {
    return {
      buildingImage: BuildingImage,
      loading: false,
      workspace_id: this.$route.params.workspace_id
        ? this.$route.params.workspace_id
        : this.$_auth().id,
      internal_workspace_id: this.$route.params.workspace_id
        ? this.$route.params.workspace_id
        : this.$_auth().id,
      api_internal_workspace_id: this.$route.params.workspace_id
        ? this.$route.params.workspace_id
        : this.$_auth().id,
      client_id: this.$route.params.client_id
        ? this.$route.params.client_id
        : null,
      clients: [],
      page: 1,
      lastPage: null,
      infiniteId: +new Date(),
      getDeteleClientId: null,
      deleteClientWorkspaceId: null,
      search_term: '',
      sort_value: '',
      sort_by: 'ASC',
      isSortComplete: false,
      show_add_client_btn: true,
      deleteStatus: true,
      completelyLoaded: false,
      downloadingClient: false,
      selectedClientType: '1',
      clientTypeId: '1',
      clientListType: [
        { id: 1, text: 'Active Sub Clients', name: 'Clients' },
        { id: 0, text: 'Deactivated Sub Clients', name: 'Archive Clients' },
      ],
    }
  },
  computed: {
    searchResult() {
      return this.clients
    },
  },
  watch: {
    internal_workspace_id(newVal, oldVal) {
      if (newVal.toString() === '0') {
        this.api_internal_workspace_id = this.$accessibleWorkspacesIds()
      } else {
        this.api_internal_workspace_id = newVal
      }

      this.search_term = ''
      this.page = 1
      this.clients = []
      this.infiniteId += 1
    },
  },
  methods: {
    getClientImage(client) {
      if (client.display_company_logo != null) {
        return ` url(${client.display_company_logo})`
      } else {
        return `url(${this.buildingImage})`
      }
    },

    infiniteHandler($state) {
      if (this.completelyLoaded) {
        $state.complete()
        return
      }
      this.$axios
        .$post(
          `/sub-client/list?page=${this.page}&sort_value=${this.sort_value}&sort_by=${this.sort_by}&is_archive=${this.clientTypeId}&search_value=${this.search_term}`,
          {
            workspace_id: this.api_internal_workspace_id,
            client_id: this.client_id,
          }
        )
        .then(({ data }) => {
          this.lastPage = data.last_page
          this.show_add_client_btn = data.show_add_client_btn

          if (data.data && data.data.length) {
            if (parseInt(this.page) === parseInt(data.current_page)) {
              this.clients.push(...data.data)
              // setTimeout(() => {
              //   this.tableListScrolling()
              // }, 50)
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
          this.$toast.error(this.$getErrorMessage(e))
        })
        .finally(() => this.$nextTick(() => (this.isSortComplete = false)))
    },
    showDeleteClientDialog(clientId, deleteClientWorkspaceId, deleteStatus) {
      this.deleteStatus = deleteStatus
      this.getDeteleClientId = clientId
      this.deleteClientWorkspaceId = deleteClientWorkspaceId
    },
    async deleteClient(clientId, deleteClientWorkspaceId) {
      try {
        this.loading = true
        this.general_msg = null
        const data = await this.$axios.$post('/sub-client/delete', {
          workspace_id: deleteClientWorkspaceId,
          client_id: clientId,
        })
        window.$('.close').trigger('click')
        this.clients = this.clients.filter(
          ({ id }) => parseInt(id) !== parseInt(clientId)
        )
        this.$toast.global.success(data.message)
      } catch (e) {
        this.$toast.error(this.$getErrorMessage(e))
      } finally {
        this.loading = false
      }
    },
    sortByColumn(column) {
      this.sort_value = column
      this.sort_by = this.sort_by === 'ASC' ? 'DESC' : 'ASC'

      this.resetFilter()
    },
    sortingClass(sortValue) {
      return {
        active: this.sort_value === sortValue && this.sort_by === 'DESC',
      }
    },
    changeClientTypeFilter(data) {
      this.sort_value = ''
      this.sort_by = 'ASC'
      this.clientTypeId = data.id
      this.resetFilter()
    },
    resetFilter() {
      this.page = 1
      this.clients = []
      this.infiniteId += 1
      this.completelyLoaded = false
      this.isSortComplete = false
    },
  },
}
</script>
