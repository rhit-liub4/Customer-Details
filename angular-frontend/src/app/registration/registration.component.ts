import { Component, inject, EventEmitter, Output } from '@angular/core';
import { Customer } from '../customer';
import { CustomerServiceService } from '../customer-service.service';
import { PageComponent } from '../page/page.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
  
})
export class RegistrationComponent {
  @Output() refreshEvent = new EventEmitter<Customer>();

    emitEvent(data: Customer) {
      this.refreshEvent.emit(data);
    }

  CustomerServiceService = inject(CustomerServiceService);


  regisForm = new FormGroup({
    fname: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    favcolor: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
  });

  submit(){
    let firstName: String = this.regisForm.value.fname ?? ''; 
    let lastName: String = this.regisForm.value.lname ?? ''; 
    let favcolor: String = this.regisForm.value.favcolor ?? '';
    let dob: String = this.regisForm.value.dob ?? ''; 
    let email: String = this.regisForm.value.email ?? ''; 
    let phone: String =  this.regisForm.value.phone ?? '';

    const input: Customer = {
      fname: firstName, lname: lastName, favoriteColor: favcolor, dateOfBirth: dob, email: email, phone: phone,
      id: 0,
      currentAge: 0
    };

    this.emitEvent(input);
  }

}
