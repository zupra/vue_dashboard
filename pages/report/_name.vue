<template lang="pug">
//- .Wrap
.MainFullWidth

  h1 {{ title }}
  //- h2 report:{{ name }} extend report component
  //- pre toolbar:{{toolbar}}

  fieldset
    legend Доступные поля <b>{{ title }}</b>

    Calendar_period(
      @period="v =>Period=v",
    )
    button.btn.fill.green(@click="updateDate(Period)")
      img.icon( v-show="spinner" src="~static/img/spinner_btn.svg")
      | Обновить
    hr

    .checked-group
      label(v-for="col in columns")
        input(
          type='checkbox',
          :value='col',
          v-model="checkedСolumns"
        )
        span.ripple {{col.v}}

    HorizontalSort(
      @sort="v => checkedСolumns = v"
      :arr="checkedСolumns"
    )

    .btn.lg.fill.green(@click="changeColumns(newColumns)")
      img.icon( v-show="spinner" src="~static/img/spinner_btn.svg")
      | Обновить таблицу


  fullscreen(
    :fullscreen.sync='fullscreen',
    :class="{full:fullscreen}",
    ref='fullscreen',
    background='#FFF'
  )

    .form-line
      .btn.fill.red(
        :class="{'xl':fullscreen}",
        @click='toggleFullScreen',
      ) fullscreen

      //- :fields = "json_fields"
      JsonExcel(
        style="display: inline-block"
        :data="data_table.rows"
        :name="`${title}.xls`"
      )
        .btn Download Excel


    //- :lineNumbers="true",
    VueGoodTable(
      v-if="!data_table.remote"
      :columns="data_table.columns",
      :rows="data_table.rows",
      :search-options="{enabled: true}",
      :pagination-options="{enabled: true, mode: 'records', perPage: 50, perPageDropdown: [10, 100, 500, 1000, 3000, 5000], nextLabel: 'туда', prevLabel: 'Сюда', rowsPerPageLabel: 'Выводить на страницу по:', ofLabel: 'из', allLabel: 'Все'}"
    )


    //- :pagination-options="{enabled: true, mode: 'pages'}"
    VueGoodTable(
      v-if="data_table.remote"
      mode="remote"
      @on-page-change="onPageChange"
      @on-sort-change="onSortChange"
      @on-column-filter="onColumnFilter"
      @on-per-page-change="onPerPageChange"

      :search-options="{enabled: true}",
      :pagination-options="{enabled: true, mode: 'pages', perPage: 100, perPageDropdown: [10, 100, 500, 1000, 3000, 5000]}"
      :totalRows="data_table.totalRecords"
      :rows="data_table.rows"
      :columns="data_table.columns"
    )

</template>

<script>
import { mapGetters } from 'vuex'
import { VueGoodTable } from 'vue-good-table'
import Calendar_period from '~/components/Calendar/Calendar_period.vue'
import HorizontalSort from '~/components/Draggable/HorizontalSort.vue'

import JsonExcel from 'vue-json-excel'

