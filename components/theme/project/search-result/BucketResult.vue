<template>
  <li>
    <div class="ProjectNameCode tb-column project-auto">
      <div>
        <div class="top-column">
          <nuxt-link
            v-tooltip="bucket.bucket_name"
            :to="{
              name: 'workspace_id-project-bucket-bucket_id-client_id',
              params: {
                workspace_id:
                  bucket.workspace_details != null
                    ? bucket.workspace_details.workspace_id
                    : '',
                bucket_id: bucket.id,
                client_id:
                  bucket.client_details != null ? bucket.client_details.id : '',
              },
            }"
            v-html="$getSearchedMarkedText(bucket.bucket_name, query)"
          >
          </nuxt-link>
        </div>
        <div class="bottom-column bucket-id">
          <nuxt-link
            v-tooltip="bucket.bucket_name"
            :to="{
              name: 'workspace_id-project-bucket-bucket_id-client_id',
              params: {
                workspace_id:
                  bucket.workspace_details != null
                    ? bucket.workspace_details.workspace_id
                    : '',
                bucket_id: bucket.id,
                client_id:
                  bucket.client_details != null ? bucket.client_details.id : '',
              },
            }"
          >
            <span
              v-html="$getSearchedMarkedText(bucket.bucket_code, query)"
            ></span>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="Workspace tb-column project-column">
      <div class="top-column">
        <label>{{ bucket.bucket_type }}</label>
      </div>
    </div>
    <div class="Workspace tb-column project-column">
      <div class="top-column">
        <label>{{
          bucket.workspace_details != null
            ? bucket.workspace_details.workspace_name
            : ''
        }}</label>
      </div>
    </div>
    <div class="ClientFundingSource tb-column project-column">
      <div class="top-column">
        <label>{{
          bucket.client_details != null
            ? bucket.client_details.company_name
            : ''
        }}</label>
      </div>
    </div>
    <div class="ProjectOwner tb-column project-column">
      <div class="top-column">
        <div class="assignee-dropdown no-border">
          <Select2WithImageOwner
            v-model="bucketModel.bucket_owner"
            dropdown-css-class="assignee-select"
            :options="bucket.owner_details"
            :custom-event="true"
            :custom-bucket-owner-event="true"
            :workspaceid="bucket.workspace_details.workspace_id"
            :bucketid="bucket.id"
            @optionChangeHandler="
              bucketOwnerChangeHandler(
                ...arguments,
                bucket.workspace_details.workspace_id,
                bucket.id,
                bucket.client_details.id,
                'bucket_owner'
              )
            "
          />
        </div>
      </div>
    </div>
    <div class="ProjectHours text-center tb-column project-column medium-cell">
      <div class="top-column">
        <label
          :class="{
            'text-danger':
              bucket.bucket_hours <= bucket.hoursUtilizedInHour.split(':')[0],
          }"
          >{{ bucket.bucket_hours }} Hours</label
        >
      </div>
    </div>
    <div class="ProjectHours text-center tb-column project-column medium-cell">
      <div class="top-column">
        <label>{{ bucket.hoursUtilizedInHour }} Hours</label>
      </div>
    </div>
    <div class="ProjectHours text-center tb-column project-column medium-cell">
      <div class="top-column">
        <label>{{ bucket.hours_left }} Hours</label>
      </div>
    </div>
  </li>
</template>
<script>
import Select2WithImageOwner from '~/components/plugins/Select2WithImageOwner'
export default {
  components: {
    Select2WithImageOwner,
  },
  props: {
    bucket: { type: Object, required: true },
    /*
    bucketStatus: { type: Array, default: () => [] },
*/
    index: Number,
  },
  data() {
    return {
      projectCommonData: true,
      bucket_owner_model: null,
      bucketModel: Object.assign({}, this.bucket),
    }
  },

  computed: {
    bucket_owner: {
      get() {
        return (
          this.bucket_owner_model ||
          (this.bucket &&
            (this.bucket.bucket_owner ||
              (this.bucket.bucket_owner_details &&
                this.bucket.bucket_owner_details.id))) ||
          0
        )
      },
      set(v) {
        this.bucket_owner_model = v
      },
    },
    query() {
      return this.$route.query.q
    },
    workspaceId() {
      return this.$getWorkspaceId()
    },
  },
  watch: {
    bucket(bucket) {
      this.bucketModel = Object.assign({}, bucket)
    },
  },
  methods: {
    bucketOwnerChangeHandler(
      data,
      bucketWorkspaceId,
      bucketID,
      bucketClientId,
      input_field
    ) {
      let input_value = null
      switch (input_field) {
        case 'bucket_owner':
          if (data.id) {
            input_value = data.id
          } else {
            input_value = data
          }
          break
      }
      this.$axios
        .$post('/project/bucket/update-with-field', {
          bucket_id: bucketID,
          workspace_id: bucketWorkspaceId,
          bucket_client: bucketClientId,
          field_name: input_field,
          field_value: input_value,
        })
        .then(({ data }) => {
          // this.$emit('update:bucket', Object.assign(this.bucket, data))
          // const bucket = Object.assign(this.bucket, data)
          // switch (input_field) {
          //   case 'bucket_owner':
          //     bucket.owner_details = this.bucket.owner_details.find(
          //       ({ id }) => parseInt(input_value) === parseInt(id)
          //     )
          //     break
          // }
          // this.$emit('update:bucket', bucket)
        })
        .catch((e) => {
          const { data } = e.response
          this.$toast.error(data.message)
        })
    },
  },
}
</script>
