import { ApplicationConfig, enableProdMode, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

// AngularFire imports
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';


// Other module imports
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideToastr } from 'ngx-toastr';
import { provideStore, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { rootReducer } from './store';
import { FilemanagerEffects } from './store/filemanager/filemanager.effects';
import { OrderEffects } from './store/orders/order.effects';
import { AuthenticationEffects } from './store/Authentication/authentication.effects';
import { CartEffects } from './store/Cart/cart.effects';
import { ProjectEffects } from './store/ProjectsData/project.effects';
import { usersEffects } from './store/UserGrid/user.effects';
import { userslistEffects } from './store/UserList/userlist.effect';
import { JoblistEffects } from './store/Job/job.effects';
import { CandidateEffects } from './store/Candidate/candidate.effects';
import { InvoiceDataEffects } from './store/Invoices/invoice.effects';
import { ChatEffects } from './store/Chat/chat.effect';
import { tasklistEffects } from './store/Tasks/tasks.effect';
import { OrdersEffects } from './store/Crypto/crypto.effects';
import { CustomerEffects } from './store/customer/customer.effects';
import { MailEffects } from './store/Email/email.effects';
import { routes } from './app.routes';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideStore(rootReducer),
    provideEffects(
      [
        FilemanagerEffects,
        OrderEffects,
        AuthenticationEffects,
        CartEffects,
        ProjectEffects,
        usersEffects,
        userslistEffects,
        JoblistEffects,
        CandidateEffects,
        InvoiceDataEffects,
        ChatEffects,
        tasklistEffects,
        OrdersEffects,
        CustomerEffects,
        MailEffects
      ]
    ),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
        }
      }),
    ),
    provideAnimations(),
    provideToastr(),
    { provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }
  ]
};

