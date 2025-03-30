<template>
    <footer>
        <div class="footer-wrapper">
          <div class="frame-top">
            <h5>286 Cadman Plaza, New York, <br>NY 11238, United States</h5>
            <span>Mon - Fri <br>
              08:00 am - 07:00 pm</span>
          </div>
    
          <div class="frame-bottom">
    
            <div class="social-media">
              <a href="#"><img src="../../assets/icons/Twitter.svg" alt="Twitter"></a>
              <a href="#"><img src="../../assets/icons/Inst.svg" alt="Instagram"></a>
              <a href="#"><img src="../../assets/icons/FB.svg" alt="FaceBook"></a>
            </div>
    
            <span>Sat - Sun <br>
              10:00 am - 06:00 pm</span>
          </div>
          <hr>
    
          <div class="footer-rss">
            <span>2025 </span>
            <span>The Rolling Scopes School</span>
            <span>Aleksey_Wtf</span>
          </div>
    
        </div>
      </footer>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@use '@/assets/styles/main.scss' as *;

footer {
    height: 250px;
    background-color: $main-color;
    margin-top: 20px;
    padding: 20px;
}

.footer-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-family: $inter;
    font-size: 15px;
    color: $white-color;
    line-height: 133%;
    gap: 10px;
    hr {
        border: 1px solid $white-color;
        width: 100%;
        height: 0px;
        margin-top: 20px;
    }
    .frame-top {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: space-between;
        span {
            text-align: end;
        }
    }
    .frame-bottom {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: space-between;
        span {
            text-align: end;
        }
        .social-media {
            display: flex;
            justify-content: space-between;
            width: 102px;
            height: 24px;
            
        }
    }

    .footer-rss {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-size: 20px;
        line-height: 100%;
        letter-spacing: 0.1em;
        margin-top: 30px;
    }
}


</style>