export default {
  name: 'Report',
  validate({ store, params }) {
    return store.getters['user/userReport'].some(
      item => item.name == params.name
    )
  },
  components: {
    Calendar_period,
    VueGoodTable,
    HorizontalSort,
    JsonExcel
  },
  data() {
    return {
      //name: '', //params.name
      data_table: {
        // columns: [],
        // rows: [],
        remote: false
        // totalRecords: 0
      },
      /*
      toolbar: {
        columns: {}
      },
      */

      Period: {},
      columns: [],
      checkedСolumns: [],

      spinner: false,
      fullscreen: false,

      // === !!! HERE IF mode="remote" ======
      serverParams: {
        columnFilters: {},
        sort: {
          field: '',
          type: ''
        },
        page: 1,
        perPage: 1000
      }
    }
  },
  asyncData({ app, params, error }) {
    return app.$axios
      .$get(`http://betclub.com/atlas/report/index/${params.name}`)
      .then(res => {
        // console.log(app)
        return {
          name: params.name,
          toolbar: res.data.toolbar,
          columns: res.data.toolbar.columns,
          checkedСolumns: res.data.toolbar.columns,
          data_table: res.data.data_table
        }
      })
      .catch(e => {
        error({ statusCode: 404, message: `Ошибка report ${params.name}` })
      })
  },
  computed: {
    title() {
      return this.$store.getters['user/userReport'].filter(
        item => item.name === this.name
      )[0].title
    },

    // ...mapGetters({
    //   userReportArr: 'user/userReportArr'
    // }),
    newColumns() {
      return this.checkedСolumns.map(i => i.k)
    }
  },
  methods: {
    toggleFullScreen() {
      this.$refs['fullscreen'].toggle()
    },
    updateDate(date) {
      this.spinner = true
      const formData = new FormData()
      formData.append('period', JSON.stringify(date))
      this.$axios
        .$post(`http://betclub.com/atlas/report/index/${this.name}`, formData)
        .then(res => {
          this.data_table = res.data.data_table
          this.spinner = false
        })
    },
    changeColumns(arr) {
      this.spinner = true
      const formData = new FormData()
      formData.append('columns', JSON.stringify(arr))
      // const data = JSON.stringify({ columns: ['game_id'] })
      this.$axios
        .$post(`http://betclub.com/atlas/report/index/${this.name}`, formData)
        .then(res => {
          this.data_table = res.data.data_table
          // setTimeout(() => (this.spinner = false), 700)
          this.spinner = false
        })
    },
    // ¯\_(ツ)_/¯ ### HERE IF mode="remote" ### ¯\_(ツ)_/¯
    updateParams(newProps) {
      console.log(newProps)
      this.serverParams = Object.assign({}, this.serverParams, newProps)
    },
    onPageChange(params) {
      this.updateParams({ page: params.currentPage })
      this.loadItems()
    },
    onPerPageChange(params) {
      this.updateParams({ perPage: params.currentPerPage })
      this.loadItems()
    },
    onSortChange(params) {
      console.log(params)

      this.updateParams({
        sort: {
          type: params[0].type,
          field: params[0].field
        }
        // sort: {
        //   type: params.sortType,
        //   field: this.data_table.columns[params.columnIndex].field
        // }
      })
      this.loadItems()
    },
    onColumnFilter(params) {
      this.updateParams(params)
      this.loadItems()
    },
    // rows from server
    loadItems() {
      // getFromServer(this.serverParams).then(response => {
      //   this.totalRecords = response.totalRecords
      //   this.rows = response.rows
      // })

      const formData = new FormData()
      formData.append('serverParams', JSON.stringify(this.serverParams))
      this.$axios
        .$post(`http://betclub.com/atlas/report/index/${this.name}`, formData)
        .then(res => {
          console.log(res.data)
          this.data_table = res.data.data_table
          // this.data_table.totalRecords = res.data.data_table.totalRecords
          // this.data_table.rows = res.data.data.data_table.rows
        })
    }
  }
}
</script>


<doc lang="stylus">

// thead th
//   position sticky
//   top 0
.vgt-wrap__footer
  display flex
  justify-content: space-between;
  background #EEE
  padding .5em 1em

.footer__navigation
  display flex
  &__info
    margin 0 1em

.sorting
  // &:hover
  //   &:before
  //     content '1'
  &:before
    color red
  &-desc
    &:before
      content '↑ '
  &-asc
    &:before
      content '↓ '
</doc>




<style>
/* */
.vgt-right-align {
  text-align: right;
}

.vgt-left-align {
  text-align: left;
}

.vgt-center-align {
  text-align: center;
}

.vgt-pull-left {
  float: left !important;
}

.vgt-pull-right {
  float: right !important;
}

.vgt-clearfix::after {
  display: block;
  content: '';
  clear: both;
}

