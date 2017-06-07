import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'; // <--- needed to use some of the observable operators
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  numbersObsSubscription: Subscription;
  customObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    const myNumbers = Observable.interval(1000)   // <--- emits a new number every 1000 miliseconds
      .map(                        //
        (data: number) => {        // <--- an observable operator that changes the output
          return data * 2;         //
        }
      )
    this.numbersObsSubscription = myNumbers.subscribe(
      (number: number) => {
        console.log(number);
      }
    );

    const myObservable = Observable.create((observer: Observer<string>) => {
      setTimeout(() => {
        observer.next('first package');  // <-- the property "next" is used to push the next data or package
      }, 2000);
      setTimeout(() => {
        observer.next('second package');
      }, 4000);
      setTimeout(() => {
        // observer.error('this does not work');
        observer.complete()
      }, 5000);
      setTimeout(() => {
        observer.next('third package')
      }, 6000);
    });

    this.customObsSubscription = myObservable.subscribe(
      (data: string) => { console.log(data);},      // <--- first callback recieves data
      (error: string) => { console.log(error);},    // <--- second callback recieves an error
      () => { console.log('completed');},           // <--- third callback recieves finished result         these are the three possibilities
    );
  }

  ngOnDestroy(){
      this.numbersObsSubscription.unsubscribe();
      this.customObsSubscription.unsubscribe();
  }

}
