/* eslint-disable camelcase */
// const categories = ['video', 'audio', 'image', 'application', 'archive']
const initialSortingData = () => ({
  initialData: true,
  files: {
    field: 'display_file_name',
    reverse: false,
  },
  toolbar: { value: 'display_file_name', desc: false },
})

export default {
  data() {
    return {
      sorting: initialSortingData(),
    }
  },

  methods: {
    sort(path, field_name, _primer) {
      if (!field_name) return

      const primer = _primer || ((v) => v)

      const toReverse = true
      // field_name === 'date' || field_name === 'updated_at'
      // console.log({ [field_name]: toReverse });
      this.sorting[path].reverse =
        this.sorting[path].field === field_name
          ? !this.sorting[path].reverse
          : toReverse

      this.sorting[path].field = field_name

      // only update ui on files
      if (path === 'files') {
        this.sorting.toolbar.desc = this.sorting[path].reverse
        // if (toReverse) this.sorting.toolbar.desc = !this.sorting.toolbar.desc
      }

      this[path] = this[path].sort(
        this.$sortBy(
          this.sorting[path].field,
          this.sorting[path].reverse,
          (x) => primer(x, this.sorting[path].reverse)
        )
      )
    },
  },
}
