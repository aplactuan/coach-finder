<template>
    <base-card>
        <form @submit.prevent="submitForm">
            <div class="form-control">
                <label for="email">Email</label>
                <input type="text" name="email" id="email" v-model.trim="email" />
            </div>
            <div class="form-control">
                <label for="password">Password</label>
                <input type="text" name="password" id="password" v-model.trim="password"/>
            </div>
            <base-button>{{ loginButtonCaption }}</base-button>
            <base-button type="button" mode="flat" @click="switchAuthMode">{{ switchAuthCaption }}</base-button>
            <p v-if="!formIsValid">Please enter a valide email and password</p>
        </form>
    </base-card>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            formIsValid: true,
            mode: 'login'
        }
    },
    computed: {
        loginButtonCaption() {
            if (this.mode === 'login') {
                return 'Login';
            }
            return 'Signup';
        },
        switchAuthCaption() {
             if (this.mode === 'login') {
                return 'Sign up instead';
            }
            return 'Login instead';
        }
    },
    methods: {
        submitForm() {
            this.formIsValid = true;
            if (this.email === '' || !this.email.includes('@') || this.email.length < 6) {
                this.formIsValid = false;
                return;
            }
        },
        switchAuthMode() {
            if (this.mode === 'login') {
                this.mode = 'signup';
            }
            else {
                this.mode = 'login';
            }
        }
    }
}
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>