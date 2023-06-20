import { Component, AfterViewInit, ViewChild } from '@angular/core';
// import { RegistrationComponent } from '../registration/registration.component';
import { TableComponent } from '../table/table.component';
import { Customer } from '../customer';


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  // imports: [RegistrationComponent, TableComponent],
  styleUrls: ['./page.component.css']
})
export class PageComponent {
  @ViewChild(TableComponent) table!: TableComponent;

  refresh(data: Customer){
    console.log("Page refresh");
    if(this.table){
      this.table.add(data);  
    }
  }
}
