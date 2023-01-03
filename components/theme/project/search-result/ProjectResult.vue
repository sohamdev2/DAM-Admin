<template>
  <li>
    <div
      v-if="timeObject && timeObject.project_id == project.project_id"
      class="status-no-dropdown"
      :style="{
        background: `${project.project_status_color}`,
        color: `${project.status_text_color}`,
      }"
    >
      <span>{{ project.project_status_text }}</span>
    </div>

    <div v-else class="status-dropdown no-border no-arrow">
      <Select2WithProjectStatusColor
        :value="project.project_status_id"
        :class-obj="{ 'status-select': true }"
        dropdown-css-class="status-select"
        :options="project.project_status_details"
        :custom-event="true"
        :workspace-id="project.workspace_id"
        :custom-project-status-event="true"
        @optionChangeHandler="
          updateProject(
            project.project_id,
            project.workspace_id,
            'project_status_id',
            ...arguments,
            project.project_status_id
          )
        "
      >
      </Select2WithProjectStatusColor>
    </div>

    <div class="ProjectNameCode tb-column project-auto">
      <div class="media">
        <div class="media-body">
          <div class="top-column">
            <nuxt-link
              v-tooltip="{
                content: project.project_name,
                html: false,
              }"
              :to="{
                name: 'workspace_id-project-project_id',
                params: {
                  workspace_id: project.workspace_id,
                  project_id: project.project_id,
                },
              }"
              v-html="$getSearchedMarkedText(project.title, query)"
            >
            </nuxt-link>
            <div v-if="project.is_lock == 1" class="project-locked">
              <svg
                id="Layer_1"
                class="lock-fill-icon"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 18 18"
                xml:space="preserve"
              >
                <g id="Fill_Lock">
                  <g id="padlock_4_" transform="translate(2.25)">
                    <g id="Group_39407">
                      <path
                        id="Path_40220"
                        class="fill-color"
                        d="M11.8,7.3V5.1c0-2.8-2.3-5-5.1-5c-2.7,0-5,2.3-5,5v2.2C0.8,7.3,0,8,0,8.9C0,9,0,9,0,9v7.3C0,17.2,0.8,18,1.7,18h10.1c0.9,0,1.7-0.8,1.7-1.7V9C13.5,8.1,12.8,7.3,11.8,7.3C11.9,7.3,11.8,7.3,11.8,7.3z M2.8,5.1c0-2.2,1.8-3.9,4-3.9c2.1,0,3.8,1.7,3.9,3.9v2.2H2.8L2.8,5.1z M7.3,13.4v1.2c0,0.3-0.3,0.6-0.6,0.5c-0.3,0-0.5-0.2-0.5-0.5v-1.2c-0.7-0.2-1.1-0.9-1.1-1.6c0-0.9,0.8-1.7,1.7-1.6c0.9,0,1.6,0.7,1.6,1.6C8.4,12.5,8,13.2,7.3,13.4L7.3,13.4z"
                      />
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </div>
          <div class="bottom-column">
            <span v-if="project.job_code"
              >{{ project.project_number }} - {{ project.job_code }}</span
            >
            <span v-else>{{ project.project_number }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="flag tb-column project-column xxsmall-cell text-center">
      <a
        v-tooltip="
          'When you Flag is an item, it added to your favorites list for fast and easy finding next time you log in.'
        "
        :class="{
          'project-favorite': project.favourite_project == '1',
          'project-not-favorite': project.favourite_project == '0',
        }"
        @click="addToFavouriteProject(project.project_id, project.workspace_id)"
      >
        <svg
          v-if="project.favourite_project == '1'"
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
    <div
      v-if="!$_auth().user.project.isClient"
      class="Workspace tb-column project-column"
    >
      <div class="top-column">
        <label>{{ project.bucket_type ? project.bucket_type : '-' }}</label>
      </div>
    </div>
    <div
      v-if="!$_auth().user.project.isClient"
      class="Workspace tb-column project-column"
    >
      <div class="top-column">
        <label>{{ project.workspace_name }}</label>
      </div>
    </div>
    <div
      v-if="!$_auth().user.project.isClient"
      class="ClientFundingSource tb-column project-column"
    >
      <div class="media">
        <div
          v-if="project.project_client_details != null"
          class="media-left p0"
        >
          <div
            v-if="project.project_client_details.website_favicon_link != null"
            class="profile-bg"
            :style="{
              'background-image': getClientImage(
                project.project_client_details
              ),
            }"
          ></div>
          <div
            v-else-if="project.project_client_details.company_logo != null"
            class="profile-bg"
            :style="{
              'background-image': getClientImage(
                project.project_client_details
              ),
            }"
          ></div>
          <div
            v-else
            class="profile-icon"
            :style="{
              'background-image': getClientImage(
                project.project_client_details
              ),
            }"
          ></div>
        </div>
        <div class="media-body">
          <div class="top-column">
            <label>{{ project.client_name }}</label>
          </div>
          <div class="bottom-column">
            <span>{{
              project.sub_client_company_name != null
                ? project.sub_client_company_name
                : '-'
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="!$_auth().user.project.isClient"
      class="QuickNote tb-column project-column big-cell"
    >
      <div class="top-column">
        <div
          class="NoteBox"
          data-toggle="modal"
          data-target="#quick-note"
          @click="$emit('addQuickNoteDialog', project)"
        >
          <span v-if="!project.quick_note">Quick notes here...</span>
          <p v-if="project.quick_note" v-html="project.quick_note"></p>
        </div>
      </div>
    </div>
    <div
      v-if="!$_auth().user.project.isClient"
      class="ProjectHours tb-column project-column xsmall-cell"
    >
      <div>
        <div class="top-column">
          <label v-tooltip="'Utilized Hours'">{{
            project.hoursUtilizedInHour.replace('Hours', '')
          }}</label>
        </div>
        <div v-if="project.project_hrs" class="bottom-column">
          <span
            v-tooltip="'Project Hours'"
            :class="{
              'text-danger':
                project.project_hrs <=
                project.hoursUtilizedInHour.split(':')[0],
            }"
            >{{ project.project_hrs }}</span
          >
        </div>
      </div>
    </div>
    <div
      v-if="!$_auth().user.project.isClient"
      class="ProjectOwner tb-column project-column xsmall-cell"
    >
      <div class="top-column">
        <div class="assignee-dropdown no-border no-arrow">
          <Select2WithImageOwner
            v-model="project_owner"
            dropdown-css-class="assignee-select"
            :options="project.project_users"
            :custom-event="true"
            :workspaceid="project.workspace_id"
            :projectid="project.project_id"
            :projecttype="'project'"
            @optionChangeHandler="
              updateProject(
                project.project_id,
                project.workspace_id,
                'project_owner',
                ...arguments,
                ''
              )
            "
          />
        </div>
      </div>
    </div>
    <div
      v-if="!$_auth().user.project.isClient"
      class="ProjectOwner tb-column project-column xsmall-cell"
    >
      <div class="top-column">
        <div class="assignee-dropdown no-border no-arrow">
          <Select2WithImageOwner
            v-model="development_owner"
            dropdown-css-class="assignee-select"
            :options="project.development_owner_users"
            :custom-event="true"
            :workspaceid="project.workspace_id"
            :projectid="project.project_id"
            :projecttype="'project'"
            @optionChangeHandler="
              updateProject(
                project.project_id,
                project.workspace_id,
                'development_owner',
                ...arguments,
                ''
              )
            "
          />
        </div>
      </div>
    </div>
    <div
      v-if="$_auth().user.project.isClient"
      class="ClientFundingSource tb-column project-column"
    >
      <div class="top-column">
        <div v-if="project.account_manager_details" class="media">
          <div class="media-left p0">
            <div
              v-if="project.account_manager_details.display_profile_image"
              class="profile-bg"
              :style="{
                backgroundImage: `url('${project.account_manager_details.display_profile_image}')`,
              }"
            ></div>
            <div
              v-if="!project.account_manager_details.display_profile_image"
              :class="[
                'profile-char',
                'fl-as-imgtxt',
                project.account_manager_details.name.charAt(0).toLowerCase(),
              ]"
            >
              {{ project.account_manager_details.name.charAt(0).toUpperCase() }}
            </div>
          </div>
          <div class="media-body">
            <label>{{ project.account_manager_details.name }}</label>
          </div>
        </div>
        <div v-else class="media">
          <div class="media-body">
            <label>-</label>
          </div>
        </div>
      </div>
    </div>
    <div class="DueDate tb-column project-column xsmall-cell">
      <div class="top-column">
        <DatePicker
          human
          :placeholder="'No start date'"
          :class-obj="'datepicker no-icon form-control'"
          :max-date="project.project_due_date ? project.project_due_date : ''"
          :start-date.sync="project.project_start_date"
          :custom-event="true"
          @dateChanged="
            updateProject(
              project.project_id,
              project.workspace_id,
              'project_start_date',
              [
                ...arguments,
                project.project_start_date,
                project.project_due_date,
              ],
              ''
            )
          "
        />
        <span v-if="project.project_start_date" class="remove-date">
          <svg
            id="Layer_1"
            v-tooltip="'Remove start date'"
            class="close-icon h-red"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 18 18"
            xml:space="preserve"
            @click="
              updateProject(
                project.project_id,
                project.workspace_id,
                'project_start_date',
                [
                  { startDate: null },
                  project.project_start_date,
                  project.project_due_date,
                ],
                ''
              )
            "
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
      </div>
    </div>
    <div class="infiniteDate tb-column project-column xsmall-cell">
      <div class="top-column">
        <!--        <span
          v-if="project.project_due_date != null && project.is_infinite == '0'"
          class="date"
          >{{
            $moment(project.project_due_date).local().format('MMM D, YY')
          }}</span
        >-->
        <!-- :disabled="project.project_due_date && project.is_infinite == '0'"-->
        <DatePicker
          v-if="project.project_due_date && project.is_infinite == '0'"
          human
          color-date
          :placeholder="'No due date'"
          :class-obj="'datepicker no-icon form-control'"
          :min-date="
            project.project_start_date ? project.project_start_date : ''
          "
          :start-date.sync="project.project_due_date"
          :custom-event="true"
          @dateChanged="
            updateProject(
              project.project_id,
              project.workspace_id,
              'project_due_date',
              [
                ...arguments,
                project.project_start_date,
                project.project_due_date,
              ],
              ''
            )
          "
        />
        <span
          v-if="!project.project_due_date && project.is_infinite == '1'"
          class="idate"
        >
          <svg
            id="Layer_1"
            class="infinite-icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 409 409"
            xml:space="preserve"
          >
            <path
              class="fill-color"
              d="M94.6,298.9c-25.2,0-49-9.7-66.9-27.4C9.9,253.8,0,230.2,0,205.2c0-25.1,9.9-48.6,27.8-66.4c17.9-17.7,41.6-27.4,66.9-27.4h0c25.2,0,48.9,9.7,66.8,27.4l42.9,42.4c16.1-15.9,42.9-42.4,42.9-42.4c17.9-17.7,41.6-27.4,66.8-27.4h0c52.2,0,94.7,42.1,94.7,93.7c0,25.1-9.9,48.6-27.8,66.3c-17.9,17.7-41.6,27.4-66.9,27.4c0,0,0,0,0,0c-25.2,0-48.9-9.7-66.9-27.4l-42.9-42.4c-16.1,15.9-42.9,42.4-42.9,42.4C143.6,289.2,119.9,298.9,94.6,298.9C94.7,298.9,94.7,298.9,94.6,298.9z M228.5,205l42.8,42.3c11.5,11.3,26.8,17.5,42.9,17.5h0c16.2,0,31.5-6.2,42.9-17.5c11.4-11.3,17.7-26.2,17.7-42.1c0-32.9-27.2-59.6-60.6-59.6c-16.2,0-31.4,6.2-42.9,17.6C251.7,182.5,238.1,195.9,228.5,205z M94.7,145.5L94.7,145.5c-16.3,0-31.5,6.2-43,17.5c-11.4,11.3-17.7,26.2-17.7,42.1c0,15.9,6.3,30.9,17.7,42.1c11.4,11.3,26.7,17.5,42.9,17.5h0c16.2,0,31.4-6.2,43-17.6c19.7-19.4,33.2-32.8,42.8-41.8l-42.9-42.3C126.2,151.7,110.9,145.5,94.7,145.5z"
            />
          </svg>
        </span>
        <div class="calendarInfiniteDate">
          <DatePicker
            v-tooltip="'Click to set Due Date'"
            human
            color-date
            :placeholder="'No due date'"
            :class-obj="'datepicker form-control'"
            :min-date="
              project.project_start_date ? project.project_start_date : ''
            "
            :start-date.sync="project.project_due_date"
            :custom-event="true"
            @dateChanged="
              updateProject(
                project.project_id,
                project.workspace_id,
                'project_due_date',
                [
                  ...arguments,
                  project.project_start_date,
                  project.project_due_date,
                ],
                ''
              )
            "
          />
          <a
            v-if="project.is_infinite == '0' && project.project_due_date"
            href="javascript:void(0);"
            class="infinite"
          >
            <svg
              id="Layer_1"
              v-tooltip="'Click to set No Due Date'"
              class="infinite-icon h-orange"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 409 409"
              xml:space="preserve"
              @click="
                updateProject(
                  project.project_id,
                  project.workspace_id,
                  'is_infinite',
                  '1',
                  ''
                )
              "
            >
              <path
                class="fill-color"
                d="M94.6,298.9c-25.2,0-49-9.7-66.9-27.4C9.9,253.8,0,230.2,0,205.2c0-25.1,9.9-48.6,27.8-66.4c17.9-17.7,41.6-27.4,66.9-27.4h0c25.2,0,48.9,9.7,66.8,27.4l42.9,42.4c16.1-15.9,42.9-42.4,42.9-42.4c17.9-17.7,41.6-27.4,66.8-27.4h0c52.2,0,94.7,42.1,94.7,93.7c0,25.1-9.9,48.6-27.8,66.3c-17.9,17.7-41.6,27.4-66.9,27.4c0,0,0,0,0,0c-25.2,0-48.9-9.7-66.9-27.4l-42.9-42.4c-16.1,15.9-42.9,42.4-42.9,42.4C143.6,289.2,119.9,298.9,94.6,298.9C94.7,298.9,94.7,298.9,94.6,298.9z M228.5,205l42.8,42.3c11.5,11.3,26.8,17.5,42.9,17.5h0c16.2,0,31.5-6.2,42.9-17.5c11.4-11.3,17.7-26.2,17.7-42.1c0-32.9-27.2-59.6-60.6-59.6c-16.2,0-31.4,6.2-42.9,17.6C251.7,182.5,238.1,195.9,228.5,205z M94.7,145.5L94.7,145.5c-16.3,0-31.5,6.2-43,17.5c-11.4,11.3-17.7,26.2-17.7,42.1c0,15.9,6.3,30.9,17.7,42.1c11.4,11.3,26.7,17.5,42.9,17.5h0c16.2,0,31.4-6.2,43-17.6c19.7-19.4,33.2-32.8,42.8-41.8l-42.9-42.3C126.2,151.7,110.9,145.5,94.7,145.5z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
    <div class="tb-column project-column medium-cell">
      <div class="project-icons">
        <a v-if="project.icon_show" v-tooltip="'Collaborated Project'">
          <svg
            id="Layer_1"
            class="collaborated-project-icon h-orange"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 18 18"
            xml:space="preserve"
          >
            <g id="Group_5035" transform="translate(-338.099 -972.884)">
              <path
                id="Path_3590"
                class="fill-color"
                d="M351.4,989.3c0.1,0.1,0.2,0.2,0.4,0.3c-2,1.2-4.3,1.6-6.6,1.1c-0.4-0.1-0.7-0.5-0.6-0.9c0,0,0-0.1,0-0.1c0-0.1,0.1-0.2,0.2-0.3c0.2-0.2,0.4-0.2,0.7-0.2c1.8,0.4,3.8,0.1,5.4-0.8C351,988.7,351.1,989,351.4,989.3L351.4,989.3z"
              ></path>
              <path
                id="Path_3591"
                class="fill-color"
                d="M354.8,977.2c1.2,2,1.7,4.4,1.1,6.7c-0.1,0.4-0.5,0.6-0.9,0.6c0,0,0,0,0,0l-0.1,0c-0.4-0.1-0.6-0.5-0.5-0.8c0.4-1.8,0.1-3.7-0.8-5.3c0.3-0.1,0.5-0.3,0.7-0.5C354.5,977.6,354.7,977.4,354.8,977.2z"
              ></path>
              <path
                id="Path_3592"
                class="fill-color"
                d="M349.6,974.1c0,0.1-0.1,0.2-0.2,0.3c-0.2,0.2-0.4,0.2-0.7,0.2c-1.8-0.4-3.7-0.1-5.3,0.8c-0.1-0.3-0.3-0.5-0.5-0.7c-0.2-0.2-0.3-0.3-0.5-0.4c2-1.2,4.4-1.6,6.6-1.1c0.4,0.1,0.7,0.5,0.6,0.9C349.6,974,349.6,974,349.6,974.1z"
              ></path>
              <path
                id="Path_3593"
                class="fill-color"
                d="M339.6,979.6c0.2,0.2,0.2,0.4,0.2,0.7c-0.4,1.8-0.1,3.7,0.8,5.3c-0.3,0.1-0.5,0.3-0.7,0.5c-0.2,0.2-0.3,0.3-0.4,0.5c-1.2-2-1.6-4.4-1.1-6.6c0.1-0.4,0.5-0.7,0.9-0.6c0,0,0,0,0,0c0,0,0.1,0,0.1,0C339.4,979.4,339.5,979.5,339.6,979.6L339.6,979.6z"
              ></path>
              <path
                id="Path_3594"
                class="fill-color"
                d="M352.9,990.7c-0.6,0-1.1-0.2-1.6-0.5c-0.2-0.1-0.3-0.2-0.5-0.4c-0.3-0.3-0.6-0.7-0.7-1.2c-0.5-1.5,0.3-3.2,1.9-3.7c1.5-0.5,3.2,0.3,3.7,1.9c0.5,1.5-0.3,3.2-1.9,3.7C353.5,990.6,353.2,990.7,352.9,990.7z M352.9,986.3c-0.8,0-1.5,0.7-1.5,1.5c0,0,0,0,0,0c0,0.2,0,0.3,0.1,0.4c0.1,0.2,0.2,0.4,0.4,0.6c0.1,0.1,0.2,0.1,0.2,0.2c0.7,0.4,1.6,0.2,2-0.4c0.4-0.7,0.2-1.6-0.4-2C353.5,986.4,353.2,986.3,352.9,986.3L352.9,986.3z"
              ></path>
              <path
                id="Path_3595"
                class="fill-color"
                d="M341.4,979.1c-1.6,0-2.9-1.3-2.9-2.9c0-1.6,1.3-2.9,2.9-2.9c0.5,0,0.9,0.1,1.4,0.3c0.3,0.1,0.5,0.3,0.7,0.5c0.3,0.3,0.5,0.6,0.6,1c0.5,1.1,0.2,2.4-0.6,3.2C342.9,978.8,342.2,979.1,341.4,979.1L341.4,979.1zM341.4,974.7c-0.8,0-1.5,0.7-1.5,1.5c0,0.4,0.2,0.8,0.4,1l0,0c0.6,0.6,1.5,0.6,2.1,0c0,0,0,0,0,0l0,0c0.4-0.4,0.5-1,0.3-1.6c-0.1-0.2-0.2-0.3-0.3-0.5c-0.1-0.1-0.2-0.2-0.3-0.2C341.9,974.8,341.6,974.7,341.4,974.7L341.4,974.7z"
              ></path>
              <path
                id="Path_3596"
                class="fill-color"
                d="M341.4,990.5c-1.6,0-2.9-1.3-2.9-2.9c0-0.5,0.1-0.9,0.3-1.3c0.1-0.3,0.3-0.5,0.5-0.7c0.3-0.3,0.6-0.5,1-0.6c1.1-0.5,2.4-0.2,3.2,0.6c1.1,1.1,1.1,3,0,4.1C342.9,990.2,342.2,990.5,341.4,990.5L341.4,990.5zM341.4,986.1c-0.4,0-0.8,0.2-1,0.4c-0.1,0.1-0.2,0.2-0.2,0.3c-0.4,0.7-0.1,1.6,0.6,2c0.6,0.3,1.3,0.2,1.7-0.3l0,0c0.6-0.6,0.6-1.5,0-2.1l0,0C342.2,986.3,341.8,986.1,341.4,986.1L341.4,986.1z"
              ></path>
              <path
                id="Path_3597"
                class="fill-color"
                d="M352.8,979.1c-1.6,0-2.9-1.3-2.9-2.9c0-1.6,1.3-2.9,2.9-2.9s2.9,1.3,2.9,2.9c0,0.5-0.1,0.9-0.3,1.4c-0.1,0.3-0.3,0.5-0.5,0.7C354.3,978.8,353.6,979.1,352.8,979.1L352.8,979.1z M352.8,974.7c-0.8,0-1.5,0.7-1.5,1.5c0,0.8,0.7,1.5,1.5,1.5c0.2,0,0.4,0,0.6-0.1c0.2-0.1,0.3-0.2,0.5-0.3c0.1-0.1,0.2-0.2,0.2-0.3c0.4-0.7,0.1-1.6-0.6-2C353.3,974.8,353,974.7,352.8,974.7L352.8,974.7z"
              ></path>
            </g>
          </svg>
        </a>

        <nuxt-link
          v-if="project.is_bucket && !$_auth().user.project.isClient"
          v-tooltip="'Bucket :' + ' ' + project.bucket_number"
          :to="{
            name: 'workspace_id-project-bucket-bucket_id-client_id',
            params: {
              workspace_id: project.workspace_id,
              bucket_id: project.bucket_id,
              client_id:
                project.project_client_details != null
                  ? project.project_client_details.id
                  : '',
            },
          }"
        >
          <svg
            id="Layer_1"
            class="bucket-project-icon h-orange"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 19 18"
            xml:space="preserve"
          >
            <path
              id="Path_3766"
              class="fill-color"
              d="M2.4,18L1.2,5H0V2c0-1.1,0.9-2,2-2h15c1.1,0,2,0.9,2,2v3h-1.2l-0.4,5.3h1.1V12h-1.3l-0.6,6L2.4,18z M15,16.3l0.4-4.4c-2.8-0.3-5.2-2.1-6.3-4.6C7.9,7.2,6.8,6.2,6.4,5H2.9l1,11.4H15z M10.9,7c0.9,1.8,2.7,3.1,4.7,3.3L16.1,5h-3.5C12.3,5.8,11.7,6.6,10.9,7L10.9,7z M8,3.3v0.8c0,0.5,0.3,1,0.7,1.3c0-0.3-0.1-0.7-0.1-1V3.3h1.7v1.1c0,0.3,0,0.6,0.1,0.9C10.8,5.1,11,4.6,11,4.1V3.3h6.3V2c0-0.2-0.2-0.3-0.3-0.3H2C1.8,1.7,1.7,1.8,1.7,2v1.3L8,3.3z"
            ></path>
          </svg>
        </nuxt-link>
        <a
          v-if="
            project.total_client_follower && !$_auth().user.project.isClient
          "
          v-tooltip="project.client_follower_name"
        >
          <svg
            id="Capa_1"
            class="client-followers-icon h-orange"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            xml:space="preserve"
          >
            <g>
              <path
                class="fill-color"
                d="M15,512h153.1c8.3,0,15-6.7,15-15v-16.7c0-34.7-19.4-64.9-47.9-80.4c10.1-10.7,16.3-25.2,16.3-41.1c0-33.1-26.9-60-60-60s-60,26.9-60,60c0,15.9,6.2,30.4,16.3,41.1C19.4,415.4,0,445.6,0,480.3V497C0,505.3,6.7,512,15,512zM61.5,358.8c0-16.5,13.5-30,30-30s30,13.5,30,30s-13.5,30-30,30S61.5,375.3,61.5,358.8z M91.5,418.8c32.1,0,61.5,25.2,61.5,63.3H30C30,444.1,59.2,418.8,91.5,418.8z"
              />
              <path
                class="fill-color"
                d="M464.1,399.8c10.1-10.7,16.3-25.2,16.3-41.1c0-33.1-26.9-60-60-60s-60,26.9-60,60c0,15.9,6.2,30.4,16.3,41.1c-28.5,15.5-47.9,45.8-47.9,80.4V497c0,8.3,6.7,15,15,15H497c8.3,0,15-6.7,15-15v-16.7C512,445.6,492.6,415.4,464.1,399.8zM390.5,358.8c0-16.5,13.5-30,30-30s30,13.5,30,30s-13.5,30-30,30S390.5,375.3,390.5,358.8z M482,482H358.9c0-37.9,29.2-63.3,61.5-63.3C452.6,418.8,482,443.9,482,482z"
              />
              <path
                class="fill-color"
                d="M347.5,198.3v-16.7c0-34.7-19.4-64.9-47.9-80.4C309.8,90.4,316,75.9,316,60c0-33.1-26.9-60-60-60s-60,26.9-60,60c0,15.9,6.2,30.4,16.3,41.1c-28.5,15.5-47.9,45.8-47.9,80.4v16.7c0,8.3,6.7,15,15,15h153.1C340.8,213.3,347.5,206.5,347.5,198.3z M226,60c0-16.5,13.5-30,30-30s30,13.5,30,30s-13.5,30-30,30S226,76.5,226,60z M317.5,183.3h-123c0-37.9,29.2-63.3,61.5-63.3C288.1,120,317.5,145.2,317.5,183.3z"
              />
              <path
                class="fill-color"
                d="M316.6,379c-19.6,6.4-40.3,9.7-61.4,9.7c-20.4,0-40.4-3-59.4-9.1c-7.9-2.5-16.3,1.9-18.8,9.8s1.9,16.3,9.8,18.8c21.9,6.9,45,10.5,68.5,10.5c24.3,0,48.2-3.8,70.8-11.2c7.9-2.6,12.2-11.1,9.6-18.9S324.5,376.5,316.6,379z"
              />
              <path
                class="fill-color"
                d="M117.7,124.3c-16.6,16-30.6,34.5-41.9,55.2c-11.6,21.4-19.7,44.1-23.9,67.5c-1.7,9.2,5.4,17.7,14.8,17.7c7.1,0,13.4-5.1,14.7-12.3c3.7-20.3,10.7-40,20.8-58.6c9.7-17.9,22-34.1,36.3-47.9c6-5.7,6.1-15.2,0.4-21.2C133.2,118.7,123.7,118.6,117.7,124.3z"
              />
              <path
                class="fill-color"
                d="M394.3,124.3c-6-5.8-15.5-5.6-21.2,0.4c-5.7,6-5.6,15.5,0.4,21.2c14.4,13.8,26.6,29.9,36.3,47.9c10.1,18.6,17.1,38.3,20.8,58.6c1.5,8.1,9.3,13.6,17.4,12.1s13.6-9.3,12.1-17.4c-4.3-23.4-12.3-46.2-23.9-67.5C424.9,158.8,410.8,140.3,394.3,124.3z"
              />
            </g>
          </svg>
        </a>
        <a
          v-if="project.is_micro_budget && !$_auth().user.project.isClient"
          v-tooltip="'Micro Budget'"
        >
          <svg
            id="Layer_1"
            class="micro-budget-icon h-orange"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 18 18"
            xml:space="preserve"
          >
            <path
              class="fill-color"
              d="M9,18c-2.4,0-4.7-0.9-6.4-2.6S0,11.4,0,9s0.9-4.7,2.6-6.4S6.6,0,9,0s4.7,0.9,6.4,2.6S18,6.6,18,9s-0.9,4.7-2.6,6.4S11.4,18,9,18L9,18z M9,1.1C4.7,1.1,1.1,4.7,1.1,9s3.5,7.9,7.9,7.9s7.9-3.5,7.9-7.9S13.3,1.1,9,1.1z"
            />
            <g>
              <path
                class="fill-color"
                d="M7.9,9.7c0-0.6-0.1-1.3,0-2.1h0C7.7,8.3,7.5,9,7.3,9.5l-0.6,2H5.8l-0.5-2C5.2,9,5,8.3,4.9,7.6h0c0,0.7-0.1,1.4-0.1,2.1l-0.1,2h-1L4,6.3h1.4l0.5,1.8C6.1,8.8,6.2,9.4,6.3,10h0c0.1-0.6,0.3-1.3,0.5-1.9l0.5-1.8h1.4L9,11.6H8L7.9,9.7z"
              />
              <path
                class="fill-color"
                d="M10.7,6.4c0.3-0.1,0.9-0.1,1.4-0.1c0.7,0,1.1,0.1,1.5,0.3c0.3,0.2,0.6,0.6,0.6,1c0,0.5-0.3,0.9-0.8,1.1v0c0.6,0.2,1,0.6,1,1.3c0,0.5-0.2,0.8-0.5,1.1c-0.4,0.3-1,0.5-2,0.5c-0.5,0-0.9,0-1.2-0.1V6.4z M11.8,8.5h0.3c0.6,0,0.9-0.3,0.9-0.7c0-0.4-0.3-0.6-0.8-0.6c-0.2,0-0.3,0-0.4,0V8.5z M11.8,10.8c0.1,0,0.2,0,0.4,0c0.5,0,0.9-0.2,0.9-0.8c0-0.5-0.4-0.8-1-0.8h-0.4V10.8z"
              />
            </g>
          </svg>
        </a>
      </div>
    </div>
  </li>
