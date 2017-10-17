const Redis = require("ioredis");

class RedisStore{
    constructor(){
        this.redis = new Redis();
    }

    async get(key) {
        let data = await this.redis.get(key);
        return data;
    }

    async set(key, value, {maxAge = 3600*1000 } = {}) {
        try {
            await this.redis.set(key, value, 'EX', maxAge / 1000);
        } catch (e) {

        }
    }

    async del(key){
        await this.redis.delete(key);
    }

}

module.exports = new RedisStore();