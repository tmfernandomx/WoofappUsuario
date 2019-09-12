import { Component, OnInit } from '@angular/core';
import {AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-loginn',
  templateUrl: './loginn.page.html',
  styleUrls: ['./loginn.page.scss'],
})
export class LoginnPage implements OnInit {

  public email: string;
public password: string;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

onSubmitRegister(){
this.auth.register(this.email, this.password).then(auth => {
  console.log(auth);
  this.router.navigate(['tabs/informacion']);
}).catch(err => console.log(err));
}

}
