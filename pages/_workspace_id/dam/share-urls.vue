<template>
  <div class="body-content">
    <div class="body-content-auto w-100">
      <div
        class="common-box-header d-flex align-items-center justify-content-between"
      >
        <h2 class="title">Shared URLs</h2>
        <div class="table-filter">
          <ul>
            <li>{{ total }} Shared URL(s)</li>
            <li>
              <div class="search-by small-wd">
                <Select2
                  :value="per_page"
                  :options="sharedUrlSizeFilter"
                  :attrs="{ minimumResultsForSearch: -1 }"
                  @input="updatePageSize"
                />
              </div>
            </li>
            <li>
              <div class="search-by">
                <Select2
                  v-model="select_filter_by"
                  :options="sharedUrlFilter"
                  :custom-event="true"
                  :attrs="{ minimumResultsForSearch: -1 }"
                  @changeSelect2="changeSharedUrlFilter(...arguments)"
                />
              </div>
            </li>
            <li v-show="!!(selectedIds || []).length">
              <a
                href="javascript:void(0);"
                class="btn"
                :disabled="deleting"
                @click="deleting ? null : $refs.deleteDialog.show()"
                >{{ deleting ? 'Deleting...' : 'Delete Selected' }}</a
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="common-box bg-gray">
        <div class="table-list-view table-list-scrolling">
          <ShareListingHeader
            v-if="(urls || []).length"
            :sort-value="sorting.value"
            :reverse="sorting.desc"
            :selected="allSelected"
            :selection-enabled="
              !!urls.some((e) => e.is_active == 0 || e.is_expired)
            "
            @selection-change="onHeaderSelect"
            @sort="sortList"
          />
          <div class="customscrollbar no_footer">
            <transition-group
              v-if="(urls || []).length"
              tag="ul"
              name="slide-up"
              class="tbody"
            >
              <ShareListingItem
                v-for="(url, i) in urls"
                :key="url.id"
                :url="url"
                :selected="selectedIds.includes(url.id)"
                :style="`transition-delay: ${i * 25}ms`"
                :deleting="deleting && selectedIds.includes(url.id)"
                :filter_by="filter_by"
                @selection-change="updateSelection(url.id, $event)"
                @revoked="onUrlRevoked"
                @deleted="onUrlDeleted"
              />
            </transition-group>
            <div v-else>
              <div key="no-data" class="no-data-found">
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

                  <p class="my-3">No URLs Found</p>
                </div>
              </div>
            </div>
            <Pagination
              v-if="last_page > 1"
              :last-page="last_page"
              :current-page.sync="current_page"
            />
          </div>
        </div>
      </div>
    </div>
    <client-only>
      <DeleteDialog
        ref="deleteDialog"
        header-text="Delete Shared URL(s)"
        @button:yes="deleteUrls"
      >
        Are you sure you want to
        <strong>delete</strong>
        shared URL(s)?
      </DeleteDialog>
    </client-only>
  </div>
</template>

<script>
import DeleteDialog from '~/components/plugins/DeleteDialog'
import ShareListingItem from '~/components/dam/ShareListing/ShareListingItem'
import ShareListingHeader from '~/components/dam/ShareListing/ShareListingHeader'
import Pagination from '~/components/dam/AssetList/Pagination'
import Select2 from '~/components/plugins/Select2'

