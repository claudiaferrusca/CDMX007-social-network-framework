import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute, Params } from '@angular/router';
import { User } from '../../components/models/user';
import { UserService } from '../../components/services/user.service';
import { GLOBAL } from '../../components/services/global';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {

  public title : string;
  public identity;
  public token;
  public page;
  public netx_page;
  public prev_page;
  public status : string;
  public total;
  public pages;
  public users: User [];


  constructor(
    private _route: ActivatedRoute,
    private _router : Router,
    private _userService: UserService
  ) { 
    this.title = "Gente"
    this.identity = this. _userService.getIdentity;
    this.token = this._userService.getToken;
  }

  ngOnInit() {
    console.log("users.component ha sido cargado")
    this.actualPage();
  }

actualPage(){
  this._route.params.subscribe(params =>{
let page = +params['page'];
this.page= page;
if (!page){
  page = 1;

}else{
  this.netx_page= page+1;
  this.prev_page = page-1;
  if (this.prev_page <= 0){
    this.prev_page = 1;

  }
}
//devolver listado de usuarios

this.getUsers(page);
  });
}
getUsers (page){
this._userService.getUsers(page).subscribe(
  response =>{
    if (!response.users){
      this.status = 'error';
    }else {
      this.total = response.total;
      this.users = response.users;
      this.page = response.pages;
      if(page > this.pages){
       this._router.navigate(['/gente', 1]);
      }
    }

  },
  error =>{
    const errorMessage = <any> error;
    console.log(errorMessage);
    if (errorMessage != null)
    this.status= 'error';
  }
)
}

}
