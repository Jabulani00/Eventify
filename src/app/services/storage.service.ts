import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: AngularFireStorage) { }

  uploadFile(filePath: string, file: File): Observable<number> {
    const task = this.storage.upload(filePath, file);
    return task.percentageChanges().pipe(
      filter((percentage): percentage is number => percentage !== undefined)
    );
  }

  getDownloadURL(filePath: string): Observable<string> {
    return this.storage.ref(filePath).getDownloadURL();
  }

  deleteFile(filePath: string): Promise<void> {
    return this.storage.ref(filePath).delete().toPromise();
  }
}
