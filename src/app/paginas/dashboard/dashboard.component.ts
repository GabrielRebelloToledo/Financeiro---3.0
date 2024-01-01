import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart, registerables } from 'node_modules/chart.js';
import { DashboardService } from './dashboard.service';
import { Dashboard } from './dashboard'
import { Meses } from './meses';

Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../../font-awesome-4.7.0/css/font-awesome.min.css']
})
export class DashboardComponent implements OnInit {

  listaDashboard: Dashboard[] = [];
  listaMeses: Meses[] = [];
  value: any;
  despesa: number | any;
  receita: number | any;
  saldo: number | any;
  cartao: number | any;
  receita_despesa: any[] = [];
  chartInstances: Chart[] = [];

  valor_despesa: any[] = [];
  categoria_despesa: any[] = [];

  valor_receita: any[] = [];
  categoria_receita: any[] = [];


  now = new Date;

  mes: any

  ngOnInit(): void {

    this.mes = this.now.getMonth() + 1;
    this.captarMeses();
    this.mesesNome(this.mes);
    this.pesquisaDespesas(this.mes);

  }

  constructor(
    /* private location: Location, */

    private route: ActivatedRoute,
    private DashboardService: DashboardService,

  ) { }

  pesquisaDespesas(mes: any) {

    this.DashboardService.getAll(mes).subscribe(result => {
      this.listaDashboard = result,

        this.despesa = this.listaDashboard[0].DESPESA,
        this.receita = this.listaDashboard[0].RECEITA,
        this.saldo = this.listaDashboard[0].SALDO,
        this.receita_despesa.push(this.listaDashboard[0].RECEITA, this.listaDashboard[0].DESPESA)
      this.graficoBarras(this.receita_despesa);

    })

    this.DashboardService.getAllCartao(mes).subscribe(result => {
      this.listaDashboard = result,
        this.cartao = this.listaDashboard[0].CARTAO
    })

    this.DashboardService.getAllCategorias(mes).subscribe(result => {
      this.listaDashboard = result,
        console.log(this.listaDashboard.length)
      for (var a = 0; a < this.listaDashboard.length; a++) {
        this.categoria_despesa.push(this.listaDashboard[a].CATEGORIASDESPESA)
        this.valor_despesa.push(this.listaDashboard[a].VALORESDESPESACAT)
      }
      this.graficoD(this.valor_despesa, this.categoria_despesa,);

    })



    this.DashboardService.getAllCategoriasReceita(mes).subscribe(result => {
      this.listaDashboard = result,
        console.log(this.listaDashboard.length)
      for (var a = 0; a < this.listaDashboard.length; a++) {
        this.categoria_receita.push(this.listaDashboard[a].CATEGORIASRECEITA)
        this.valor_receita.push(this.listaDashboard[a].VALORESRECEITACAT)
      }
      this.graficoC(this.valor_receita, this.categoria_receita,);

    })


  }

  ver() {
    console.log(this.chartInstances)
  }


  destruir(mes: any) {
    console.log(this.chartInstances)

    // Para destruir todos os gráficos, percorra o array e chame destroy()
    for (const chart of this.chartInstances) {
      chart.destroy();
    }
    this.pesquisaDespesas(mes);
    this.receita_despesa = [];
    this.categoria_despesa = [];
    this.valor_despesa = [];
    this.categoria_receita = [];
    this.valor_receita = [];
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
  graficoD(dados: any, categoria: any) {

    console.log(categoria)
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

  chartPie2: any

  graficoC(dados: any, categoria: any) {
    this.chartPie2 = new Chart("meuCanvas3", {
      type: 'pie',
      data: {
        labels: categoria,
        datasets: [{
          label: '# of Votes',
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
    this.chartInstances.push(this.chartPie2);
  }


  selecionado: boolean = false;

  onSelectChange(event: any): void {
    // Você pode acessar o novo valor selecionado usando event.target.value
    const novoValorSelecionado = event.target.value;
    /* console.log(`Novo valor selecionado: ${novoValorSelecionado}`); */
    // Faça o que for necessário com o novo valor aqui
    console.log(novoValorSelecionado);
    if (novoValorSelecionado == null) {
      this.selecionado = false;
      this.mesesNome(novoValorSelecionado);
    } else {
      this.selecionado = true;
    }
    this.destruir(novoValorSelecionado);
  }

  nomes: String | undefined;

  mesesNome(mes: any) {
    switch (mes) {
      case 1:
        this.nomes = 'Janeiro'
        break;
      case 2:
        this.nomes = 'Fevereiro'
        break;
      case 3:
        this.nomes = 'Março'
        break;
      case 4:
        this.nomes = 'Abril'
        break;
      case 5:
        this.nomes = 'Maio'
        break;
      case 6:
        this.nomes = 'Junho'
        break;
      case 7:
        this.nomes = 'Setembro'
        break;
      case 8:
        this.nomes = 'Agosto'
        break;
      case 9:
        this.nomes = 'Setembro'
        break;
      case 10:
        this.nomes = 'Outubro'
        break;
      case 11:
        this.nomes = 'Novembro'
        break;
      case 12:
        this.nomes = 'Dezembro'
        break;
      default:
      'Selecione Aqui!'
    }
  }
  captarMeses() {
    this.DashboardService.getAllMeses().subscribe(result => { this.listaMeses = result })
  }

}
