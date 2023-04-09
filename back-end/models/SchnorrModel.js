sql = require("../db/DbConnection");
const { power, getRandomBigInt} = require("../utils/GeneralMath");

const p = 428564690743606462251703304196229162966968920580569471791941626039339375573049205983172530528224781659534889529656416157388222572182856350952641699690780135778128082690206865559201123429761955543369414301435959467004012900524453608092447290443007547170041796841392996899631624219286964037100844750771n;
const g = 291809376101553634355917045628307351785467271680851051112526667997775172386559142975372193435342642859137867599691581556792986168065048040736384630492015827742330509455225529527589736049309702153983595792344812535414216680823628059813278795866688487447988222893597912104480525495174010184330521239691n;

const SchnorrModel = {
  async register(username, password) {
    const query = {
      text: "INSERT INTO schnorr_user (username, password) VALUES (?, ?) ON DUPLICATE KEY UPDATE password = ?",
      values: [username, password, password],
    };
    try {
      await sql.query(query.text, query.values);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to register user");
    }
  },
  async getUser(username) {
    const query = {
      text: "SELECT * FROM schnorr_user WHERE username = ?",
      values: [username],
    };
      const result = await sql.query(query.text, query.values);
      if (result[0].length == 0) {
        throw new Error("User not found");
      }
  },
  async getUserPublicKey(username) {
    const query = {
      text: "SELECT password FROM schnorr_user WHERE username = ?",
      values: [username],
    };
    const result = await sql.query(query.text,query.values);
    if (result[0].length === 0) {
      throw new Error("User not found");
    }
  
    const h = BigInt(result[0][0].password);
    return h;
  },
  verifyResponse(r, h, c, a){
    // console.log("response = " + r)
    // console.log("publickey = " + h)
    // console.log("challenge = " + c)
    // console.log("announcement = " + a)
    
    if (power(g, r, p) === (a * power(h, c, p)) % p) {
      return true
    } else {
     return false
    }
  },
  generateChallenge() {
    return getRandomBigInt(p)
  },
};

module.exports = SchnorrModel;
