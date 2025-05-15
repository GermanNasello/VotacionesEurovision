import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selector-nombre',
  templateUrl: './selector-nombre.component.html',
  styleUrls: ['./selector-nombre.component.css']
})
export class SelectorNombreComponent {
  nombre: string = '';
  hogar: string | null = null;
  hogarSeleccionado: boolean = false; 

  constructor(private router: Router) { }

  seleccionarHogar(hogar: string) {
    this.hogar = hogar; 
    localStorage.setItem('hogar', this.hogar); 
    this.hogarSeleccionado = true; 
  }

  guardarNombre() {
    if (this.nombre.trim()) {
      localStorage.setItem('usuario', this.nombre); 
      this.router.navigate(['/votaciones']); 
    } else {
      alert('Por favor, ingresa tu nombre'); 
    }
  }
}
