import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ImpactFamiliesService } from './impact-families.service';
import { ImpactFamily } from './impact-families.model';

@Component({
  selector: 'app-impact-families',
  imports: [ReactiveFormsModule],
  templateUrl: './impact-families.component.html',
  styleUrl: './impact-families.component.scss'
})
export class ImpactFamiliesComponent implements OnInit {
  private impactFamiliesService = inject(ImpactFamiliesService);
  private formBuilder = inject(FormBuilder);

  impactFamilyForm!: FormGroup;
  impactFamilies: ImpactFamily[] = []; // TODO: Define proper type

  ngOnInit(): void {
    this.initializeForm();
    this.getImpactFamilies();
  }

  initializeForm(): void {
    this.impactFamilyForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', Validators.required],
      neighborHood: ['', Validators.required],
      pilot: ['', Validators.required],
      pilotContact: ['', Validators.required]
    });
  }

  getImpactFamilies(): void {
    this.impactFamiliesService.getImpactFamilies().subscribe({
      next: (data) => {
        // Handle impact families data
        this.impactFamilies = data || [];
        console.log('Impact families:', data);
      },
      error: (error) => {
        // Handle error
        console.error('Error fetching impact families:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.impactFamilyForm.valid) {
      this.impactFamiliesService.createImpactFamily(this.impactFamilyForm.value).subscribe({
        next: (response) => {
          // Handle successful creation
          console.log('Impact family created:', response);
          this.getImpactFamilies(); 
          this.resetForm();
        },
        error: (error) => {
          // Handle error
          console.error('Error creating impact family:', error);
        }
      });
    }
  }

  resetForm(): void {
    this.impactFamilyForm.reset({ isActive: true });
  }
}
