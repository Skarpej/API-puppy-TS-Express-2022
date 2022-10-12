"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOnePuppy = exports.updateOnePuppy = exports.createOnePuppy = exports.getOnePuppy = exports.getAllPuppies = void 0;
const mongodb_1 = require("mongodb");
require("dotenv/config");
const uri = process.env.MONGO_URL;
console.log(uri);
const client = new mongodb_1.MongoClient(uri, {
    tls: true,
});
let db;
let puppies;
const createPuppy = (body) => {
    return {
        breed: body.breed,
        name: body.name,
        birthDate: body.birthDate
    };
};
const init = async () => {
    try {
        await client.connect();
        db = client.db('puppies-db');
        db.command({ ping: 1 });
        puppies = db.collection('puppies-collection');
    }
    catch (e) {
        console.error(e);
    }
    finally {
        setTimeout(() => { client.close(); }, 1500);
    }
};
const getAllPuppies = async () => {
    await init();
    const allPuppies = puppies.find().toArray();
    return allPuppies;
};
exports.getAllPuppies = getAllPuppies;
const getOnePuppy = async (id) => {
    await init();
    const onePuppy = await puppies.findOne({ "_id": new mongodb_1.ObjectId(id) });
    console.log(onePuppy);
    return onePuppy;
};
exports.getOnePuppy = getOnePuppy;
const createOnePuppy = async (body) => {
    const addedPuppy = createPuppy(body);
    await init();
    await puppies.insertOne(addedPuppy);
    return addedPuppy;
};
exports.createOnePuppy = createOnePuppy;
const updateOnePuppy = async (id, body) => {
    const updatedPuppy = createPuppy(body);
    await init();
    await puppies.updateOne({ "_id": new mongodb_1.ObjectId(id) }, { $set: updatedPuppy });
    return updatedPuppy;
};
exports.updateOnePuppy = updateOnePuppy;
const deleteOnePuppy = async (id) => {
    await init();
    await puppies.deleteOne({ "_id": new mongodb_1.ObjectId(id) });
};
exports.deleteOnePuppy = deleteOnePuppy;
//# sourceMappingURL=mongo.js.map