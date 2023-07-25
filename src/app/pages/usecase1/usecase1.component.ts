import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-usecase1',
  templateUrl: './usecase1.component.html',
  styleUrls: ['./usecase1.component.css'],
})
export class Usecase1Component {
  myControl1 = new FormControl('');
  myControl2 = new FormControl('');
  deviceList: string[] = ['IN-3185071','IN-3183067','IN-3178630','IN-3180375','IN-3178371'];
  parameterList: string[] = ['Parameter 1', 'Parameter 2', 'Parameter 3'];
  deviceOptions: Observable<string[]>;
  parameterOptions: Observable<string[]>;
  setRuleDefaultButton: boolean = true;
  // actionStatus: boolean = false;
  currentDataStatus: boolean = false;
  previousDataStatus: boolean = false;
  emailStatus:boolean = false;
  setParameterStatus:boolean = false;
  setInputValueStatus:boolean = false;

  constructor(public dialog: MatDialog, private apiService: ApiServiceService) { }


  ngOnInit() {
    this.deviceOptions = this.myControl1.valueChanges.pipe(
      startWith(''),
      map(value1 => this._devicefilter(value1 || '')),
    );

    this.parameterOptions = this.myControl2.valueChanges.pipe(
      startWith(''),
      map(value2 => this._parameterfilter(value2 || '')),
    );

    this.getDeviceList();
  }

  getDeviceList():void {
    this.apiService.getDeviceList().subscribe(
      (response) => {
        console.log(response);
      },
      (error)=> {
        console.log(error);
      }
    );
  }

  private _devicefilter(value1: string): string[] {
    const filterDeviceValue = value1.toLowerCase();

    return this.deviceList.filter(option1 => option1.toLowerCase().includes(filterDeviceValue));
  }

  private _parameterfilter(value2: string): string[] {
    const filterParameterValue = value2.toLowerCase();

    return this.parameterList.filter(option2 => option2.toLowerCase().includes(filterParameterValue));
  }

  fetchCurrentData() {
    console.log(this.myControl1.value, this.myControl2.value);
    this.currentDataStatus = true;
    const data = {device: this.myControl1.value, parameter: this.myControl2.value};
    this.apiService.fetchCurrentData(data).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  fetchPreviousData():void {
    this.previousDataStatus = true;
    if (this.currentDataStatus && this.previousDataStatus) {
      // this.actionStatus = true;
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    this.emailStatus = true;
  }

  openDialog2() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog2);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  emailShow() {
    this.emailStatus = true;
    this.setParameterStatus = false;
    this.setRuleDefaultButton = false
    // this.setInputValueStatus =false;
  }

  parameterShow() {
    this.setParameterStatus = true;
    this.emailStatus = false;
    this.setRuleDefaultButton = false
    // this.setInputValueStatus =false;
  }

  // setValueShow(){
  //   this.setInputValueStatus = true;
  //   this.emailStatus = false;
  //   this.setParameterStatus = false;

  // }
}


@Component({
  selector: 'dialog-content-example-dialog',
  template: `<div class='p-5'>
  <div>
  <p>Email Notification set Successfully!</p>
</div>
<div mat-dialog-actions class='d-flex justify-content-center'>
</div></div>`,
// <button mat-raised-button mat-dialog-close>Close</button>
})
export class DialogContentExampleDialog { }

@Component({
  selector: 'dialog-content-example-dialog2',
  template: `<div class='p-5'>
  <div>
  <p>Parameter set Successfully!</p>
</div>
<div mat-dialog-actions class='d-flex justify-content-center'>
  
</div></div>`,
// <button mat-raised-button mat-dialog-close>Close</button>
})
export class DialogContentExampleDialog2 { }