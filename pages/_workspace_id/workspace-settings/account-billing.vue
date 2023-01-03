<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="general-settings-right h-100">
    <div class="general-settings-title">
      <h4>Subscription</h4>
    </div>
    <div class="workspace-settings h-100 p-0 customscrollbar">
      <transition name="slide-up">
        <div
          v-if="subscription.status === 'cancel' && !trialInactive && !subscription.is_trial_account && !loading"
          class="alert alert-danger d-flex align-items-center"
        >
          <p class="mb0">
            You have requested to cancel the subscription on
            <strong>{{ $moment(Date.now()).format('DD MMM YYYY') }}</strong
            >. This subscription will be ending on
            <strong>{{
              $moment(
                (stripeSubscriptionObj.end_at ||
                  stripeSubscriptionObj.current_period_end) * 1000
              ).format('DD MMM YYYY')
            }}</strong
            >. Till that day you can access your account with full accessibility
            as per your subscribed plan and after that, your account will be
            permanently deactivated and you will no longer be able to access it.
            If you have changed your mind to continue your Lariat DAM journey
            with us then please reactivate your account using this button.
          </p>
          <a
            href="javascript:void(0);"
            class="btn btn-gray ml1"
            @click="reactivateSubscription()"
          >
            <SpinLoading v-show="reactivating" />
            {{ reactivating ? 'Reactivating...' : 'Reactivate Account' }}</a
          >
        </div>
      </transition>
      <div class="account-billing-setting">
        <div v-if="trialInactive && !loading">
          <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Trial was cancelled for this workspace</h5>
            </div>
            <div class="modal-body">
              <div class="box bg-gray-light p-4 mb2 text-center">
                <p>
                  To continue working with this workspace please subscribe by adding a payment method.
                </p>
                <br />
                <p>
                  You will be charged against your subscribed plan -
                  <strong
                    >{{ subscription.plan_name }}/{{
                      subscription.billing_cycle
                    }}</strong
                  >
                  for amount ${{ Number(subscription.price).toFixed(2) }}
                </p>
                <div
                  class="mt-4 d-flex align-items-center justify-content-center"
                >
                  <a
                    href="javascript:void(0);"
                    class="btn"
                    data-toggle="modal"
                    data-target="#paymentMethod"
                    :disabled="!!showAddCard"
                    :class="{ disabled: !!showAddCard }"
                    @click="addCardDialog()"
                  >
                    Add Payment Method</a
                  >
                </div>
                <form id="payment-form" @submit.prevent="addCard()">
                  <template v-if="showAddCard">
                    <div v-show="stripeElemLoaded" class="row">
                      <div class="col-md-8 offset-md-2">
                        <hr />
                      </div>
                    </div>
                    <div id="payment-element">
                      <div v-show="stripeElemLoaded" id="payment-element-stripe">
                        <!-- Elements will create form elements here -->
                      </div>
                      <div v-show="!stripeElemLoaded" class="spinnerWrapper">
                        <div class="spinner"></div>
                      </div>
                    </div>
                    <div v-if="stripeElemLoaded" class="mt-4">
                      <button
                        id="submit"
                        class="btn"
                        :disabled="!stripeElemLoaded"
                        :class="{ disabled: !stripeElemLoaded }"
                      >
                        Submit
                      </button>
                      <a
                        href="javascript:void(0);"
                        class="btn btn-gray"
                        :disabled="!stripeElemLoaded"
                        :class="{ disabled: !stripeElemLoaded }"
                        @click="showAddCard = false"
                        >Cancel</a
                      >
                    </div>
                  </template>
                  <div
                    id="error-message"
                    class="text-red"
                    v-html="addCardError"
                  ></div>
                </form>
              </div>
            </div>
          </div>
        </div>
        </div>
        <template v-else>
          <div class="d-flex align-items-center">
            <ContentLoader
              v-if="loading"
              :speed="2"
              :animate="true"
              :height="21"
              :width="200"
              :style="{
                width: '200px',
                height: '21px',
                borderRadius: '3px',
              }"
            >
              <rect x="0" :y="0" rx="0" ry="0" width="200" height="21" />
              />
            </ContentLoader>
            <template v-else>
              <h4 class="mb0 mr-2">Current Plan</h4>
              <span
                v-if="subscription.is_trial_account && subscription.trial_end_date"
                :class="{
                  'plan-status': true,
                  'alert-danger': subscription.trial_days < 0,
                  trial: subscription.is_trial_account > 0,
                }"
              >
                Trial
                <template v-if="subscription.trial_days < 0">ended on</template
                ><template v-else>ends on</template>
                {{
                  $moment(subscription.trial_end_date).format('DD MMM YYYY')
                }}</span
              >
              <span v-else class="plan-status alert-success">Active</span>
            </template>
          </div>
          <div v-if="pendingUpdate" class="box mb2 mt1">
            Your Plan upgrade process is completed successfully. Account and
            Billing page will be updated with latest details automatically after
            sometime.
          </div>
          <div class="box mb2 mt1" :style="{
            border: planColorBorder,
            background: planColorBackground,
          }">
            <div class="d-flex align-items-start justify-content-between">
              <div class="d-flex align-items-center">
                <ContentLoader
                  v-if="loading"
                  :speed="2"
                  :animate="true"
                  :height="21"
                  :width="400"
                  :style="{
                    width: '400px',
                    height: '21px',
                    borderRadius: '3px',
                  }"
                >
                  <rect x="0" :y="0" rx="0" ry="0" width="400" height="21" />
                  />
                </ContentLoader>
                <template v-else-if="(planName || '').length">
                  <span
                    :class="[
                      `plan-status ${(planName || '').toLowerCase()}`,
                      isCustomePlan ? 'custom' : '',
                    ]"
                  >
                    {{ planName }}
                  </span>
                  <h4 class="mb0 ml-2">Plan</h4>
                </template>
              </div>
              <h2 v-if="!subscription.is_trial_account">
                <ContentLoader
                  v-if="loading"
                  :speed="2"
                  :animate="true"
                  :height="21"
                  :width="200"
                  :style="{
                    width: '200px',
                    height: '21px',
                    borderRadius: '3px',
                  }"
                >
                  <rect x="0" :y="0" rx="0" ry="0" width="200" height="21" />
                  />
                </ContentLoader>
                <template v-else>
                  <span>$</span>{{ Number(subscription.price).toFixed(2)
                  }}<sup>/{{ billingCycle }}</sup></template
                >
              </h2>
            </div>
            <div class="d-flex align-items-end justify-content-between">
              <div>
                <div class="plan-detail">
                  <ContentLoader
                    v-if="loading"
                    :speed="2"
                    :animate="true"
                    :height="21"
                    :width="250"
                    :style="{
                      width: '250px',
                      height: '21px',
                      borderRadius: '3px',
                    }"
                  >
                    <rect x="0" :y="0" rx="0" ry="0" width="250" height="21" />
                    />
                  </ContentLoader>
                  <template v-else>
                    <label>Storage</label>
                    <p v-if="readableStorage(storage) === 'unlimited'">
                      Unlimited (
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
                      )
                    </p>
                    <p v-else>{{ readableStorage(storage) }}</p>
                  </template>
                </div>
                <div class="plan-detail">
                  <ContentLoader
                    v-if="loading"
                    :speed="2"
                    :animate="true"
                    :height="21"
                    :width="200"
                    :style="{
                      width: '200px',
                      height: '21px',
                      borderRadius: '3px',
                    }"
                  >
                    <rect x="0" :y="0" rx="0" ry="0" width="200" height="21" />
                    />
                  </ContentLoader>
                  <template v-else>
                    <label>Plan Duration</label>
                    <p>
                      {{
                        $moment(
                          stripeSubscriptionObj.current_period_start * 1000
                        ).format('DD MMM YYYY')
                      }}
                      to
                      {{
                        $moment(
                          stripeSubscriptionObj.current_period_end * 1000
                        ).format('DD MMM YYYY')
                      }}
                    </p>
                  </template>
                </div>
                <div class="plan-detail">
                  <ContentLoader
                    v-if="loading"
                    :speed="2"
                    :animate="true"
                    :height="21"
                    :width="300"
                    :style="{
                      width: '300px',
                      height: '21px',
                      borderRadius: '3px',
                    }"
                  >
                    <rect x="0" :y="0" rx="0" ry="0" width="300" height="21" />
                    />
                  </ContentLoader>
                  <template v-else>
                    <label>Next Billing Date</label>
                    <p>
                      {{
                        subscription.status === 'cancel' ||
                        scheduledPlanName ||
                        subscription.is_trial_account
                          ? '-'
                          : $moment(
                              stripeSubscriptionObj.ended_at ||
                                stripeSubscriptionObj.current_period_end * 1000
                            ).format('DD MMM YYYY')
                      }}
                    </p>
                  </template>
                </div>
              </div>
              <div
                v-if="!loading && !subscription.is_trial_account"
                class="d-flex align-items-center justify-content-end"
              >
                <a
                  v-if="!scheduledPlanName && !isCustomePlan"
                  href="javascript:void(0);"
                  class="btn btn-big"
                  :class="{ disabled: subscription.status === 'cancel' }"
                  :disabled="subscription.status === 'cancel'"
                  @click="
                    subscription.status === 'cancel'
                      ? ''
                      : $refs.planChangeModal.show()
                  "
                  >Change Plan</a
                >
              </div>
            </div>
          </div>
          <div v-if="scheduledPlanName" class="box mb2 mt1">
            <div class="custom-plans-info">
              <span
                :class="`plan-status ${(scheduledPlanName || '').toLowerCase()}`"
              >
                {{ scheduledPlanName }}
              </span>
              <p>
                plan is scheduled to be activated<template
                  v-if="scheduledPlanDate"
                >
                  on
                  <strong>{{
                    $moment(scheduledPlanDate).format('DD MMM YYYY')
                  }}</strong></template
                >
              </p>
            </div>
          </div>
          <div v-if="subscription.is_trial_account" class="mb2" :style="{
            background: `rgba(255,204,0,0.2)`,
            padding: '10px',
            fontSize: '13px',
            boxShadow: '0 0 0 1px rgb(255 204 0)',
            borderRadius: `1px`,
          }">
            <p class="mb0">Please note that you cannot upgrade/downgrade your plan during the trial period.</p>
          </div>
          <div
            class="d-flex align-items-center"
          >
            <ContentLoader
              v-if="loading"
              :speed="2"
              :animate="true"
              :height="21"
              :width="200"
              :style="{
                width: '200px',
                height: '21px',
                borderRadius: '3px',
              }"
            >
              <rect x="0" :y="0" rx="0" ry="0" width="200" height="21" />
              />
            </ContentLoader>
            <h4 v-else class="mb0">Payment Method</h4>
          </div>
          <div class="box mb2 mt1">
            <div class="visa-card-info">
              <div class="d-flex align-items-center justify-content-between">
                <ContentLoader
                  v-if="loading"
                  :speed="2"
                  :animate="true"
                  :height="21"
                  :width="400"
                  :style="{
                    width: '400px',
                    height: '21px',
                    borderRadius: '3px',
                  }"
                >
                  <rect x="0" :y="0" rx="0" ry="0" width="400" height="21" />
                  />
                </ContentLoader>
                <template v-else>
                  <template v-if="!(defaultPayment.brand || defaultPayment.bank)">
                    <div class="d-flex align-items-center">
                      <p class="mb0">
                        Payment collected outside of stripe through
                        {{
                          ((invoices[0] || {}).metadata || {}).method || 'other'
                        }}
                        method.
                      </p>
                    </div>
                    <div class="d-flex align-items-center">
                      <a
                        v-if="subscription.is_trial_account ? true:subscription.status !== 'cancel'"
                        ref="managePayment"
                        href="javascript:void(0);"
                        data-toggle="modal"
                        data-target="#payment-method"
                        class="btn-link"
                        @click="resetPaymentMethods()"
                        >Manage Payment Methods</a
                      >
                    </div>
                  </template>
                  <template v-else>
                    <div class="d-flex align-items-center">
                      <img
                        v-if="defaultPayment.brand"
                        :src="
                          require(`~/assets/img/card-icon/${defaultPayment.brand}.svg`)
                        "
                        alt=""
                      />
                      <h2>
                        <span>{{
                          (
                            defaultPayment.brand || defaultPayment.bank
                          ).toUpperCase()
                        }}</span
                        >****<span>{{ defaultPayment.last4 }}</span>
                      </h2>
                      <span class="plan-status alert-secondary">Default</span>
                      <span
                        v-if="subscription.payment_status === 'success'"
                        v-tooltip="'Active'"
                        class="payment-info bg-success ml-2"
                        data-toggle="tooltip"
                        title=""
                        data-original-title="Active"
                      >
                        <svg
                          id="Layer_1"
                          class="payment-active-icon white"
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
                      </span>
                      <span
                        v-else
                        v-tooltip="'Expired'"
                        class="payment-info bg-danger ml-2"
                        data-toggle="tooltip"
                        title=""
                        data-original-title="Expire / Invalid"
                      >
                        <svg
                          id="Layer_1"
                          class="close-icon white"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 18 18"
                          xml:space="preserve"
                        >
                          <g
                            id="Group_4358"
                            transform="translate(-69.745 -317.549)"
                          >
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
                      <strong v-if="defaultPayment.brand"
                        >Expire {{ defaultPayment.exp_month }}/{{
                          defaultPayment.exp_year
                        }}</strong
                      >
                    </div>
                    <div class="d-flex align-items-center">
                      <a
                        v-if="subscription.is_trial_account ? subscription.payment.length>0:subscription.status !== 'cancel'"
                        ref="managePayment"
                        href="javascript:void(0);"
                        data-toggle="modal"
                        data-target="#payment-method"
                        class="btn-link"
                        @click="resetPaymentMethods()"
                        >Manage Payment Methods</a
                      >
                    </div>
                  </template>
                </template>
              </div>
            </div>
          </div>
          <div
            v-if="!subscription.is_trial_account"
            class="d-flex align-items-center"
          >
            <ContentLoader
              v-if="loading"
              :speed="2"
              :animate="true"
              :height="21"
              :width="200"
              :style="{
                width: '200px',
                height: '21px',
                borderRadius: '3px',
              }"
            >
              <rect x="0" :y="0" rx="0" ry="0" width="200" height="21" />
              />
            </ContentLoader>
            <h4 v-else class="mb0">Billing History</h4>
          </div>
          <div
            v-if="!subscription.is_trial_account"
            class="common-box bg-gray mb2 mt1"
          >
            <div class="table-list-view">
              <ul class="thead">
                <li>
                  <div class="sorting flex20">
                    <span v-if="!loading">Date</span>
                  </div>
                  <div class="sorting flex15">
                    <span v-if="!loading">Price</span>
                  </div>
                  <div class="sorting flex40">
                    <span v-if="!loading">Plan</span>
                  </div>
                  <div class="sorting flex15">
                    <span v-if="!loading">Status</span>
                  </div>
                  <div class="sorting flex10">
                    <span></span>
                  </div>
                </li>
              </ul>
              <div class="customscrollbar no_footer">
                <ul class="tbody">
                  <li v-for="invoice in invoices" :key="invoice.id">
                    <div class="tb-column flex20">
                      <label>{{
                        $moment(invoice.created * 1000).format('DD MMM YYYY')
                      }}</label>
                    </div>
                    <div class="tb-column flex15">
                      <label
                        >${{
                          Number(
                            invoice.currency === 'usd'
                              ? invoice.total / 100
                              : invoice.total
                          ).toFixed(2)
                        }}</label
                      >
                    </div>
                    <div class="tb-column flex40">
                      <label
                        >{{
                          invoice.lines.data[invoice.lines.data.length - 1].plan
                            .nickname
                            ? invoice.lines.data[invoice.lines.data.length - 1]
                                .plan.nickname
                            : invoice.lines.data[invoice.lines.data.length - 1]
                                .plan.product | capitalize
                        }},
                        {{
                          invoice.lines.data[invoice.lines.data.length - 1].plan
                            .interval === 'month'
                            ? 'monthly'
                            : 'yearly'
                        }}</label
                      >
                    </div>
                    <div class="tb-column flex15">
                      <span class="plan-status alert-success">{{
                        invoice.status | capitalize
                      }}</span>
                    </div>
                    <div class="tb-column flex10">
                      <a
                        v-tooltip="'Download Invoice'"
                        :href="invoice.invoice_pdf"
                        target="_blank"
                        @click="downloadInvoice()"
                      >
                        <svg
                          id="Layer_1"
                          class="download-icon h-orange"
                          data-toggle="tooltip"
                          title=""
                          data-original-title="Download Invoice"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 18 18"
                          xml:space="preserve"
                        >
                          <g
                            id="Group_4359"
                            transform="translate(-153.745 -317.549)"
                          >
                            <path
                              id="Path_3427"
                              class="fill-color"
                              d="M156.4,335.5c-1.4,0-2.6-1.2-2.6-2.6v-3.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.7,0.3,0.8,0.8v3.7c0,0.6,0.5,1,1,1h12.8c0.6,0,1-0.5,1-1v-3.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8v3.7c0,1.4-1.2,2.6-2.6,2.6H156.4z"
                            ></path>
                            <path
                              id="Path_3428"
                              class="fill-color"
                              d="M157.6,325.3c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l4,4l4-4c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.1,5.1L157.6,325.3z"
                            ></path>
                            <path
                              id="Path_3429"
                              class="fill-color"
                              d="M162.7,330.1c-0.4,0-0.8-0.4-0.8-0.8v-11c0-0.4,0.3-0.8,0.8-0.8c0.4,0,0.8,0.3,0.8,0.8c0,0,0,0,0,0.1v11C163.5,329.7,163.2,330.1,162.7,330.1z"
                            ></path>
                          </g>
                        </svg>
                      </a>
                    </div>
                  </li>
                  <template v-if="loading">
                    <li v-for="i in 2" :key="i">
                      <div class="tb-column flex20">
                        <ContentLoader
                          :speed="2"
                          :animate="true"
                          :height="21"
                          :width="100"
                          :style="{
                            width: '100px',
                            height: '21px',
                            borderRadius: '3px',
                          }"
                        >
                          <rect
                            x="0"
                            :y="0"
                            rx="0"
                            ry="0"
                            width="100"
                            height="21"
                          />
                          />
                        </ContentLoader>
                      </div>
                      <div class="tb-column flex15">
                        <ContentLoader
                          :speed="2"
                          :animate="true"
                          :height="21"
                          :width="100"
                          :style="{
                            width: '100px',
                            height: '21px',
                            borderRadius: '3px',
                          }"
                        >
                          <rect
                            x="0"
                            :y="0"
                            rx="0"
                            ry="0"
                            width="100"
                            height="21"
                          />
                          />
                        </ContentLoader>
                      </div>
                      <div class="tb-column flex40">
                        <ContentLoader
                          :speed="2"
                          :animate="true"
                          :height="21"
                          :width="200"
                          :style="{
                            width: '200px',
                            height: '21px',
                            borderRadius: '3px',
                          }"
                        >
                          <rect
                            x="0"
                            :y="0"
                            rx="0"
                            ry="0"
                            width="200"
                            height="21"
                          />
                          />
                        </ContentLoader>
                      </div>
                      <div class="tb-column flex15">
                        <ContentLoader
                          :speed="2"
                          :animate="true"
                          :height="21"
                          :width="50"
                          :style="{
                            width: '50px',
                            height: '21px',
                            borderRadius: '3px',
                          }"
                        >
                          <rect
                            x="0"
                            :y="0"
                            rx="0"
                            ry="0"
                            width="50"
                            height="21"
                          />
                          />
                        </ContentLoader>
                      </div>
                      <div class="tb-column flex10">
                        <ContentLoader
                          :speed="2"
                          :animate="true"
                          :height="21"
                          :width="50"
                          :style="{
                            width: '50px',
                            height: '21px',
                            borderRadius: '3px',
                          }"
                        >
                          <rect
                            x="0"
                            :y="0"
                            rx="0"
                            ry="0"
                            width="50"
                            height="21"
                          />
                          />
                        </ContentLoader>
                      </div>
                    </li>
                  </template>
                </ul>
              </div>
              <div
                v-if="
                  subscription &&
                  allInvoices &&
                  allInvoices.length > 3 &&
                  !showAllInvoices
                "
                class="tfooter d-flex align-items-center"
              >
                <a
                  href="javascript:void(0);"
                  class="btn-link"
                  @click="showAllInvoices = true"
                  >View Past Billing</a
                >
              </div>
            </div>
          </div>
          <!-- <a
            v-if="subscription.is_trial_account && !loading && subscription.trial_expire=='false'"
            href="javascript:void(0);"
            data-toggle="modal"
            data-target="#cancel-trial"
            class="btn btn-big btn-danger-invert"
            >Cancel Trial</a
          > -->
          <a
            v-if="!subscription.is_trial_account && subscription.status !== 'cancel' && !loading"
            href="javascript:void(0);"
            data-toggle="modal"
            data-target="#cancel-subscription"
            class="btn btn-big btn-danger-invert"
            >Cancel Subscription</a
          >
        </template>
      </div>
    </div>

    <!-- cards modal -->
    <div id="payment-method" class="modal fade show" role="dialog">
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Payment Methods</h5>
            <button
              ref="cardsModalClose"
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
          <div class="modal-body">
            <form id="payment-form" @submit.prevent="addCard()">
              <template v-if="showAddCard">
                <div id="payment-element">
                  <div v-show="stripeElemLoaded" id="payment-element-stripe">
                    <!-- Elements will create form elements here -->
                  </div>
                  <div v-show="!stripeElemLoaded" class="spinnerWrapper">
                    <div class="spinner"></div>
                  </div>
                </div>
                <button
                  id="submit"
                  class="btn btn-big"
                  :disabled="!stripeElemLoaded"
                  :class="{ disabled: !stripeElemLoaded }"
                >
                  Submit
                </button>
                <a
                  href="javascript:void(0);"
                  class="btn btn-big btn-gray"
                  :disabled="!stripeElemLoaded"
                  :class="{ disabled: !stripeElemLoaded }"
                  @click="showAddCard = false"
                  >Cancel</a
                >
                <hr />
              </template>
              <div
                id="error-message"
                class="text-red"
                v-html="addCardError"
              ></div>
            </form>
            <div class="d-flex justify-content-end mb1">
              <a
                href="javascript:void(0);"
                class="btn"
                :disabled="showAddCard"
                :class="{ disabled: showAddCard }"
                @click="addCardDialog()"
                >Add New Method</a
              >
            </div>
            <div
              v-for="payment in subscription.payment"
              :key="payment.id"
              class="box mb1"
            >
              <!-- card -->
              <div v-if="payment.type === 'card'" class="visa-card-info">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center">
                    <img
                      v-if="payment.card.brand"
                      :src="
                        require(`~/assets/img/card-icon/${toLowerKebab(
                          payment.card.brand
                        )}.svg`)
                      "
                      alt=""
                    />
                    <h2>
                      <span>{{ payment.card.brand }}</span
                      >****<span>{{ payment.card.last4 }}</span>
                    </h2>
                    <span
                      v-if="isDefaultPayment(payment.id)"
                      class="plan-status alert-secondary"
                      >Default</span
                    >
                  </div>
                  <div class="d-flex align-items-center">
                    <strong
                      >Expire {{ payment.card.exp_month }}/{{
                        payment.card.exp_year
                      }}</strong
                    >
                    <div class="dropdown">
                      <a
                        href="javascript:void(0);"
                        class="dropdown-toggle"
                        data-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <svg
                          id="Layer_1"
                          class="menu-option-icon h-orange"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 18 18"
                          xml:space="preserve"
                        >
                          <g id="Group_4482" transform="translate(-872 -801)">
                            <rect
                              id="Rectangle_3020"
                              x="872"
                              y="801"
                              class="fill-hide"
                              width="18"
                              height="18"
                            ></rect>
                            <g
                              id="Group_4348"
                              transform="translate(588.166 653.684)"
                            >
                              <circle
                                id="Ellipse_203"
                                class="fill-color"
                                cx="292.8"
                                cy="148.9"
                                r="1.5"
                              ></circle>
                              <circle
                                id="Ellipse_203-2"
                                class="fill-color"
                                cx="292.8"
                                cy="163.8"
                                r="1.5"
                              ></circle>
                              <circle
                                id="Ellipse_203-3"
                                class="fill-color"
                                cx="292.8"
                                cy="156.3"
                                r="1.5"
                              ></circle>
                            </g>
                          </g>
                        </svg>
                      </a>
                      <ul class="dropdown-menu" style="will-change: transform">
                        <li
                          v-tooltip="
                            isDefaultPayment(payment.id)
                              ? 'This is already your default payment method.'
                              : makingDefault
                              ? 'Please wait...'
                              : ''
                          "
                          :style="
                            isDefaultPayment(payment.id) || makingDefault
                              ? 'opacity:0.4'
                              : ''
                          "
                        >
                          <a
                            v-if="!isDefaultPayment(payment.id)"
                            href="javascript:void(0);"
                            class="dropdown-item"
                            :class="{
                              disabled: isDefaultPayment(payment.id),
                            }"
                            :disabled="
                              isDefaultPayment(payment.id) || makingDefault
                            "
                            @click="makeDefaultCard(payment.id)"
                            >Mark as Default</a
                          >
                        </li>
                        <li
                          v-tooltip="
                            isDefaultPayment(payment.id)
                              ? 'You cannot remove your default method.'
                              : subscription.payment.length < 2
                              ? 'You cannot remove the only method.'
                              : ''
                          "
                          :style="
                            isDefaultPayment(payment.id) ||
                            subscription.payment.length < 2
                              ? 'opacity:0.4'
                              : ''
                          "
                        >
                          <a
                            href="javascript:void(0);"
                            class="dropdown-item"
                            :class="{
                              disabled:
                                subscription.payment.length < 2 ||
                                isDefaultPayment(payment.id),
                            }"
                            :disabled="
                              subscription.payment.length < 2 ||
                              isDefaultPayment(payment.id)
                            "
                            @click="removeCard(payment)"
                            >Remove</a
                          >
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <!-- us_bank_account -->
              <div
                v-if="payment.type === 'us_bank_account'"
                class="visa-card-info"
              >
                <div class="d-flex align-items-center">
                  <img
                    :src="require(`~/assets/img/card-icon/bank.svg`)"
                    alt=""
                  />
                  <h2>
                    <span>{{ payment.us_bank_account.bank_name }}</span
                    >****<span>{{ payment.us_bank_account.last4 }}</span>
                  </h2>
                  <span
                    v-if="isDefaultPayment(payment.id)"
                    class="plan-status alert-secondary"
                    >Default</span
                  >
                  <div class="dropdown">
                    <a
                      href="javascript:void(0);"
                      class="dropdown-toggle"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <svg
                        id="Layer_1"
                        class="menu-option-icon h-orange"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 18 18"
                        xml:space="preserve"
                      >
                        <g id="Group_4482" transform="translate(-872 -801)">
                          <rect
                            id="Rectangle_3020"
                            x="872"
                            y="801"
                            class="fill-hide"
                            width="18"
                            height="18"
                          ></rect>
                          <g
                            id="Group_4348"
                            transform="translate(588.166 653.684)"
                          >
                            <circle
                              id="Ellipse_203"
                              class="fill-color"
                              cx="292.8"
                              cy="148.9"
                              r="1.5"
                            ></circle>
                            <circle
                              id="Ellipse_203-2"
                              class="fill-color"
                              cx="292.8"
                              cy="163.8"
                              r="1.5"
                            ></circle>
                            <circle
                              id="Ellipse_203-3"
                              class="fill-color"
                              cx="292.8"
                              cy="156.3"
                              r="1.5"
                            ></circle>
                          </g>
                        </g>
                      </svg>
                    </a>
                    <ul class="dropdown-menu" style="will-change: transform">
                      <li
                        v-tooltip="
                          isDefaultPayment(payment.id)
                            ? 'This is already your default method.'
                            : makingDefault
                            ? 'Please wait...'
                            : ''
                        "
                        :style="
                          isDefaultPayment(payment.id) || makingDefault
                            ? 'opacity:0.4'
                            : ''
                        "
                      >
                        <a
                          v-if="!isDefaultPayment(payment.id)"
                          href="javascript:void(0);"
                          class="dropdown-item"
                          :class="{
                            disabled: isDefaultPayment(payment.id),
                          }"
                          :disabled="
                            isDefaultPayment(payment.id) || makingDefault
                          "
                          @click="makeDefaultCard(payment.id)"
                          >Mark as Default</a
                        >
                      </li>
                      <li
                        v-tooltip="
                          isDefaultPayment(payment.id)
                            ? 'You cannot remove your default method.'
                            : subscription.payment.length < 2
                            ? 'You cannot remove the only payment method.'
                            : ''
                        "
                        :style="
                          isDefaultPayment(payment.id) ||
                          subscription.payment.length < 2
                            ? 'opacity:0.4'
                            : ''
                        "
                      >
                        <a
                          href="javascript:void(0);"
                          class="dropdown-item"
                          :class="{
                            disabled:
                              subscription.payment.length < 2 ||
                              isDefaultPayment(payment.id),
                          }"
                          :disabled="
                            subscription.payment.length < 2 ||
                            isDefaultPayment(payment.id)
                          "
                          @click="removeCard(payment)"
                          >Remove</a
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="!(subscription.payment || []).length"
              style="
                padding: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              No payment methods found.
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- cancel subscription modal -->
    <div id="cancel-subscription" class="modal fade show" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">You are canceling your DAM subscription</h5>
            <button
              ref="cancelBtn"
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
          <div class="modal-body cancel-subscription">
            <p class="mb2">
              We are sorry to see you go! So that we can continue to improve our
              service, please take a moment to tell us why you are canceling
              your
              <span :class="`plan-status ${(planName || '').toLowerCase()}`">{{
                planName
              }}</span>
              subscription.
            </p>
            <div class="form-group d-flex required">
              <label class="control-label">Reason</label>
              <div class="radio-group vertical">
                <label
                  v-for="reason in cancelReasons"
                  :key="reason.id"
                  class="radio-label"
                  @click="cancelReason = reason"
                  >{{ reason.text }}
                  <input
                    type="radio"
                    name="reason"
                    :value="reason.id"
                    :checked="cancelReason.id === reason.id"
                  />
                  <span class="radio-span"></span>
                </label>
              </div>
            </div>
            <div class="form-group d-flex required">
              <label class="control-label">Comment</label>
              <textarea
                v-model="cancelComment"
                cols="4"
                rows="4"
                class="form-control"
                :placeholder="'What could we have done differently to improve the experience for you?'"
                :required="true"
              ></textarea>
            </div>
            <div class="form-group">
              <h6>Please Acknowledge</h6>
              <div class="d-flex acknowledge">
                <label class="check-label">
                  <input
                    v-model="cancelAcknowledged"
                    type="checkbox"
                    name="acknowledge"
                    :checked="cancelAcknowledged"
                  />
                  <span class="check-span"></span>
                </label>
                <p>
                  Your subscription will be cancelled on your current active
                  plan end date
                  <strong>{{
                    $moment(
                      (stripeSubscriptionObj.end_at ||
                        stripeSubscriptionObj.current_period_end) * 1000
                    ).format('DD MMM YYYY')
                  }}</strong
                  >. Till that date, still you have access to your DAM account.
                  You can also claim back to restart subscription if you have
                  changed your mind. Once your subscription is cancel, you will
                  no longer able to access your DAM account.
                </p>
              </div>
            </div>
            <div class="form-group mb0">
              <div class="d-flex justify-content-center">
                <a
                  href="javascript:void(0);"
                  class="btn btn-danger btn-big"
                  :disabled="!allowedToCancel"
                  :style="
                    allowedToCancel ? '' : 'opacity:0.4;cursor:not-allowed'
                  "
                  @click="cancelSubscription()"
                >
                  <SpinLoading v-show="canceling" />
                  {{ canceling ? 'Canceling...' : 'Cancel Subscription' }}</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- plan change modal -->
    <plan-change-modal
      v-if="subscription"
      ref="planChangeModal"
      :subscription="subscription"
      :stripe-subscription-obj="stripeSubscriptionObj"
      @plan-changed="
        ({ newPlan, downgrading }) => {
          $auth.fetchUser()
          pendingUpdate = !downgrading
        }
      "
    />

    <!-- cancel trial modal -->
    <!-- <div id="cancel-trial" class="modal fade show" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Cancel trial and deactivate account</h5>
            <button
              ref="cancelTrialModalCloseBtn"
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
          <div class="modal-body cancel-subscription">
            <p class="mb2">
              We are sorry to see you go! So that we can continue to improve our
              service, please take a moment to tell us why you are canceling
              your trial account.
            </p>
            <div class="form-group d-flex required">
              <label class="control-label">Reason</label>
              <div class="radio-group vertical">
                <label
                  v-for="reason in cancelReasons"
                  :key="reason.id"
                  class="radio-label"
                  @click="cancelTrialReason = reason"
                  >{{ reason.text }}
                  <input
                    type="radio"
                    name="reason"
                    :value="reason.id"
                    :checked="cancelTrialReason.id === reason.id"
                  />
                  <span class="radio-span"></span>
                </label>
              </div>
            </div>
            <div class="form-group d-flex required">
              <label class="control-label">Comment</label>
              <textarea
                v-model="cancelTrialComment"
                cols="4"
                rows="4"
                class="form-control"
                :placeholder="'What could we have done differently to improve the experience for you?'"
              ></textarea>
            </div>
            <div class="form-group">
              <h6>Please Acknowledge</h6>
              <div class="d-flex acknowledge">
                <label class="check-label">
                  <input
                    v-model="cancelTrialAcknowledged"
                    type="checkbox"
                    name="acknowledge"
                    :checked="cancelTrialAcknowledged"
                  />
                  <span class="check-span"></span>
                </label>
                <p>
                  Cancelling your trial period will lead to deactivation of your
                  current workspace account and you won't be able to access it
                  again in future. Also your stored data will be removed from
                  the server and it is irreversible.
                </p>
              </div>
            </div>
            <div class="form-group mb0">
              <div class="d-flex justify-content-center">
                <a
                  href="javascript:void(0);"
                  class="btn btn-danger btn-big m0"
                  :disabled="!allowedToCancelTrial"
                  :style="
                    allowedToCancelTrial ? '' : 'opacity:0.4;cursor:not-allowed'
                  "
                  @click="cancelTrial()"
                >
                  <SpinLoading v-show="cancelingTrial" />
                  {{
                    cancelingTrial ? 'Please wait...' : 'Deactivate Account'
                  }}</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <!-- after trial cancelled successfully, show message before logging out -->
    <div
      v-if="trialCancelConfirmed"
      class="modal fade show"
      aria-hidden="true"
      :style="trialCancelConfirmed ? 'display:block' : 'display: none'"
    >
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body cancel-subscription">
            <h5 class="text-center">
              Your trial has been cancelled successfully.
            </h5>
            <p class="mt2 mb2" style="font-size: 14px">
              Please note that following data will be removed permanently from our server and its irreversible.
              <ul>
                <li>- Admin & Dealer records</li>
                <li>- All your public & private assets including folders</li>
                <li>- Shared & Embedded URLs</li>
                <li>- Internal & External integrations</li>
              </ul>
              <br />
              will be removed/deactivated along with this workspace from our servers.
            <!-- eslint-disable-next-line prettier/prettier -->
            </p>
            <p class="text-center font-italic" style="font-size: 12px">
              You will be logged out in a moment automatically...
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'
import PlanChangeModal from '@/components/dam/Dialogs/subscription/PlanChangeModal'

