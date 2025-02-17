import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../components/models/user';
import { UserService } from '../../components/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
   
  public title : string;
  public user : User;
  public status : String;

  constructor(
    private _route : ActivatedRoute,
    private _router : Router,
    private _userService : UserService
  ) { 

    this.title = "Registro";
    this.user = new User(
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
    )

  }

  ngOnInit() {
  }
  
  onSubmit(form){
    
    this. _userService.register(this.user).subscribe(
      response =>{
         if(response.user && response.user._id){
          //  console.log(response.user);

           this.status = "success"
           form.reset();
           
         } else{
           this.status= "error"
          
         }
      }, 
      error =>{
        console.log(<any>error)
      }
    );
  }
}
