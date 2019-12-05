'use strict';

const path = require('path')

const { applyConfig } = require('empress-blueprint-helpers');

module.exports = {
  description: 'Default blueprint for Field Guide',

  normalizeEntityName() {
    // no-op
  },

  fileMapTokens: function() {
    let isAddon = this.project.isEmberCLIAddon();
    return {
      __base__() {
        if(isAddon) {
          return path.join('tests', 'dummy');
        }
        return '';
      }
    }
  },

  filesToRemove: ['app/templates/application.hbs'],

  afterInstall() {
    applyConfig(this.project, 'field-guide', {
      name: 'Product Name',
      copyright: 'This is the default copyright string - update before publishing',
      github: 'https://github.com/empress/field-guide?update-with-your-repo-url'
    })
  }
};
