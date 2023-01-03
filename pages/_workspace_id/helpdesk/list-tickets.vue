<template>
  <div class="body-content p0">
    <div class="general-settings-right h-100 w-100">
      <div class="general-settings-title">
        <h4>Ticket List</h4>
        <div class="right-side">
          <nuxt-link
            class="btn btn-icon"
            :to="{
              name: 'workspace_id-helpdesk-create-ticket',
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
              </g></svg
            >Add New Ticket</nuxt-link
          >
        </div>
      </div>
      <div class="workspace-settings">
        <div class="row h-100">
          <!-- manipulate -->
          <div
            class="h-100 tb"
            :class="currentRoute === detailRoute ? 'col-md-7' : 'col-md-12'"
          >
            <div class="common-box bg-gray h-100">
              <div
                class="table-list-view small-height table-list-scrolling scrolling"
              >
                <ul class="thead">
                  <li>
                    <div
                      class="sorting sortarrow flex23"
                      :class="[
                        sortData === 'title' && currentSort === 'desc'
                          ? 'active descending'
                          : '',
                      ]"
                    >
                      <span @click="toggleSort">Title</span>
                    </div>
                    <div class="sorting flex15">
                      <span>Workspace</span>
                    </div>
                    <div class="sorting flex15">
                      <span>Module</span>
                    </div>
                    <div class="sorting flex15">
                      <span>Status/ Priority/ Ticket Type</span>
                    </div>
                    <div class="sorting flex12">
                      <span>Requested Date</span>
                    </div>
                    <div class="sorting flex12">
                      <span>Updated Date</span>
                    </div>
                    <div class="sorting flex8">
                      <span>Action</span>
                    </div>
                  </li>
                </ul>
                <div class="customscrollbar no_footer">
                  <ul class="tbody">
                    <li
                      v-for="ticket in tickets"
                      :key="ticket.id"
                      :class="
                        currentRoute === detailRoute &&
                        getMatchesParamWithId(ticket.id)
                          ? 'active'
                          : ''
                      "
                    >
                      <div class="tb-column flex23">
                        <div class="top-column">
                          <nuxt-link
                            class="table-a"
                            :to="{
                              name: 'workspace_id-helpdesk-list-tickets-ticket_id',
                              params: {
                                ticket_id: ticket.id,
                              },
                            }"
                            >{{ ticket.title }}</nuxt-link
                          >
                        </div>
                      </div>
                      <div class="tb-column flex15">
                        <div class="top-column">
                          <label>{{ ticket.workspace_name }}</label>
                        </div>
                      </div>
                      <div class="tb-column flex15">
                        <div class="top-column">
                          <label>{{ ticket.module_name }}</label>
                        </div>
                      </div>
                      <div class="tb-column flex15">
                        <div class="top-column">
                          <div class="staProTicket">
                            <span
                              :style="`background-color: ${ticket.status_color}; color:${ticket.status_text_color}`"
                              >{{ getFirstChar(ticket.status_name) }}</span
                            >
                            <span
                              :style="`background-color: ${ticket.priority_color}; color: ${ticket.priority_text_color}`"
                              >{{ getFirstChar(ticket.priority_name) }}</span
                            >
                            <span
                              :style="`background-color: ${ticket.ticket_type_color}; color:  #ffffff;`"
                              >{{ getFirstChar(ticket.ticket_type_name) }}</span
                            >
                          </div>
                        </div>
                      </div>
                      <div class="tb-column flex12">
                        <div class="top-column">
                          <label>{{ ticket.requested }}</label>
                        </div>
                      </div>
                      <div class="tb-column flex12">
                        <div class="top-column">
                          <label>{{ ticket.updated }}</label>
                        </div>
                      </div>
                      <div class="tb-column flex8">
                        <ul class="action">
                          <li>
                            <nuxt-link
                              v-tooltip="
                                currentRoute === detailRoute &&
                                $route.params.ticket_id === ticket.id
                                  ? 'Quick view Close'
                                  : 'Quick View'
                              "
                              href="javascript:void(0);"
                              :class="
                                currentRoute === detailRoute &&
                                getMatchesParamWithId(ticket.id)
                                  ? 'close-quick-view'
                                  : 'quick-view-open'
                              "
                              :to="{
                                name:
                                  currentRoute === detailRoute &&
                                  getMatchesParamWithId(ticket.id)
                                    ? 'workspace_id-helpdesk-list-tickets'
                                    : 'workspace_id-helpdesk-list-tickets-ticket_id',
                                params: {
                                  ticket_id: ticket.id,
                                },
                              }"
                            >
                              <svg
                                v-if="
                                  currentRoute === detailRoute &&
                                  getMatchesParamWithId(ticket.id)
                                "
                                id="Layer_1"
                                class="close-quick-view-icon h-orange"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 18 18"
                                xml:space="preserve"
                              >
                                <g id="Close_View">
                                  <g
                                    id="Group_3076"
                                    transform="translate(-784.002 -659.595)"
                                  >
                                    <g
                                      id="Group_3075"
                                      transform="translate(784.002 659.595)"
                                    >
                                      <path
                                        id="Path_3232"
                                        class="fill-color"
                                        d="M5.7,6.8H2.3c-0.4,0-0.8,0.3-0.8,0.8s0.3,0.8,0.8,0.8h5.4l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0C8,8.1,8.1,8,8.1,8l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0V7.6c0,0,0,0,0-0.1V2.3c0-0.4-0.4-0.7-0.8-0.7c-0.4,0-0.7,0.3-0.7,0.7v3.4L1.3,0.2C1-0.1,0.5-0.1,0.2,0.2c-0.3,0.3-0.3,0.8,0,1L5.7,6.8z"
                                      ></path>
                                      <path
                                        id="Path_3233"
                                        class="fill-color"
                                        d="M10.3,9.8L10.3,9.8L10.3,9.8l-0.1,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0c0,0,0,0-0.1,0l0,0c0,0,0,0,0,0.1l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0v5.4c0,0.4,0.4,0.7,0.8,0.7c0.4,0,0.7-0.3,0.7-0.7v-3.4l5.5,5.5c0.3,0.3,0.8,0.3,1.1,0c0.3-0.3,0.3-0.8,0-1.1l-5.5-5.5h3.4c0.4,0,0.8-0.3,0.8-0.8s-0.3-0.8-0.8-0.8L10.3,9.8L10.3,9.8z"
                                      ></path>
                                    </g>
                                  </g>
                                </g>
                              </svg>

                              <svg
                                v-else
                                id="Layer_1"
                                class="quick-view-icon h-orange"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 18 18"
                                xml:space="preserve"
                              >
                                <g
                                  id="Group_3076"
                                  transform="translate(-784.002 -659.595)"
                                >
                                  <g id="Group_3075">
                                    <path
                                      id="Path_3232"
                                      class="fill-color"
                                      d="M786.5,661.1h3.4c0.4,0,0.8-0.3,0.8-0.8s-0.3-0.8-0.8-0.8h-5.4l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0c0,0-0.1,0.1-0.1,0.1l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0v0.1c0,0,0,0,0,0.1v5.2c0,0.4,0.3,0.8,0.8,0.8s0.8-0.3,0.8-0.8v-3.4l5.5,5.5c0.3,0.3,0.8,0.3,1.1,0s0.3-0.8,0-1.1c0,0,0,0,0,0L786.5,661.1z"
                                    />
                                    <path
                                      id="Path_3233"
                                      class="fill-color"
                                      d="M801.4,677.6L801.4,677.6L801.4,677.6l0.1,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0c0,0,0,0,0.1,0l0,0c0,0,0,0,0-0.1l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0v-0.1c0,0,0-0.1,0-0.1v-5.2c0-0.4-0.3-0.8-0.8-0.8s-0.8,0.3-0.8,0.8v3.4l-5.5-5.5c-0.3-0.3-0.8-0.3-1.1,0c-0.3,0.3-0.3,0.8,0,1l5.5,5.5H796c-0.4,0-0.8,0.3-0.8,0.8s0.3,0.8,0.8,0.8L801.4,677.6L801.4,677.6z"
                                    />
                                  </g>
                                </g></svg
                            ></nuxt-link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <client-only>
                      <infinite-loading
                        :identifier="ticketInfiniteId"
                        @infinite="ticketInfiniteHandler"
                      >
                        <div slot="spinner">
                          <ContentLoader
                            :speed="1"
                            :animate="true"
                            :width="400"
                            :height="1000"
                          >
                            <rect
                              v-for="index in 10"
                              :key="index"
                              x="0"
                              :y="contentLoaderData[index]"
                              rx="0"
                              ry="0"
                              width="400"
                              height="13"
                            />
                          </ContentLoader>
                        </div>
                        <div slot="no-more"></div>
                        <div slot="no-results"></div>
                      </infinite-loading>
                    </client-only>
                    <div
                      v-if="!isLoading && !tickets.length"
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
                            ></path>
                            <path
                              id="Path_3565"
                              class="fill-color"
                              d="M321.6,199.8c0.3-1.5-9.1-9.6-15.5-16.4c-3.9-3.7-7.4-9-9.5-3.1v15.5c0,3.8,3.1,6.8,6.8,6.8h12.8v95.1c0,0.9-0.7,1.6-1.6,1.6H227c-0.9,0-1.6-0.7-1.6-1.6V184.5c0-0.9,0.7-1.6,1.6-1.6h59.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0H227c-3.8,0-6.8,3.1-6.8,6.8v8.1h-8.1c-3.8,0-6.8,3.1-6.8,6.8v8.1h-8.1c-3.8,0-6.8,3.1-6.8,6.8v113.2c0,3.8,3.1,6.8,6.8,6.8H285c3.8,0,6.8-3.1,6.8-6.8v-8.1h8.1c3.8,0,6.8-3.1,6.8-6.8v-8.1h8.1c3.8,0,6.8-3.1,6.8-6.8V200C321.7,199.9,321.7,199.9,321.6,199.8L321.6,199.8z M301.5,312.6c0,0.9-0.7,1.6-1.6,1.6h-65.2c-1.5,0-2.6,1.2-2.6,2.6s1.2,2.6,2.6,2.6h51.8v8.1c0,0.9-0.7,1.6-1.6,1.6h-87.8c-0.9,0-1.6-0.7-1.6-1.6V214.3c0-0.9,0.7-1.6,1.6-1.6h8.1v99.9c0,3.8,3.1,6.8,6.8,6.8h10.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0h-10.4c-0.9,0-1.6-0.7-1.6-1.6V199.4c0-0.9,0.7-1.6,1.6-1.6h8.1v99.9c0,3.8,3.1,6.8,6.8,6.8h74.4L301.5,312.6L301.5,312.6z M303.5,197.3c-0.9,0-1.6-0.7-1.6-1.6v-9.1l10.7,10.7L303.5,197.3z"
                            ></path>
                          </g>
                        </svg>
                        <p>You haven't added any Tickets yet!</p>
                        <nuxt-link
                          class="btn btn-icon"
                          :to="{
                            name: 'workspace_id-helpdesk-create-ticket',
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
                            </g></svg
                          >Add New Ticket</nuxt-link
                        >
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <transition name="slide-fade">
            <nuxt-child v-if="currentRoute === detailRoute" />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import axios from './utils'
