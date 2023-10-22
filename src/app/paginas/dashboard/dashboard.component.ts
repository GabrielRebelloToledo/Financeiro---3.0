import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart, registerables } from 'node_modules/chart.js';
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
  value: any;
  despesa: number | any;
  receita: number | any;
  saldo: number | any;
  cartao: number | any;
  receita_despesa: any[] = [];
  chartInstances: Chart[] = [];

  valor_despesa: any[] = [];
  categoria_despesa: any[] = [];

  ngOnInit(): void {
      /*    this.graficoD(); */
     /*    this.graficoC();  */

    this.pesquisaDespesas();

  }

  constructor(
    /* private location: Location, */

    private route: ActivatedRoute,
    private DashboardService: DashboardService,

  ) { }

  pesquisaDespesas() {
    this.DashboardService.getAll().subscribe(result => {
      this.listaDashboard = result,

      this.despesa = this.listaDashboard[0].DESPESA,
      this.receita = this.listaDashboard[0].RECEITA,
      this.saldo = this.listaDashboard[0].SALDO,
      this.receita_despesa.push(this.listaDashboard[0].RECEITA, this.listaDashboard[0].DESPESA)
      /* console.log(this.receita_despesa) */

      this.graficoBarras(this.receita_despesa);
     
     /*  this.addDataBarras(this.receita_despesa) */
    })

    this.DashboardService.getAllCartao().subscribe(result => {
      this.listaDashboard = result,

      /* console.log(this.listaDashboard) */
      this.cartao = this.listaDashboard[0].CARTAO
    })

    this.DashboardService.getAllCategorias().subscribe(result => {
      this.listaDashboard = result,
      console.log(this.listaDashboard.length)
      for(var a = 0; a < this.listaDashboard.length; a++){
        this.categoria_despesa.push(this.listaDashboard[a].CATEGORIASDESPESA)
        this.valor_despesa.push(this.listaDashboard[a].VALORESDESPESACAT)
      }
    

      /* console.log(this.categoria_despesa, this.valor_despesa) */
       this.graficoD(this.valor_despesa,this.categoria_despesa,);
      /*  this.addDataPie(this.categoria_despesa, this.valor_despesa) */
    })


  }

  ver() {
    console.log(this.chartInstances)
  }
  destruir() {
    console.log(this.chartInstances)

    // Para destruir todos os gráficos, percorra o array e chame destroy()
    for (const chart of this.chartInstances) {
      chart.destroy();
    }
    this.pesquisaDespesas();
   this.receita_despesa = [];

  }

  addDataBarras(newData: any) {
    this.chartBarras.data.datasets.forEach((dataset: any) => {
      console.log(dataset)
      dataset.data.push(newData);
    })

    this.chartBarras.update();
  }

  addDataPie(newData: any, newLabels:any) {

    this.chartPie.data.labels.forEach((label: any) => {
      console.log(newLabels)
      label.push(label)
    })
    this.chartPie.data.datasets.forEach((dataset: any) => {
      console.log(dataset)
      dataset.data.push(newData);
    })

    this.chartPie.update(); 
  }

  chartBarras: any

  graficoBarras(dados: any) {
    this.chartBarras = new Chart("meuCanvas", {
      type: 'bar',
      data: {
        labels: ['RECEITA', 'DESPESA'],
        datasets: [{
          label: 'Valor',
          data: dados,
          borderWidth: 1,
          backgroundColor: ['rgb(181, 240, 181)', 'rgb(245, 157, 157)']
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    });
    this.chartInstances.push(this.chartBarras);
  }


  chartPie: any
  graficoD(dados: any, categoria:any) {

    console.log(categoria )
   this.chartPie = new Chart("meuCanvas2", {
      type: 'pie',
      data: {
        labels: categoria,
        datasets: [{
          label: 'Valor:',
          data: dados,
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
    this.chartInstances.push(this.chartPie);
  }
  graficoC() {
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
