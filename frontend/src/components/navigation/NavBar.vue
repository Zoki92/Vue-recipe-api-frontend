<template>
  <div>
    <b-navbar type="dark" variant="dark" class="navbar">
      <b-navbar-nav>
        <b-nav-item tag="light" class="home">
          <router-link :to="{ name: 'Home'}">Home</router-link>
        </b-nav-item>

        <!-- Navbar dropdowns -->
        <b-nav-item-dropdown text="Add" right class="dropdown">
          <b-dropdown-item>
            <router-link :to="{name: 'AddRecipe'}">Add Recipe</router-link>
          </b-dropdown-item>
          <b-dropdown-item>
            <router-link :to="{name: 'IngredientsList'}">List of Ingredients</router-link>
          </b-dropdown-item>
          <b-dropdown-item>
            <router-link :to="{name: 'TagsList'}">List of Tags</router-link>
          </b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown text="User" right>
          <b-dropdown-item href="#">Account</b-dropdown-item>
          <b-dropdown-item href="#">Settings</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.home a {
  text-decoration: none;
  color: white;
}
.dropdown a {
  text-decoration: none;
  color: black;
}
</style>
