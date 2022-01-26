<template>
    <div>
        <base-dialog :show="!!error" title="Failed" @close="handleError">
            {{ error }}
        </base-dialog>
        <base-dialog :show="isLoading" title="Authenticating" fixed>
            <base-spinner></base-spinner>
        </base-dialog>
        <base-card>
            <form @submit.prevent="submitForm">
                <div class="form-control">
                    <label for="email">Email</label>
                    <input type="text" name="email" id="email" v-model.trim="email" />
                </div>
                <div class="form-control">
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" v-model.trim="password"/>
                </div>
                <base-button>{{ loginButtonCaption }}</base-button>
                <base-button type="button" mode="flat" @click="switchAuthMode">{{ switchAuthCaption }}</base-button>
                <p v-if="!formIsValid">Please enter a valide email and password</p>
            </form>
        </base-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            formIsValid: true,
            mode: 'login',
            isLoading: false,
            error: null
        };
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
        async submitForm() {
            this.formIsValid = true;
            if (this.email === '' || !this.email.includes('@') || this.email.length < 6) {
                this.formIsValid = false;
                return;
            }

            this.isLoading = true;

            const actionPayload = {
                        email: this.email,
                        password: this.password
                    };

            try {
                if (this.mode === 'login') {
                     await this.$store.dispatch('login', actionPayload);
                }
                else {
                    await this.$store.dispatch('signup', actionPayload);
                }
            }
            catch (e) {
                this.error = e.message || 'Failed';
            }
            this.isLoading = false;
        },
        switchAuthMode() {
            if (this.mode === 'login') {
                this.mode = 'signup';
            }
            else {
                this.mode = 'login';
            }
        },
        handleError() {
            this.error = null;
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