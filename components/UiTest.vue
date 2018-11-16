<template lang="pug">
section
  <divider title="Buttons" />
  fieldset
    legend Button
    .form-line
      button base button
      button(disabled) button disabled
      button.btn(type="reset") [type=reset]
      button.btn(type="submit") [type=submit]

    .Tag fill/mod
    .form-line
      each styl in ['btn fill lite','btn fill red','btn fill green','btn fill orange','btn']
        div(class=""+styl) #{styl}

    .Tag button-group
    p
      .button-group
        each _,i in Array(3)
          div.btn.fill.lite item_#{i+1}
    p
      .button-group
        each _,i in Array(3)
          div.btn.flat item_#{i+1}
    p
      .button-group
        each _,i in Array(3)
          div.btn.flat.red item_#{i+1}
    p
      .button-group
        each _,i in Array(3)
          div.btn.flat.green item_#{i+1}
    p
      .button-group
        each _,i in Array(3)
          div.btn.flat.orange item_#{i+1}
    p
      .button-group
        each _,i in Array(3)
          div.btn item_#{i+1}
    p
      .button-group
        each _,i in Array(3)
          div.btn.fill.green item_#{i+1}
    p
      .button-group
        div.btn.fill item_1
        div.btn.fill.red item_1
        div.btn.fill.orange item_2

    .Tag flat/mod
    .form-line
      each styl in ['btn flat','btn flat blue','btn flat red','btn flat green','btn flat orange']
        div(class=""+styl) #{styl}


    .Flex_wr
      //- each img in ['1053','1051','1054','1057']
      .Card
        img(
          height="160"
          src="https://picsum.photos/240/160?image="+1053
        )
        .btnActions
          .btn.flat action
          .btn.fill.red удалить
      .Card
        img(
          height="160"
          src="https://picsum.photos/240/160?image="+1051
        )
        .btnActions
          .btn.flat.red action
          .btn ОК
      .Card
        img(
          height="160"
          src="https://picsum.photos/240/160?image="+1054
        )
        .btnActions
          .btn.flat.green action
          .btn.fill.green ОК
      .Card
        img(
          height="160"
          src="https://picsum.photos/240/160?image="+1057
        )
        .btnActions
          .btn.flat.orange action
          .btn.fill.orange ОК



    .Tag outline/mod
    .form-line
      each styl in ['btn outline','btn outline blue','btn outline red','btn outline green','btn outline orange']
        div(class=""+styl) #{styl}

    .Tag size/mod
    .form-line
      each styl in ['btn xl','btn lg','btn','btn sm']
        div(class=""+styl) #{styl}
    each mod in ['fill lite','fill red','fill green','fill orange']
      .form-line
        each styl in ['btn xl','btn lg','btn','btn sm']
          div(class=`${mod} ${styl}`) #{styl} #{mod}
    each mod in ['outline','outline blue','outline red','outline green','outline orange']
      .form-line
        each styl in ['btn xl','btn lg','btn','btn sm']
          div(class=`${mod} ${styl}`) #{styl} #{mod}

    .Tag disabled
    .form-line
      each styl in ['btn fill lite','btn fill red','btn fill green','btn fill orange','btn']
        div(class=""+styl, disabled) #{styl} disabled
    .form-line
      each styl in ['btn fill red lg','btn fill red sm','btn outline lg','btn outline sm','btn outline green lg']
        div(class=""+styl, disabled) #{styl} disabled


  <divider title="Checkbox-Radio" />
  fieldset
    legend Checkbox, Radio
    .Tag checkbox
    each _,i in Array(3)
      label
        input(type='checkbox', name='checkbox', value=''+(i+1) )
        | Option #{i+1}

    label
      input(type='checkbox', name='checkbox', value='4', checked)
      | Checked

    .Tag radio
    each _,i in Array(3)
      label
        input(type='radio', name='radio', value=''+(i+1) )
        | Option #{i+1}
    label
      input(type='radio', name='radio', value='4', checked)
      | Checked

    .Tag .checked-group checkbox
    fieldset
      legend checked-group checkbox
      .checked-group
        each _,i in Array(23)
          label
            input(type='checkbox', name='checkbox', value=''+(i+1) )
            span.ripple Option #{i+1}
    .Tag .checked-group radio
    fieldset
      legend checked-group radio
      .checked-group
        each _,i in Array(23)
          label
            input(type='radio', name='radio', value=''+(i+1) )
            span.ripple Option #{i+1}



  <divider title="Input-EL" />
  fieldset
    legend Input EL
    .form-line
      select
        each option in ['red','green','orange','lite','circle']
          option #{option}
      input(value='Read-only value', readonly)
      input(placeholder='*Required')
      input(disabled, placeholder='*disabled')

    .Tag size/mod
    .form-line
      each styl in ['lg','','sm']
        select(class=""+styl)
          each option in ['red','green','orange','lite','circle']
            option #{option}
    .form-line
      each styl in ['lg','','sm']
        input(placeholder="input "+styl, class=""+styl)
      input(disabled, placeholder='*disabled', class="sm")
      input(disabled, placeholder='*disabled', class="lg")

    .Tag 'color', 'date', 'datetime', 'datetime-local', 'email', 'number', 'range', 'search', 'tel', 'time', 'url', 'month', 'week'
    .form-line
      input(type='color' pattern="#[a-f0-9]{6}" title="hexadecimal color" placeholder="#000000")
      each type in ['color','date','datetime','datetime-local','email','number','range','search','tel','time','url','month','week', 'file','password']
        label #{type}
          input(type=""+type)




  fieldset
    legend form-group
    .Flex_wr
      .form-group.col.w_25
        input.Search(type='text')
        select(multiple)
          each option in ['red','green','orange','lite','circle']
            option #{option}
        select
          each option in ['red','green','orange','lite','circle']
            option #{option}
        textarea
        input(placeholder='*Required')
        input(disabled, placeholder='*disabled')
        .checked-col
          each _,i in Array(3)
            label
              input(type='radio', name='radio', value=''+(i+1) )
              | Option #{i+1}
          label
            input(type='radio', name='radio', value='4', checked)
            | Checked
        input(disabled, placeholder='*disabled')
        button button

      .col.w_75
        h2 Flex Form
        .Flex_wr.form-line
          input.col(placeholder='Input width 1/2')
          input.col(placeholder='Input width 1/2')
        .Flex_wr.form-line
          .col(style="flex-basis: 210px;align-self:center")
            each _,i in Array(3)
              label
                input(type='radio', name='radio', value=''+(i+1) )
                | Option #{i+1}
            label
              input(type='radio', name='radio', value='4', checked)
              | Checked

          input.col(placeholder='Input')
        .Flex_wr.form-line
          input.col.w_25(placeholder='Input width 1/4')
          input.col.w_50(placeholder='Input width 1/2')
          input.col.w_25(placeholder='Input width 1/4')
        .Flex_wr.form-line
          input.col.w_75(placeholder='Input width 3/4')
          div
            button base button

  <divider title="Table" />
  h1 Table

  .Tag base table
  .table-responsive
    table
      thead
        tr
          each _,i in Array(5)
            th thead_#{i+1}
      tbody
        each _,i in Array(3)
          tr
            each _,i in Array(4)
              td data_#{i+1}
            td.td_buttonGroup
              .button-group
                each styl,i in ['btn','btn fill red','btn fill green','btn fill orange']
                  div(class=""+styl) action#{i+1}

  .Tag table_col
  table.table_col
    thead
      tr
        each _,i in Array(5)
          th thead_#{i+1}
    tbody
      each _,i in Array(2)
        tr
          each _,i in Array(5)
            td data_#{i+1}
  .Tag table_distance
  .table-responsive
    table.table_distance
      thead
        tr
          each _,i in Array(5)
            th thead_#{i+1}
      tbody
        each _,i in Array(3)
          tr
            each _,i in Array(5)
              td data_#{i+1}
  .Tag table_striped
  .table-responsive
    table.table_striped
      thead
        tr
          each _,i in Array(5)
            th thead_#{i+1}
      tbody
        each _,i in Array(5)
          tr
            each _,i in Array(5)
              td data_#{i+1}
  <divider title="Typography" />
  h1 Typography
  .Tag textList
  ol.textList
    li Lorem ipsum dolor sit amet consectetur
    li Lorem ipsum dolor sit amet consectetur
    li Lorem ipsum dolor sit amet consectetur
    ol
      li Lorem ipsum dolor sit amet consectetur
      li Lorem ipsum dolor sit amet consectetur
      li Lorem ipsum dolor sit amet consectetur
  ul.textList
    li Lorem ipsum dolor sit amet consectetur
    li Lorem ipsum dolor sit amet consectetur
    li Lorem ipsum dolor sit amet consectetur

  //Text
  .Tag h1
  h1 Lorem ipsum dolor sit amet quos dolorem recusandae deleniti quasi
  .Tag h2
  h2 Lorem ipsum dolor sit amet quos dolorem recusandae deleniti quasi
  .Tag h3
  h3 Lorem ipsum dolor sit amet quos dolorem recusandae deleniti quasi
  .Tag h4
  h4 Lorem ipsum dolor sit amet quos dolorem recusandae deleniti quasi
  .Tag h5
  h5 Lorem ipsum dolor sit amet quos dolorem recusandae deleniti quasi
  .Tag p
  p Lorem ipsum dolor &nbsp
    span.Tag b
    | <b>sit amet consectetur</b>
    span.Tag /b
    | &nbsp adipisicing elit . &nbsp
    span.Tag em
    | <em>Blanditiis explicabo</em>
    span.Tag /em
    | &nbsp porro, &nbsp
    span.Tag s
    | <s>voluptatum laborum</s>
    span.Tag /s
    | &nbsp cumque molestiae quibusdam accusamus sed, quam sint ducimus libero distinctio? Dolore laborum, &nbsp
    span.Tag strong
    | <strong>quos dolorem</strong>
    span.Tag /strong
    | &nbsp recusandae deleniti quasi.
  p Lorem ipsum dolor sit, amet consectetur <a href="#">link</a> adipisicing elit. Voluptate non <a href="#">ab dicta iure</a> quibusdam deserunt assumenda nulla commodi accusamus numquam, aliquam veniam saepe accusantium nostrum?
  hr
  p Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque facere soluta quia enim incidunt, et possimus deleniti natus esse, assumenda tempore. Cupiditate recusandae impedit est voluptate deleniti ab, doloremque minima.  Minus quo odio dolore deleniti eos facere distinctio reprehenderit, architecto quos, nam similique a eaque quas at quis? Cumque alias totam nemo!
  p Nisi ipsam consequuntur qui suscipit voluptatem at mollitia ipsum, ab dolorum omnis doloribus ratione numquam cum in fuga nulla modi illo earum. Vitae tempora, sint dolore omnis architecto earum rem incidunt laboriosam perferendis, pariatur deserunt quis quasi at voluptatem voluptas? Error et praesentium numquam. Maiores laudantium voluptates ea? Blanditiis ullam vel veritatis non reiciendis veniam atque perspiciatis aliquam. Tempore, rem quos!
  p Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, totam! Nemo quibusdam suscipit perspiciatis illo nesciunt, labore quidem, laudantium quam, vero asperiores modi doloribus delectus nobis quo a. Ratione, doloribus.Delectus adipisci repudiandae, deserunt, cumque laborum vero quae ad doloremque molestias harum veritatis, eveniet ducimus? Distinctio asperiores, doloremque alias, animi nemo praesentium quaerat quis ipsam porro, ab aut eveniet provident!Odio quia, consequatur illum doloremque molestias suscipit esse. Autem voluptatum eius quae recusandae illum eligendi sunt nisi obcaecati atque officiis ad magni, ea fugit possimus quidem, velit ipsum quod tempora?Repellat eos quo numquam dolore ipsam quaerat, labore est. Doloribus atque quod omnis provident voluptatibus debitis maiores maxime dolores beatae, reprehenderit possimus excepturi. Eius ab similique laboriosam, maiores reiciendis modi!Sapiente recusandae assumenda eligendi maiores, ab odio nam? Cupiditate pariatur ipsa placeat, quidem reprehenderit accusantium vero architecto deserunt repellendus sapiente, animi rerum autem quas ut. Assumenda perspiciatis sequi reiciendis quos.
</template>
<script>
import Divider from '~/components/Divider.vue'
export default {
  components: {
    Divider
  }
}
</script>
