import { Injectable } from '@angular/core';
import { Camera, CameraResultType, GalleryImageOptions, GalleryPhotos } from '@capacitor/camera';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor() { }

  pickImages$(options: GalleryImageOptions): Observable<GalleryPhotos> {
    return from(Camera.pickImages(options)); // Converts the Promise to an Observable
  }
}
