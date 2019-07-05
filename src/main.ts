import { Aurelia } from "aurelia-framework";
import environment from "./environment";
import { PLATFORM } from "aurelia-pal";
import { Backend, TCustomAttribute } from "aurelia-i18n";

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName("aurelia-i18n"), (instance: any) => {
      let aliases = ["t"];
      TCustomAttribute.configureAliases(aliases);

      instance.i18next.use(Backend.with(aurelia.loader));

      return instance.setup({
        resources: {
          en: {
            translation: {
              "model-a": {
                line1: "Model A line 1 translation",
                line2: "Model A line 2 translation"
              },
              "model-b": {
                line1: "Model B line 1 translation"
              }
            }
          }
        },
        attributes: aliases,
        lng: "en",
        debug: true
      });
    });

  aurelia.use.developmentLogging(environment.debug ? "debug" : "warn");

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName("aurelia-testing"));
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName("app")));
}
