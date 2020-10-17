let chai = require("chai");
let chaiHtttp = require("chai-http");

let server = require("../index");

//Assertion Style
chai.should();
chai.use(chaiHtttp);

describe('Tasks API', () => {

    /**
     * Test the GET route
     */
    describe("GET /transroute/trains", () => {
        it("It should return all the train routes", (done) => {
            chai.request(server)
                .get("/transroute/trains")
                .end((err, res) => {
                    res.should.have.status(200);
                    //res.should.have.property('name');
                    done();
                })
        })
    })

    /**
     * Test the GET (by id) route
     */


    /**
     * Test the POST route
     */

    /**
     * Test the PUT route
     */

    /**
     * Test the DELETE route
     */

})

