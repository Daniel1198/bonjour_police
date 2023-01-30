import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { FichePoliceService } from 'src/app/services/fiche-police/fiche-police.service';
import { HebergeurService } from 'src/app/services/hebergeur/hebergeur.service';

@Component({
  selector: 'app-dashboard-commissariat',
  templateUrl: './dashboard-commissariat.component.html',
  styleUrls: ['./dashboard-commissariat.component.css']
})
export class DashboardCommissariatComponent implements OnInit {

  highcharts = Highcharts;
  chartOptionsHistogram!: Highcharts.Options;
  libelle!: string;
  nowDate: Date = new Date();
  currentCom: any;
  hebergeurs: any[] = [];
  donnees: any[] = [];
  nationalitiesPercent: any [] = [];
  
  constructor(
    private hebergeurService: HebergeurService,
    private fichePoliceService: FichePoliceService
  ) { }

  ngOnInit(): void {
    this.libelle = localStorage.getItem('user_heb_commissariat')!;
    this.currentCom = localStorage.getItem('user_heb_commissariat');
    this.getHotelsByPolice();
    this.getData();
  }

  getHotelsByPolice() {
    this.hebergeurService.hebergeurParCommissariat(this.currentCom).subscribe(
        response => {
            this.hebergeurs = response.results;
        }
    );
  }

  getData() {
    const nowDate = new Date();

    this.fichePoliceService.comFichePoliceParNationalite(this.currentCom).subscribe(
        response => {
            this.nationalitiesPercent = response.results
        }
    );

    this.fichePoliceService.fichePoliceVisite(29, `${nowDate.getFullYear()}`).subscribe(
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
