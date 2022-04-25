import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type NewType = BehaviorSubject<boolean>;

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  public isLoading:NewType = new BehaviorSubject<boolean>(false);

  public startLoading() {
    this.isLoading.next(true);
  }
  public stopLoading() {
    this.isLoading.next(false);
  }
}
