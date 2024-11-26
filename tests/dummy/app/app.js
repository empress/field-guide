/* global Prism */
import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'dummy/config/environment';

import { setup } from 'ember-prism';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);
setup();

Prism.languages.hbs = Prism.languages.glimmer;
Prism.languages.html = Prism.languages.glimmer;
