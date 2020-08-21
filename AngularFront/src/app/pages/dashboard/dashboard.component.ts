import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { isThisISOWeek } from 'date-fns';
import { HttpClient } from '@angular/common/http';
import { concat } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  addressFormgroup: FormGroup;

  constructor(
    private _http: HttpClient
  ) { }

  ngOnInit() {

    this.addressFormgroup = new FormGroup({
      addressList: new FormArray([
      ])
    })
    
  }
  newAddress() {
    return new FormGroup({
      address: new FormControl(),
      city: new FormControl(),
      street: new FormControl(),
      country: new FormControl()
    });
  }

  addAddress() {
    const addressList = this.addressFormgroup.get('addressList') as FormArray;
    addressList.push(this.newAddress());
  }

  removeAddress(i) {
    const addressList = this.addressFormgroup.get('addressList') as FormArray;
    addressList.removeAt(i);

  }
  submitAddress() {
    const httpList = [];
    this.addressFormgroup.get('addressList').value.forEach(element => {
      httpList.push(this._http.post('http://localhost:4400/api/v1/addAddress', element));
    });
    concat(...httpList).subscribe(v => {
      this.addressFormgroup.reset();
      
      this.addressFormgroup = new FormGroup({
        addressList: new FormArray([
        ])
      })
    })
  }

}
