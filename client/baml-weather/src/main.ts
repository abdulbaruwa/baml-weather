import { enableProdMode }                     from '@angular/core';
import { platformBrowserDynamic }             from '@angular/platform-browser-dynamic';

import { AppModule }                          from './app/app.module';
import { environment }                        from './environments/environment';
import { environment as environmentPromise }  from './environments/environment';


// if (environment.production) {
//   enableProdMode();
// }
// platformBrowserDynamic().bootstrapModule(AppModule)
// .catch(err => console.log(err));

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

  environmentPromise.then(environment => {
      if (environment["production"]) {
        enableProdMode();
      }
      platformBrowserDynamic().bootstrapModule(AppModule);
    });