export default {
  components: {
    ShareListingItem,
    ShareListingHeader,
    DeleteDialog,
    Pagination,
    Select2,
  },
  layout: 'damLayout',
  middleware: [
    'authCheck',
    'checkWorkspace',
    'can-access-dam-module',
    'check-if-suspended',
  ],
  asyncData({ $axios, $getWorkspaceId, error }) {
    return $axios
      .$get(
        `digital-assets/dashboard/list-share-assets-url?workspace_id=${$getWorkspaceId()}&total_record=12&filter_by=active`
      )
      .then(({ data = {} }) => ({
        current_page: data.current_page,
        last_page: data.last_page,
        total: data.total,
        per_page: data.per_page,
        urls: data.data.map(({ user, ...e }) => ({
          userName: user?.name || '-',
          ...e,
          user,
        })),
      }))
      .catch((e) => error(e))
  },
  data() {
    return {
      deleting: false,
      sorting: {
        value: 'updated_at',
        desc: true,
      },
      selectedIds: [],
      allSelected: false,
      filter_by: 'active',
      select_filter_by: '1',
      sharedUrlFilter: [
        { text: 'Active URLs', id: '1', name: 'active' },
        { text: 'Revoked URLs', id: '2', name: 'revoked' },
        { text: 'Expired URLs', id: '3', name: 'expired' },
      ],
      sharedUrlSizeFilter: [
        { text: '12', id: '12' },
        { text: '20', id: '20' },
        { text: '40', id: '40' },
        { text: '80', id: '80' },
        { text: '100', id: '100' },
      ],
    }
  },
  watch: {
    'sorting.value'(value) {
      this.sortList(value)
    },
    current_page(page) {
      if (page === -1) {
        this.$router.replace({
          query: null,
          hash: this.hashParam && `#${this.hashParam}`,
        })
      } else {
        this.$router.replace({
          query: { page },
          hash: this.hashParam && `#${this.hashParam}`,
        })
        this.getData()
      }
    },
  },
  methods: {
    updatePageSize(e) {
      this.per_page = e
      this.current_page = 1
      this.$router.replace({
        query: { page: this.current_page },
        hash: this.hashParam && `#${this.hashParam}`,
      })
      this.getData()
    },
    onHeaderSelect(selected) {
      this.selectedIds = selected
        ? this.urls
            .filter((e) => e.is_active === 0 || e.is_expired)
            .map((e) => e.id)
        : []
      this.allSelected = selected
    },
    getData() {
      this.$axios
        .$get(
          `digital-assets/dashboard/list-share-assets-url?workspace_id=${this.$getWorkspaceId()}&page=${
            this.current_page
          }&total_record=${this.per_page || 12}&filter_by=${this.filter_by}`
        )
        .then(({ data = {} }) => {
          this.allSelected = false
          this.current_page = data.current_page
          this.last_page = data.last_page
          this.total = data.total
          this.per_page = data.per_page
          this.urls = data.data.map(({ user, ...e }) => ({
            userName: user?.name || '-',
            ...e,
            user,
          }))
          this.selectedIds = []
          this.allSelected = false
        })
        .catch(console.error)
    },
    onUrlRevoked(url) {
      this.getData()
      this.updateSelection(url.id, false)
      url.is_active = 0
    },
    onUrlDeleted(urlId) {
      this.urls = this.urls.filter(({ id }) => id !== urlId)
      this.updateSelection(urlId, false)
      if (!this.urls.length) {
        if (this.last_page === this.current_page && this.last_page > 1) {
          this.$router.replace({
            query: { page: this.last_page - 1 },
            hash: this.hashParam && `#${this.hashParam}`,
          })
          this.current_page = this.last_page - 1
        }
        this.getData()
      }
    },
    updateSelection(urlId, selection) {
      if (!selection && this.selectedIds.includes(urlId)) {
        this.selectedIds = this.selectedIds.filter((e) => e !== urlId)
      } else if (selection && !this.selectedIds.includes(urlId)) {
        this.selectedIds.push(urlId)
      }
      this.allSelected = this.urls.every((e) => this.selectedIds.includes(e.id))
    },
    sortList(value) {
      let desc = false

      if (this.sorting.value !== value) desc = false
      else desc = !this.sorting.desc

      this.urls = [...this.urls].sort(this.$sortBy(value, desc))
      this.$nextTick(() => {
        this.sorting.value = value
        this.sorting.desc = desc
      })
    },
    deleteUrls() {
      if (!this.selectedIds?.length || this.deleting) return
      this.deleting = true
      this.$axios
        .$post(`digital-assets/dashboard/delete-multiple-share-assets-url`, {
          workspace_id: this.$getWorkspaceId(),
          share_url_ids: this.selectedIds,
        })
        .then((e) => {
          this.$toast.global.success(e.message)
          this.urls = this.urls.filter((e) => !this.selectedIds.includes(e.id))
          this.selectedIds = []
          this.allSelected = false
          if (!this.urls.length) {
            if (this.last_page === this.current_page && this.last_page > 1) {
              this.$router.replace({
                query: { page: this.last_page - 1 },
                hash: this.hashParam && `#${this.hashParam}`,
              })
              this.current_page = this.last_page - 1
            }
            this.getData()
          }
        })
        .catch((e) => {
          this.$toast.error(this.$getErrorMessage(e))
        })
        .finally(() => (this.deleting = false))
    },

    changeSharedUrlFilter(data) {
      this.filter_by = data.name
      this.current_page = 1
      this.getData()
    },
  },
}
</script>