.vgt-responsive {
  width: 100%;
  overflow-x: auto;
  position: relative;
}

.vgt-text-disabled {
  color: #909399;
}

.vgt-wrap {
  position: relative;
}

.vgt-fixed-header {
  position: absolute;
  z-index: 10;
  width: 100%;
  overflow-x: auto;
}

table.vgt-table {
  font-size: 16px;
  border-collapse: collapse;
  background-color: white;
  width: 100%;
  max-width: 100%;
  table-layout: auto;
  border: 1px solid #dcdfe6;
}
table.vgt-table td {
  padding: 0.75em 0.75em 0.75em 0.75em;
  vertical-align: top;
  border-bottom: 1px solid #dcdfe6;
  color: #606266;
}
table.vgt-table tr.clickable {
  cursor: pointer;
}
table.vgt-table tr.clickable:hover {
  background-color: #f1f5fd;
}

.vgt-table th {
  padding: 0.75em 1.5em 0.75em 0.75em;
  vertical-align: middle;
  position: relative;
}
.vgt-table th.sorting {
  cursor: pointer;
}
.vgt-table th.sorting:after {
  content: '';
  display: none;
  position: absolute;
  height: 0px;
  width: 0px;
  right: 6px;
  top: 50%;
  margin-top: -3px;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid #409eff;
}
.vgt-table th.sorting:hover:after {
  display: inline-block;
  border-bottom-color: #73b8ff;
}

