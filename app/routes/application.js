import Route from '@ember/routing/route';

const markdowns = import.meta.glob('docs/**/*.md', { query: '?raw', import: 'default' });

export default class ApplicationRoute extends Route {
  model() {
    const files = Object.keys(markdowns).map(file => file.replace(/.*\/docs\//, '').replace(/.md$/, '').split('/'));
    const tocs = [];

    for (let file of files) {

      if(file.length === 1) {
        tocs.push({id: file[0], title: file[0], pages: [] })
      } else {
        let toc = tocs.find(t => t.id === file[0]);

        const subpage = {
          id: file.join('/'), title: file[1]
        }

        if(!toc) {
          tocs.push({id: file[0], title: file[0], pages: [subpage] })
        } else {
          toc.pages.push(subpage)
        }
      }
    }

    console.log({tocs})

    return tocs
  }
}
