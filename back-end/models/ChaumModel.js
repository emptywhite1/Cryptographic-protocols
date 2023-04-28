sql = require("../db/DbConnection");
const {power, stringToBigInt} = require("../utils/GeneralMath");

const p = 172345881498180485823237503506607250261712229941318469747951829025611771191139929919427063881606206576732399992602218346759892930312454693777631254553722160760428862084511326769252411921633532587413055093727096897534090653866320639958726181365354192600511606520237678811890549868764484921186785117785810637107n;
const q = 143867398819147246328422880384919742406613553092733998021805343361176714816134973729960791974727169959970276672641967240665928266848422740467841878126115335775054634249788924136141035237599737357428410143245845721720721090438306095527733416319357741557446152598779072877027185511606208461097983527464338798849n;
const n = 24794953668336222475044297362668986929427238536989275957020252491437609294573359377408021850503909062935043609232942318232069807058041581073842253182129633347319246737153580209164674481753966311756978362096886422921144962274501586879574736735458313225246067315967044231421851583670529656339701875457062055746286346969830303577523003478176969535299502644668464099330904845818574764954665872006795049012556982290412611277333344358608272415036888964437591094273315279111964411791701036334117979586863804139244187082153688487647809440759962204976302093377474435368912475834749907181063094240872352269393234079031808289843n
const publicKey = 65537n
const privateKey = 9624469023128998329838898341531293139718014574095094237921146880841072109566377606571595707081022058562408629862166709393253029918206811128636847562448628144749596681972777620900257169863422936734757046452884534121046228776127162803141763092807483255825483413199957858967308275279530706740096068018862652183068102460099189656688612493332428595175160721166940773842013452926304395229300682729512818510172456883418939325830234981462538360491750573211426962249973012358867479566059151021885703959999590450759278591018096558372361694922368723138869695712775764351518638914377157064935620856192710994234588891312870891009n
// const n = 21n
// const publicKey =5n
// const privateKey =5n
const ChaumModel = {

  getPublicData(){
    return {modulo: n.toString(), publicKey: publicKey.toString()}
  }, 
  signing(message){
    const signature = power(BigInt(message), privateKey, n)
    return signature 
  },
  
  verifying(message, signature){
    const m = stringToBigInt(message, n)
    const s = BigInt(signature)
    if(m == power(s, publicKey, n)){
      
      return true
    }
    else return false    
  
  },
  
};

module.exports = ChaumModel;
