<script>
export default {
  middleware: ['onlyAuth'],
  async asyncData({ query, $axios, error, $toQueryString, redirect }) {
    const downloadURL = `object-download?${$toQueryString(query)}`

    await $axios
      .get(downloadURL)
      .then((response) => redirect(303, response.data))
      .catch(error)
  },
}
</script>
