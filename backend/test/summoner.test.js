import supertest from 'supertest'
import { expect } from 'chai'
import server from './setup.js'

describe("Summoner", function() {
    it('should fetch a summoner', async () => {
        const response = await supertest(server).get("/summoners/Faker/T1")
        expect(response.status).to.equal(200)
        expect(response.body.gameName).to.equal('Faker')
        expect(response.body.tagLine).to.equal('T1')
    })
})