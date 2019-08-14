import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MyserviceService} from "../myservice.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  password:any;
  cnfpassword:any;
  ResetForm : FormGroup;
  _id:any;
  token:any;


  constructor(private fb:FormBuilder, private myserviceService:MyserviceService,
    private activatedRoute: ActivatedRoute) {
    this.ResetForm = new FormGroup({
      password:new FormControl(),
      cnfPassword:new FormControl()
    })

  }
  ngOnInit(){
    this.activatedRoute.queryParams.subscribe(params => {
      this._id=this.activatedRoute.params['value'].id;
      this.token=this.activatedRoute.params['value'].token;
      

      console.log('id',this._id, 'token',this.token)
    });
  }                 
  
  compare(){
      
  }
  
  


  ResetPass(){
    console.log( this.ResetForm.value.password, this.ResetForm.value.cnfPassword)
    
   
    if(this.ResetForm.value.password == this.ResetForm.value.cnfPassword){
      this.myserviceService.newPswd({formdata: this.ResetForm.value, id: this._id})
      .subscribe(result=>{
        console.log(result);
      },err=>{
        console.log(err);
      })
    }
}


}
