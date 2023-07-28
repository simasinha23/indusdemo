import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatOption } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
// import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-usecase1',
  templateUrl: './usecase1.component.html',
  styleUrls: ['./usecase1.component.css'],
})
export class Usecase1Component implements OnInit {
  myControl1 = new FormControl('');
  myControl2 = new FormControl('');
  myControl3 = new FormControl('');
  deviceList: string[] = [
    'IN-3180375',
    'IN-3176535',
    'IN-3175677',
    'IN-3168583',
    'IN-3168599',
    'IN-3168573',
    'IN-3168576',
    'IN-3161553',
    'IN-3055155',
    'IN-3178371',
    'IN-3005081'];
  parameterList: string[] = [];
  actionParameterList: string[] = [];
  actionStatus: boolean = false;
  currentDataStatus: boolean = false;
  previousDataStatus: boolean = false;
  emailStatus: boolean = false;
  setParameterStatus: boolean = false;
  myForm: FormGroup;
  currentValue: number;
  previousValue: any;
  setRuleDefaultButton: boolean = true;
  filteredDeviceOptions: Observable<string[]>;
  filteredParameterOptions: Observable<string[]>
  filteredActionParameterOptions: Observable<string[]>
  isLoader: boolean = false;

  constructor(public dialog: MatDialog, private apiService: ApiServiceService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      deviceId: new FormControl(''),
      deviceName: this.myControl1,
      parameterName: this.myControl2,
      operators: [''],
      inputValue: [''],
      email: ['', [Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      setInput: new FormControl(''),
      parameter: this.myControl3,
    })

    this.filteredDeviceOptions = this.myControl1.valueChanges.pipe(
      startWith(''),
      map(value => this._filterDeviceList(value || '')),
    );

    let postData = {"siteid":"ALL"};
    this.apiService.getRule(postData).subscribe(res => {
      console.log(res)
    })
  }

  get f() { return this.myForm.controls; }

  OnDeviceSelected(option: MatOption) {
    this.currentDataStatus = false;
    this.previousDataStatus = false;
    this.currentValue = 0;
    this.isLoader = true;
    this.apiService.getDeviceId(option.value).subscribe(res => {
      this.isLoader = false;
      const sucess = ((JSON.parse(JSON.stringify(res)) || {}).id || {}).id;
      console.log(sucess)
      this.myForm.patchValue({
        deviceId: sucess,
        parameterName: '',
        operators: '',
        inputValue: '',
        email: '',
        setInput: '',
        parameter: '',
      })
      this.getParametersList(sucess);
    });
  }
  getParametersList(value: any) {
    this.isLoader = true;
    this.apiService.getParameterList(value).subscribe(response => {
      this.isLoader = false;
      this.parameterList = response;
      this.actionParameterList = response;
      this.filteredParameterOptions = this.myControl2.valueChanges.pipe(
        startWith(''),
        map(value => this._filterParameterList(value || '')),
      );
      this.filteredActionParameterOptions = this.myControl3.valueChanges.pipe(
        startWith(''),
        map(value => this._filterActionParameterList(value || '')),
      );

      // console.log(this.parameterList)
    })
  }

  OnParameterselected(option: MatOption) {
    const parameter = option.value;
    // this.fetchCurrentData(this.myForm.value.deviceId, this.myForm.value.parameterName);
  }

  OnActionParameterselected(option: MatOption) {
    const parameter = option.value;
  }

  submitForm() {
    this.fetchCurrentData(this.myForm.value.deviceId, this.myForm.value.parameterName);
  }

  fetchCurrentData(deviceId: any, paramter: any) {
    this.isLoader = true;
    this.apiService.fetchCurrentData(deviceId, paramter).subscribe(
      (response) => {
        this.isLoader = false;
        this.currentValue = response[0].value
        this.currentDataStatus = true;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  fetchPreviousData(): void {
    this.isLoader = true;
    this.previousDataStatus = true;
    if (this.currentDataStatus && this.previousDataStatus) {
      this.actionStatus = true;
    }
    const postData = {
      "siteid": this.myForm.value.deviceName,
      "param": this.myForm.value.parameterName
    };
    this.apiService.fetchPreviousData(postData).subscribe(res => {
      this.isLoader = false;
      this.previousValue = res;
    });
  }

  setRule() {
    this.isLoader = true;
    let postData = {
      "siteid": this.myForm.value.deviceName,
      "param": this.myForm.value.parameterName,
      "operator": this.myForm.value.operators,
      "value": this.myForm.value.inputValue,
      "emailid": this.myForm.value.email,
      "setparam": this.myForm.value.setInput,
      "setvalue": this.myForm.value.parameter
    }
    this.apiService.setRule(postData).subscribe(res => {
      this.isLoader = false
      if (res == true) {        
        this.toastr.success("Success", 'Set rule inserted', {
          progressBar: true,
          progressAnimation: "decreasing"
        });
        this.myForm.reset();
      }
      else {
        this.toastr.error("Error",'Set rule not inserted',{
          progressBar: true,
          progressAnimation:"decreasing"
        });
        this.myForm.patchValue({
          deviceId: '',
          deviceName: '',
          parameterName: '',
          operators: '',
          inputValue: '',
          email: '',
          setInput: '',
          parameter: '',
        })
      }

    });
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
    return arr.length ? arr : ["No Item found", 'immutable'];
  }
  private _filterActionParameterList(value: string): string[] {
    const filterValue = value.toLowerCase();
    let arr = this.actionParameterList.filter(option => option.toLowerCase().indexOf(filterValue.toLowerCase()) === 0);
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