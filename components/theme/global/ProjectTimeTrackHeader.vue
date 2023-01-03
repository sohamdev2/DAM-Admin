<template>
  <header class="header bg-gray">
    <div class="header-left">
      <!-- <CoreCommanSearchBar
        v-if="
          $route.name != 'profile' &&
          $route.name != 'notification-settings-workspace_id-module_id-type' &&
          $route.name != 'workspace_id-child-workspace-create' &&
          $route.name != 'workspace_id-child-workspace-choose-modules'
        "
      /> -->
    </div>
    <div class="header-right">
      <ProjectSystemNotifications
        v-if="
          $route.name != 'profile' &&
          $route.name != 'notification-settings-workspace_id-module_id-type' &&
          $route.name != 'workspace_id-child-workspace-create' &&
          $route.name != 'workspace_id-child-workspace-choose-modules'
        "
      />

      <ProfileDropDown />
    </div>
  </header>
</template>
<script>
import $ from 'jquery'
import moment from 'moment'
import ProfileDropDown from '~/components/theme/global/ProfileDropDown'
// import CoreCommanSearchBar from '~/components/theme/global/CoreCommanSearchBar'
import ProjectSystemNotifications from '~/components/theme/global/ProjectSystemNotifications'
export default {
  name: 'Header',
  components: {
    ProjectSystemNotifications,
    ProfileDropDown,
    // CoreCommanSearchBar,
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {
    this.loadJs()
    this.$echo
      .private(`timer.add.user.${this.$auth.user.id}`)
      .listen('.timerCreatedEvent', (e) => {
        // alert(JSON.stringify(e));
        // console.log('asdasdasdasd-time track')
        const data = e.data
        const isTodayDate = this.$moment(data.start_date)
          .local()
          .isSame(moment(), 'day')

        if (parseInt(data.user_id) === parseInt(this.$auth.user.id)) {
          if (isTodayDate) {
            if (data.full_time.trim() === '0:00') {
              this.resetTimer()
              this.initTimer(data)
              this.$toast.global.success('Timer has been started')
              // this.saveTimeEntryXInterval();
            }
          }
        }
      })

    this.$echo
      .private(`timer.update.user.${this.$auth.user.id}`)
      .listen('.timerUpdateEvent', (e) => {
        // console.log(JSON.stringify(e))
        // console.log('timerUpdateEvent - header time track')
        this.startStopTimerClientSide(e.data, e.data.user_id)

        const { data } = e
        const {
          id,
          display_project_title,
          project_id,
          project_name,
          project_task_id,
          project_task_name,
          hours,
          minutes,
        } = data

        if (parseInt(id) === parseInt(this.$store.state.timer.timeId)) {
          this.$store.commit('timer/setHours', hours)
          this.$store.commit('timer/setMinutes', minutes)
          this.$store.commit('timer/setDisplayHours', hours)
          this.$store.commit('timer/setDisplayMinutes', minutes)
          this.$store.commit('timer/setProjectDetail', {
            project_id,
            project_name,
          })
          this.$store.commit('timer/setTaskDetail', {
            project_task_id,
            project_task_name,
          })
          const timeObject = {
            ...this.$store.state.timer.timeObject,
            project_id,
            project_name,
            project_task_id,
            project_task_name,
            display_project_title,
            minutes,
            hours,
          }
          this.$store.commit('timer/setTimeObject', timeObject)
        }
      })
  },
  beforeDestroy() {
    this.$echo.leave(`timer.add.user.${this.$auth.user.id}`)
    this.$echo.leave(`timer.update.user.${this.$auth.user.id}`)
  },
  updated() {
    this.loadJs()
  },
  methods: {
    loadJs() {
      /* start header searchbar */
      $('.main-search-box .search-result-option').hover(function () {
        $('.search-result-option').removeClass('selected')
        $(this).addClass('selected')
      })
      $('.main-search .form-control').keypress(function () {
        $('.main-search').addClass('searching')
        $('.main-search-box .search-result-option:first-child').addClass(
          'selected'
        )
      })
      /* end header searchbar */
    },
  },
}
</script>
