import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartOptions, ChartType } from 'chart.js';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-estadisticas-persona',
  templateUrl: './estadisticas-persona.component.html',
  styleUrls: ['./estadisticas-persona.component.css']
})
export class EstadisticasPersonaComponent implements OnInit {
  resultados: [string, number][] = [];
  cargando = true;
  error: string | null = null;
  hogar: string = "";
  IP: string = environment.IP;
  chartLabels: string[] = [];
  paises: string[] = ["Albania", "Alemania", "Armenia", "Australia", "Austria", "Azerbaiyán", "Bélgica", "Chequia", "Chipre", "Croacia", "Dinamarca", "Eslovenia", "España", "Estonia", "Finlandia", "Francia", "Georgia", "Grecia", "Irlanda", "Islandia", "Israel", "Italia", "Letonia", "Lituania", "Luxemburgo", "Malta", "Moldavia", "Montenegro", "Noruega", "Países Bajos", "Polonia", "Portugal", "Reino Unido", "San Marino", "Serbia", "Suecia", "Suiza", "Ucrania",];
  indiceActual: number = 0;
  chartData: number[] = [];
  chartType: ChartType = 'bar';
  chartOptions: ChartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false }
  },
  scales: {
    y: {
      min: 0,  
      max: 10, 
    }
  }
};


  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getStats()
  }
  getStats() {
    this.hogar = localStorage.getItem('hogar') || 'Casa Belen';
    this.http.get<[string, number][]>(`http://${this.IP}:8080/${this.hogar}/votaciones/${this.paises.at(this.indiceActual)}`)
      .subscribe({
        next: (data) => {
          this.resultados = data;
          this.chartLabels = data.map(([pais, _]) => pais);
          this.chartData = data.map(([_, valor]) => valor);
          this.cargando = false;
        },
        error: (err) => {
          this.error = 'No se pudieron cargar los datos';
          this.cargando = false;
        }
      });

  }
  navegar(direccion: number) {
    const nuevoIndice = this.indiceActual + direccion;
    if (nuevoIndice >= 0 && nuevoIndice < this.paises.length) {
      this.indiceActual = nuevoIndice;
      localStorage.setItem('indicePais', String(this.indiceActual)); 
      this.getStats(); 
    }
  }
  irAVotaciones() {
    this.router.navigate(['/estadisticas/global']);
  }
  votaciones(){
    this.router.navigate(['/votaciones']);
    
  }
}
