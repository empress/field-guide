import Component from '@ember/component';

export default Component.extend({
  count: 0,

  actions: {
    clickButton() {
      this.set('count', this.count+1);
    }
  }
});
