const boxContent = document.querySelectorAll('[data-cell]')
const playground = document.getElementById('playground_div')
const display_result = document.getElementById('display_result')
const restart_btn = document.getElementById('restart_btn')
const result_text = document.getElementById('result_text')

const WinConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const x = 'x'
const o = 'o'
let oMove

start()

restart_btn.addEventListener('click', start)

function start(){

    oMove=0
    boxContent.forEach(box => {
        box.classList.remove(x)
        box.classList.remove(o)
        box.addEventListener('click',handleClick, {once : true})   //prevents overwritting 
    })

    playgroundHover()
    display_result.classList.remove('show')
}

function handleClick(event) {
    //console.log('clicked')
    const box = event.target
    let current_mark = oMove ? o : x

    mark(box, current_mark)

    if(CheckWinner(current_mark)){
        end(false)
    }
    else if(Draw()){
        end(1)
    }
    else{
            
        swapMoves() 
        playgroundHover()
    }
}


function end(draw){
    if(draw){
        result_text.innerText = 'Draw!'

    }
    else{
        result_text.innerText = `${oMove ? "O" : "X"} Wins!`
    }

    display_result.classList.add('show')

}

function Draw(){
    return [...boxContent].every(box => {
        return box.classList.contains(x) || box.classList.contains(o)
    })
}

function mark(box, current_mark){
    box.classList.add(current_mark)
}

function swapMoves(){
    oMove = !oMove
}

function playgroundHover(){
    playground.classList.remove(x)
    playground.classList.remove(o)

    if(oMove){
        playground.classList.add(o)
    }
    else{
        playground.classList.add(x)
    }

}

function CheckWinner(current_mark){
    return WinConditions.some(conditions =>{
        return conditions.every(index =>{
            return boxContent[index].classList.contains(current_mark)
        })
    })
}

