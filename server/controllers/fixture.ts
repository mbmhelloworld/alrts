import BaseCtrl from './base.js';
import Fixture from '../models/fixture.js';
import {Request, Response} from "express";

class FixtureCtrl extends BaseCtrl {
  model = Fixture;

  // Get all
  getAllFixtures = async (req: Request, res: Response) => {
    try {
      const docs = await Fixture.find({});
      return res.status(200).json(docs);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  };


}

export default FixtureCtrl;

