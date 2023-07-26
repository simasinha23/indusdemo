import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatOption } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-usecase1',
  templateUrl: './usecase1.component.html',
  styleUrls: ['./usecase1.component.css'],
})
export class Usecase1Component implements OnInit{
  myControl1 = new FormControl('');
  myControl2 = new FormControl('');
  deviceList: string[] = [
    'IN-3180375',
    'IN-3178371',
    'IN-3176535',
   ' IN-3175677',
    'IN-3168583',
   ' IN-3168599',
    'IN-3168573',
    'IN-3168576',
    'IN-3161553',
    'IN-3055155',
    'IN-3180375',
    'IN-3178371'
  ];
  parameterList: string[] = [];
  actionStatus: boolean = false;
  currentDataStatus: boolean = false;
  previousDataStatus: boolean = false;
  emailStatus:boolean = false;
  setParameterStatus:boolean = false;
  myForm: FormGroup;
  currentValue: number;
  setRuleDefaultButton: boolean = true;
  filteredDeviceOptions: Observable<string[]>;
  filteredParameterOptions: Observable<string[]>

  constructor(public dialog: MatDialog, private apiService: ApiServiceService, 
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    const postData = {"siteid": "IN-3005081","param": "SolarPanelCapacity"};
    this.apiService.fetchPreviousData(postData).subscribe(res => {
      
    });

    this.myForm = this.formBuilder.group({
      deviceId: new FormControl(''),
      deviceName: this.myControl1,
      parameterName: this.myControl2,
      operators: [''],
      inputValue: [''],
      email: new FormControl(''),
      setInput: new FormControl(''),
      parameter: new FormControl(''),
    })

    this.filteredDeviceOptions = this.myControl1.valueChanges.pipe(
      startWith(''),
      map(value => this._filterDeviceList(value || '')),
    );

    

  }

  

  // getDeviceList():void {
  //   this.apiService.getDeviceList().subscribe(
  //     (response) => {
  //       console.log(response);
  //     },
  //     (error)=> {
  //       console.log(error);
  //     }
  //   );
  // }

  OnDeviceSelected(option: MatOption) {
    this.currentDataStatus = false;
    this.currentValue = 0;
    this.apiService.getDeviceId(option.value).subscribe(res => {
      const sucess = ((JSON.parse(JSON.stringify(res)) || {}).id || {}).id;
      this.myForm.patchValue({
        deviceId: sucess,
        parameterName: ''
      })
      this.getParametersList(sucess);
      if(this.myForm.value.deviceId != '' && this.myForm.value.parameterName !=''){
        this.fetchCurrentData(this.myForm.value.deviceId, this.myForm.value.parameterName);
      }
      
    });
  }
  getParametersList(value: any){
    this.apiService.getParameterList(value).subscribe(response => {      
      this.parameterList = response;
      this.filteredParameterOptions = this.myControl2.valueChanges.pipe(
        startWith(''),
        map(value => this._filterParameterList(value || '')),
      );
      // console.log(this.parameterList)
    })
  }

  OnParameterselected(option: MatOption){
    const parameter = option.value;
    // this.fetchCurrentData(this.myForm.value.deviceId, this.myForm.value.parameterName);
  }

  submitForm(){
    console.log(this.myForm.value)
    this.fetchCurrentData(this.myForm.value.deviceId, this.myForm.value.parameterName);
    
  }

  fetchCurrentData(deviceId: any,paramter: any) {
    this.apiService.fetchCurrentData(deviceId,paramter).subscribe(
      (response) => {
        this.currentValue = response[0].value
        this.currentDataStatus = true;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  fetchPreviousData():void {
    this.previousDataStatus = true;
    if (this.currentDataStatus && this.previousDataStatus) {
      this.actionStatus = true;
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
    // this.emailStatus = true;
    // this.setParameterStatus = false;
    this.emailStatus = true;

    this.setParameterStatus = false;

    this.setRuleDefaultButton = false
  }

  parameterShow() {
    // this.setParameterStatus = true;
    // this.emailStatus = false;
    this.setParameterStatus = true;

    this.emailStatus = false;

    this.setRuleDefaultButton = false
  }

  // filter dropdown list

  private _filterDeviceList(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.deviceList.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterParameterList(value: string): string[] {
    const filterValue = value.toLowerCase();
    let arr = this.parameterList.filter(option => option.toLowerCase().indexOf(filterValue.toLowerCase()) === 0);
    return arr.length ? arr : ["No Item found"]; 
  }
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