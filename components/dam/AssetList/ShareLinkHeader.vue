<template>
  <ListingHeaderTemplate>
    <div class="share-url sorting flex50" :class="sortingClass('share_url')">
      <span @click="$emit('sort', 'share_url')"> Shared URLs </span>
    </div>
    <div
      class="generated-by sorting text-center flex10"
      :class="sortingClass('userName')"
    >
      <span @click="$emit('sort', 'userName')"> Generated By </span>
    </div>
    <div
      class="generated-date sorting text-center flex10"
      :class="sortingClass('created_at')"
    >
      <span @click="$emit('sort', 'created_at')"> Generated Date </span>
    </div>
    <div
      class="generated-source sorting text-center flex10"
      :class="sortingClass('generated_source')"
    >
      <span @click="$emit('sort', 'generated_source')"> Generated Source </span>
    </div>
    <div
      class="total-download sorting text-center flex10"
      :class="sortingClass('total_visited')"
    >
      <span @click="$emit('sort', 'total_visited')"> Total Views </span>
    </div>
    <div
      class="total-share sorting text-center flex10"
      :class="sortingClass('total_download')"
    >
      <span @click="$emit('sort', 'total_download')"> Total Downloads </span>
    </div>
  </ListingHeaderTemplate>
</template>

<script>
import ListingHeaderTemplate from '../ListingHeaderTemplate'

export default {
  components: { ListingHeaderTemplate },
  extends: ListingHeaderTemplate,
}
</script>
