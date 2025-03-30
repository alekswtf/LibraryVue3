<template>
    <div class="contacts-container">
        <TitleSimilar title="Our Contacts"/>
        <ContactsInformation />
    </div>
</template>

<script setup>
import TitleSimilar from '../shared/TitleSimilar.vue';
import ContactsInformation from './ContactsInfomation.vue';


</script>

<style lang="scss" scoped>
@use '@/assets/styles/main.scss' as *;

.contacts-container {
    max-height: 575px;
	text-align: center;
    margin-top: 55px;
    padding: 20px;
}    

@include desktop {
    .contacts-container {
        max-height: 1055px;
    }    
}
@include tablet {
    .contacts-container {
        max-height: 1055px;
    }
}
</style>