sql = require("../db/DbConnection");
const { power, getRandomBigInt} = require("../utils/GeneralMath");

const p = 21417171133719422597552378283378477568917766125276372332441782114901337790138541018192203588668265299796476256491213694167907207046971248794390274314143157941949429096374225775704950916239910933528490971957464912335732948495173283480534411247777768600500197023597176291231519850281801276483553067015649772535409380073459232871920485224828511415517629498841504665237061743482089991772718951013919190117683508715485910483704345093976945734825674526648466701220119960485508976125502326612078319813533845059930881608391581304236808467571636865123523358162960805438407024212419656887377992766406944933595193305613072534199n;
const g = 2n;

const SchnorrModel = {
  getPublicData(){
    return {modulo: p.toString(), generator: g.toString()}
  }, 
  async register(username, password) {
    const query = {
      text: "INSERT INTO schnorr_user (username, password) VALUES (?, ?)",
      values: [username, password, password],
    };
    try {
      await sql.query(query.text, query.values);
    } catch (error) {
      console.error(error);
      if(error.code == "ER_DUP_ENTRY" ){
        throw new Error("User already exist");
      }
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
