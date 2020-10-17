let chai = require("chai");
let chaiHtttp = require("chai-http");

let server = require("../index");

//Assertion Style
chai.should();
chai.use(chaiHtttp);

describe('Tasks API', () =>{

    /**
     * Test the GET route of trains (Positive tesing)
     */
    describe("GET /transroute/trains/",()=>{
        it("It should return all the train routes",(done)=>{
            chai.request(server)
                .get("/transroute/trains/")
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.should.have.header('content-type','application/json; charset=utf-8')
                    done();
                })
        })
    })

    /**
     * Test the GET route of trains (Negative testing)
     */
    describe("GET /transroute/train/",()=>{
        it("It should not return the train routes",(done)=>{
            chai.request(server)
                .get("/transroute/train/")
                .end((err,res)=>{
                    res.should.not.have.status(200);
                    res.should.not.have.header('content-type','application/json; charset=utf-8')
                    done();
                })
        })
    })

    /**
     * Test the GET route of bus (Positive testing)
     */
    describe("GET /transroute/buses/",()=>{
        it("It should return all the bus routes",(done)=>{
            chai.request(server)
                .get("/transroute/buses/")
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.should.have.header('content-type','application/json; charset=utf-8')
                    done();
                })
        })
    })

    /**
     * Test the GET route of trains (Negative testing)
     */
    describe("GET /transroute/buse/",()=>{
        it("It should not return the train routes",(done)=>{
            chai.request(server)
                .get("/transroute/buse/")
                .end((err,res)=>{
                    res.should.not.have.status(200);
                    res.should.not.have.header('content-type','application/json; charset=utf-8')
                    done();
                })
        })
    })

    /**
     * Test the GET bus/train route (Positive testing)
     */
    describe("GET /transroute/routes/",()=>{
        it("It should return all the routes",(done)=>{
            chai.request(server)
                .get("/transroute/routes/")
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.should.have.header('content-type','application/json; charset=utf-8')
                    done();
                })
        })
    })

    /**
     * Test the GET bus/train route (Negative testing)
     */
    describe("GET /trans/rout/",()=>{
        it("It should not return the train routes",(done)=>{
            chai.request(server)
                .get("/trans/rout/")
                .end((err,res)=>{
                    res.should.not.have.status(200);
                    res.should.not.have.header('content-type','application/json; charset=utf-8')
                    done();
                })
        })
    })
    /**
     * Test the PUT route
     */

    /**
     * Test the GET bus/train route (Positive testing)
     */
    describe("GET /transroute/routes/",()=>{
        it("It should return all the routes",(done)=>{
            chai.request(server)
                .get("/transroute/routes/")
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.should.have.header('content-type','application/json; charset=utf-8')
                    done();
                })
        })
    })

    /**
     * Test the GET bus/train route (Negative testing)
     */
    describe("GET /trans/rout/",()=>{
        it("It should not return the train routes",(done)=>{
            chai.request(server)
                .get("/trans/rout/")
                .end((err,res)=>{
                    res.should.not.have.status(200);
                    res.should.not.have.header('content-type','application/json; charset=utf-8')
                    done();
                })
        })
    })

    /**
     * Test the GET bus/train route (Positive testing)
     */
    describe("GET /transroute/routes/",()=>{
        it("It should return all the routes",(done)=>{
            chai.request(server)
                .get("/transroute/routes/")
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.should.have.header('content-type','application/json; charset=utf-8')
                    done();
                })
        })
    })

    /**
     * Test the GET bus/train route (Negative testing)
     */
    describe("GET /trans/rout/",()=>{
        it("It should not return the train routes",(done)=>{
            chai.request(server)
                .get("/trans/rout/")
                .end((err,res)=>{
                    res.should.not.have.status(200);
                    res.should.not.have.header('content-type','application/json; charset=utf-8')
                    done();
                })
        })
    })

    /**
     * Test the GET bus/train drivers (Positive testing)
     */
    describe("GET /transroute/drivers/",()=>{
        it("It should return all the drivers",(done)=>{
            chai.request(server)
                .get("/transroute/drivers/")
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.should.have.header('content-type','application/json; charset=utf-8')
                    done();
                })
        })
    })

    /**
     * Test the GET bus/train drivers (Negative testing)
     */
    describe("GET /trans/driv/",()=>{
        it("It should not return the drivers",(done)=>{
            chai.request(server)
                .get("/trans/driv/")
                .end((err,res)=>{
                    res.should.not.have.status(200);
                    res.should.not.have.header('content-type','application/json; charset=utf-8')
                    done();
                })
        })
    })
    /**
     * Test the PUT route
     */

    /**
    Test the DELETE route
     */
    describe("DELETE /transroute/train",()=> {
        it("It should delete all the train routes", (done) => {
            chai.request(server)
                .delete("/transroute/train")
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })

     /**
      Test the DELETE route(Negative)
      */
        it("It should not delete the train ", (done) => {
            chai.request(server)
                .delete("/transroute/trains")
                .end((err, res) => {
                    res.should.not.have.status(200);
                    done();
                })
        })
    })

    /**
     Test the DELETE bus
     */
    describe("DELETE /transroute/bus",()=> {
        it("It should delete the bus routes", (done) => {
            chai.request(server)
                .delete("/transroute/train")
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })

     /**
     Test the DELETE bus(Negative)
      */

        it("It should not delete the bus", (done) => {
            chai.request(server)
                .delete("/transroute/trains")
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                })
        })

    })

    /**
     Test the DELETE driver
     */

    describe("DELETE /transroute/driver",()=> {
        it("It should delete all the train routes", (done) => {
            chai.request(server)
                .delete("/transroute/driver")
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })

     /**
       Test the DELETE driver(Negative)
     */

        it("It should not delete all the driver", (done) => {
            chai.request(server)
                .delete("/transroute/drivers")
                .end((err, res) => {
                    res.should.not.have.status(200);
                    done();
                })
        })
    })

})

describe('Test User', () =>{

    /**
     * Test the GET users
     */
    describe("GET /users/",()=> {
        it("It should return all the users", () => {
            chai.request(server)
                .get("/users/")
                .end((err, res) => {
                    res.should.have.status(200);
                    //done();
                })
        })

        /**
         * Test the GET users(negative)
         */

        it("It not should return all the users", () => {
            chai.request(server)
                .get("/user/")
                .end((err, res) => {
                    res.should.not.have.status(200);
                    //done();
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
Test the DELETE route
 */
})
