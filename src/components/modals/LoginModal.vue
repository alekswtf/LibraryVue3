<template>
  <div  class="modal-container" @click="closeModal">
        <div class="modal" @click.stop>
            <div class="modal-content-login">
              <span class="close" @click="closeModal">
                <img src="../../assets/icons/close_btn.svg" alt="closeBtn">
              </span>
              <h2>LOGIN</h2>
              <form @submit.prevent="handleLogin">
                <label for="userEmail">E-mail or readers card</label>
                <input 
                type="email" 
                id="userEmail" 
                name="userEmail" 
                v-model="userEmail" required>

                <label for="password">Password:</label>
                <input 
                type="password" 
                id="password" 
                name="password" 
                v-model="password" required>

                <button type="submit">Log In</button>
                <p v-if="authStore.error" class="error">{{ authStore.error }}</p>
              </form>
              <h5>Don’t have an account?
                <span class="register-link" 
                @click="switchToRegister">Register</span>
              </h5>
            </div>
        </div>
    </div>     
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { useAuthStore } from '@/store/auth';

const userEmail = ref('');
const password = ref('');
const authStore = useAuthStore();
const emit = defineEmits(['close', 'switchToRegister']);


const closeModal = () => {
  emit('close');
};

const handleLogin = async () => {
  if (authStore.isAuthenticated) {
    await authStore.logout(); // Выходим, если уже авторизован
  }
  const success = await authStore.login({
    email: userEmail.value,
    password: password.value,
  });
  if (success) {
    console.log('Logged in successfully');
    closeModal();
  }
};

const switchToRegister = () => {
  emit('switchToRegister');
};

</script>

<style lang="scss" scoped >

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

.modal {
    background-color: $white-color;
    font-family: $inter;
    font-weight: 400;
    font-size: 15px;
    color: $black-color;
    z-index: 150;
    position: fixed;
}

.modal-content-login {
    
    width: 250px;
    max-height: 310px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 10px;
    position: relative;
    text-align: left;
}
  
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

	.register-link {
		font-weight: bold;
		font-size: 10px;
		letter-spacing: 0.1em;
		text-decoration: underline;
		text-decoration-skip-ink: none;
		text-align: center;
		color: $main-color;
		cursor: pointer;
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