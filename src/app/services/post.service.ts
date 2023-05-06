import { Injectable } from '@angular/core';
import { Storage, UploadTask, ref, uploadBytesResumable } from '@angular/fire/storage';
import { IImage } from '../models/image.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  // private storage: Storage = inject(Storage);

  constructor(private _fbStorage: Storage) { }

  uploadImage(image: IImage): UploadTask | undefined {
    if (!image.file) {
      console.log("File null");
      return;
    }
    const nameSplitter = image.file?.name.split('.') ?? '';
    const filePath = `post/${nameSplitter[0]}_${Date.now()}`;

    const storageRef = ref(this._fbStorage, filePath);
    return uploadBytesResumable(storageRef, image.file);
  }
}
