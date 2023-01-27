import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { FichePoliceService } from 'src/app/services/fiche-police/fiche-police.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  highcharts = Highcharts;
  donnees: any[] = [];
  chartOptionsHistogram!: Highcharts.Options;
  libelle: any;
  hebId: any;
  nowDate: Date = new Date();
  fichesParNationalite: any[] = [];
  fichesPolicesRecentes: any[] = [];

  constructor(
    private fichePoliceService: FichePoliceService
  ) { }

  ngOnInit(): void {
    this.libelle = localStorage.getItem('user_heb_designation');
    this.hebId = localStorage.getItem('user_heb_id');
    
    this.getData();
  }

  getData() {
    const nowDate = new Date();

    this.fichePoliceService.fichePoliceParNationalite(this.hebId).subscribe(
        response => {
            this.fichesParNationalite = response.results;
        }
    );

    this.fichePoliceService.fichePoliceRecente(this.hebId).subscribe(
        response => {
            this.fichesPolicesRecentes = response.results  
        }
    );

    this.fichePoliceService.fichePoliceVisite(this.hebId, `${nowDate.getFullYear()}`).subscribe(
        response => {
            response.results.forEach((data: any) => {
                this.donnees.push({
                    name: data.name,
                    y: +data.y
                });
                
                this.chartOptionsHistogram = {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        align: 'center',
                        text: 'Statistiques par mois',
                        style: {
                            fontFamily: 'sans-serif',
                            fontSize: '20'
                          }
                    },
                    accessibility: {
                        announceNewData: {
                            enabled: true
                        }
                    },
                    xAxis: {
                        type: 'category'
                    },
                    yAxis: {
                        title: {
                            text: 'Nombre total de visites'
                        }
                
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        series: {
                            borderWidth: 0,
                            dataLabels: {
                                enabled: true,
                                format: '{point.y}'
                            }
                        }
                    },
                
                    tooltip: {
                        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> visite(s)<br/>'
                    },
                
                    series: [
                        {
                            name: 'Mois',
                            colorByPoint: true,
                            type: 'column',
                            data: this.donnees
                        }
                    ],
                };
            });
        }
    );
  }

}
