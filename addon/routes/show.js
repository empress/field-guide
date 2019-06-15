import Route from '@ember/routing/route';
import fetch from 'fetch';

export default Route.extend({
  model(params) {
    return fetch(`/docs/${params.path}.json`)
      .then(res => res.json())
      .then((res) => {
        return {
          id: res.data.id,
          ...res.data.attributes,
        }
      });
  }
})
