<template>
  <div  class="modal-container" @click="closeModal">
  <div class="buyCard" @click.stop >
    <h2>Buy a library card</h2>
    <span class="close" @click="closeModal">
      <img src="../../assets/icons/close_btn_white.svg" alt="closeBtn" />
    </span>

    <div class="buyCard-wrapper">
      <form @submit.prevent="handleSubmit" id="buyCardForm" class="buyCardForm">
        <label for="bankCardNumber">Bank card number</label>
        <input
          type="text"
          name="bankCardNumber"
          id="bankCardNumber"
          v-model="cardStore.bankCardNumber"
          pattern="\d{4}\s\d{4}\s\d{4}\s\d{4}"
          maxlength="19"
          required
          placeholder="1234 5678 9012 3456"
        />

        <div class="buyCard-expirationCode">
          <label for="expirationCode">Expiration Code</label>
          <div class="expirationCode-wrapper">
            <input
              type="text"
              name="expirationCodeMonth"
              id="expirationCodeMonth"
              v-model="cardStore.expirationCodeMonth"
              class="expirationCodeMonth"
              pattern="(0[1-9]|1[0-2])"
              maxlength="2"
              required
              placeholder="MM"
            />
            <input
              type="text"
              name="expirationCodeYear"
              id="expirationCodeYear"
              v-model="cardStore.expirationCodeYear"
              class="expirationCodeYear"
              pattern="\d{2}"
              maxlength="2"
              required
              placeholder="YY"
            />
          </div>
        </div>

        <label for="cvcCode">CVC</label>
        <input
          type="text"
          name="cvcCode"
          id="cvcCode"
          v-model="cardStore.cvcCode"
          class="cvcCode"
          pattern="[0-9]{3}"
          maxlength="3"
          required
          placeholder="123"
        />

        <label for="cardHolder">Cardholder name</label>
        <input
          type="text"
          name="cardHolder"
          id="cardHolder"
          v-model="cardStore.cardHolder"
          required
          placeholder="John Doe"
        />

        <label for="postalCode">Postal Code</label>
        <input
          type="text"
          name="postalCode"
          id="postalCode"
          pattern="[0-9]{1,10}"
          maxlength="10"
          v-model="cardStore.postalCode"
          required
          placeholder="12345"
        />

        <label for="cityTown">City / Town</label>
        <input
          type="text"
          name="cityTown"
          id="cityTown"
          v-model="cardStore.cityTown"
          required
          placeholder="New York"
        />

        <div class="buyCardPrice">
          <button type="submit" form="buyCardForm">Buy</button>
          <span>$ 25.00</span>
        </div>

        <p v-if="cardStore.error" class="error">{{ cardStore.error }}</p>
      </form>

      <div class="buyCardInfo">
        <p>
          If you live, work, attend school, or pay property taxes in New York State,
          you can get a $25 digital library card right now using this online form.
          Visitors to New York State can also use this form to apply for a temporary card.
        </p>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useCardStore } from '@/store/useCardStore'; 
import { useAuthStore } from '@/store/auth';
import { defineProps, defineEmits } from 'vue';

const emit = defineEmits(['close']);
const props = defineProps({
  book: { 
    type: Object,
    required: false,
    default: null,
  },
});

const cardStore = useCardStore();
const authStore = useAuthStore();

onMounted(() => {
  if (authStore.isAuthenticated) {
    cardStore.loadCardDetails(); 
  }
});

const handleSubmit = async () => {
  
  if (!authStore.isAuthenticated) {
    cardStore.error = 'Please log in to save card details';
    return;
  }

  let success;
  if (props.book) {
    success = await cardStore.saveCardDetailsAndBuy(props.book);
  } else {
    success = await cardStore.saveCardDetails();
  }

  if (success) {
    closeModal(); 
  }
};

const closeModal = () => {
  cardStore.resetForm();
  emit('close');
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/main.scss' as *;
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 149;
}

.buyCard {
  padding: 0 0 10px;
  min-height: 540px;
  min-width: 650px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  line-height: 133%;
  letter-spacing: 0.02em;
  font-family: $inter;
  background-color: $white-color;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  img {
    position: absolute;
    top: 20px;
    right: 15px;
    cursor: pointer;
  }

  h2 {
    padding: 20px 0;
    background-color: $main-color;
    color: $white-color;
    font-family: $forum;
    font-size: 40px;
    line-height: 50%;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    text-align: center;
  }
}

.buyCard-wrapper {
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 20px;
}

.buyCardForm {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: $inter;
  font-size: 15px;
  line-height: 133%;
  letter-spacing: 0.02em;
  color: $black-color;
  gap: 10px;

  label {
    font-weight: bold;
  }

  input {
    width: 200px;
    height: 30px;
    border: 1px solid $brown-color;
    padding: 5px;
    font-family: $inter;
    font-size: 14px;
    &:focus {
      outline: none;
      border-color: $main-color;
    }
  }

  button {
    @include button-styles;
    width: 100px;
    height: 40px;
    font-size: 14px;
  }
}

.buyCard-expirationCode {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .expirationCode-wrapper {
    display: flex;
    gap: 10px;
  }

  #expirationCodeMonth,
  #expirationCodeYear {
    width: 45px;
  }
}

#cvcCode {
  width: 60px;
}

.buyCardPrice {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 20px;

  span {
    font-family: $inter;
    font-weight: bold;
    font-size: 20px;
    line-height: 100%;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: $main-color;
  }
}

.buyCardInfo {
  width: 329px;
  margin-top: 20px;
  text-align: left;

  p {
    font-family: $inter;
    font-size: 15px;
    line-height: 133%;
    letter-spacing: 0.13em;
    color: $grey-color;
  }
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}

input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>