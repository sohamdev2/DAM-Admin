<template>
  <div class="body-content dam-container trash-page pl0 pr0">
    <div
      class="body-content-main customscrollbar h-100 resource-wrapper w-100"
      :class="[`grid-${mode}`]"
    >
      <transition name="slide-up">
        <ToolBar
          v-if="totalAssets"
          :assets-count="totalAssets"
          :selected-all="selectedAll"
          :mode.sync="mode"
          :deleting.sync="deleting"
          :selected-count="selectedCount"
          :sorting.sync="sorting.toolbar.value"
          :sorting-desc="sorting.toolbar.desc"
          trash-mode
          @sort="(args) => args.forEach((arg) => sort(...arg))"
          @removeAll="removeAll"
          @click:select-all="selectAll"
          @click:select-none="selectNone"
        />
      </transition>

      <div v-if="!noData && !loading" class="search-result mb-3">
        <div class="alert alert-info">
          <!-- <button type="button" class="close" data-dismiss="alert">
            <img src="~/assets/img/icon/close.svg" alt="" />
          </button> -->
          Assets in trash are deleted forever after 30 days.
        </div>
      </div>
      <div class="common-box bg-gray h-auto">
        <!-- <div class="h-auto p-10 pt0" :class="{ 'pb-0': mode === 'tile' }"> -->
        <div class="table-list-view multi-table-view category-wrapper">
          <div
            v-if="loading"
            style="margin: auto; overflow: hidden; width: 97%"
          >
            <ContentLoader
              :speed="1"
              :animate="true"
              :width="450"
              :height="200"
              class="normalLoader"
            >
              <template v-if="mode === 'list'">
                <rect x="0" y="7" rx="4" ry="4" width="450" height="40" />
                <rect x="0" y="53" rx="4" ry="4" width="450" height="40" />
                <rect x="0" y="99" rx="4" ry="4" width="450" height="40" />
                <rect x="0" y="145" rx="4" ry="4" width="450" height="40" />
              </template>
              <template v-else>
                <rect x="0" y="15" rx="1" ry="1" width="112.4" height="112.4" />
                <rect
                  x="117.4"
                  y="15"
                  rx="1"
                  ry="1"
                  width="112.4"
                  height="112.4"
                />
                <rect
                  x="234.9"
                  y="15"
                  rx="1"
                  ry="1"
                  width="112.4"
                  height="112.4"
                />
                <rect
                  x="352.3"
                  y="15"
                  rx="1"
                  ry="1"
                  width="112.4"
                  height="112.4"
                />
              </template>
            </ContentLoader>
          </div>
          <div v-if="noData" key="no-data" class="no-data-found">
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

              <p>Your trash is empty.</p>
            </div>
          </div>
          <template v-else>
            <ListingHeader
              v-if="!loading"
              key="header"
              :assets-count="totalAssets"
              :selected-all="selectedAll"
              :deleting="deleting"
              :reverse="sorting.toolbar.desc"
              :sort-value.sync="sorting.toolbar.value"
              @click:select-all="selectAll"
              @click:select-none="selectNone"
              @sort="(args) => args.forEach((arg) => sort(...arg))"
            />
            <div class="customscrollbar">
              <transition-group
                key="folder-list"
                class="tbody"
                name="slide-up"
                mode="in-out"
                tag="ul"
              >
                <Folder
                  v-for="(folder, i) in subFolders"
                  :key="'folder-' + folder.id"
                  :folder="folder"
                  :mode="mode"
                  :style="{
                    'transition-delay': `${(i % 12) * 30}ms !important`,
                  }"
                  trash-mode
                  :selected="folderSelection[folder.id]"
                  @removeMe="removeFolders"
                  @selectedDrop="dropDown"
                  @click:selected="toggleFolderSelection"
                />
                <Resource
                  v-for="(file, i) in files"
                  :key="'file-' + file.id"
                  :file="file"
                  :style="{
                    'transition-delay': `${
                      ((subFolders.length + i) % 12) * 30
                    }ms !important`,
                  }"
                  :mode="mode"
                  :deleting="deleting"
                  :selected="selection[file.id]"
                  trash-mode
                  @removeMe="removeFile"
                  @selectedDrop="dropDown"
                  @click:selected="toggleSelection"
                />
              </transition-group>
            </div>
          </template>

          <Pagination
            v-if="lastPage > 1 && !loading"
            key="pagination"
            :last-page="lastPage"
            :current-page.sync="page"
          />
        </div>
        <!-- </div> -->
      </div>
      <DeleteDialog ref="deleteDialog" @button:yes="deleteFromDrop">
        Are you sure you want to permanently delete the selected asset?
      </DeleteDialog>
      <DeleteDialog ref="restoreDialog" @button:yes="restoreFromDrop">
        Are you sure you want to restore the selected asset?
      </DeleteDialog>
    </div>

    <SelectionBar
      v-if="!loading"
      ref="selectionbar"
      :selected-files="selectedFiles"
      :selected-folders="selectedFolders"
      :selected-all="selectedAll"
      :deleting.sync="deleting"
      :restoring.sync="restoring"
      trash-mode
      @copied="selectNone"
      @fromTrashMode="removeSelectedAll"
      @deleted="removeSelectedAll"
      @moved="removeSelectedFiles"
      @click:select-all="selectAll"
      @click:select-none="selectNone"
    />
  </div>
