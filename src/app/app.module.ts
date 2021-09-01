import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CustomStepper } from './custom-stepper.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [AppComponent, CustomStepper],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    
    ReactiveFormsModule,

    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,

    FormlyModule.forRoot({ extras: { lazyRender: true } }),
    FormlyMaterialModule,
    
    CdkStepperModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
