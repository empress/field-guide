'use strict';

const path = require('path')
const stringUtils = require('ember-cli-string-utils');

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

  locals: function(options) {
    let packageName = options.project.name();
    let dasherizedPackageName = stringUtils.dasherize(packageName);

    if(options.project.isEmberCLIAddon()) {
      dasherizedPackageName = 'dummy';
    }

    return {
      dasherizedPackageName,
    };
  },

  filesToRemove: ['app/templates/application.hbs'],

  async afterInstall() {
    await this.addAddonsToProject({
      packages: [
        'ember-cli-fastboot',
        'ember-fetch',
        'prember',
      ]
    });

    applyConfig(this.project, 'field-guide', {
      name: 'Product Name',
      copyright: 'This is the default copyright string - update before publishing',
      social: [{
        name: 'github',
        title: 'Design System Documentation - Repository',
        link: 'https://github.com/empress/field-guide?update-with-your-repo-url'
      }]
    })
  }
};
