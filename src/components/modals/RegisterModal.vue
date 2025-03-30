<template>
    <div class="modal-container" @click="closeModal">
        <div class="modal" @click.stop>
          <div class="modal-content-register">
            <span class="close" @click="closeModal">
              <img src="../../assets/icons/close_btn.svg" alt="closeBtn">
            </span>
            <h2>Register</h2>
            <form @submit.prevent="handleRegister">
              <label for="userFirstNameReg">First name</label>
              <input 
              type="text" 
              id="userFirstNameReg" 
              name="userFirstName" 
              v-model="userFirstName" required>
              <label for="userLastNameReg">Last name</label>
              <input 
              type="text" 
              id="userLastNameReg" 
              name="userLastName" 
              v-model="userLastName" required>
              <label for="userEmailReg">E-mail</label>
              <input 
              type="email" 
              id="userEmailReg" 
              name="userEmail" 
              v-model="userEmail" required>
              <label for="passwordReg">Password</label>
              <input 
              type="password" 
              id="passwordReg" 
              name="password" 
              v-model="password" 
              minlength="8"
              required>
              <button type="submit">Sign Up</button>
              <p v-if="authStore.error" class="error">{{ authStore.error }}</p>
            </form>
            <h5>Already have an account?
              <span class="login-link" 
              @click="switchToLogin">Login</span>
            </h5>
          </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { useAuthStore } from '@/store/auth';

const userFirstName = ref('');
const userLastName = ref('');
const userEmail = ref('');
const password = ref('');

const authStore = useAuthStore();

const emit = defineEmits(['close', 'switchToLogin']);


const closeModal = () => {
  emit('close');
};

const handleRegister = async () => {
  const success = await authStore.register({
    firstName: userFirstName.value,
    lastName: userLastName.value,
    email: userEmail.value,
    password: password.value,
  });

  if (success) {
    console.log('Registered successfully');
    closeModal();
  }
};

const switchToLogin = () => {
  emit('switchToLogin');
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

.modal-content-register {
    width: 250px;
    max-height: 410px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 10px;
    position: relative;
    text-align: left;
}
  .modal {
    z-index: 150;
    position: fixed;
    background-color: $white-color;
    font-family: $inter;
    font-weight: 400;
    font-size: 15px;
    color: $black-color;
    h2 {
        font-family: $forum;
        font-weight: 400;
        font-size: 20px;
        color: $black-color;
		line-height: 100%;
		letter-spacing: 0.02em;
		text-transform: uppercase;
		text-align: center;
		margin-top: 15px;
	}

	form {
		gap: 10px;
		display: flex;
		flex-direction: column;
		input {
			border: 1px solid $brown-color;
			width: 200px;
			height: 20px;
			&:focus {
				outline:none;
			}
		}
	}

	button { 
    @include button-styles;
		margin-top: 15px;
	}

	h5 {
		font-size: 10px;
	}

	.login-link {
		font-weight: bold;
		font-size: 10px;
		letter-spacing: 0.1em;
		text-decoration: underline;
		text-decoration-skip-ink: none;
		text-align: center;
		color: $main-color;
		cursor: pointer;
	  }
  }
  
  .close {
    position: absolute;
    right: 15px;
    cursor: pointer;
  }

  .error {
  color: red;
  font-size: 12px;
}

</style>