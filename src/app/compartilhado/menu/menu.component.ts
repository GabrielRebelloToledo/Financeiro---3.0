import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css', '../../font-awesome-4.7.0/css/font-awesome.min.css']
})
export class MenuComponent {

   list = document.querySelectorAll('.list');

   activeLink(){
    console.log(this.list)
    this.list.forEach((item)=>{
      
      item.classList.remove('active');
      item.classList.add('active');
    })
   }

   chamar(){
    this.list.forEach((item)=>{
     this.activeLink
    })
   }

  

}
