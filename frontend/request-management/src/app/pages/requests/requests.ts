import {
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { RequestService } from '../../services/request';
import { Request } from '../../interfaces/request.interface';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './requests.html',
  styleUrl: './requests.scss',
})
export class Requests implements OnInit {

  private readonly requestService = inject(RequestService);
  private readonly fb = inject(FormBuilder);
  private readonly cdr = inject(ChangeDetectorRef);

  requests: Request[] = [];

  requestForm = this.fb.group(
    {
      title: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    },
    {
      validators: this.dateValidator,
    }
  );

  ngOnInit(): void {
    this.loadRequests();
  }

  dateValidator(control: AbstractControl): ValidationErrors | null {

    const startDate = control.get('startDate')?.value;
    const endDate = control.get('endDate')?.value;

    if (!startDate || !endDate) {
      return null;
    }

    if (new Date(endDate) < new Date(startDate)) {
      return { invalidDate: true };
    }

    return null;
  }

  loadRequests(): void {
    this.requestService.getRequests().subscribe({
      next: (data) => {
        this.requests = [...data];
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err),
    });
  }

  createRequest(): void {

    if (this.requestForm.invalid) {

      if (this.requestForm.errors?.['invalidDate']) {
        alert('End date cannot be earlier than Start date.');
      }

      this.requestForm.markAllAsTouched();
      return;
    }

    this.requestService
      .createRequest(this.requestForm.getRawValue() as any)
      .subscribe({
        next: () => {
          this.requestForm.reset();
          this.loadRequests();
        },
        error: (err) => console.error(err),
      });
  }

  changeStatus(id: number, status: string): void {

    this.requestService.updateStatus(id, status).subscribe({
      next: (updatedRequest) => {

        this.requests = this.requests.map(request =>
          request.id === id ? updatedRequest : request
        );

        this.cdr.detectChanges();

      },
      error: (err) => {
        console.error(err);
        alert(err.error?.message);
      },
    });

  }

  deleteRequest(id: number): void {

    if (!confirm('Are you sure you want to delete this request?')) {
      return;
    }

    this.requestService.deleteRequest(id).subscribe({
      next: () => {
        this.requests = this.requests.filter(request => request.id !== id);
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err),
    });

  }

}