import 'dotenv/config';

import { addDoc, collection, DocumentReference, getDocs } from 'firebase/firestore/lite';

import { db } from '../support/firebase';

async function main() {
   collection(db, 'users');
    const campusPosts = [
    {
        userID: 'p73LjQXjRETjOvma2aPAOfZjQqp1',
        author: 'john',
        title: 'Good food!',
        caption: 'Enjoying the beautiful scenery!',
    },
    {
        userID: 'ylKWWdi0bTd5gMd9gS7yJBfYHTo1',
        author: 'jane',
        title: 'Long line...',
        caption: 'Panda express at the union has a super long line. Been waiting 20 minutes.',
    },
    {
        userID: 'p73LjQXjRETjOvma2aPAOfZjQqp1',
        author: 'john',
        title: 'PASTA!',
        caption: 'The PHC\'s pasta bar is open!',
    },
    ];

    const campusPostsRef = collection(db, 'posts');

    for (const post of campusPosts) {
    await addDoc(campusPostsRef, {
        author: post.author,
        title: post.title,
        caption: post.caption,
        createdAt: new Date().toISOString(),
    });
    }

    const campusPostsSnapshot = await getDocs(campusPostsRef);

    for (const post of campusPostsSnapshot.docs) {
        console.log(post.id, post.data());
    }

    const recipePosts = [
        {
            userID: 'p73LjQXjRETjOvma2aPAOfZjQqp1',
            author: 'john',
            title: 'Chicken Noodle Soup',
            imageUrl: 'https://www.recipetineats.com/uploads/2017/05/Chicken-Noodle-Soup-from-scratch_3.jpg',
            caption: 'Easy and yummy for when you sick.',
            ingredients: 'chicken, water, noodles of your choice',
            recipe: 'Bring the water to a boil. Once te water is boiling, place your noodles in and cook for the expected amount of time. Meanwhile, cook your chicken in the oven at 400 degrees for 10 minutes. After, your chicken is cooked dice your chicken and place it in the pot with your cooked noodels. Enjoy!',
            filters: ['easy', '$']
        },
        {
            userID: 'ylKWWdi0bTd5gMd9gS7yJBfYHTo1',
            author: 'jane',
            title: 'Mashed Potatoes',
            imageUrl: '',
            caption: 'So yummy, i eat it every day',
            ingredients: 'potatoes, butter',
            recipe: '1. peel and boil you potatoes until cooked through, about 20 minutes. \n' +
                    '2. once cooked through, place youre potatoes and butter in a bowl and mash together. \n' + 
                    '3. Enjoy!',
            filters: ['easy', '$', 'vegetarian']
        },
        ];
    
        const recipePostsRef = collection(db, 'recipes');
    
        for (const post of recipePosts) {
        await addDoc(recipePostsRef, {
            author: post.author,
            title: post.title,
            imageUrl: post.imageUrl ? post.imageUrl : '#',
            caption: post.caption,
            ingredients: post.ingredients,
            recipe: post.recipe,
            filters: post.filters,
            createdAt: new Date().toISOString(),
        });
        }
    
        const recipePostsSnapshot = await getDocs(recipePostsRef);
    
        for (const post of recipePostsSnapshot.docs) {
            console.log(post.id, post.data());
        }

}

main().catch((error) => {
console.error(error);
process.exit(1);
});
