import {CronJob} from 'cron';
import express from 'express';
import findFixtures from '../services/fixtureService.js';
// import findChannelsForMatch from '../services/channelService.js';
import Fixture, {IFixture} from "../models/fixture.js";

const app = express();

const fixJob = new CronJob('* */12 * * *', async () => {
    console.log('fixtures job started');
    // Find fixtures and save to database
    const fixtures = await findFixtures();
    if (Array.isArray(fixtures) && fixtures.length){
        console.log(fixtures);
        await Promise.all(fixtures.map(async (fixture) => {
            // fixture.channel = await findChannelsForMatch({fixture});
            try{
                const mongooseFixture = new Fixture(fixture);
                await mongooseFixture.save();
            }catch(e){
                console.log(e);
            }
        }));

        Fixture.find({})
            .then(docs => {
                console.log(docs);
            })
            .catch(err => {
                console.error(err);
            });


        // Delete fixtures older than yesterday
        // const yesterday = new Date();
        // yesterday.setDate(yesterday.getDate() - 1);
        // await Fixture.deleteMany({ date: { $lt: yesterday } });
    }
},null, true, 'UTC', true, true);

export default fixJob;