const axios = require('axios'); //https://stackoverflow.com/questions/73958968/cannot-use-import-statement-outside-a-module-with-axios

/* I followed these guides:
* https://jestjs.io/docs/mock-functions
* https://jestjs.io/docs/configuration
*/
jest.mock('axios');

test ("created user successfully: ", () => {
    const pop = {popup: "Successfully created user"};
    axios.post.mockResolvedValue(pop); // to avoid sending an API request
    return axios.post("http://localhost:3000/createUser",{name: "test", email: "testingUsingJest@email.com", password: "test", role: "renter"})
    .then((res)=> {
        //console.log(res);
        expect(res).toEqual(pop);
    })
})   