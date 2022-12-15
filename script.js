
const quiz = new Quiz(sorular);
const ui = new UI();

//console.log(quiz.soruGetir());

// quiz.soruIndex += 1;

// console.log(quiz.soruGetir());

ui.btn_start.addEventListener("click",() =>{
    if (quiz.soruIndex < sorular.length) {   // quiz.sorular.length != quiz.soruIndex bu şekilde de yazılabilir.
        ui.quiz_box.classList.add("active");
        // let soru = quiz.soruGetir();
        // soruGoster(soru);
        startTimer(10);
        startTimerLine();
        soruGoster(quiz.soruGetir());
        soruSayisiniGoster((quiz.soruIndex+1),quiz.sorular.length);
        console.log(quiz.soruIndex); // gelen sorunun indeks değerinin ilk etapta 0 olduğunu göstermek için
        ui.next_button.classList.remove("show");

    }else{
        console.log("quiz bitti");
    }
});

ui.next_button.addEventListener("click", function(){
    if (quiz.soruIndex < sorular.length-1) { // üç numaralı indeks olmadığı için soruGetir() metoduna 3 numaralı indekse
        quiz.soruIndex += 1;
        clearInterval(counterLine);
        clearInterval(counter);
        startTimer(10);
        startTimerLine();
        ui.time_text.textContent = "Kalan Süre:";
        soruGoster(quiz.soruGetir());
        soruSayisiniGoster((quiz.soruIndex+1),quiz.sorular.length);
        ui.next_button.classList.remove("show");
        console.log(quiz.soruIndex);
    }else{
        //console.log("sorular bitti artık classListe active eklenebilir.");
        clearInterval(counter);
        clearInterval(counterLine);
        ui.quiz_box.classList.remove("active");
        //console.log("doğru cevap sayısı:" + quiz.dogruCevapSayisi);
        let score_text = `<p>${quiz.sorular.length} sorudan ${quiz.dogruCevapSayisi} tanesini bildiniz!</>`;
        ui.score_text.innerHTML = score_text;
        ui.score_box.classList.add("active");
    }
});

ui.btn_quit.addEventListener("click", function(){
    window.location.reload();
});

ui.btn_replay.addEventListener("click", function(){
   quiz.soruIndex = 0;
   quiz.dogruCevapSayisi = 0;
   ui.btn_start.click();
   ui.score_box.classList.remove("active");
});

const option_list = document.querySelector(".option_list");
const correctIcon = '<div class="icon"><i class="fa-solid fa-check"></i></div>';
const inCorrectIcon = '<div class="icon"><i class="fa-solid fa-times"></i></div>';

 function seciliSecenek(option){
    //console.log(option);
    clearInterval(counter);
    clearInterval(counterLine);
    let cevap = option.querySelector("span b").textContent;
    //console.log(cevap);
    let soru = quiz.soruGetir();
    //console.log(soru);
    if (soru.cevabiKontrolEt(cevap)) {
        option.classList.add("correct");
        quiz.dogruCevapSayisi += 1; // doğru cevap sayisini bir artırıyoruz. çünkü buraya geldiyse doğru cevabı seçmiştir.
        option.insertAdjacentHTML("beforeend", correctIcon);
        //console.log(option_list.children);
    }else{
        option.classList.add("incorrect");
        option.insertAdjacentHTML("beforeend", inCorrectIcon);
        //console.log("test");
    }

    for (let index = 0; index < option_list.children.length; index++) {
       option_list.children[index].classList.add("disabled");
    }

    ui.next_button.classList.add("show");
 }

let counter;
function startTimer(time) {
    counter = setInterval(timer, 1000);

    function timer() {
       ui.time_second.textContent = time
       time--;
       if(time <0) {
        clearInterval(counter);
        ui.time_text.textContent = "Süre bitti.";
        let cevap = quiz.soruGetir().dogruCevap;

        for (let option of option_list.children) {
            if (option.querySelector("span b").textContent == cevap) {
                option.classList.add("correct");
                option.insertAdjacentHTML("beforeend", correctIcon);
           }
           option.classList.add("disabled");
        }
        ui.next_button.classList.add("show");
       }
    }
}

let counterLine;
function startTimerLine() {
    let lineWidth = 0;
    counterLine = setInterval(timer, 100);  // saniyenin 10 da biri süresince çağıracak.
    
    function timer(){
        lineWidth += 5;
        ui.time_line.style.width = lineWidth + "px";

        if(lineWidth > 549){
            clearInterval(counterLine);
        }
    }
}







    


    