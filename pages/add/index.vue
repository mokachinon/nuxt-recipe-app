<template>
    <app-recipe-form></app-recipe-form>
</template>

<script>
import RecipeForm from "~/components/admin/RecipeForm.vue";

export default {
    middleware: ['check-auth', "auth"],
    components: {
        "app-recipe-form": RecipeForm,
    }
}
</script>
