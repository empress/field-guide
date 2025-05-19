import Controller from '@ember/controller';
import config from 'ember-get-config';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
  fieldGuideConfig = config['field-guide'];

  @tracked
  showSideNav = false;

  toggleSideNav = () => {
    this.showSideNav = !this.showSideNav;
  };
}
