<template>
  <div
    :class="{
      'general-settings-right h-100 warning-massage': true,
      'search-filter': (search_term || '').trim().length,
    }"
  >
    <ProjectNotificationAlert />
    <div class="general-settings-title">
      <h4>Clients</h4>
      <div class="right-side">
        <Select2
          v-model="selectedClientType"
          :options="clientListType"
          custom-event
          :attrs="{ minimumResultsForSearch: -1 }"
          @changeSelect2="changeClientTypeFilter(...arguments)"
        />
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
                v-model="search_term"
                :disabled="isSortComplete"
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
          :to="{
            name: 'workspace_id-workspace-settings-client-add',
            params: { workspace_id: internal_workspace_id },
          }"
          class="btn btn-icon"
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
          Add New Client</nuxt-link
        >
        <div v-if="searchResult.length" class="dropdown">
          <a
            href="javascript:void(0);"
            class="btn btn-gray btn-icon dropdown-toggle"
            :data-toggle="!downloadingClient ? 'dropdown' : ''"
            aria-expanded="false"
          >
            <svg
              v-if="!downloadingClient"
              id="Layer_1"
              class="export-icon"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 18 18"
              xml:space="preserve"
            >
              <g id="Group_4488" transform="translate(-1256 -320)">
                <rect
                  id="Rectangle_3026"
                  x="1256"
                  y="320"
                  class="fill-hide"
                  width="18"
                  height="18"
                ></rect>
                <g id="Group_4354" transform="translate(557.089 174.823)">
                  <path
                    id="Path_3416"
                    class="fill-color"
                    d="M708.2,162.5c1.3,0,2.3-1,2.3-2.3v-3.4c0-0.4-0.3-0.8-0.8-0.8s-0.8,0.3-0.8,0.8v3.4c0,0.4-0.3,0.8-0.7,0.8h-7c-0.4,0-0.7-0.3-0.7-0.8v-12.1c0-0.4,0.3-0.8,0.7-0.8h7c0.4,0,0.7,0.3,0.7,0.8v3c0,0.4,0.3,0.8,0.8,0.8s0.8-0.3,0.8-0.8v-3c0-1.3-1-2.3-2.3-2.3h-7c-1.3,0-2.3,1-2.3,2.3v12.1c0,1.3,1,2.3,2.3,2.3H708.2z"
                  ></path>
                  <path
                    id="Path_3417"
                    class="fill-color"
                    d="M712.8,158.3c-0.2,0-0.4-0.1-0.5-0.2c-0.3-0.3-0.3-0.8,0-1.1c0,0,0,0,0,0l2-2.1h-10.1c-0.4,0-0.7-0.4-0.7-0.8c0-0.4,0.3-0.7,0.7-0.7h10.1l-2-2.1c-0.3-0.3-0.3-0.8,0-1.1c0,0,0,0,0,0c0.3-0.3,0.8-0.3,1,0c0,0,0,0,0,0l3.3,3.4c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0l-3.3,3.4C713.2,158.2,713,158.3,712.8,158.3z"
                  ></path>
                </g>
              </g>
            </svg>

            <span v-if="downloadingClient"
              ><i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
              Exporting...</span
            >
            <span v-else>Export</span>
          </a>
          <ul
            :class="{
              'dropdown-menu common-dropdown': true,
              'display-none': downloadingClient,
            }"
          >
            <li>
              <a
                class="dropdown-item"
                href="javascript:void(0);"
                @click="exportClient('csv')"
                >CSV</a
              >
            </li>
            <li>
              <a
                class="dropdown-item"
                href="javascript:void(0);"
                @click="exportClient('xlsx')"
                >Excel</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-if="(search_term || '').trim().length" class="search-result mb1 p20">
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
        Showing results for <strong>"{{ search_term.trim() }}"</strong>
      </div>
    </div>
    <div class="workspace-settings">
      <div class="common-box bg-gray h-100">
        <div class="table-list-view small-height table-list-scrolling">
          <ul v-if="searchResult.length" class="thead">
            <li>
              <div
                :class="[
                  'flex22 sorting',
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
                  >Client Name</span
                >
              </div>
              <div class="sorting text-center flex12">
                <span>Account Manager</span>
              </div>
              <div class="sorting flex12">
                <span>Primary Contact</span>
              </div>
              <div class="sorting flex24">
                <span>Email</span>
              </div>
              <div class="sorting flex10">
                <span>Contact Number</span>
              </div>
              <div
                :class="[
                  'text-center sorting flex10',
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
                  >{{
                    clientTypeId == 1 ? 'Active Projects' : 'Archive Projects'
                  }}</span
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
                <div class="tb-column flex22">
                  <div class="media">
                    <div class="media-left">
                      <div
                        v-if="client.website_favicon_link != null"
                        class="profile-bg"
                        :style="{
                          'background-image': getClientImage(client),
                        }"
                      ></div>
                      <div
                        v-else-if="client.display_company_logo != null"
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
                            name: 'workspace_id-workspace-settings-client-client_id-edit',
                            params: {
                              workspace_id: client.workspace_id,
                              client_id: client.id,
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
                <div class="tb-column text-center flex12">
                  <a
                    v-if="client.account_manager"
                    v-tooltip="client.account_manager"
                    class="d-flex justify-content-center p-1"
                  >
                    <svg
                      id="Layer_1"
                      class="account-manager-icon h-orange"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 18 18"
                      xml:space="preserve"
                    >
                      <g id="manager" transform="translate(-41.13)">
                        <path
                          id="Path_40223"
                          class="fill-color"
                          d="M54.1,8.5c-0.3-0.1-1-0.3-1-0.3c-0.3-0.1-0.6,0.1-0.7,0.3L51,12.4l-0.3-2.3L51.3,9c0.2-0.3,0.1-0.6-0.2-0.8c-0.1,0-0.2-0.1-0.3-0.1h-1.4c-0.3,0-0.6,0.3-0.6,0.6c0,0.1,0,0.2,0.1,0.3l0.6,1.1l-0.3,2.3l-1.4-3.9c-0.1-0.3-0.4-0.4-0.7-0.3c0,0-0.8,0.2-1,0.3c-1.4,0.5-2.4,1.8-2.3,3.2v5.7c0,0.3,0.2,0.6,0.6,0.6c0,0,0,0,0,0h11.6c0.3,0,0.6-0.2,0.6-0.6l0,0v-5.7C56.5,10.3,55.5,9,54.1,8.5z M44.9,16.9v-5.1c0-1,0.6-1.9,1.6-2.2c0.1,0,0.3-0.1,0.5-0.2l2.6,7.2c0,0.1,0.1,0.2,0.1,0.2L44.9,16.9L44.9,16.9z M55.4,16.9h-4.9c0.1-0.1,0.1-0.1,0.1-0.2l2.6-7.2c0.2,0.1,0.4,0.1,0.5,0.2c0.9,0.3,1.6,1.2,1.6,2.2L55.4,16.9z"
                        />
                        <path
                          id="Path_40224"
                          class="fill-color"
                          d="M50.1,6.9c1.9,0,3.5-1.5,3.5-3.4C53.6,1.5,52,0,50.1,0c-1.9,0-3.5,1.5-3.5,3.4c0,0,0,0,0,0C46.7,5.4,48.2,6.9,50.1,6.9z M50.1,1.1c1.3,0,2.3,1,2.3,2.3c0,1.3-1,2.3-2.3,2.3c-1.3,0-2.3-1-2.3-2.3c0,0,0,0,0,0C47.8,2.2,48.8,1.1,50.1,1.1L50.1,1.1z"
                        />
                      </g>
                    </svg>
                  </a>
                  <label v-else>--</label>
                </div>
                <div class="tb-column flex12">
                  <label>{{
                    client.client_contact_persons != null
                      ? client.client_contact_persons.full_name
                      : '--'
                  }}</label>
                </div>
                <div class="tb-column flex24">
                  <a
                    v-if="client.client_contact_persons != null"
                    :href="`mailto:${client.client_contact_persons.email}`"
                    class="sc"
                  >
                    {{ client.client_contact_persons.email }}
                  </a>
                  <a v-else :href="`mailto:${client.company_email}`" class="sc">
                    {{ client.company_email }}
                  </a>
                </div>
                <div class="tb-column flex10">
                  <a
                    v-if="client.client_contact_persons != null"
                    :href="`tel:${client.client_contact_persons.phone_number}`"
                    class="sc"
                    >{{ client.client_contact_persons.phone_number }}</a
                  >
                  <a v-else :href="`tel:${client.phone_number}`" class="sc">
                    {{ client.phone_number }}
                  </a>
                </div>
                <div class="text-center tb-column flex10">
                  <label>{{ client.total_active_project }}</label>
                </div>
                <div class="tb-column flex10">
                  <ul v-if="parseInt(clientTypeId) === 1" class="action">
                    <li
                      v-tooltip="
                        parseInt(client.internal_client) === 1
                          ? 'Edit Client'
                          : 'View Client'
                      "
                    >
                      <nuxt-link
                        :to="{
                          name: 'workspace_id-workspace-settings-client-client_id-edit',
                          params: {
                            workspace_id: client.workspace_id,
                            client_id: client.id,
                          },
                        }"
                      >
                        <svg
                          v-if="parseInt(client.internal_client) === 1"
                          id="Layer_1"
                          v-tooltip="'Edit Client'"
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

                        <svg
                          v-if="parseInt(client.internal_client) === 0"
                          id="Layer_1"
                          class="read-icon h-orange"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 18 18"
                          xml:space="preserve"
                        >
                          <g id="Group_4485" transform="translate(-1206 -273)">
                            <rect
                              id="Rectangle_3023"
                              x="1206"
                              y="273"
                              class="fill-hide"
                              width="18"
                              height="18"
                            ></rect>
                            <g
                              id="Icon_feather-eye"
                              transform="translate(592.345 127.486)"
                            >
                              <g id="Path_3357">
                                <path
                                  id="Path_3359"
                                  class="fill-color"
                                  d="M622.7,161.3c-5.6,0-8.8-6.2-8.9-6.4c-0.1-0.2-0.1-0.5,0-0.7c0.1-0.3,3.3-6.4,8.9-6.4s8.8,6.2,8.9,6.4c0.1,0.2,0.1,0.5,0,0.7C631.4,155.1,628.3,161.3,622.7,161.3z M615.3,154.5c0.7,1.2,3.4,5.2,7.4,5.2s6.7-4,7.4-5.2c-0.7-1.2-3.4-5.2-7.4-5.2S616,153.3,615.3,154.5z"
                                ></path>
                              </g>
                              <g id="Path_3358">
                                <path
                                  id="Path_3360"
                                  class="fill-color"
                                  d="M622.7,157.5c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3l0,0C625.7,156.2,624.3,157.5,622.7,157.5z M622.7,153c-0.8,0-1.5,0.7-1.5,1.5s0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5l0,0C624.2,153.7,623.5,153,622.7,153z"
                                ></path>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </nuxt-link>
                    </li>
                    <li
                      v-if="parseInt(client.internal_client) === 1"
                      v-tooltip="'Archive Client'"
                    >
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
                          class="delete-icon h-orange"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 15.3 18"
                          xml:space="preserve"
                          aria-describedby="tooltip504547"
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
                  <ul v-if="parseInt(clientTypeId) === 0" class="action">
                    <li v-tooltip="'Active Client'">
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
                          class="mark-complete-icon h-orange"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 18 18"
                          xml:space="preserve"
                        >
                          <g id="Group_4484" transform="translate(-872 -896)">
                            <path
                              id="Path_3407"
                              class="fill-color"
                              d="M878.2,911.2c-0.3,0-0.5-0.1-0.7-0.3l-5.3-5.3c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l4.9,4.9l10.3-10.4c0.2-0.2,0.4-0.3,0.6-0.2c0.2,0,0.4,0.1,0.5,0.2c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0L878.9,911C878.7,911.1,878.5,911.2,878.2,911.2z"
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
                          This is the end of the list, but just the beginning of
                          what’s to come!
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
                            name: 'workspace_id-workspace-settings-client-add',
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
                          Add New
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

    <!--  Delete Client Modal  -->
    <div id="delete-client" class="modal fade">
      <div
        class="modal-dialog modal-small modal-dialog-scrollable modal-dialog-centered"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="exampleModalLongTitle" class="modal-title">
              <template v-if="deleteStatus">Archive Client</template>
              <template v-if="!deleteStatus">Active Client</template>
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
              Are you sure you want to archive the client? Archiving client will
              also archive its associated projects.
            </p>
            <p v-if="!deleteStatus">
              Are you sure you want to active the client?
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
    <!--  Toast Message  -->
    <ExportReportToast
      :show="showExportReportMessage"
      :msg="exportReportMessage"
    />
  </div>
