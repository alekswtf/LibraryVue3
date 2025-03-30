<template>
    <div class="contacts-information">
            <div class="text-info">
                <div class="text-title">
                  <h3>For all Library inquiries:</h3>
                </div>
                <div class="phone-info">
                  <p>Please call (617) 730-2370 </p>
                  <p>For TTY service, please call (617) 730-2370 </p>
                  <p>Putterham Library: (617) 730-2385</p>
                </div>
                <div class="staff-info">
                  <h3>Senior Staff</h3>
    
                  <h3> <span>Library Director:</span> Amanda Hirst</h3>
                </div>
            </div>
            <div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.01579236972!2d-73.99387252271052!3d40.69564983861432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a49b649b8c3%3A0x6342a2291cea2e!2zMjg2IENhZG1hbiBQbHogVywgQnJvb2tseW4sIE5ZIDExMjAxLCDQodCo0JA!5e0!3m2!1sru!2sru!4v1713020899983!5m2!1sru!2sru" width="696" height="414" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@use '@/assets/styles/main.scss' as *;

.contacts-information {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
}

.text-info {
    display: flex;
    flex-direction: column;
    gap: 40px;
    font: {
        size: 20px;
        weight: 400;
        family: $inter;
    }
    line-height: 200%;
    letter-spacing: 0.1em;
    text-transform: capitalize;
    color: $black-color;
    h3 {
        font: {
            family: $inter;
            size: 20px;
            weight: bold;
          }
        line-height: 200%;
        letter-spacing: 0.1em;
        text-transform: capitalize;
        color: $black-color;
        text-align: left;
    }
}

.phone-info {
    display: flex;
    flex-direction: column;
    gap: 20px;
    text-align: left;
}

.staff-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    span {
        font-weight: 400;
    }
}

@include desktop {
    .contacts-information {
        flex-direction: column;
        iframe {
            margin-top: 100px;
        }
    }    
}
@include tablet {
    .contacts-information {
        flex-direction: column;
        iframe {
            margin-top: 100px;
        }
    }
}
</style>