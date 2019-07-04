import Route from '@ember/routing/route';
import fetch from 'fetch';

export default Route.extend({
  model(params) {
    // remove trailing slash
    let path = params.path.replace(/\/$/, '');
    return fetch(`/docs/${path}.json`)
      .then(res => res.json())
      .then((res) => {
        return {
          id: res.data.id,
          ...res.data.attributes,
        }
      });
  },

  redirect(model) {
    if(model.id === 'index') {
      this.transitionTo('index');
    }
  },
})
