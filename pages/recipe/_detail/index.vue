<template>
    <div>
        <main>
            <div class="recipes-detail" v-if="recipeDetail && isLoading === false">
                <div>
                    <img class="recipes-detail__img" alt="Pasta" :src="recipeDetail.recipeImage">
                    <h1 class="recipes-detail__title">{{ recipeDetail.recipeTitle }}</h1>
                    <p class="recipes-detail__body">
                        {{ recipeDetail.body }}
                    </p>
                </div>
            </div>
            <div v-else class="text-center d-flex align-items-center justify-content-center" style="height:50vh">
                <div class="spinner-border text-primary" role="status">
                </div>
            </div>
        </main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isLoading: true
        }
    },
    async created() {
        await this.$store.dispatch("getRecipeDetail", this.$route.params.detail)
        this.isLoading = false;
    },
    computed: {
        recipeDetail() {
            return this.$store.state.recipeDetail
        }
    }

}
</script>

<style>
.recipes-detail {
    display: flex;
    justify-content: center;
}

.recipes-detail div {
    width: 600px;
}

.recipes-detail__img {
    width: 400px;
    height: 300px;
    display: block;
    text-align: center;
    margin: 0px auto;
}

.recipes-detail__title {
    text-align: center;
}
</style>