export default {
  components: {
    ContentLoader,
  },
  layout: 'supportLayout',
  middleware: ['authCheck'],
  data() {
    return {
      email: this.$auth.user.email,
      user_id: this.$auth.user.id,
      contentLoaderData: [-1, 15, 31, 47, 63, 79, 95, 111, 127, 143],
      isLoading: false,
      ticketInfiniteId: new Date(),
      ticketPage: 0,
      totalTickets: 0,
      tickets: [],
      ticketStatus: [],
      sortData: 'title',
      currentSort: 'asc',
      user: {
        name: this.$auth.user.name,
        email: this.$auth.user.email,
        user_id: this.$auth.user.id,
      },
      detailRoute: 'workspace_id-helpdesk-list-tickets-ticket_id',
    }
  },
  computed: {
    getMatchesParamWithId() {
      return (id) => {
        return parseInt(this.$route.params.ticket_id) === parseInt(id)
      }
    },
    currentRoute() {
      return this.$route.name
    },
    getFirstChar() {
      return (char) => {
        return char ? char.charAt(0).toUpperCase() : '-'
      }
    },
  },
  created() {
    this.addRequester()
    this.getTicketStatus()
  },
  methods: {
    addRequester() {
      axios
        .post('ticket/add-requester', {
          ...this.user,
        })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getTicketStatus() {
      axios
        .get('ticket/status')
        .then(({ data }) => {
          this.ticketStatus = data.data.map((e) => {
            return {
              text: e.name,
              id: e.id,
            }
          })
        })
        .catch(console.log)
    },
    toggleSort() {
      this.currentSort = this.currentSort === 'asc' ? 'desc' : 'asc'
      this.ticketPage = 0
      this.isLoading = true
      this.tickets = []
      this.ticketInfiniteId += 1
    },
    ticketInfiniteHandler($state) {
      this.isLoading = true
      this.ticketPage += 1
      axios
        .post(
          'ticket/list',
          {
            email: this.email,
            user_id: this.user_id,
          },
          {
            params: {
              page: this.ticketPage,
              sort_value: this.sortData,
              sort_by: this.currentSort,
            },
          }
        )
        .then(({ data }) => {
          if (this.ticketPage === data.data.current_page) {
            this.tickets.push(...data.data.data)
            this.totalTickets = data.data.total
            $state.loaded()
            this.isLoading = false
            if (data.data.last_page <= data.data.current_page) $state.complete()
          } else $state.complete()
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.tb {
  transition: all ease-in-out 0.3s;
}
</style>
