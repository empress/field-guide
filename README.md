Field Guide
==============================================================================

This project is designed to be a fully-functional, static site implementation of a design system (or styleguide) documentation site. It is intended to be installed in your Ember Addon and then can be deployed statically on AWS, Netlify or any other static site deployment system.

If you want an example of the this "in production" then check out the new [redesign branch of the Ember Styleguide](https://deploy-preview-145--ember-styleguide.netlify.com/).

You do not need to be a web **developer** to be able to use this system. You just write markdown files and the rest of the work is performed by EmberJS' build system.

Quick Start
------------------------------------------------------------------------------

```sh
npm init ember-addon super-design-system

cd super-design-system

# you can replace the template with the one you want to use
npx ember install field-guide field-guide-default-template
```

It will ask you if you want to update the `index.html` file and you should say yes 👍 It will also create a `docs` folder with some example files to get you started.

If you want to see the documentation site running on your local machine just run `npm start` and you will be able to navigate to  [http://localhost:4200](http://localhost:4200) to see the docs in action.

To build the static output directory, run the **standard** build process for a production Ember application:

```
npx ember build -prod
```

This will generate a fully static output of your site in the `dist` folder.


Usage
------------------------------------------------------------------------------

### Configuring

The default blueprint will update your `tests/dummy/config/environment.js` file with some configuration keys that should be updated. To see what can be configured here is an example of the current Ember Styleguide config:

```javascript
let ENV = {

  // leave all the other config intact and update the following key

  'field-guide': {
    name: 'Ember', // product name
    logo: '/ember-logo.png', // if you don't have a logo it will create one for you from the product name
    copyright: 'Ember Field Guide is designed to document the [ember-styleguide](https://github.com/ember-learn/ember-styleguide) project. For more information view the readme',
    social: [{
      name: 'github',
      title: 'Ember Styleguide - Repository',
      link: 'https://github.com/ember-learn/ember-styleguide'
    }, {
      name: 'twitter',
      title: 'Ember Styleguide - Twitter',
      link: 'https://twitter.com/emberjs'
    }]
  }
}
```

**Note:**
- The images like `/ember-logo.png` will need to be in your `public` folder in your addon.
- You can add as many social links as you want in the `social` array. However, remember to add a logo image in your `public` folder for the custom social links with a name matching the `name` field in your link object. If you are using `field-guide-default-template`, the logos for `github` and `twitter` links will be included by the template for you.


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
