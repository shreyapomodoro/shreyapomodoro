export const fetchUserList = async () => {
    try{
        const response = await fetch('http://localhost:3020/getUsers/');
        const data = await response.json();
        console.log('userList----data',data)
        return data;
    } catch(err) {
        console.log(err);
    }
}

// export const addNewUser = async () => {
//     try {
//         const response = await fetch('http://localhost:3020/createUser/',{
//             method: 'POST',
//             headers: {
//             'Content-Type': 'application/json',
//             },
//             body: {}
//         }
//           );
        
//     } catch(err) {
//         console.log(err)
//     }
// }