</template>

<script>
/* eslint-disable camelcase */
import { ContentLoader } from 'vue-content-loader'
import fileSelection from '~/mixins/fileSelection'
import assetSorting from '~/mixins/assetSorting'
import ToolBar from '~/components/dam/ToolBar'
import SelectionBar from '~/components/dam/SelectionBar'
import Resource from '~/components/dam/AssetList/Resource'
import Folder from '~/components/dam/AssetList/Folder'
import ListingHeader from '~/components/dam/AssetList/ListingHeader'
import DeleteDialog from '~/components/plugins/DeleteDialog'

export default {
  components: {
    ContentLoader,
    Folder,
    Resource,
    ToolBar,
    SelectionBar,
    ListingHeader,
    DeleteDialog,
  },
  mixins: [fileSelection, assetSorting],
  layout: 'damLayout',
  middleware: [
    'authCheck',
    'checkWorkspace',
    'can-access-dam-module',
    'check-if-suspended',
  ],
  data() {
    let page
    if (this.$route.query.page) {
      const queryPage = Number(this.$route.query.page)
      page = isNaN(queryPage) ? 0 : queryPage
    } else page = 1

    return {
      files: [],
      subFolders: [],
      noData: false,
      mode: 'tile', // list Style
      loading: true,
      deleting: false,
      restoring: false,
      page,
      lastPage: -1,
      totalApiAssets: null,
      resource: [],
      resourceType: null,
    }
  },
  computed: {
    totalAssets() {
      return this.lastPage > 1
        ? this.totalApiAssets
        : this.files.length + this.subFolders.length
    },
    selectedCount() {
      return this.selectedFiles.length + this.selectedFolders.length
    },
    selectedAll() {
      const length = this.files.length + this.subFolders.length
      return !!length && this.selectedCount === length
    },
  },
  watch: {
    page(page) {
      if (page === -1) this.$router.replace({ query: null })
      else {
        this.$router.replace({ query: { page } })
        this.getData()
      }
    },
  },
  mounted() {
    this.getData()
  },
  methods: {
    toggleFolderSelection(folder) {
      if (
        folder.parent_id === parseInt(this.hashParam) ||
        (folder.parent_id === null && isNaN(parseInt(this.hashParam)))
      ) {
        this.currentFolder = true
      } else {
        this.currentFolder = false
      }
      const index = this.selectedFolders.findIndex(({ id }) => folder.id === id)
      if (~index) {
        this.selectedFolders.splice(index, 1)
      } else {
        this.selectedFolders.push(folder)
      }

      if (this.selectedFolders.length === 0) {
        this.parentOfselected = null
      } else {
        this.parentOfselected = folder.parent_id
      }
    },
    dropDown(file, type, resourceType) {
      this.resourceType = resourceType
      this.resource = [file]
      if (type === 'delete') {
        this.$refs.deleteDialog.show()
      } else if (type === 'restore') {
        this.$refs.restoreDialog.show()
      }
    },
    deleteFromDrop() {
      const folders = this.resourceType === 'folder' ? this.resource : []
      const files = this.resourceType === 'file' ? this.resource : []
      this.deleting = true
      this.$axios
        .$post('digital-assets/category/permanent-delete-category-with-files', {
          workspace_id: this.$getWorkspaceId(),
          category_ids: folders.map((e) => e.id),
          assets_ids: files.map((e) => e.id),
        })
        .then(({ message }) => {
          if (message) this.$toast.global.success(message)

          folders.forEach((folder) =>
            this.$store.dispatch('dam/removeFolderFromList', folder)
          )

          this.$nextTick(() => {
            this.subFolders = this.subFolders.filter(
              (e) => e.id !== this.resource[0].id
            )
            this.files = this.files.filter((e) => e.id !== this.resource[0].id)
            this.selectedFolders = this.selectedFolders.filter(
              (e) => e.id !== this.resource[0].id
            )
            this.selectedFiles = this.selectedFiles.filter(
              (e) => e.id !== this.resource[0].id
            )
            this.deleting = false
          })
        })
        .catch((e) => {
          this.deleting = false
          this.$toast.global.error(this.$getErrorMessage(e))
        })
    },
    restoreFromDrop() {
      this.restoring = true
      const folder = this.resourceType === 'folder' ? this.resource[0] : null
      const file = this.resourceType === 'file' ? this.resource[0] : null
      this.$axios
        .$post('digital-assets/category/restore-deleted-category-with-files', {
          workspace_id: this.$getWorkspaceId(),
          category_ids: folder ? [folder.id] : [],
          assets_ids: file ? [file.id] : [],
        })
        .then(({ message }) => {
          if (message) this.$toast.global.success(message)

          if (folder) this.$store.dispatch('dam/removeFolderFromList', folder)

          this.$nextTick(() => {
            if (file) {
              this.files = this.files.filter(({ id }) => id !== file.id)
              this.selectedFiles = this.selectedFiles.filter(
                ({ id }) => id !== file.id
              )
            }
            if (folder) {
              this.subFolders = this.subFolders.filter(
                ({ id }) => id !== folder.id
              )
              this.selectedFolders = this.selectedFolders.filter(
                ({ id }) => id !== folder.id
              )
            }
            this.resource = []
            this.restoring = false
          })
        })
        .catch((e) => {
          this.restoring = false
          this.$toast.global.error(this.$getErrorMessage(e))
        })
    },
    prefetch() {
      this.totalApiAssets = null
      this.page = 1
      this.lastPage = -1
      this.deleting = false
      this.getData()
    },
    selectAll() {
      this.selectedFiles = [...this.files]
      this.selectedFolders = [...this.subFolders]
    },
    removeAll() {
      this.prefetch()
    },
    removeSelectedAll(selectionOption, resourceTypes = []) {
      let selectedFile = null
      let selectedFolder = null
      if (selectionOption === 'dropDown') {
        if (resourceTypes.includes('file')) {
          selectedFile = this.resource
          selectedFolder = this.selectedFolders
        }
        if (resourceTypes.includes('folder')) {
          selectedFile = this.selectedFiles
          selectedFolder = this.resource
        }
      } else {
        selectedFile = this.selectedFiles
        selectedFolder = this.selectedFolders
      }
      const fileIds = selectedFile.map(({ id }) => id)
      this.files = this.files.filter(({ id }) => !fileIds.includes(id))

      const folderIds = selectedFolder.map(({ id }) => id)
      this.subFolders = this.subFolders.filter(
        ({ id }) => !folderIds.includes(id)
      )

      const file_ids = this.selectedFiles.map(({ id }) => id)
      this.files = this.files.filter(({ id }) => !file_ids.includes(id))
      this.selectedFiles = this.selectedFiles.filter(
        ({ id }) => !file_ids.includes(id)
      )
      const folder_ids = this.selectedFolders.map(({ id }) => id)
      this.subFolders = this.subFolders.filter(
        ({ id }) => !folder_ids.includes(id)
      )
      this.selectedFolders = this.selectedFolders.filter(
        ({ id }) => !folder_ids.includes(id)
      )

      this.noData = !this.files.length && !this.subFolders.length
    },
    removeSelectedFiles() {
      const fileIds = this.selectedFiles.map(({ id }) => id)
      this.files = this.files.filter(({ id }) => !fileIds.includes(id))
      this.selectedFiles = []

      this.noData = !this.files.length && !this.subFolders.length
    },
    removeFile(...files) {
      const fileIds = files.map(({ id }) => id)
      this.files = this.files.filter(({ id }) => !fileIds.includes(id))
      this.selectedFiles = this.selectedFiles.filter(
        ({ id }) => !fileIds.includes(id)
      )

      this.noData = !this.files.length && !this.subFolders.length
    },
    removeFolders(...folders) {
      const folderIds = folders.map(({ id }) => id)
      this.subFolders = this.subFolders.filter(
        ({ id }) => !folderIds.includes(id)
      )
      this.selectedFolders = this.selectedFolders.filter(
        ({ id }) => !folderIds.includes(id)
      )

      this.noData = !this.files.length && !this.subFolders.length
    },
    async getData() {
      this.loading = true
      this.noData = false
      this.subFolders = []
      this.files = []
      this.selectNone()

      await this.getDeletedItems()

      this.noData = !this.files.length && !this.subFolders.length

      this.loading = false
    },
    async getDeletedItems() {
      const body = {
        workspace_id: this.$getWorkspaceId(),
      }

      await this.$axios
        .$get(
          'digital-assets/category/get-deleted-category-with-files?' +
            this.$toQueryString(body)
        )
        .then(({ data: { categories, assets } }) => {
          this.subFolders = (categories || []).map((folder) => ({
            ...folder,
            total_contain:
              (folder.total_assets || 0) + (folder.sub_category_count || 0),
          }))
          this.files = assets || []
        })
        .catch((e) => {
          const message = this.$getErrorMessage(e)
          if (message === 'Category not found')
            return this.$router.replace({
              name: 'workspace_id-asset-manager-folders',
              params: { workspace_id: this.$getWorkspaceId() },
            })

          this.$errorToast(message)
        })
    },
  },
}
</script>
