import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../components/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   
  public title : string;
  public user : User;

  constructor(
    private _route : ActivatedRoute,
    private _router : Router

  ) { 

    this.title = "Registrate";
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
    ""
    )

  }

  ngOnInit() {
  }
  
  onSubmit(){
    console.log("Ya funciono")
  }
}
