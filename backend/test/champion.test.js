import supertest from 'supertest'
import { expect } from 'chai'
import server from './setup.js'

describe("Champion", function() {
    it('should return free rotation', async () => {
        const response = await supertest(server).get("/champions")
        expect(response.status).to.equal(200)
        const { champions } = response.body
        expect(champions.length).to.above(10)
        const firstChampion = champions[0]
        expect(firstChampion).to.haveOwnProperty('name')
        expect(firstChampion).to.haveOwnProperty('pictureUrl')
        expect(firstChampion).to.haveOwnProperty('blurb')
        expect(firstChampion).to.haveOwnProperty('title')
        expect(firstChampion).to.haveOwnProperty('id')
    })
})