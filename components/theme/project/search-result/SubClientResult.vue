<template>
  <li>
    <div class="tb-column flex20">
      <div class="media">
        <div class="media-left">
          <div
            v-if="client.display_company_logo"
            class="profile-bg"
            :title="client.company_name"
            :style="{
              backgroundImage: `url(${client.display_company_logo})`,
            }"
          ></div>
          <div
            v-else
            :class="[
              'profile-char',
              'fl-as-imgtxt',
              'bg-gray',
              client.company_name[0].toLowerCase(),
            ]"
          >
            {{ client.company_name[0].toUpperCase() }}
          </div>
        </div>
        <div class="media-body">
          <a
            class="table-a"
            @click="goToProjectList(client)"
            v-html="$getSearchedMarkedText(client.company_name, query)"
          ></a>
        </div>
      </div>
    </div>
    <div v-if="!$_auth().user.project.isClient" class="tb-column flex8">
      <label>{{ client.workspace_name }}</label>
    </div>
    <div class="tb-column flex20">
      <!--<label>{{
        client.client_contact_persons != null
          ? client.client_contact_persons.full_name
          : '&#45;&#45;'
      }}</label>-->
    </div>
    <div class="tb-column flex20">
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
    <div class="tb-column flex12">
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
  </li>
</template>
<script>
export default {
  name: 'SubClientResult',
  props: {
    client: { type: Object, required: true },
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
    getUserImage(client) {
      if (client.display_profile_image) {
        return ` url(${client.display_profile_image})`
      }
      if (!client.display_profile_image && client.user_name) {
        return ` url('https://ui-avatars.com/api/?name=${encodeURI(
          client.user_name
        )}&size=128&background=EFF1F3&font-size=0.5&bold=true')`
      }
    },
    goToProjectList(client) {
      const projectListFilterData = {
        client_id: [],
        internal_workspace_id: 0,
        workspaceId: this.$allowedWorkspaces('slug').project.ids,
        /* clientsOrNot: client.internal_client, */
        sub_client_id: [
          {
            client_id: client.id,
            client_name: client.company_name,
            // clientsOrNot: client.internal_client,
            id: client.id,
            text: client.company_name,
          },
        ],
        project_created_by_id: [],
        project_owner_id: [],
        development_owner_id: [],
        projectStatusId: [],
        search_term: '',
        is_recent_project: 0,
        is_archive_project: 0,
        is_favourite_project: 0,
        is_collaborate: 0,
        filterTextId: '1',
        sortValue: '',
        orderBy: '',
      }
      this.$store.dispatch(
        'project/projectserach/setProjectFilter',
        projectListFilterData
      )
      return this.$router.push({
        name: 'workspace_id-project-all-project-list',
        params: {
          workspace_id: this.$_auth().id,
        },
      })
    },
  },
}
</script>

<style></style>