export default {
  components: { ContentLoader, PlanChangeModal },
  filters: {
    capitalize(val) {
      if (!val || typeof val !== 'string') return val
      return val.charAt(0).toUpperCase() + val.substring(1)
    },
  },
  layout: 'generalSettingsLayout',
  middleware: [
    'authCheck',
    'can-access-general-settings',
    'can-access-dam-subscription-billing',
  ],
  data() {
    return {
      subscription: {},
      canceling: false,
      showAllInvoices: false,
      makingDefault: false,
      cancelAcknowledged: false,
      cancelComment: '',
      cancelReasons: Object.freeze([
        {
          id: 1,
          text: 'Too Complex',
        },
        {
          id: 2,
          text: 'I’m closing down my business',
        },
        {
          id: 3,
          text: 'I’m moving to a different DAM platform',
        },
        {
          id: 4,
          text: 'Other',
        },
      ]),
      cancelReason: {},
      cancelTrialReason: {},
      loading: true,
      showAddCard: false,
      stripeElemLoaded: false,
      stripeCardElements: null,
      stripe: null,
      addCardError: '',
      paymentMethod: {},
      stripeSubscriptionObj: {},
      reactivating: false,
      scheduledPlanName: '',
      scheduledPlanDate: '',
      allInvoices: [],
      pendingUpdate: false,
      cancelTrialComment: '',
      cancelTrialAcknowledged: false,
      cancelingTrial: false,
      trialCancelConfirmed: false,
    }
  },
  computed: {
    planColorBorder() {
      if (this.planName === 'Lite') return '1px solid rgb(246 213 92)'
      if (this.planName === 'Pro') return '1px solid rgb(60 174 163)'
      if (this.planName === 'Enterprise') return '1px solid rgb(23 63 95)'
      if (this.planName === 'Custom') return '1px solid rgb(62 195 231)'
      return ''
    },
    planColorBackground() {
      if (this.planName === 'Lite')
        return 'linear-gradient(to top right, rgba(246 213 92/0.3), white)'
      if (this.planName === 'Pro')
        return 'linear-gradient(to top right, rgba(60 174 163/0.3), white)'
      if (this.planName === 'Enterprise')
        return 'linear-gradient(to top right, rgba(23 63 95/0.3), white)'
      if (this.planName === 'Custom')
        return 'linear-gradient(to top right, rgba(62 195 231/0.3), white)'
      return ''
    },
    planShadow() {
      if (this.planName === 'Lite') return '0 0 30px rgba(246 213 92/0.2)'
      if (this.planName === 'Pro') return '0 0 30px rgba(60 174 163/0.2)'
      if (this.planName === 'Enterprise') return '0 0 30px rgba(23 63 95/0.2)'
      if (this.planName === 'Custom') return '0 0 30px rgba(62 195 231/0.2)'
      return ''
    },
    readableStorage() {
      return (storage) => {
        if (!storage || isNaN(parseInt(storage))) return storage
        storage = parseInt(storage)
        if (storage >= 1000) return `${storage / 1000} TB`
        return `${storage} GB`
      }
    },
    allowedToCancel() {
      if (!this.cancelReason?.id) return false
      return this.cancelComment?.length && this.cancelAcknowledged
    },
    allowedToCancelTrial() {
      if (!this.cancelTrialReason?.id) return false
      return this.cancelTrialComment?.length && this.cancelTrialAcknowledged
    },
    billingCycle() {
      return this.subscription.billing_cycle === 'yearly'
        ? 'year'
        : this.subscription.billing_cycle === 'monthly'
        ? 'month'
        : this.subscription.billing_cycle
    },
    storage() {
      return this.subscription.subscription?.features?.storage?.default_value
    },
    planName() {
      return this.subscription?.subscription?.group_name === 'enterprise'
        ? 'Enterprise'
        : this.subscription?.plan_name || ''
    },
    isCustomePlan() {
      return this.subscription?.subscription?.type === 'custom'
    },
    invoices() {
      if (!this.allInvoices?.length) return []
      return this.showAllInvoices
        ? this.allInvoices
        : this.allInvoices.slice(0, 3)
    },
    toLowerKebab() {
      return (name = '') => {
        if ((name || '').includes(' ')) {
          name = name.split(' ').join('-')
        }
        return (name || '').toLowerCase()
      }
    },
    isDefaultPayment() {
      return (pmId) => {
        return this.defaultPayment.id === pmId
      }
    },
    defaultPayment() {
      const pm =
        this.paymentMethod[this.paymentMethod.type] || this.paymentMethod.card
      if (pm) pm.id = this.paymentMethod.id
      return pm || {}
    },
    trialInactive() {
      const wp = this.$auth.user.accessibleWorkspaces.find(
        (e) => e.id === this.$route.params.workspace_id
      )
      if (wp.is_trial_account) {
        return this.subscription?.payment?.length
          ? false
          : wp.is_suspended || wp.trial_expire === 'true'
      }
      return false
    },
  },
  async mounted() {
    if (!this.$auth.user.subscription_user) {
      return this.$router.replace({
        name: 'workspace_id-workspace-settings',
        params: {
          workspaceId: this.$getWorkspaceId(),
        },
      })
    }
    await this.getSubscriptions()
    this.loading = true
    this.fetchSubscription()
    this.fetchInvoices()
    this.cancelReason = this.cancelReasons[0]
    this.loadStripeClient()
    this.getPaymentMethods()
    setTimeout(() => {
      this.checkSuccessIntents()
      this.loading = false
    }, 1200)
  },
  methods: {
    cancelTrial() {
      if (!this.allowedToCancelTrial || this.cancelingTrial) return
      this.cancelingTrial = true
      this.$axios
        .$post('digital-assets/subscription/cancel-trial', {
          cancel_reason: this.cancelTrialReason.text,
          cancel_comment: this.cancelTrialComment,
        })
        .then(() => {
          this.$refs.cancelTrialModalCloseBtn.click()
          this.trialCancelConfirmed = true
          try {
            this.subscription.payment.forEach((e) => {
              axios.post('/stripe/detach-payment', { id: e.id })
            })
          } catch (_) {}
          setTimeout(() => {
            this.$auth.logout()
          }, 5000)
        })
        .catch((e) => {
          this.$toast.global.error(this.$getErrorMessage(e))
        })
        .finally(() => {
          this.cancelingTrial = false
        })
    },
    fetchInvoices() {
      axios
        .get(
          '/stripe/list-invoices?custId=' +
            this.subscription.stripe_customer_id +
            '&subscriptionId=' +
            this.subscription.stripe_subscription_id
        )
        .then((resp) => {
          this.allInvoices = resp.data.data
        })
    },
    fetchSubscription() {
      axios
        .get(
          '/stripe/subscription?id=' + this.subscription.stripe_subscription_id
        )
        .then((resp) => {
          this.stripeSubscriptionObj = resp.data
          this.fetchPaymentMethod(resp.data.default_payment_method)
        })
    },
    fetchPaymentMethod(id) {
      if (!id) return
      axios.get('/stripe/payment-method?id=' + id).then((resp) => {
        this.paymentMethod = resp.data
      })
    },
    checkSuccessIntents() {
      const searchParams = new URLSearchParams(window.location.search)
      const intent = searchParams.get('setup_intent')
      const clientSecret = searchParams.get('setup_intent_client_secret')
      if (intent && clientSecret) this.$refs.managePayment.click()
      if (!clientSecret) return
      this.stripe
        .retrieveSetupIntent(clientSecret)
        .then(({ setupIntent }) => {
          // Inspect the SetupIntent `status` to indicate the status of the payment
          // to customer.
          //
          // Some payment methods will [immediately succeed or fail][0] upon
          // confirmation, while others will first enter a `processing` state.
          //
          // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
          switch (setupIntent.status) {
            case 'succeeded': {
              this.$toast.global.success(
                'Success! Your payment method has been saved.'
              )
              this.$axios.$post('digital-assets/subscription/activity-log', {
                key: 'add-new-method',
              })
              break
            }

            case 'processing': {
              this.$toast.global.success(
                "Processing payment details. We'll update you when processing is complete."
              )
              break
            }

            case 'requires_payment_method': {
              this.$toast.global.error(
                'Failed to process payment details. Please try another payment method.'
              )
              // Redirect your user back to your payment page to attempt collecting
              // payment again
              break
            }
          }
        })
        .catch((_) => {})
        .finally(() => {
          this.$router.replace({
            name: this.$route.name,
            params: this.$route.params,
          })
        })
    },
    async loadStripeClient() {
      this.stripe = await loadStripe(process.env.STRIPE_PUBLISHABLE_KEY)
    },
    getPaymentMethods() {
      this.subscription.payment = []
      // For other types see: https://stripe.com/docs/api/payment_methods/customer_list?lang=node#list_customer_payment_methods-type
      axios(
        '/stripe/list-payment-methods?custId=' +
          this.subscription.stripe_customer_id +
          '&type=card'
      )
        .then((r) => {
          this.subscription.payment.push(...r.data)
        })
        .catch(() => {})

      axios(
        '/stripe/list-payment-methods?custId=' +
          this.subscription.stripe_customer_id +
          '&type=us_bank_account'
      )
        .then((r) => this.subscription.payment.push(...r.data))
        .catch(() => {})
    },
    resetPaymentMethods() {
      this.showAddCard = false
      this.stripeElemLoaded = false
      this.addCardError = ''
    },
    reactivateSubscription() {
      this.reactivating = true
      this.$axios
        .$post('digital-assets/subscription/re-activate', {})
        .then(() => {
          this.$toast.global.success(
            'Your subscription has been reactivated successfully!'
          )
          this.subscription.status = 'active'
          this.reactivating = false
        })
        .catch((e) => {
          this.$toast.global.error(this.$getErrorMessage(e))
        })
    },
    cancelSubscription() {
      if (this.canceling || !this.allowedToCancel) return
      this.canceling = true
      this.$axios
        .$post('digital-assets/subscription/cancel', {
          cancel_reason: this.cancelReason.text,
          cancel_comment: this.cancelComment,
        })
        .then(() => {
          const dt = this.$moment(
            (this.stripeSubscriptionObj.end_at ||
              this.stripeSubscriptionObj.current_period_end) * 1000
          ).format('DD MMM YYYY')
          this.$toast.global.success(
            `Your DAM subscription is scheduled to cancel on ${dt}. You can reactivate your current plan anytime before ${dt}.`
          )
          this.subscription.status = 'cancel'
          this.$refs.cancelBtn.click()
        })
        .catch((e) => {
          this.$toast.global.error(this.$getErrorMessage(e))
        })
        .finally(() => {
          this.canceling = false
        })
    },
    getSubscriptions() {
      this.loading = true
      return new Promise((resolve) => {
        this.$axios
          .$get('digital-assets/subscription/get')
          .then(({ data }) => {
            data.payment = []
            this.subscription = data
            if (data.next_subscription_id) {
              this.scheduledPlanName = data.next_subscription_id + ''
            }
            if (data.next_billing_date) {
              this.scheduledPlanDate = data.next_billing_date
            }
          })
          .catch((e) => {
            this.$toast.global.error(this.$getErrorMessage(e))
          })
          .finally(() => {
            this.loading = false
            resolve()
          })
      })
    },
    async addCardDialog() {
      if (this.showAddCard) return
      // https://stripe.com/docs/payments/save-and-reuse?platform=web
      // https://github.com/stripe-samples/saving-card-without-payment
      const { data } = await axios.post('/stripe/init-setup-intent', {
        customer: this.subscription.stripe_customer_id,
      })
      const options = {
        clientSecret: data.client_secret,
        // Fully customizable with appearance API.
        appearance: {
          theme: 'stripe',
          // labels: 'floating',
        },
      }
      this.showAddCard = true
      this.stripeElemLoaded = false

      this.$nextTick(() => {
        setTimeout(() => {
          this.stripeCardElements = this.stripe.elements(options)
          const paymentElement = this.stripeCardElements.create('payment')
          paymentElement.mount('#payment-element-stripe')
          setTimeout(() => (this.stripeElemLoaded = true), 2500)
        }, 500)
      })
    },
    async addCard() {
      const { error } = await this.stripe.confirmSetup({
        elements: this.stripeCardElements,
        confirmParams: {
          return_url: window.location.href,
        },
      })

      if (error) {
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Show error to customer (for example, payment
        // details incomplete)
        this.addCardError = error.message
      } else {
        // Customer will be redirected to `return_url`. For some payment
        // methods like iDEAL, customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
      }
    },
    makeDefaultCard(pm) {
      if (this.makingDefault) return
      this.makingDefault = true
      if (pm.startsWith('card_')) {
        this.$axios
          .$post('digital-assets/subscription/make-default-card', {
            default_source: pm,
          })
          .then(() => {
            this.$toast.global.success('Default card updated succesfully.')
            this.subscription.default_source = pm
            this.$refs.cardsModalClose.click()
            this.$axios.$post('digital-assets/subscription/activity-log', {
              key: 'make-as-default',
            })
            location.reload(true)
          })
          .catch((e) => {
            this.$toast.global.error(this.$getErrorMessage(e))
          })
          .finally(() => {
            this.makingDefault = false
          })
      } else {
        axios
          .post('/stripe/mark-default-payment-method', {
            default_source: pm,
            custId: this.subscription.stripe_customer_id,
            subId: this.subscription.stripe_subscription_id,
          })
          .then(() => {
            this.$toast.global.success('Default source updated succesfully.')
            this.subscription.default_source = pm
            this.$refs.cardsModalClose.click()
            this.$axios.$post('digital-assets/subscription/activity-log', {
              key: 'make-as-default',
            })
            location.reload(true)
          })
          .catch((e) => {
            this.$toast.global.error(this.$getErrorMessage(e))
          })
          .finally(() => {
            this.makingDefault = false
          })
      }
    },
    removeCard(card) {
      let promise
      if (card.id.startsWith('card_')) {
        promise = this.$axios.$post('digital-assets/subscription/delete-card', {
          card_id: card.id,
        })
      } else {
        promise = axios.post('/stripe/detach-payment', { id: card.id })
      }
      promise
        .then(() => {
          this.subscription.payment = this.subscription.payment.filter(
            (e) => e.id !== card.id
          )
          this.$toast.global.success('Payment method removed succesfully.')
          this.$refs.cardsModalClose.click()
          this.$axios.$post('digital-assets/subscription/activity-log', {
            key: 'remove-payment-method',
          })
          location.reload(true)
        })
        .catch((e) => {
          this.$toast.global.error(this.$getErrorMessage(e))
        })
    },
    downloadInvoice() {
      this.$axios.$post('digital-assets/subscription/activity-log', {
        key: 'download-invoice',
      })
    },
  },
}
</script>

<style scoped>
.spinnerWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 250px;
  height: 250px;
}
.spinner {
  height: 60px;
  width: 60px;
  border-radius: 50%;
  border: 3px solid rgba(0, 0, 0, 0.36);
  border-left-color: transparent;
  border-right-color: transparent;
  animation: spin 1s linear infinite both;
}
@keyframes spin {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