</template>
<script>
import DatePicker from '~/components/plugins/DatePicker'
import Select2WithProjectStatusColor from '~/components/plugins/Select2WithProjectStatusColor'
import Select2WithImageOwner from '~/components/plugins/Select2WithImageOwner'
import BuildingImage from '~/assets/img/icon/building-black.svg'
export default {
  components: {
    DatePicker,
    Select2WithProjectStatusColor,
    Select2WithImageOwner,
  },
  props: {
    project: { type: Object, required: true },
    index: Number,
  },
  data() {
    return {
      projectCommonData: true,
      project_owner_model: null,
      development_owner_model: null,
      buildingImage: BuildingImage,
      getProjectStatusId: null,
    }
  },

  computed: {
    project_owner: {
      get() {
        return (
          this.project_owner_model ||
          (this.project &&
            (this.project.project_owner ||
              (this.project.project_owner_details &&
                this.project.project_owner_details.id))) ||
          0
        )
      },
      set(v) {
        this.project_owner_model = v
      },
    },
    development_owner: {
      get() {
        return (
          this.development_owner_model ||
          (this.project &&
            (this.project.development_owner ||
              (this.project.development_owner_details &&
                this.project.development_owner_details.id))) ||
          0
        )
      },
      set(v) {
        this.development_owner_model = v
      },
    },

    timeObject() {
      return this.$store.state.timer.timeObject
    },
    query() {
      return this.$route.query.q
    },
    workspaceId() {
      return this.$getWorkspaceId()
    },
  },
  watch: {},
  methods: {
    addToFavouriteProject(project_id, workspace_id) {
      this.$axios
        .$get(
          `/project/add-remove-favourite?${new URLSearchParams({
            project_id,
            workspace_id,
          }).toString()}`
        )
        .then(({ data, message }) => {
          // eslint-disable-next-line vue/no-mutating-props
          this.project.favourite_project = data.favourite_project

          this.$emit('update:project', Object.assign({}, this.project))

          this.$toast.global.success(message)
        })
        .catch((e) => this.$toast.error(this.$getErrorMessage(e)))
    },
    updateProject(project_id, workspace_id, field_name, data, projectStatusId) {
      let field_value
      switch (field_name) {
        case 'project_owner':
        case 'development_owner':
        case 'project_status_id':
          field_value = data.id
          break
        case 'project_due_date':
          field_value = data[0].startDate
          break
        case 'project_start_date':
          field_value = data[0].startDate
          break
        case 'is_infinite':
          field_value = data
          break
        default:
          field_value = data
          break
      }
      if (field_name === 'project_status_id') {
        this.getProjectStatusId = projectStatusId
      }

      if (field_name === 'project_status_id' && data.status_name === 'Closed') {
        const closeProjectParameter = {
          project_status_id: field_value,
          project_id,
          workspace_id,
        }
        // eslint-disable-next-line vue/no-mutating-props
        this.project.project_status_id = field_value
        return this.$emit(
          'showProjectStatusDialog',
          closeProjectParameter,
          this.getProjectStatusId
        )
      } else {
        this.$axios
          .$post('/project/update-with-field', {
            workspace_id,
            project_id,
            field_name,
            field_value,
          })
          .then(({ data }) => {
            const project = Object.assign(this.project, data)
            if (data.project_status_text === 'Archive') {
              this.$emit('projectArchive', project)
              return
            }
            switch (field_name) {
              case 'project_owner':
                project.project_owner_details = this.project.project_users.find(
                  ({ id }) => parseInt(field_value) === parseInt(id)
                )
                break
              case 'development_owner':
                project.development_owner_details =
                  this.project.development_owner_users.find(
                    ({ id }) => parseInt(field_value) === parseInt(id)
                  )
                break
            }

            this.$emit('update:project', project)

            this.$toast.global.success('Project Updated')
          })
          .catch((e) => this.$toast.error(this.$getErrorMessage(e)))
      }
    },

    getClientImage(client) {
      if (client.website_favicon_link != null) {
        return ` url(${client.website_favicon_link})`
      } else if (client.company_logo != null) {
        return ` url(${client.display_company_logo})`
      } else {
        return `url(${this.buildingImage})`
      }
    },
  },
}
</script>
