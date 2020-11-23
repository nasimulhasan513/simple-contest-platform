// import { db } from '@/firebase';
// const role = () => {
//     let role;
//     db.collection('user').get()
//         .then(snapshot => {
//             snapshot.forEach(doc => {
//                 if (doc.id == this.$store.getters.getUser.uid) {
//                     role = doc.data().role;
//                 }
//             });
//         })
//         return role
// };
// export {role} 