import 'dotenv/config';

import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite';

import { db } from '../support/firebase';

async function main() {
  const allUsers = await getDocs(collection(db, 'users'));
  for (const user of allUsers.docs) {
    await deleteDoc(user.ref);
  }

  const allPosts = await getDocs(collection(db, 'posts'));
  for (const post of allPosts.docs) {
    await deleteDoc(post.ref);
  }

  const allRecipes = await getDocs(collection(db, 'recipes'));
  for (const recipe of allRecipes.docs) {
    await deleteDoc(recipe.ref);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
