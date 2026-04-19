import { WebApiService } from '@/app/core/service/web-api-service.service';
import { inject, Injectable } from '@angular/core';
import { ImpactFamily } from './impact-families.model';
import { CreateImpactFamilyInput, UpdateImpactFamilyInput } from '@/app/api/client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImpactFamiliesService {

  private api = inject(WebApiService);

  getImpactFamilies() : Observable<ImpactFamily[]|undefined> {
    return this.api.getService().impactFamiliesGET2().pipe(
      map(response => response.impactFamilies?.map<ImpactFamily>(item => ({
        id: item.id,
        name: item.name,
        address: item.address,
        neighborHood: item.quartiers,
        pilot: item.pilotName,
        pilotContact: item.pilotContact
      } as ImpactFamily)))
    );
  }

  getImpactFamily(impactFamilyId: string) : Observable<ImpactFamily> {
    return this.api.getService().impactFamiliesGET(impactFamilyId).pipe(
      map(response => ({
        id: response.id,
        name: response.name,
        address: response.address,
        neighborHood: response.quartiers,
        pilot: response.pilotName,
        pilotContact: response.pilotContact
      } as ImpactFamily))
    );
  }

  createImpactFamily(impactFamily: ImpactFamily) {
    return this.api.getService().impactFamiliesPOST({
      name: impactFamily.name,
      address: impactFamily.address,
      quartiers: impactFamily.neighborHood,
      pilotName: impactFamily.pilot,
      pilotContact: impactFamily.pilotContact
    } as CreateImpactFamilyInput);
  }

  updateImpactFamily(impactFamilyId: string, impactFamily: ImpactFamily) {
    return this.api.getService().impactFamiliesPUT(impactFamilyId, {
      name: impactFamily.name,
      address: impactFamily.address,
      quartiers: impactFamily.neighborHood,
      pilotName: impactFamily.pilot,
      pilotContact: impactFamily.pilotContact
    } as UpdateImpactFamilyInput);
  }

  deleteImpactFamily(impactFamilyId: string) {
    return this.api.getService().impactFamiliesDELETE(impactFamilyId);
  }
}
