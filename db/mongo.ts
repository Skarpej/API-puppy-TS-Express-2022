import { Collection, MongoClient, ObjectId } from 'mongodb';
import { Puppy } from 'type/puppy';
import 'dotenv/config'

const uri = process.env.MONGO_URL as string
const client = new MongoClient(uri, {
    tls: true,
});

let db;
let puppies:Collection<Puppy>;

const createPuppy = (body:Puppy) => {
    return {
        breed: body.breed,
        name: body.name,
        birthDate: body.birthDate
    }
};

const init = async () => {
    try {
        await client.connect();
        db = client.db('puppies-db');
        db.command({ ping: 1 });
        puppies = db.collection('puppies-collection');
    } catch (e) {
        console.error(e);
    } finally {
        setTimeout(() => {client.close()}, 1500)
    }
}

export const getAllPuppies = async () => {
    await init();
    const allPuppies = puppies.find().toArray();
    return allPuppies;
}

export const getOnePuppy = async (id:string) => {
    await init();
    const onePuppy = await puppies.findOne({"_id": new ObjectId(id)});
    console.log(onePuppy);
    return onePuppy;
};

export const createOnePuppy = async (body:Puppy) => {
    const addedPuppy = createPuppy(body);
    await init();
    await puppies.insertOne(addedPuppy);
    return addedPuppy;
};

export const updateOnePuppy = async (id:string, body:Puppy) => {
    const updatedPuppy = createPuppy(body);
    await init();
    await puppies.updateOne({"_id": new ObjectId(id)}, {$set: updatedPuppy});
    return updatedPuppy;
};

export const deleteOnePuppy = async (id:string) => {
    await init();
    await puppies.deleteOne({"_id": new ObjectId(id)});
};