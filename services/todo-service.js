import Datastore from '@seald-io/nedb';
const db = new Datastore({filename: './data/note.db', autoload: true});

class Note {
    constructor(title, importance, dueDate, finished) {
        this.title = title;
        this.importance = importance;
        this.creationDate = new Date();
        this.dueDate = dueDate;
        this.finished = finished;
    }
}


class NoteStore {
    constructor() {

    }
    async add(title, importance, creationDate, dueDate, finished, callback) {
        console.log("  publicAddOrder start");
        let note = new Note(title, importance, creationDate, dueDate, finished);
        console.log(note)
        return await db.insert(note)
    }

    delete(id, callback) {
        db.update({_id: id}, {$set: {"state": "DELETED"}}, {returnUpdatedDocs: true}, function (err, numDocs, doc) {
            callback(err, doc);
        });
    }

    get(id, callback) {
        db.findOne({_id: id}, function (err, note) {
            callback(err, note);
        });
    }

    all(callback) {
        db.find({}, function (err, docs) {
            callback(err, docs);
        });
    }
    async getAll() {
        return db.find({});
    }
}

export const noteStore = new NoteStore();
await noteStore.add("test1", 2, "12.12.2022", "12.12.2022", true)
await noteStore.add("test2", 6, "12.12.2022", "14.12.2022", false)
await noteStore.add("test3", 8, "12.12.2022", "13.12.2022", true)


