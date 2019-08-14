import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import { MyserviceService } from '../myservice.service';
import { Router,ActivatedRoute } from '@angular/router';
import {MatIconRegistry} from '@angular/material/icon';
import { NgForm } from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import { FormComponent } from './form/form.component';
import {MatTableDataSource,MatPaginator,MatSort} from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog} from '@angular/material/dialog';
import {AppMaterialModule} from '../app.metrial.module';



export interface DialogData {
  animal: string;
  name: string;
}
export interface Country {
  value: string;
  viewValue: string;
}



const routes=[
  {
  path:'NewUser', component:FormComponent
}]


@Component({
  selector: 'menu-overview-example',
  templateUrl: 'menu-overview-example.html',
  
})
export class MenuOverviewExample {}




@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  imageshow = 'http://192.168.1.49:8088/uploads/';
  imgURL:any;
  selectedFile =null;
  topicHasError=true;
  submitted = false;
  errormsg ='';
  userlist:any = [];
  message:any="";
  imagePath:any="";
  @ViewChild('userForm') userForm: NgForm;
  isedit = false;
  capchavalid : any;
  userModel:any = {}; 
  pageindex : any=0;
  pageSize:any

  showFiller = false;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['id', 'fname', 'lname', 'dob', 'email', 'Salary', 'phone','myimage', 'action'];


  username = '';
  constructor(private myService:MyserviceService,
                    iconRegistry: MatIconRegistry,
                     sanitizer: DomSanitizer,
                     public dialog: MatDialog,
              private _router: Router,
              private _activatedRoute: ActivatedRoute) { 

           
                
                

         iconRegistry.addSvgIcon(
          'thumbs-up',
         sanitizer.bypassSecurityTrustResourceUrl('assets/img/examples/thumbup-icon.svg'));

    this.myService.getUserName()
    .subscribe(
      data => this.username= data.toString(),
      error => this._router.navigate(['/main/login'])
    )
    }
 
    

  ngOnInit() {
    this.myService.GetData().subscribe(data=>{
    
      console.log(this.userlist);
      data.users.map(row=>{
        if(row.fname)
        this.userlist.push(row);
      });   
      this.dataSource = new MatTableDataSource(this.userlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },err=>{
      console.log(err);
    })
  }

  
  logout(){
    localStorage.removeItem('token');
    this._router.navigate(['/main/login']);
  }

  movetonewuser() {
    this._router.navigate(['./form'], { relativeTo: this._activatedRoute });
  }

  async onDelete(id,index){
    let result = await this.openDialog(null);
   if(!result)
   return 0;
  
    this.myService.DeleteData(id).subscribe(data=>{
      if(data.response){
        this.userlist.splice(index,1);
        this.dataSource = new MatTableDataSource(this.userlist);

      }
     this.openDialog(data.message);
    })
  }

  openDialog(confirm): any {
    return new Promise((res)=>{
    const dialogRef = this.dialog.open(DialogOverview, {
      width: '250px',
      data:confirm
    });
  
    dialogRef.afterClosed().subscribe(result => {     
      res(result);
    });
  })
  }
}


@Component({
  selector: 'dialog-overview',
  templateUrl: 'dialog-overview.html',
})

export class DialogOverview {
  
  messageToPrint:any;
  constructor(
    public dialogRef: MatDialogRef<DialogOverview>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
   
      this.messageToPrint = data;
      var name : any;
    } 
  }

