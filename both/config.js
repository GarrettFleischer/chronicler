// import {
//     AccountsReact
// } from 'meteor/meteoreact:accounts'

// const onLogoutHook = () => {
//     // A good use case will be to redirect the user somewhere
//     console.log('logout');

// }

// const onSubmitHook = (err, state) => {
//     if (!err) {
//         if (state === 'signIn') {
//             console.log('sign in');
//         }
//         if (state === 'signUp') {
//             console.log('sign up');
//         }
//     }
// }

// const preSignupHook = (password, info) => {
//     console.log(info);

//     /*
//       info structure might look like this
//       {
//         username,
//         email,
//         password (hashed),
//         profile
//       }
//     */
// }

// AccountsReact.configure({
//     onLogoutHook,
//     onSubmitHook,
//     preSignupHook,
//     mapStateToRoute: {
//         signIn: '/login',
//         signUp: '/register'
//     }
// })
