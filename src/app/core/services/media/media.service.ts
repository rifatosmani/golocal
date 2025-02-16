import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { GalleryPhoto } from '@capacitor/camera';
import { Media } from 'src/app/models/media.model';
import { from, map, Observable } from 'rxjs';
import { Site } from 'src/app/models/site.model';
import { ApiResponse } from 'src/app/models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private apiService:ApiService) { }

  deleteMedia(media:Media){
    this.apiService.deleteData('api/media/'+media.mediaId).subscribe((res)=>{
    })
  }

  saveMedia(media: Media): Observable<Media> {
    return new Observable<Media>((observer) => {
      this.convertBlobUrlToFile(media.url, media.refTable + "_" + Date.now()).subscribe((file: File) => {
        const formData = new FormData();
        formData.append('file', file, file.name);
        formData.append('refId', media.refId.toString());
        formData.append('refTable', media.refTable);
        formData.append('main', media.main.toString());
        formData.append('filename', file.name);
  
        // Make the post request and emit the result when it's successful
        this.apiService.postData('api/media', formData).pipe(
          map((res: ApiResponse<Media>) => res.data)
        ).subscribe({
          next: (data) => observer.next(data),
          error: (err) => observer.error(err),
          complete: () => observer.complete(),
        });
      });
    });
  }
  

  convertBlobUrlToFile(blobUrl: string, filename: string): Observable<File> {
    return from(
      (async () => {
        // Fetch the Blob from the Blob URL
        const response = await fetch(blobUrl);
        
        // Get the Blob from the response
        const blob = await response.blob();
        
        // Create a File object from the Blob
        const file = new File([blob], filename, { type: blob.type });
        
        return file;
      })()
    );
  }
  
}
