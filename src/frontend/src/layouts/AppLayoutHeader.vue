<template>
  <header class="header">
    <div class="header__logo">
      <router-link to="/" class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link to="/cart">{{ getTotalPrice }} ₽</router-link>
    </div>
    <div class="header__user">
      <a href="#" class="header__login"><span>Войти</span></a>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "AppLayoutHeader",

  computed: {
    ...mapGetters("Cart", ["getTotalPrice"]),
  },
};
</script>
