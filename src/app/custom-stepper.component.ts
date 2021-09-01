import { CdkStep, CdkStepper } from '@angular/cdk/stepper';
import { Component, Input } from '@angular/core';

/** Custom CDK stepper component */
@Component({
  selector: 'app-custom-stepper',
  template: `
    <section class="flex flex-row w-full gap-5">
      <header class="w-96 bg-gray-100 p-2 rounded-sm shadow-md">
        <h2 class="flex flex-row text-2xl justify-between">
          <span>{{ title }}</span>
          <span>{{ selectedIndex + 1 }}/{{ steps.length }}</span>
        </h2>
        <ul class="flex flex-col gap-2 mt-2">
          <li *ngFor="let step of steps; let index = index">
            <button
              [color]="selectedIndex === index ? 'accent' : undefined"
              [disabled]="
                steps.get(index - 1) && !steps.get(index - 1)?.completed
              "
              (click)="selectStepByIndex(index)"
              class="text-lg font-normal w-full text-left"
              mat-raised-button
            >
              {{ step.label }}
            </button>
          </li>
        </ul>
      </header>

      <div class="w-full">
        <div class="flex flex-row justify-between items-center gap-2">
          <div>
            <button
              mat-raised-button
              color="accent"
              cdkStepperPrevious
              *ngIf="hasPreviousStep"
            >
              <mat-icon>arrow_back</mat-icon>
              {{ previousLabel }}
            </button>
          </div>
          <button
            [disabled]="!selected?.completed"
            mat-raised-button
            color="accent"
            cdkStepperNext
            *ngIf="hasNextStep"
          >
            {{ nextLabel }}
            <mat-icon>arrow_forward</mat-icon>
          </button>
        </div>
        <h4 class="text-xl uppercase mt-3">
          {{ selected?.label || 'Unknown' }} Form
        </h4>
        <div [ngTemplateOutlet]="selected ? selected.content : null"></div>
      </div>
    </section>
  `,
  providers: [{ provide: CdkStepper, useExisting: CustomStepper }],
})
export class CustomStepper extends CdkStepper {
  @Input() title: string = 'Form';

  selectStepByIndex = (index: number) => (this.selectedIndex = index);

  get hasPreviousStep() {
    return this.previousStep !== null && this.previousStep !== undefined;
  }

  get hasNextStep() {
    return this.nextStep !== null && this.nextStep !== undefined;
  }

  get previousStep(): CdkStep | null | undefined {
    return this.steps.get(this.selectedIndex - 1);
  }

  get nextStep(): CdkStep | null | undefined {
    return this.steps.get(this.selectedIndex + 1);
  }

  get nextLabel(): string {
    return this.nextStep?.label || 'Unknown';
  }

  get previousLabel(): string {
    return this.previousStep?.label || 'Unknown';
  }
}
