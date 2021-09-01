import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { timer } from 'rxjs';
import { CustomStepper } from './custom-stepper.component';

@Component({
  selector: 'app-root',
  template: `
    <div class="p-5">
      <form [formGroup]="form">
        <app-custom-stepper #stepper title="Create Customer">
          <cdk-step label="Contact" [completed]="contactForm.valid">
            <formly-form
              [form]="contactForm"
              [model]="contactFormModel"
              [fields]="contactFormFields"
            ></formly-form>
          </cdk-step>

          <cdk-step label="Address" [completed]="addressForm.valid">
            <formly-form
              [form]="addressForm"
              [model]="addressFormModel"
              [fields]="addressFormFields"
            ></formly-form>
          </cdk-step>

          <cdk-step label="Billing" [completed]="billingForm.valid">
            <formly-form
              [form]="billingForm"
              [model]="billingFormModel"
              [fields]="billingFormFields"
            ></formly-form>
          </cdk-step>
        </app-custom-stepper>
      </form>
    </div>

    <div class="w-full bottom-1 fixed p-5">
      <button
        class="w-full text-xl rounded bg-green-400 py-4 text-white uppercase disabled:text-gray-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
        [disabled]="form.invalid || customerCreating"
        (click)="createCustomer()"
      >
        <ng-template [ngIf]="!customerCreating" [ngIfElse]="customerLoader">
          Create Customer
        </ng-template>

        <ng-template #customerLoader>
          <span class="flex w-full items-center justify-center">
            <mat-spinner color="accent" [diameter]="36"></mat-spinner>
          </span>
        </ng-template>
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit {
  @ViewChild('stepper') stepper!: CustomStepper;

  form = new FormGroup({});
  contactForm = new FormGroup({});
  contactFormModel = {};
  contactFormFields!: FormlyFieldConfig[];

  addressForm = new FormGroup({});
  addressFormModel = {};
  addressFormFields!: FormlyFieldConfig[];

  billingForm = new FormGroup({});
  billingFormModel = {};
  billingFormFields!: FormlyFieldConfig[];

  customerCreating = false;

  constructor(private cdr: ChangeDetectorRef, private snackBar: MatSnackBar) {
    this.setupContactForm();
    this.setupAddressForm();
    this.setupBillingForm();
  }

  ngAfterViewInit() {
    // must detect changes for cdk-step form.valid checks
    this.cdr.detectChanges();
  }

  async createCustomer() {
    this.customerCreating = true;
    await timer(3000).toPromise();
    this.snackBar.open('Customer Created');
    this.form.reset();
    this.stepper.selectStepByIndex(0);
    this.customerCreating = false;
  }

  setupContactForm() {
    this.contactFormFields = this.createRequiredInputs(
      'First Name',
      'Last Name'
    );
    this.form.addControl('contact', this.contactForm);
  }

  setupAddressForm() {
    this.addressFormFields = this.createRequiredInputs(
      'Street',
      'City',
      'State',
      'Zip'
    );
    this.form.addControl('address', this.addressForm);
  }

  setupBillingForm() {
    this.billingFormFields = this.createRequiredInputs(
      'Billing Name',
      'Billing Email',
      'Street',
      'City',
      'State',
      'Zip'
    );
    this.form.addControl('billing', this.billingForm);
  }

  createRequiredInputs(...formKeys: string[]): FormlyFieldConfig[] {
    return formKeys.map((k) => {
      return {
        key: k,
        type: 'input',
        templateOptions: {
          attributes: {
            autocomplete: 'on',
          },
          label: k,
          required: true,
        },
      };
    });
  }
}
