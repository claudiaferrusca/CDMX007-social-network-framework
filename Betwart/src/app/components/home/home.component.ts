import { Component, OnInit } from '@angular/core';
import { UserService } from '../../components/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public title : string;
  public identity;

  constructor(
    private _userService: UserService
  ) { 
    this.title = "Bienvenido a BetwArt"
  }

  ngOnInit(){
    this.identity = this._userService.getIdentity();
    console.log(this.identity)
      }
    
      ngDoCheck(){
        this.identity = this._userService.getIdentity()
      }
}
