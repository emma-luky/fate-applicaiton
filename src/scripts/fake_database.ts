import 'dotenv/config';

import { addDoc, collection, DocumentReference, getDocs } from 'firebase/firestore/lite';

import { db } from '../support/firebase';

async function main() {
  const usersRef = collection(db, 'users');

  const users = [
    {
        username: 'john',
        school: 'University of Utah',
        email: 'john@gmail.com',
        phoneNumber: '999-999-9999',
        hashedPassword: 'password',
    },
    {
        username: 'jane',
        school: 'University of Utah',
        email: 'jane@gmail.com',
        phoneNumber: '000-000-0000',
        hashedPassword: 'password2',
    }
    ];

    const usersArray: DocumentReference[] = [];
    for (const user of users) {
        const u = await addDoc(usersRef, {
            username: user.username,
            school: user.school,
            email: user.email,
            phoneNumber: user.phoneNumber,
            hashedPassword: user.hashedPassword,
            createdAt: new Date().toISOString(),
        });
        usersArray.push(u);
      }
    const campusPosts = [
    {
        author: usersArray[0].id,
        title: 'Good food!',
        caption: 'Enjoying the beautiful scenery!',
    },
    {
        author: usersArray[1].id,
        title: 'Long line...',
        caption: 'Panda express at the union has a super long line. Been waiting 20 minutes.',
    },
    {
        author: usersArray[0].id,
        title: 'PASTA!',
        caption: 'The PHC\'s pasta bar is open!',
    },
    ];

    const postsRef = collection(db, 'posts');

    for (const post of campusPosts) {
    await addDoc(postsRef, {
        author: post.author,
        title: post.title,
        caption: post.caption,
        createdAt: new Date().toISOString(),
    });
    }

    const postsSnapshot = await getDocs(postsRef);

    for (const post of postsSnapshot.docs) {
        console.log(post.id, post.data());
    }
}

main().catch((error) => {
console.error(error);
process.exit(1);
});
