import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartOptions, ChartType } from 'chart.js';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  resultados: [string, number][] = [];
  cargando = true;
  error: string | null = null;
  hogar: string = "";
  IP: string = environment.IP;
  chartLabels: string[] = [];
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
    this.hogar = localStorage.getItem('hogar') || 'Casa Belen';
    this.http.get<[string, number][]>(`http://${this.IP}:8080/${this.hogar}/votaciones/pais`)
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
  irAVotaciones() {
    this.router.navigate(['/estadisticas/pais']);
  }
  votaciones(){
    this.router.navigate(['/votaciones']);
    
  }
}
