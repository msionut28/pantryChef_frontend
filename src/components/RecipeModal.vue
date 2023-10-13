<template>
<div class="modal fade" id="modalId" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalTitleId">{{ recipe.title }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <h4>INGREDIENTS</h4>
                <ul>
                    <li v-for="ingredient in recipe.ingredients" :key="ingredient">{{ ingredient }}</li>
                </ul>
                <p>{{ recipe.description }}</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'RecipeModal',
    props: {
        recipe: Object,
    },
};
</script>

<style scoped>
ul{
    text-align: center;
}
li{
    list-style: none;
}

.modal-title{
    text-transform: capitalize;
}
.modal-body{
    text-align: center;
}
</style>