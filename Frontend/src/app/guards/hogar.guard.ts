import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HogarGuard implements CanActivate {
  private hogaresPermitidos = ['Trevilucius', 'CasaBelen'];

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const hogar = route.paramMap.get('hogar');

    if (this.hogaresPermitidos.includes(hogar || '')) {
      return true;
    }

    // Redirige a una opción válida si el valor es incorrecto
    this.router.navigate(['/casa1']);
    return false;
  }
}
