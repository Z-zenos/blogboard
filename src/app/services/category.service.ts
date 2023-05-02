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
      idField: 'name'
    }) as Observable<ICategory[]>;
  }

  get(name: string) {
    const ctgrDocRef = doc(this.firestore, `categories/${name}`);
    return docData(ctgrDocRef, { idField: 'name' });
  }

  create(category: ICategory) {
    return addDoc(this.categories, category);
  }

  // update(pokemon: ICategory) {
  //   const pokemonDocumentReference = doc(
  //     this.firestore,
  //     `pokemon/${pokemon.id}`
  //   );
  //   return updateDoc(pokemonDocumentReference, { ...pokemon });
  // }

  // delete(id: string) {
  //   const pokemonDocumentReference = doc(this.firestore, `pokemon/${id}`);

  // }
}