</template>
<script>
import { ContentLoader } from 'vue-content-loader'
import Select2 from '@/components/plugins/Select2'

import BuildingImage from '~/assets/img/icon/building-black.svg'
import scrolling from '~/mixins/scrolling'
import ProjectNotificationAlert from '~/components/theme/settings/ProjectNotificationAlert'
import ExportReportToast from '~/components/theme/global/ExportReportToast'

export default {
  components: {
    ProjectNotificationAlert,
    Select2,
    ContentLoader,
    ExportReportToast,
  },
  mixins: [scrolling],
  layout: 'generalSettingsLayout',
  middleware: ['authCheck', 'can-access-client-module'],
  data() {
    return {
      buildingImage: BuildingImage,
      loading: false,
      workspace_id: this.$_auth().id,
      internal_workspace_id: this.$route.params.workspace_id
        ? this.$route.params.workspace_id
        : this.$_auth().id,
      api_internal_workspace_id: this.$route.params.workspace_id
        ? this.$route.params.workspace_id
        : this.$_auth().id,

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
      show_results_text: false,

      selectedClientType: '1',
      clientTypeId: '1',
      clientListType: [
        { id: 1, text: 'Active Clients', name: 'Clients' },
        { id: 0, text: 'Archive Clients', name: 'Archive Clients' },
      ],
      show_add_client_btn: true,
      deleteStatus: true,
      completelyLoaded: false,
      downloadingClient: false,
      showExportReportMessage: false,
      exportReportMessage: '',
    }
  },
  computed: {
    searchResult() {
      return this.clients
    },
  },
  watch: {
    search_term() {
      if (this.searchTimer) clearTimeout(this.searchTimer)
      this.searchTimer = setTimeout(() => {
        this.resetFilter()
      }, 600)
    },
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
      if (client.website_favicon_link != null) {
        return ` url(${client.website_favicon_link})`
      } else if (client.display_company_logo != null) {
        return ` url(${client.display_company_logo})`
      } else {
        return `url(${this.buildingImage})`
        /* return ` url('https://ui-avatars.com/api/?name=${encodeURI(
          client.company_name
        )}&size=128&background=F8F9Fa&font-size=0.7&bold=true')` */
      }
    },
    goToClientDetail(client) {
      this.$auth.$storage.setUniversal(
        'internal_workspace_id',
        client.workspace_id
      )
      return this.$router.push({
        name: 'workspace_id-client-clientid-edit',
        params: { workspace_id: this.workspace_id, clientid: client.id },
      })
    },
    infiniteHandler($state) {
      if (this.completelyLoaded) {
        $state.complete()
        return
      }
      this.$axios
        .$post(
          `/client/list?page=${this.page}&sort_value=${this.sort_value}&sort_by=${this.sort_by}&is_archive=${this.clientTypeId}&search_value=${this.search_term}`,
          {
            workspace_id: this.api_internal_workspace_id,
          }
        )
        .then(({ data }) => {
          this.lastPage = data.last_page
          this.show_add_client_btn = data.show_add_client_btn

          if (data.data && data.data.length) {
            // fix for duplicate entries
            if (parseInt(this.page) === parseInt(data.current_page)) {
              this.clients.push(...data.data)
              setTimeout(() => {
                this.tableListScrolling()
              }, 50)
              $state.loaded()
              // fix for no item message
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
        const data = await this.$axios.$post('/client/delete', {
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
    clearSearch() {
      this.search_term = ''
      // this.resetFilter()
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
      // this.search_term = "";
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
    closeExportMessage() {
      this.showExportReportMessage = false
    },
    async exportClient(type) {
      this.downloadingClient = true
      this.closeExportMessage()
      try {
        const { message } = await this.$axios.$post(`client/export`, {
          workspace_id: this.api_internal_workspace_id,
          search_value: this.search_term,
          is_archive: this.clientTypeId,
          sort_value: this.sort_value,
          sort_by: this.sort_by,
          type,
        })
        this.downloadingClient = false
        this.showExportReportMessage = true
        this.exportReportMessage = message
        // this.downloadReport(data.filename, `Report.${type}`)
      } catch (e) {
        this.$toast.error(this.$getErrorMessage(e))
        this.loading = false
        this.downloadingClient = false
      }
    },
  },
}
</script>
<style>
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
