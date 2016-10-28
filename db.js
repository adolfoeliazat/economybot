const fs = require('fs');

class Database {
    constructor(path) {
        this.path = path;
        this.db = JSON.parse(
            fs.readFileSync(this.path)
        );
        if (!this.db.hashes) {
			this.db["hashes"] = {};
            this.save();
		}
    }

    getdb() {
        if (!this.db) return false;
        else return JSON.stringify(this.db);
    }

    save() {
        if (!this.db) return false;
        else fs.writeFile(this.path, JSON.stringify(this.db), (err) => {
            if (err) throw err;
        })
    }

    hsetValue(hash, key, value) {
        if (!this.db) return false;
        if (!this.db.hashes[hash]) this.db.hashes[hash] = {};
        else this.db.hashes[hash][key] = value.toString(); this.save();
    }

    hgetValue(hash, key) {
        if (!this.db) return false;
        else return this.db.hashes[hash][key];
    }

    hincr(hash, key) {
        if (!this.db) return false;
        else this.db.hashes[hash][key] += 1; this.save();
    }

    hincrBy(hash, key, incrs) {
        if (!this.db) return false;
        else this.db.hashes[hash][key] = (parseInt(this.db.hashes[hash][key], 10 || 0) + parseInt(incrs, 10) || 0).toString() ; this.save();
    } 

    hdcrsBy(hash, key, dcrsm) {
        if (!this.db) return false;
        else this.db.hashes[hash][key] -= dcrsm; this.save();
    }

    hexists(hash) {
        if (!this.db) return false;
        else if (this.db.hashes[hash]) return true;
        else return false;
    }

    ksetValue(hash, key, value) {
        if (!this.db) return false;
        if (!this.db.keys[hash]) this.db.keys[key] = {};
        else this.db.hashes[hash][key] = value.toString(); this.save();
    }

    kgetValue(hash, key) {
        if (!this.db) return false;
        else return this.db.keys[key];
    }

    kincr(hash, key) {
        if (!this.db) return false;
        else this.db.hashes[hash][key] += 1; this.save();
    }

    kincrBy(hash, key, incrs) {
        if (!this.db) return false;
        else this.db.hashes[hash][key] = (parseInt(this.db.hashes[hash][key], 10 || 0) + parseInt(incrs, 10) || 0).toString() ; this.save();
    } 

    kdcrsBy(hash, key, dcrsm) {
        if (!this.db) return false;
        else this.db.hashes[hash][key] -= dcrsm; this.save();
    }

    kexists(hash) {
        if (!this.db) return false;
        else if (this.db.hashes[hash]) return true;
        else return false;
    }

}


module.exports = Database;