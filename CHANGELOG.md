# Changelog

## Release (2024-07-26)

field-guide 3.0.0 (major)

#### :boom: Breaking Change
* `field-guide`
  * [#101](https://github.com/empress/field-guide/pull/101) Update dependencies, start using pnpm, and drop support for ember-auto-import@1 ([@mansona](https://github.com/mansona))

#### :rocket: Enhancement
* `field-guide`
  * [#82](https://github.com/empress/field-guide/pull/82) Complete ember-auto-import v2 Upgrade ([@elwayman02](https://github.com/elwayman02))
  * [#84](https://github.com/empress/field-guide/pull/84) Ember Blueprint Updates ([@elwayman02](https://github.com/elwayman02))

#### :bug: Bug Fix
* `field-guide`
  * [#72](https://github.com/empress/field-guide/pull/72) ember-fetch 8.1.2 ([@Dhaulagiri](https://github.com/Dhaulagiri))
  * [#81](https://github.com/empress/field-guide/pull/81) Update normalise-path-test.js ([@MelSumner](https://github.com/MelSumner))

#### :memo: Documentation
* `field-guide`
  * [#74](https://github.com/empress/field-guide/pull/74) Update README.md ([@MinThaMie](https://github.com/MinThaMie))

#### :house: Internal
* `field-guide`
  * [#102](https://github.com/empress/field-guide/pull/102) setup release-plan ([@mansona](https://github.com/mansona))
  * [#92](https://github.com/empress/field-guide/pull/92) Ember 4.4 ([@elwayman02](https://github.com/elwayman02))
  * [#90](https://github.com/empress/field-guide/pull/90) NPM audit fix ([@elwayman02](https://github.com/elwayman02))

#### Committers: 5
- Anne-Greeth Schot-van Herwijnen ([@MinThaMie](https://github.com/MinThaMie))
- Brian Runnells ([@Dhaulagiri](https://github.com/Dhaulagiri))
- Chris Manson ([@mansona](https://github.com/mansona))
- Jordan Hawker ([@elwayman02](https://github.com/elwayman02))
- Melanie Sumner ([@MelSumner](https://github.com/MelSumner))

2.4.0 / 2022-06-17
==================

* Implement indexes #59 from @mansona

2.3.0 / 2021-12-29
==================

  * Support Ember 4 #52 from @mansona

2.2.0 / 2021-12-29
==================

  * bring github ci workflow in line with blueprint and update some dependencies #51 from @mansona

2.1.0 / 2021-09-29
==================

  * move actual dependencies out of devDependencies #48 from @mansona
  * remove console.log #42 from @mansona
  * Update broccoli-static-site-json to add toc to api response #47 from @mansona

2.0.0 / 2021-09-16
==================

  * breaking: drop support for Ember &lt; 3.16 and update with ember-cli-update #43 from @mansona

1.6.0 / 2021-04-10
==================

  * Full meta-data implementation #39 from @mansona

1.5.0 / 2021-03-30
==================

  * Add Optional Component Classes #27 from @mansona
  * Move to GitHub actions #38 from @mansona
  * Update dependencies #36 from @mansona

1.4.0 / 2020-06-28
==================

  * fix the link to ember-styleguide in the default blueprint #33 from @mansona
  * Use "trailing history" location type #32 from @mansona
  * support rootUrl other than `/` #31 from @mansona

1.3.0 / 2020-06-23
==================

  * restrict auto-executing languages to html and handlebars by default #28 from @mansona
  * fix crash with code blocks that are missing a language #28 from @mansona
  * add basic dev environment #28 from @mansona

1.2.0 / 2020-06-08
==================

  * Fix initial install #24 from @mansona
  * option for multiple social links #15 from @gokatz

1.1.0 / 2020-05-13
==================

  * install ember-cli-fastboot and prember on install of field-guide #20 from @mansona

1.0.4 / 2020-02-14
==================

  * remove 2.18 from ember-try (v1.x never supported Ember 2.18)
  * add a component class for the dynamic template #7 from @mansona
