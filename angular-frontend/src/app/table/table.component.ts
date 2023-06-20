import { Component } from '@angular/core';
import { Customer } from '../customer';
import { CustomerServiceService } from '../customer-service.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  customers: Customer[] = [];

  constructor(private customerService: CustomerServiceService) {
    
  }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(): void {
    this.customerService.getCustomers()
      .subscribe(customers => this.customers = customers);
      console.log("Getting customers");
      console.log(this.customers);
  }

  delete(customer: Customer): void {
    this.customers = this.customers.filter(c => c !== customer);
    this.customerService.deleteCustomer(customer.id).subscribe();
    console.log("Deleted customer");
    console.log(this.customers);
  }

  add(customer: Customer): void {
    this.customerService.addCustomer(customer).subscribe();
    this.customers.push(customer);
    console.log("Added customer");
    console.log(this.customers);
  }

  refresh()
  {
    this.customers.splice(0, this.customers.length);
    console.log(this.customers);
    this.getCustomers();
    console.log(this.customers);
  }

}
