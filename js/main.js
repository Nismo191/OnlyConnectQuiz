$(function() {
    $("#header-placeholder").load("nav.html");
});

$(function() {
    $("#footer-placeholder").load("footer.html");
});

function startTimer(){
    vars = getUrlVars()
    if(vars.timer == "true"){
        // console.log("start timer")
        move("timer1", 2)
    }
}

function move(id, nextId) {
    // console.log(id)
    let elem = document.getElementById(id);
    let width = 0;
    let timer = setInterval(frame, 10);

    let totalTime = 40
    let segTime = (totalTime / 4) * 10

    let adjustAmount = segTime * 0.001

    console.log(adjustAmount)

    function frame() {
        if (width >= 99) {
            if(id != "timer4"){
                clearInterval(timer)
                move("timer"+nextId, nextId+1)
            }
            else if(id == "timer4"){
                clearInterval(timer)
            }
        } 
        else {
            width += adjustAmount;
            elem.style.width = width + '%';
        }
        
    }
}

function revealAnswer(){
    
}

$(".question, #answer").click(function(){
    // $(this).toggleClass("hide");
    $(this).children("p").toggleClass("hide");
    // console.log(this)
});


$(function(){
    if($('body').is('.connection')){
        vars = getUrlVars()
        // const Url=`http://46.101.77.167:5000/api/v1/connections/series_episode/2/1/`
        const Url=`http://46.101.77.167:5000/api/v1/connections/series_episode/${vars.series}/${vars.episode}/`
        $.get(Url, function(data, status){
            question = data[Object.keys(data)[vars.q-1]]
            console.log(data[Object.keys(data)[0]])
            $('#1question').children('#q-text').text(question.clue1)
            $('#2question').children('#q-text').text(question.clue2)
            $('#3question').children('#q-text').text(question.clue3)
            $('#4question').children('#q-text').text(question.clue4)
            $('#a-text').text(question.answer)
        })
    }
})


// $(document).ready(function(){
//     vars = getUrlVars()
//     // const Url=`http://46.101.77.167:5000/api/v1/connections/series_episode/2/1/`
//     const Url=`http://46.101.77.167:5000/api/v1/connections/series_episode/${vars.series}/${vars.episode}/`
//     $.get(Url, function(data, status){
//         question = data[Object.keys(data)[vars.q-1]]
//         console.log(data[Object.keys(data)[0]])
//         $('#1question').children('#q-text').text(question.clue1)
//         $('#2question').children('#q-text').text(question.clue2)
//         $('#3question').children('#q-text').text(question.clue3)
//         $('#4question').children('#q-text').text(question.clue4)
//         $('#a-text').text(question.answer)
//     })
// })


function getUrlVars(){
    var vars = [], hash
    var hashes = window.location.href.slice(window.location.href.indexOf('?')+1).split('&')

    for(var i=0; i<hashes.length; i++){
        hash = hashes[i].split("=")
        vars.push(hash[0])
        vars[hash[0]] = hash[1]
    }

    return vars;
}

function startGame(){
    // var series = document.getElementById("selector-series").value
    // var episode = document.getElementById("selector-episode").value

    var series = $('#selector-series :selected').text().slice(-1)
    var episode = $('#selector-episode :selected').text().slice(-1)

    var timer = $('#timer').prop('checked')

    console.log(series, episode, timer)
    window.location.href = `/connection?series=${series}&episode=${episode}&q=4&timer=${timer}`;
}

