<template>
    <div v-if="isLoading" class="text-center d-flex align-items-center justify-content-center" style="height:50vh">
        <div class="spinner-border text-primary" role="status">
        </div>
    </div>
    <app-recipe-form :recipe="recipeDetail" v-else></app-recipe-form>
</template>

<script>
import RecipeForm from "~/components/admin/RecipeForm.vue";

export default {
    middleware: ["check-auth", "auth"],
    components: {
        "app-recipe-form": RecipeForm,
    },
    computed: {
        recipeDetail() {
            return this.$store.state.recipeDetail
        },
        userId() {
            return this.$store.getters.userId;
        }
    },
    data() {
        return {
            isLoading: true
        }
    },
    async created() {
        await this.$store.dispatch("getRecipeDetail", this.$route.params.detail)
        if (this.recipeDetail.userId !== this.userId) {
            this.$router.push("/")
        } else {
            this.isLoading = false
        }
    },
}
</script>
