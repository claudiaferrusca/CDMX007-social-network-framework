import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Route } from '@angular/router';
import { User} from '../../components/models/user';
import { UserService} from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers : [UserService]
})
export class LoginComponent implements OnInit {
  public title : string;
  public user : User;
  public status : String;
  public identity;
  public token;

  constructor(
    private _route : ActivatedRoute,
    private _router : Router,
    private _userService :  UserService
  ) {
    this.title = 'Identificate' ;
    this. user = new User(
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

  onSubmit(){
   // loguear al usuario y conseguir sus datos
   this._userService.signup(this.user).subscribe(
     response =>{
       
      this.identity = response.user;
      console.log(this.identity)
      if(!this.identity|| !this.identity._id){
        this.status = 'error';
      }else{
        this.status = 'succes'
        alert("identificado correctamente")

        //Persistir datos de usuario
        localStorage.setItem('identity', JSON.stringify(this.identity));

        //conseguir token
        this.getToken();
      }
     },
     error =>{
       const errorMessage = <any>error;
       console.log(errorMessage)
       if(errorMessage !=null){
         this.status ='error' ;
         alert("Email o contraseña incorrectas")
       }
     }
   )
  }

  getToken(){
    this._userService.signup(this.user, "true").subscribe(
      response =>{
        
       this.token = response.token;
       console.log(this.token)
       if(this.token.length <= 0){
         this.status = 'error';
       }else{
         this.status = 'success'
         //Persistir token de ususrio
         localStorage.setItem('token',this.token);
         //conseguir los contadores o estadisticas del usuario
         this.getCounters();
         
       }
      },
      error =>{
        const errorMessage = <any>error;
        console.log(errorMessage)
        if(errorMessage !=null){
          this.status ='error' ;
          alert("Email o contraseña incorrectas")
        }
      }
    );
   }
   getCounters(){
     this._userService.getCounters().subscribe(
       response => {
         this._router.navigate(['./'])
         console.log(response);

         },
    
       error =>{
         console.log(<any>error);
       }
     )
   }
  }
