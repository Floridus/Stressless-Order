import { enableProdMode }           from '@angular/core';
import { platformBrowserDynamic }   from '@angular/platform-browser-dynamic';
import { AppModule }                from './app.module';

// to enable the production mode
enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);