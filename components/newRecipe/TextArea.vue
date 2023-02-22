<template>
  <div class="mb-3">
    <slot></slot>
    <textarea class="form-control" rows="4" style="resize:none;" @input="$emit('input', $event.target.value)"
      :value="value"></textarea>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ""
    },
  },
}
</script>