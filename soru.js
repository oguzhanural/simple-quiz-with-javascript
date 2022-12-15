
    function Soru(soruMetni, cevapSecenekleri, dogruCevap)
    {

    this.soruMetni = soruMetni;
    this.cevapSecenekleri = cevapSecenekleri;
    this.dogruCevap = dogruCevap;
    //console.log(this);

    }
    //const soru = new Soru();
    
    //const question = new Soru("metin", "cevap", "b");

let sorular = [
    new Soru("Hangisi Uefa kupası kazanmıştır?", {a: "Galatasaray", b: "Fenerbahçe", c: "Beşiktaş", d: "Trabzonspor"}, "a"),
    new Soru("Hangisi ballondor sahibidir?", {a: "Hakimi", b: "Gomis", c: "Ronaldo", d: "Dembele"}, "c"),
    new Soru("hangisi kuş değildir?", {a: "kanarya", b: "serçe", c: "kartal", d: "çita"}, "d"),
    new Soru("hangisi js array metodudur?", {a: "shift()", b: "let", c: "return", d: "innerHTML"}, "a")
    ];

Soru.prototype.cevabiKontrolEt = function(cevap){
    return cevap == this.dogruCevap;    // dışarıdan gelen cevap doğru ise true yanlış ise false döner
}

function soruGoster(soru) {
    let question = `
        <span>${soru.soruMetni}</span>
    `;
    let options = '';

    for (let cevap in soru.cevapSecenekleri) {
        options += 
        `
        <div class="option">
        <span><b>${cevap}</b>: ${soru.cevapSecenekleri[cevap]}</span>
        </div>
        `;
    }
    document.querySelector(".question_text").innerHTML = question;
    option_list.innerHTML = options;
    const secenekler = option_list.querySelectorAll(".option");
    //console.log(secenekler);

    for(let opt of secenekler){
        //console.log(opt);
        opt.setAttribute("onclick", "seciliSecenek(this)");
    }
 }

 function soruSayisiniGoster(soruSirasi, toplamSoru) {
    let tag = `
    <span class="badge bg-warning">${soruSirasi} / ${toplamSoru}</span>
    `;
    document.querySelector(".question_index").innerHTML = tag;
 }