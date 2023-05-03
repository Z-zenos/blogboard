import {
  CollectionReference,
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from '@firebase/firestore';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../models/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore) {
    this.categories = collection(this.firestore, 'categories');
  }

  getAll() {
    return collectionData(this.categories, {
      idField: 'id'
    }) as Observable<ICategory[]>;
  }

  get(id: string) {
    const ctgrDocRef = doc(this.firestore, `categories/${id}`);
    return docData(ctgrDocRef, { idField: 'id' });
  }

  create(category: ICategory) {
    return addDoc(this.categories, category);
  }

  update(category: ICategory) {
    const ctgrDocRef = doc(
      this.firestore,
      `categories/${category.id}`
    );
    return updateDoc(ctgrDocRef, { ...category });
  }

  delete(id: string | undefined) {
    if (!id) throw new Error("Id undefined");
    const ctgrDocRef = doc(this.firestore, `categories/${id}`);
    return deleteDoc(ctgrDocRef);
  }
}
