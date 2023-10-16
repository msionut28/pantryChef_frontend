<template>
<button type="button" id ="deploy-button" class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#modalId">
    Click <span>HERE</span> to Pick a Membership Rank
</button>

<div class="modal fade" id="modalId" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalTitleId">PICK ONE OF YOUR MEMBERSHIPS!</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                Please support our site!<br> With the <strong>REGULAR MEMBERSHIP</strong>, you can only create 5 recipes a day, but it's completely <strong>FREE</strong>. <br>While <strong>SILVER MEMBERSHIP</strong> offers our users up to 15 recipes a day, it costs <strong>£5 per MONTH</strong>. <br><strong>PLATINUM MEMBERSHIP</strong> has unlimited generators at a cost of <strong>£10 per MONTH</strong>.
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="choice" @click="updateMember(1)">
                    REGULAR MEMBERSHIP
                </button>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#silvermodal" id="choice">
                    SILVER MEMBERSHIP
                </button>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#platinummodal" id="choice">
                    PLATINUM MEMBERSHIP
                </button>
            </div>
        </div>
    </div>
</div>

<!-- SILVER CHOICE -->
<div class="modal fade silver" id="silvermodal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalTitleId">SILVER MEMBERSHIP</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <strong>Please process your payment!</strong>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="choice" @click="updateMember(2)">GIVE ME £5 </button>
            </div>
        </div>
    </div>
</div>
  
  <!-- PLATINUM CHOICE -->
<div class="modal fade silver" id="platinummodal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalTitleId">PLATINUM MEMBERSHIP</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <strong>Please process your payment!</strong>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="choice" @click="updateMember(3)">GIVE ME £10 </button>
            </div>
        </div>
    </div>
</div>
  
</template>

<script>
const backendApi = process.env.VUE_APP_BACKEND_API
export default{
    name: 'ShowModal',
    methods: {
        async updateMember(newMembership){
        const userName = this.$cookies.get('username')
        const data = { membership: parseInt(newMembership) }
        await fetch(`${backendApi}/users/${userName}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data.message);
        })
        .then(location.reload())
        .then(this.$cookies.remove('new_user'))
        .catch((error) => {
            console.error(error);
        });
            }
        }
}
</script>

<style scoped>
span{
    font-weight: bold;
}
#choice{
    background-color: darkgray;
    border: none;
}
.modal-footer{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
#deploy-button{
    background-color: transparent;
    color: black;
    width: 20vw;
    font-size: 14px;
    border: none;
}
</style>