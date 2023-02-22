<template>
  <div :class="colStyle">
    <slot></slot>
    <input type="text" class="form-control" :placeholder="placeholder" @input="$emit('input', $event.target.value)"
      :value="value">
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    colStyle: {
      type: String,
      default: "col-12",
    },
  }
}
</script>