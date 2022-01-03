<script setup>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
</script>

<template>
  <form @submit.prevent="login()"></form>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
