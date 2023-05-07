import { Injectable } from '@angular/core';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { IImage } from '../models/image.interface';
import { IPost } from '../models/post.interface';
import { CollectionReference, DocumentData, Firestore, addDoc, collection, collectionData, doc, docData, query, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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

  async publishPost(image: IImage, postData: IPost, type: string) {
    if (!image.base64) {
      throw new Error("File null");
    }

    if (image.file && image.base64) {
      const nameSplitter = image.file?.name.split('.') ?? '';
      const filePath = `post/${nameSplitter[0]}_${Date.now()}`;

      const storageRef = ref(this._storage, filePath);
      await uploadBytesResumable(storageRef, image.file);
      const downloadImageURL = await getDownloadURL(storageRef);
      postData.image = downloadImageURL;
    }

    if (type === 'Publish') {
      addDoc(this._posts, postData);
    }
    else if (type === 'Update') {
      // Current image was firebase image url
      const ctgrDocRef = doc(
        this._firestore,
        `posts/${postData.id}`
      );
      updateDoc(ctgrDocRef, { ...postData });
    }
  }

  getAll() {
    return collectionData(this._posts, {
      idField: 'id'
    }) as Observable<IPost[]>;
  }

  getPostByTitle(title: string) {
    const appQuery = query(this._posts, where('title', '==', title));
    return collectionData(appQuery) as Observable<IPost[]>;
  }

  getPostById(id: string) {
    const ctgrDocRef = doc(this._firestore, `posts/${id}`);
    return docData(ctgrDocRef, { idField: 'id' }) as Observable<IPost>;
  }
}
