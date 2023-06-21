import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'smarthotel';

  showHead: boolean = false;

  constructor(private router: Router) {
      router.events.forEach((event) => {
        if (event instanceof NavigationEnd) {
          if (event['urlAfterRedirects']=='/auth') {
            this.showHead = false;
          } else {
            this.showHead = true;
          }
        }
      });
    }
}
