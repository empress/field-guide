'use strict';

const path = require('path');

const resolve = require('resolve');
const StaticSiteJson = require('broccoli-static-site-json');
const MergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');
const TableOfContents = require('./lib/table-of-contents');

module.exports = {
  name: require('./package').name,

  included(app) {

    this.import('vendor/ember/ember-template-compiler.js');

    if(!app.options['ember-prism']) {
      app.options['ember-prism'] = {
        // theme: 'okaidia',

        components: [
          'apacheconf',
          'bash',
          'css',
          'handlebars',
          'http',
          'javascript',
          'json',
          'markup-templating',
          'ruby',
          'scss'
        ],

        plugins: ['line-numbers', 'normalize-whitespace']
      }
    }

    this._super.included.apply(this, arguments);
  },

  treeForVendor(vendor) {
    let templateCompilerTree = new Funnel(
      path.dirname(resolve.sync('ember-source/package.json'), { basedir: this.project.root }),
      {
        srcDir: 'dist',
        destDir: 'ember'
      }
    );
    return new MergeTrees([
      vendor,
      templateCompilerTree,
    ].filter(Boolean));
  },

  treeForPublic: function() {
    let docs = new StaticSiteJson('docs', {
      contentFolder: 'docs',
      collate: true,
    });

    let toc = new TableOfContents(docs, {
      subdir: 'docs',
    });

    return new MergeTrees([
      docs,
      toc,
    ]);
  },
};
