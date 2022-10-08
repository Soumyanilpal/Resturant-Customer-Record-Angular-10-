import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { ResturantData } from './resturant.model';

@Component({
  selector: 'app-resturant-dash',
  templateUrl: './resturant-dash.component.html',
  styleUrls: ['./resturant-dash.component.css']
})
export class ResturantDashComponent implements OnInit {

  formValue!: FormGroup
  resturantModelObject: ResturantData = new ResturantData;
  allResturantData: any;
  showAdd!: boolean;
  showBtn!: boolean;

  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      service: [''],
      amount: ['']
    })
    this.getAllData()
  }
  clickAddRestro() {
    this.formValue.reset();
    this.showAdd = true;
    this.showBtn = false;
  }

  //Now we will subscribe our data via services

  addResturant() {
    this.resturantModelObject.name = this.formValue.value.name;
    this.resturantModelObject.email = this.formValue.value.email;
    this.resturantModelObject.mobile = this.formValue.value.mobile;
    this.resturantModelObject.address = this.formValue.value.address;
    this.resturantModelObject.service = this.formValue.value.service;
    this.resturantModelObject.amount = this.formValue.value.amount;

    this.api.postResturant(this.resturantModelObject).subscribe(res => {
      alert("🙂 Resturant Records Added Successfully")

      //clear fill form data
      let ref = document.getElementById('clear');
      ref?.click();

      this.formValue.reset();
      this.getAllData(); //auto update when we enter data we don't need to refresh

    },
      err => {
        alert("💀 Something Went Wrong!!!")
      }
    )
  }

  //Get All Data

  getAllData() {
    this.api.getResturant().subscribe(res => {
      this.allResturantData = res;
    })
  }

  //delete records

  deleteRestro(data: any) {
    this.api.deleteResturant(data.id).subscribe(res => {
      alert("Resturant Records Deleted ❤")
      this.getAllData(); //auto delete when we enter data we don't need to refresh
    })
  }

  //edit records

  onEditRestro(data: any) {
    this.showAdd = false;
    this.showBtn = true;

    this.resturantModelObject.id = data.id
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['service'].setValue(data.service);
    this.formValue.controls['amount'].setValue(data.amount);
  }

  updateResto() {
    this.resturantModelObject.name = this.formValue.value.name;
    this.resturantModelObject.email = this.formValue.value.email;
    this.resturantModelObject.mobile = this.formValue.value.mobile;
    this.resturantModelObject.address = this.formValue.value.address;
    this.resturantModelObject.service = this.formValue.value.service;
    this.resturantModelObject.amount = this.formValue.value.amount;


    this.api.updateResturant(this.resturantModelObject, this.resturantModelObject.id).subscribe(res => {
      alert("❤ Resturant Record  Updated ❤")

      //clear fill form data

      let ref = document.getElementById('clear');
      ref?.click();

      this.formValue.reset();
      this.getAllData(); //auto update when we enter data we don't need to refresh
    })
  }
}
