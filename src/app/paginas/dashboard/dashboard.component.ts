import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart,registerables } from 'node_modules/chart.js';
import { DashboardService } from './dashboard.service';
import { Dashboard } from './dashboard'

Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../../font-awesome-4.7.0/css/font-awesome.min.css']
})
export class DashboardComponent implements OnInit {

  listaDashboard: Dashboard[] = [];

  despesa:number | any;
  receita:number | any;
  saldo:number | any;
  cartao:number | any;
  
  ngOnInit(): void {
    this.graficoBarras();
    this.graficoD();
    this.graficoC();
   
  }

  constructor(
    /* private location: Location, */

    private route: ActivatedRoute,
    private DashboardService: DashboardService,

  ) { }

  pesquisaCategorias() {
    this.DashboardService.getAll().subscribe(result => { this.listaDashboard = result, 
      
      console.log(this.listaDashboard)
      this.despesa = this.listaDashboard[0].DESPESA,
      this.receita = this.listaDashboard[0].RECEITA,
      this.saldo = this.listaDashboard[0].SALDO
    
    })

    this.DashboardService.getAllCartao().subscribe(result => { this.listaDashboard = result, 
      
      console.log(this.listaDashboard)
      this.cartao = this.listaDashboard[0].CARTAO
    })
  }

  graficoBarras(){
    new Chart("meuCanvas", {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  graficoD(){
    new Chart("meuCanvas2", {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  graficoC(){
    new Chart("meuCanvas3", {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }



}
