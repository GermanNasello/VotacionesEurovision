import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-votaciones',
  templateUrl: './votaciones.component.html',
  styleUrls: ['./votaciones.component.css']
})
export class VotacionesComponent implements OnInit {
  usuario: string | null = localStorage.getItem('usuario');
  paises: string[] = ["Albania", "Alemania", "Armenia", "Australia", "Austria", "Azerbaiyán", "Bélgica", "Chequia", "Chipre", "Croacia", "Dinamarca", "Eslovenia", "España", "Estonia", "Finlandia", "Francia", "Georgia", "Grecia", "Irlanda", "Islandia", "Israel", "Italia", "Letonia", "Lituania", "Luxemburgo", "Malta", "Moldavia", "Montenegro", "Noruega", "Países Bajos", "Polonia", "Portugal", "Reino Unido", "San Marino", "Serbia", "Suecia", "Suiza", "Ucrania",];
  indiceActual: number = 0;
  nota: number | null = null;
  hogar: string = "";
  error: Boolean | null = null;
  success: Boolean | null = null;
  IP: string = environment.IP;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.indiceActual = Number(localStorage.getItem('indicePais')) || 0;
    this.hogar = localStorage.getItem('hogar') || '';

  }

  getVoto() {
    if (!this.usuario || !this.hogar) {
      alert('Error: No se ha encontrado el usuario o el hogar.');
      this.router.navigate(['/']);
      return;
    }

    this.http.get<{ nota: number }>(`http://${this.IP}:8080/${this.hogar}/${this.usuario}/${this.paises[this.indiceActual]}`)
      .subscribe(
        data => {
          if (data.nota !== undefined) {
            this.nota = data.nota;
          } else {
            this.nota = null;
          }
        },
        error => {
          console.error('Error al obtener la votación:', error);
          this.nota = null;
        }
      );
  }

  enviarVoto(showMsg: boolean = true): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.nota === null) {
        alert('Por favor, introduce una nota antes de enviar.');
        reject('Nota vacía');
        return;
      }

      this.http.post(`http://${this.IP}:8080/${this.hogar}/${this.usuario}/${this.paises[this.indiceActual]}`, {
        pais: this.paises[this.indiceActual],
        nota: this.nota
      }).subscribe(
        response => {
          console.log('Voto enviado:', response);
          this.success = true;
          this.error = false;
          resolve();
        },
        error => {
          this.error = true;
          console.error('Error al enviar el voto:', error);
          reject(error);
        }
      );
    });
  }


  async navegar(direccion: number) {
    const nuevoIndice = this.indiceActual + direccion;

    if (this.nota !== null) {
      try {
        await this.enviarVoto(true);
      } catch {
        return;
      }
    }

    if (!this.error && nuevoIndice >= 0 && nuevoIndice < this.paises.length) {
      this.indiceActual = nuevoIndice;
      localStorage.setItem('indicePais', String(this.indiceActual));
      this.getVoto();
    }
  }

  irAEstadisticas() {
    this.router.navigate(['/estadisticas/global']);
  }

}
