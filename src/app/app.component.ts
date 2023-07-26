import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from './api-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'New-TowerApp';

  constructor(private apiService: ApiServiceService){




  }

  ngOnInit(){

    this.apiService.initializeApp().subscribe(res => {

      let response = Object.values(res);

      localStorage.setItem('token',response[0])

    });

  }

}