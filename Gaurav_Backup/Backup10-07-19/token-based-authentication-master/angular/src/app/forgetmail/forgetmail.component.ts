import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, EmailValidator } from '@angular/forms';
import {MyserviceService} from "../myservice.service";

@Component({
  selector: 'app-forgetmail',
  templateUrl: './forgetmail.component.html',
  styleUrls: ['./forgetmail.component.css']
})
export class ForgetmailComponent implements OnInit {

  email:any;
  invalidLogin = false;


  EmailForm: FormGroup;

  constructor(private fb: FormBuilder, private myserviceService:MyserviceService ) { 
     this.EmailForm= new FormGroup({
       Email:new FormControl(null,[Validators.required, Validators.email])
     })

  }

  ngOnInit() {  }

  isValid(controlName) {
    return this.EmailForm.get(controlName).invalid && this.EmailForm.get(controlName).touched;
  }
  
  get f() { return this.EmailForm.controls}


  Forgotpass(){
      console.log(this.EmailForm.valid)
     
      if(this.EmailForm.valid){
        this.myserviceService.resetPswd(this.EmailForm.value)
        .subscribe(result=>{
          console.log(result);
        },err=>{
          console.log(err);
        })
      }
  }

}