.vgt-table th.line-numbers,
.vgt-table th.vgt-checkbox-col {
  padding: 0 0.75em 0 0.75em;
  color: #606266;
  border-right: 1px solid #dcdfe6;
  word-wrap: break-word;
  width: 25px;
  text-align: center;
  background: linear-gradient(#f4f5f8, #f1f3f6);
}

.vgt-table th.filter-th {
  padding: 0.75em 0.75em 0.75em 0.75em;
}

.vgt-table th.vgt-row-header {
  border-bottom: 2px solid #dcdfe6;
  border-top: 2px solid #dcdfe6;
  background-color: #fafafb;
}

.vgt-table thead th {
  color: #606266;
  vertical-align: bottom;
  border-bottom: 1px solid #dcdfe6;
  padding-right: 1.5em;
  background: linear-gradient(#f4f5f8, #f1f3f6);
}
.vgt-table thead th.vgt-checkbox-col {
  vertical-align: middle;
}
.vgt-table thead th.sorting-asc,
.vgt-table thead th.sorting-desc {
  color: #3b3c3f;
}
.vgt-table thead th.sorting-asc:after,
.vgt-table thead th.sorting-desc:after {
  content: '';
  display: block;
}
.vgt-table thead th.sorting-desc:after {
  border-top: 6px solid #409eff;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: none;
}

.vgt-input,
.vgt-select {
  font-size: 1rem;
  width: 280px;
  /* width: 100%;
                                                                          height: 32px;
                                                                          line-height: 1;
                                                                          display: block;
                                                                          font-size: 14px;
                                                                          font-weight: regular;
                                                                          padding: 6px 12px;
                                                                          color: #606266;
                                                                          border-radius: 4px;
                                                                          box-sizing: border-box;
                                                                          background-image: none;
                                                                          background-color: #fff;
                                                                          border: 1px solid #dcdfe6;
                                                                          transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1); */
}
.vgt-input::placeholder,
.vgt-select::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #606266;
  opacity: 0.3;
  /* Firefox */
}
.vgt-input:focus,
.vgt-select:focus {
  outline: none;
  border-color: #409eff;
}

.vgt-loading {
  position: absolute;
  width: 100%;
  z-index: 10;
  margin-top: 117px;
}
.vgt-loading__content {
  background-color: #c0dfff;
  color: #409eff;
  padding: 7px 30px;
  border-radius: 3px;
}

.vgt-inner-wrap.is-loading {
  opacity: 0.5;
  pointer-events: none;
}

.vgt-table.bordered td,
.vgt-table.bordered th {
  border: 1px solid #dcdfe6;
}

.vgt-table.bordered th.vgt-row-header {
  border-bottom: 3px solid #dcdfe6;
}

.vgt-table.striped tbody tr:nth-of-type(odd) {
  background-color: rgba(51, 68, 109, 0.03);
}

.vgt-wrap.rtl {
  direction: rtl;
}
.vgt-wrap.rtl .vgt-table td,
.vgt-wrap.rtl .vgt-table th:not(.line-numbers) {
  padding: 0.75em 0.75em 0.75em 1.5em;
}
.vgt-wrap.rtl .vgt-table thead th,
.vgt-wrap.rtl .vgt-table.condensed thead th {
  padding-left: 1.5em;
  padding-right: 0.75em;
}
.vgt-wrap.rtl .vgt-table th.sorting:after,
.vgt-wrap.rtl .vgt-table th.sorting-asc:after {
  margin-right: 5px;
  margin-left: 0px;
}

.vgt-table.condensed td,
.vgt-table.condensed th.vgt-row-header {
  padding: 0.4em 0.4em 0.4em 0.4em;
}

.vgt-global-search {
  padding: 5px 0px;
  display: flex;
  flex-wrap: no-wrap;
  align-items: stretch;
  border: 1px solid #dcdfe6;
  border-bottom: 0px;
  background: linear-gradient(#f4f5f8, #f1f3f6);
}

.vgt-global-search__input {
  position: relative;
  padding-left: 40px;
  flex-grow: 1;
}
.vgt-global-search__input .input__icon {
  position: absolute;
  left: 0px;
  max-width: 32px;
}
.vgt-global-search__input .input__icon .magnifying-glass {
  /* margin-top: 3px;
                                                                          margin-left: 8px;
                                                                          display: block;
                                                                          width: 16px;
                                                                          height: 16px;
                                                                          border: 2px solid #d6dae2;
                                                                          position: relative;
                                                                          border-radius: 50%;
                                                                        }
                                                                        .vgt-global-search__input .input__icon .magnifying-glass:before {
                                                                          content: '';
                                                                          display: block;
                                                                          position: absolute;
                                                                          right: -7px;
                                                                          bottom: -5px;
                                                                          background: #d6dae2;
                                                                          width: 8px;
                                                                          height: 4px;
                                                                          border-radius: 2px;
                                                                          transform: rotate(45deg);
                                                                          -webkit-transform: rotate(45deg);
                                                                          -moz-transform: rotate(45deg);
                                                                          -ms-transform: rotate(45deg);
                                                                          -o-transform: rotate(45deg); */
}

.vgt-global-search__actions {
  margin-left: 10px;
}

.vgt-selection-info-row {
  background: #fdf9e8;
  padding: 5px 16px;
  font-size: 13px;
  border-top: 1px solid #dcdfe6;
  border-left: 1px solid #dcdfe6;
  border-right: 1px solid #dcdfe6;
  color: #d3aa3b;
  font-weight: bold;
}
.vgt-selection-info-row a {
  font-weight: bold;
  display: inline-block;
  margin-left: 10px;
}

.vgt-wrap__actions-footer {
  border: 1px solid #dcdfe6;
}

.vgt-wrap__footer {
  color: #606266;
  padding: 1em;
  border: 1px solid #dcdfe6;
  background: linear-gradient(#f4f5f8, #f1f3f6);
}
.vgt-wrap__footer .footer__row-count__label,
.vgt-wrap__footer .footer__row-count__select {
  display: inline-block;
  vertical-align: middle;
}
.vgt-wrap__footer .footer__row-count__label {
  font-size: 14px;
  color: #909399;
}
.vgt-wrap__footer .footer__row-count__select {
  /* background-color: transparent;
                                                                          width: auto;
                                                                          padding: 0;
                                                                          border: 0;
                                                                          border-radius: 0;
                                                                          height: auto;
                                                                          font-size: 14px;
                                                                          margin-left: 8px;
                                                                          color: #606266; */
  font-weight: bold;
}
.vgt-wrap__footer .footer__row-count__select:focus {
  outline: none;
  border-color: #409eff;
}
.vgt-wrap__footer .footer__navigation {
  font-size: 14px;
}
.vgt-wrap__footer .footer__navigation__page-btn,
.vgt-wrap__footer .footer__navigation__info,
.vgt-wrap__footer .footer__navigation__page-info {
  display: inline-block;
  vertical-align: middle;
}
.vgt-wrap__footer .footer__navigation__page-btn {
  text-decoration: none;
  color: #606266;
  font-weight: bold;
  white-space: nowrap;
}
.vgt-wrap__footer .footer__navigation__page-btn:focus {
  outline: none;
  border: 0;
}
.vgt-wrap__footer .footer__navigation__page-btn.disabled,
.vgt-wrap__footer .footer__navigation__page-btn.disabled:hover {
  opacity: 0.5;
  cursor: not-allowed;
}
.vgt-wrap__footer .footer__navigation__page-btn.disabled .chevron.left:after,
.vgt-wrap__footer
  .footer__navigation__page-btn.disabled:hover
  .chevron.left:after {
  border-right-color: #606266;
}
.vgt-wrap__footer .footer__navigation__page-btn.disabled .chevron.right:after,
.vgt-wrap__footer
  .footer__navigation__page-btn.disabled:hover
  .chevron.right:after {
  border-left-color: #606266;
}
.vgt-wrap__footer .footer__navigation__page-btn .chevron {
  width: 24px;
  height: 24px;
  border-radius: 15%;
  position: relative;
  margin: 0px 8px;
}
.vgt-wrap__footer .footer__navigation__page-btn .chevron:after {
  content: '';
  position: absolute;
  display: block;
  left: 50%;
  top: 50%;
  margin-top: -6px;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
}
.vgt-wrap__footer .footer__navigation__page-btn .chevron.left::after {
  border-right: 6px solid #409eff;
  margin-left: -3px;
}
.vgt-wrap__footer .footer__navigation__page-btn .chevron.right::after {
  border-left: 6px solid #409eff;
  margin-left: -3px;
}
.vgt-wrap__footer .footer__navigation__info,
.vgt-wrap__footer .footer__navigation__page-info {
  display: inline-block;
  color: #909399;
  margin: 0px 16px;
}
.vgt-wrap__footer .footer__navigation__page-info__current-entry {
  width: 30px;
  text-align: center;
  display: inline-block;
  margin: 0px 10px;
  font-weight: bold;
}

@media only screen and (max-width: 750px) {
  /* on small screens hide the info */
  .vgt-wrap__footer .footer__navigation__info {
    display: none;
  }
  .vgt-wrap__footer .footer__navigation__page-btn {
    margin-left: 16px;
  }
}

.vgt-table.nocturnal {
  border: 1px solid #435169;
  background-color: #324057;
}
.vgt-table.nocturnal tr.clickable:hover {
  background-color: #445168;
}
.vgt-table.nocturnal td {
  border-bottom: 1px solid #435169;
  color: #c7ced8;
}
.vgt-table.nocturnal th.line-numbers,
.vgt-table.nocturnal th.vgt-checkbox-col {
  color: #c7ced8;
  border-right: 1px solid #435169;
  background: linear-gradient(#2c394f, #2c394f);
}
.vgt-table.nocturnal thead th {
  color: #c7ced8;
  border-bottom: 1px solid #435169;
  background: linear-gradient(#2c394f, #2c394f);
}
.vgt-table.nocturnal thead th.sorting-asc,
.vgt-table.nocturnal thead th.sorting-desc {
  color: #9aa7b9;
}
.vgt-table.nocturnal.bordered td,
.vgt-table.nocturnal.bordered th {
  border: 1px solid #435169;
}
.vgt-table.nocturnal .vgt-input,
.vgt-table.nocturnal .vgt-select {
  color: #c7ced8;
  background-color: #232d3f;
  border: 1px solid #435169;
}
.vgt-table.nocturnal .vgt-input::placeholder,
.vgt-table.nocturnal .vgt-select::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #c7ced8;
  opacity: 0.3;
  /* Firefox */
}

.vgt-wrap.nocturnal .vgt-wrap__footer {
  color: #c7ced8;
  border: 1px solid #435169;
  background: linear-gradient(#2c394f, #2c394f);
}
.vgt-wrap.nocturnal .vgt-wrap__footer .footer__row-count__label {
  color: #8290a7;
}
.vgt-wrap.nocturnal .vgt-wrap__footer .footer__row-count__select {
  color: #c7ced8;
}
.vgt-wrap.nocturnal .vgt-wrap__footer .footer__row-count__select:focus {
  border-color: #409eff;
}
.vgt-wrap.nocturnal .vgt-wrap__footer .footer__navigation__page-btn {
  color: #c7ced8;
}
.vgt-wrap.nocturnal
  .vgt-wrap__footer
  .footer__navigation__page-btn.disabled
  .chevron.left:after,
.vgt-wrap.nocturnal
  .vgt-wrap__footer
  .footer__navigation__page-btn.disabled:hover
  .chevron.left:after {
  border-right-color: #c7ced8;
}
.vgt-wrap.nocturnal
  .vgt-wrap__footer
  .footer__navigation__page-btn.disabled
  .chevron.right:after,
.vgt-wrap.nocturnal
  .vgt-wrap__footer
  .footer__navigation__page-btn.disabled:hover
  .chevron.right:after {
  border-left-color: #c7ced8;
}
.vgt-wrap.nocturnal .vgt-wrap__footer .footer__navigation__info,
.vgt-wrap.nocturnal .vgt-wrap__footer .footer__navigation__page-info {
  color: #8290a7;
}

.vgt-wrap.nocturnal .vgt-global-search {
  border: 1px solid #435169;
  background: linear-gradient(#2c394f, #2c394f);
}

.vgt-wrap.nocturnal .vgt-global-search__input .input__icon .magnifying-glass {
  border: 2px solid #3f4c63;
}
.vgt-wrap.nocturnal
  .vgt-global-search__input
  .input__icon
  .magnifying-glass:before {
  background: #3f4c63;
}

.vgt-wrap.nocturnal .vgt-global-search__input .vgt-input,
.vgt-wrap.nocturnal .vgt-global-search__input .vgt-select {
  color: #c7ced8;
  background-color: #232d3f;
  border: 1px solid #435169;
}
.vgt-wrap.nocturnal .vgt-global-search__input .vgt-input::placeholder,
.vgt-wrap.nocturnal .vgt-global-search__input .vgt-select::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #c7ced8;
  opacity: 0.3;
  /* Firefox */
}

.vgt-table.black-rhino {
  border: 1px solid #435169;
  background-color: #dfe5ee;
}
.vgt-table.black-rhino tr.clickable:hover {
  background-color: #fff;
}
.vgt-table.black-rhino td {
  border-bottom: 1px solid #bbc5d6;
  color: #49515e;
}
.vgt-table.black-rhino th.line-numbers,
.vgt-table.black-rhino th.vgt-checkbox-col {
  color: #dae2f0;
  border-right: 1px solid #435169;
  background: linear-gradient(#4c5c79, #4e5d7c);
}
.vgt-table.black-rhino thead th {
  color: #dae2f0;
  text-shadow: 1px 1px #3e5170;
  border-bottom: 1px solid #435169;
  background: linear-gradient(#4c5c79, #4e5d7c);
}
.vgt-table.black-rhino thead th.sorting-asc,
.vgt-table.black-rhino thead th.sorting-desc {
  color: white;
}
.vgt-table.black-rhino.bordered td {
  border: 1px solid #bbc5d6;
}
.vgt-table.black-rhino.bordered th {
  border: 1px solid #435169;
}
.vgt-table.black-rhino .vgt-input,
.vgt-table.black-rhino .vgt-select {
  color: #dae2f0;
  background-color: #34445f;
  border: 1px solid transparent;
}
.vgt-table.black-rhino .vgt-input::placeholder,
.vgt-table.black-rhino .vgt-select::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #dae2f0;
  opacity: 0.3;
  /* Firefox */
}

.vgt-wrap.black-rhino .vgt-wrap__footer {
  color: #dae2f0;
  border: 1px solid #435169;
  background: linear-gradient(#4c5c79, #4e5d7c);
}
.vgt-wrap.black-rhino .vgt-wrap__footer .footer__row-count {
  position: relative;
  padding-right: 3px;
}
.vgt-wrap.black-rhino .vgt-wrap__footer .footer__row-count__label {
  color: #98a5b9;
}
.vgt-wrap.black-rhino .vgt-wrap__footer .footer__row-count__select {
  color: #49515e;
  background: #dfe5ee;
  border: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding-right: 15px;
  padding-left: 5px;
  border-radius: 3px;
}
.vgt-wrap.black-rhino .vgt-wrap__footer .footer__row-count__select::-ms-expand {
  display: none;
}
.vgt-wrap.black-rhino .vgt-wrap__footer .footer__row-count__select:focus {
  border-color: #409eff;
}
.vgt-wrap.black-rhino .vgt-wrap__footer .footer__row-count::after {
  content: '';
  display: block;
  position: absolute;
  height: 0px;
  width: 0px;
  right: 6px;
  top: 50%;
  margin-top: -1px;
  border-top: 6px solid #49515e;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: none;
  pointer-events: none;
}
.vgt-wrap.black-rhino .vgt-wrap__footer .footer__navigation__page-btn {
  color: #dae2f0;
}
.vgt-wrap.black-rhino
  .vgt-wrap__footer
  .footer__navigation__page-btn.disabled
  .chevron.left:after,
.vgt-wrap.black-rhino
  .vgt-wrap__footer
  .footer__navigation__page-btn.disabled:hover
  .chevron.left:after {
  border-right-color: #dae2f0;
}
.vgt-wrap.black-rhino
  .vgt-wrap__footer
  .footer__navigation__page-btn.disabled
  .chevron.right:after,
.vgt-wrap.black-rhino
  .vgt-wrap__footer
  .footer__navigation__page-btn.disabled:hover
  .chevron.right:after {
  border-left-color: #dae2f0;
}
.vgt-wrap.black-rhino .vgt-wrap__footer .footer__navigation__info,
.vgt-wrap.black-rhino .vgt-wrap__footer .footer__navigation__page-info {
  color: #dae2f0;
}

.vgt-wrap.black-rhino .vgt-global-search {
  border: 1px solid #435169;
  background: linear-gradient(#4c5c79, #4e5d7c);
}

.vgt-wrap.black-rhino .vgt-global-search__input .input__icon .magnifying-glass {
  border: 2px solid #3f4c63;
}
.vgt-wrap.black-rhino
  .vgt-global-search__input
  .input__icon
  .magnifying-glass:before {
  background: #3f4c63;
}

.vgt-wrap.black-rhino .vgt-global-search__input .vgt-input,
.vgt-wrap.black-rhino .vgt-global-search__input .vgt-select {
  color: #dae2f0;
  background-color: #44516c;
  border: 1px solid transparent;
}
.vgt-wrap.black-rhino .vgt-global-search__input .vgt-input::placeholder,
.vgt-wrap.black-rhino .vgt-global-search__input .vgt-select::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #dae2f0;
  opacity: 0.3;
  /* Firefox */
}
</style>
