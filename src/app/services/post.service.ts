import { Injectable } from '@angular/core';
import { Storage, UploadTask, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { IImage } from '../models/image.interface';
import { IPost } from '../models/post.interface';
import { CollectionReference, DocumentData, Firestore, addDoc, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private _posts: CollectionReference<DocumentData>;

  constructor(
    private _storage: Storage,
    private _firestore: Firestore
  ) {
    this._posts = collection(this._firestore, 'posts');
  }

  async publishPost(image: IImage, postData: IPost) {
    if (!image.file) {
      throw new Error("File null");
    }
    const nameSplitter = image.file?.name.split('.') ?? '';
    const filePath = `post/${nameSplitter[0]}_${Date.now()}`;

    const storageRef = ref(this._storage, filePath);
    await uploadBytesResumable(storageRef, image.file);
    const downloadImageURL = await getDownloadURL(storageRef);
    postData.image = downloadImageURL;
    // addDoc(this._posts, postData);
    console.log(postData);

  }
}