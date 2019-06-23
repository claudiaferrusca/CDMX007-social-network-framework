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

  constructor(
    private _route: ActivatedRoute,
    private _router : Router,
    private _userService: UserService
  ) { 
    this.title = "Gente"
    this.identity = this. _userService;
    this.token = this._userService;
  }

  ngOnInit() {
    console.log("users.component ha sido cargado")
  }

}
