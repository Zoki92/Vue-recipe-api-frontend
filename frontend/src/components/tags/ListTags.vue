<template>
  <div>
    <div>
      <b-button
        variant="light"
        @click="$bvModal.show('modal-scoped1')"
        style="margin-bottom: 10px; color: #1ca078f8; margin-top:10px;"
      >
        <font-awesome-icon icon="plus" style="color:#1ca078f8"/>
        {{" "}}Add tags to the list
      </b-button>
      <b-modal id="modal-scoped1" title="Tags Input">
        <!-- Form for Tags -->
        <template slot="default" slot-scope="{ok}">
          <b-form @submit="onSubmitTag" v-if="show">
            <b-form-group
              id="input-group-tags-1"
              label="Name"
              label-for="input-tags-1"
              description="Please enter the name of the tag"
            >
              <b-form-input
                id="input-tags-1"
                v-model="form_tags.name"
                type="text"
                required
                placeholder="Enter tag name"
              ></b-form-input>
            </b-form-group>
            <b-button
              size="sm"
              type="submit"
              variant="success"
              style="margin-top: 10px; margin-bottom: 10px"
              @click="ok()"
            >Submit</b-button>
          </b-form>
        </template>
        <!-- End form for Tags  -->
        <!-- footer for modal -->
        <template slot="modal-footer" slot-scope="{ ok, cancel}">
          <b-button size="sm" variant="danger" @click="cancel()">Cancel</b-button>
        </template>
        <!-- end footer modal -->
      </b-modal>
    </div>
    <!-- End Modal for Tags -->
    <b-list-group>
      <b-list-group-item button v-for="tag in allTags" :key="tag.id">
        {{ tag.name }}
        <font-awesome-icon
          style="color:red;cursor:pointer;float:right;"
          icon="trash-alt"
          @click="deleteTag(tag.id)"
        />
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ListTags",
  data() {
    return {
      form_tags: {
        name: ""
      },
      show: true
    };
  },
  methods: {
    ...mapActions(["fetchTags", "removeTag", "createTag"]),
    deleteTag(id) {
      this.removeTag(id);
    },
    onSubmitTag(evt) {
      evt.preventDefault();
      this.createTag(this.form_tags.name);
    }
  },
  computed: mapGetters(["allTags"]),
  created() {
    this.fetchTags();
  }
};
</script>

<style>
</style>
