import { Injectable } from '@angular/core';
import { getDownloadURL, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { IImage } from '../models/image.interface';
import { IPost } from '../models/post.interface';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  docData,
  DocumentData,
  endBefore,
  Firestore,
  getCountFromServer,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  Query,
  query,
  QueryConstraint,
  startAfter,
  startAt,
  updateDoc,
  where
} from '@angular/fire/firestore';
import { firstValueFrom, Observable } from 'rxjs';
import { deleteObject } from '@firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly _posts: CollectionReference<DocumentData>;

  constructor(
    private _storage: Storage,
    private _firestore: Firestore
  ) {
    this._posts = collection(this._firestore, 'posts');
  }

  async publish(image: IImage, postData: IPost, type: string) {
    if (!image.src) {
      throw new Error("File null");
    }

    if (image.file && image.src) {
      const nameSplitter = image.file?.name.split('.') ?? '';
      const filePath = `post/${nameSplitter[0]}_${Date.now()}`;

      const storageRef = ref(this._storage, filePath);
      await uploadBytesResumable(storageRef, image.file);
      postData.image = await getDownloadURL(storageRef);
    }

    if (type === 'publish') {
      await addDoc(this._posts, postData);
    }
    else if (type === 'update') {
      const postDocRef = doc(
        this._firestore,
        `posts/${postData.id}`
      );
      await updateDoc(postDocRef, { ...postData });
    }
  }

  async maskFeatured(id: string | undefined, isFeatured: boolean) {
    const postDocRef = doc(this._firestore, `posts/${id}`);
    await updateDoc(postDocRef, { isFeatured: isFeatured });
  }

  async getAll(option?: any) {
    // List of query to database
    const queryList: QueryConstraint[] = [orderBy("title"), startAt(0), limit(7)];

    // Main query
    let appQuery: Query<DocumentData>;

    if (option) {
      if (option.orderBy)
        queryList[0] = orderBy(option.orderBy, ["title", "created_at"].includes(option.orderBy) ? "asc" : 'desc');

      if (option.paginate) {
        const doc = await getDocs(query(this._posts, where("title", "==", option.title)));
        const lastVisible = doc.docs[0];

        if (option.paginate === 'next') {
          queryList[1] = startAfter(lastVisible);
        }
        else {
          queryList[1] = endBefore(lastVisible);
          queryList[2] = limitToLast(7);
        }
      }
    }

    appQuery = query(this._posts, ...queryList);

    return collectionData(appQuery, {
      idField: 'id'
    }) as Observable<IPost[]>;
  }

  async totalPosts() {
    const coll = collection(this._firestore, "posts");
    const snapshot = await getCountFromServer(coll);
    return snapshot.data().count;
  }

  getPostByTitle(title: string) {
    const appQuery = query(this._posts, where('title', '==', title));
    return collectionData(appQuery) as Observable<IPost[]>;
  }

  getPostById(id: string) {
    const postDocRef = doc(this._firestore, `posts/${id}`);
    return docData(postDocRef, { idField: 'id' }) as Observable<IPost>;
  }

  async delete(id: string | undefined) {
    if (!id) throw new Error("Id undefined");

    const post: IPost = await firstValueFrom(this.getPostById(id));
    if (!post) return;
    const imageRef = ref(this._storage, post.image);
    await deleteObject(imageRef);

    const postDocRef = doc(this._firestore, `posts/${id}`);
    await deleteDoc(postDocRef);
  }
}
