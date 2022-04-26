import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  // @ts-ignore
  signInForm!: FormGroup ;
  // @ts-ignore
  errorMessage:string;
  constructor(private formBuilder:FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {

    this.signInForm=this.formBuilder.group({
      email:['exemple@gmail.com', [Validators.required, Validators.email]],
      password:['***************', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]] //[0-9a-zA-Z]{6,} : expresion regulière ( 0-9 peut-etre remplacé par \d)
    })
  }

  onSubmit(){
    // @ts-ignore
    const email = this.signInForm.get('email').value;
    // @ts-ignore
    const password = this.signInForm.get('password').value;
    this.authService.signInUser(email,password).then(
      ()=>{
        // @ts-ignore
        this.router.navigate(['/books']);
      },
      (error)=>{
        this.errorMessage=error;
      }
    )
  }

}
