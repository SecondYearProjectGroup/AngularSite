import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilePictureService {

  private profilePictureUpdated = new Subject<boolean>();

  // Observable to be used in other components to listen for changes
  profilePictureUpdated$ = this.profilePictureUpdated.asObservable();

  // Method to emit the update signal
  notifyProfilePictureUpdated(isLoaded: boolean) {
    this.profilePictureUpdated.next(isLoaded);
  }
}
