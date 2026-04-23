import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ImpactFamiliesService } from './impact-families.service';
import { ImpactFamily } from './impact-families.model';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-impact-families',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './impact-families.component.html',
  styleUrl: './impact-families.component.scss'
})
export class ImpactFamiliesComponent implements OnInit {
  private impactFamiliesService = inject(ImpactFamiliesService);
  private formBuilder = inject(FormBuilder);
  
  impactFamilyForm!: FormGroup;
  impactFamilies: ImpactFamily[] = [];
  
  impactFamilyId: string | null = null;
  
  private activatedRoute = inject(ActivatedRoute);
  
  
  ngOnInit(): void {
    if (this.activatedRoute.snapshot.paramMap.has('impactFamilyId')) {
      this.impactFamilyId = this.activatedRoute.snapshot.paramMap.get('impactFamilyId');
      this.impactFamiliesService.getImpactFamily(this.impactFamilyId as string).subscribe({
        next: (impactFamily: ImpactFamily) => {
          this.initializeForm(impactFamily);
        }
      });
      return;
    }
    
    this.initializeForm();
    this.getImpactFamilies();
  }
  
  initializeForm(impactFamily?: ImpactFamily): void {
    this.impactFamilyForm = this.formBuilder.group({
      name: [impactFamily?.name || '', [Validators.required, Validators.minLength(3)]],
      address: [impactFamily?.address || '', Validators.required],
      neighborHood: [impactFamily?.neighborHood || '', Validators.required],
      pilot: [impactFamily?.pilot || '', Validators.required],
      pilotContact: [impactFamily?.pilotContact || '', Validators.required]
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
  
  deleteImpactFamily(impactFamilyId: string | undefined) : void {
    if (confirm('Are you sure you want to delete this impact family?')) {
      this.impactFamiliesService.deleteImpactFamily(impactFamilyId as string).subscribe({
        next: (response) => {
          // Handle successful creation
          console.log('Impact family created:', response);
          this.getImpactFamilies(); 
        },
        error: (error) => {
          // Handle error
          console.error('Error creating impact family:', error);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.impactFamilyForm.valid) {
      if (this.impactFamilyId) {
        this.impactFamiliesService.updateImpactFamily(this.impactFamilyId, this.impactFamilyForm.value).subscribe({
          next: () => {
            alert('Impact family updated successfully');
            this.resetForm();
          },
          error: (error) => {
            // Handle error
            console.error('Error updating impact family:', error);
          }
        });
      } else {
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
  }

  resetForm(): void {
    this.impactFamilyForm.reset({ isActive: true });
  }
}
