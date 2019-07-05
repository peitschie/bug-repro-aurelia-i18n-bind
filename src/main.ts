import {Aurelia} from 'aurelia-framework'
import environment from './environment';
import {PLATFORM} from 'aurelia-pal';
import { Backend, TCustomAttribute } from 'aurelia-i18n';

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'))
    .plugin(PLATFORM.moduleName('aurelia-i18n'), (instance: any) => {
      let aliases = ['t', 'i18n'];
      TCustomAttribute.configureAliases(aliases);

      instance.i18next
        .use(Backend.with(aurelia.loader))

      return instance.setup({
        resources: {
          "en": {
            translation: {
            "message": "testing parameter binding from {{source}}"
            }
          }
        },
        attributes: aliases,
        lng: "en",
        debug: true
      });

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
