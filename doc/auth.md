# How to Authorize a User

- Login

```javascript
this.$http.get('/login', {
  auth: {
    username: this.loginForm.usernameInput,
    password: this.loginForm.passwordInput
  }
})
```