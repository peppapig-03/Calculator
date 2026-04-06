function add(number1,number2){
    return number1+number2
}
function subtract(number1,number2){
    return number1-number2
}
function multiply(number1,number2){
    return number1*number2
}
function divide(number1,number2){
    return number1/number2
}
function operate(number1,operation,number2){
    number1=parseFloat(number1)
    number2=parseFloat(number2)
    if (operation=="+"){
        return Number(add(number1,number2).toFixed(4))
    } else if (operation=="-"){
        return Number(subtract(number1,number2).toFixed(4))
    } else if (operation=="*"){
        return Number(multiply(number1,number2).toFixed(4))
    } else if (operation=="/"){
        if (number2==0){
            return "How do you not know to not divide by zero!!!!"
        }
        return Number(divide(number1,number2).toFixed(4))
    }
}
let alpha="1234567890+-*/.=".split("")
alpha.push("clear")
const container=document.querySelector(".container")
alpha.forEach((element)=>{
    const button=document.createElement("button")
    button.classList.add("but")
    button.textContent= `${element}`
    button.style.display="inline-block"
    button.style.width="100px"
    button.style.aspectRatio="1/1"
    button.style.backgroundColor="green"
    container.appendChild(button)
    button.addEventListener("click",()=>{
        updatedisplay(element)
    })
})
let globalOperationCount=0
let globalPreviousOperator=false
function filldisplay(sign){
    const display=document.querySelector(".display")
    display.textContent=`${display.textContent}${sign}`
}
function cleardisplay(){
    const display=document.querySelector(".display")
    display.textContent=""
}
function updatedisplay(sign){
    if ("1234567890.".includes(sign)){
        if (globalPreviousOperator==false){
            cleardisplay()
        }
        filldisplay(sign)
        globalPreviousOperator=false
    } else if ("+-/*".includes(sign)){
        if ((globalOperationCount==0) ||(globalPreviousOperator==true)){
            filldisplay(` ${sign} `)
            globalOperationCount+=1
            globalPreviousOperator=true
        } else {
            calculate()
            filldisplay(` ${sign} `)
            globalPreviousOperator=true
        }
    } else if (sign=="="){
        calculate()
        globalOperationCount=0
        globalPreviousOperator=false
    } else{
        cleardisplay()
        globalOperationCount=0
        globalPreviousOperator=false
    }
}
function calculate(){
    const display=document.querySelector(".display")
    equation=display.textContent
    const array=equation.split(" ")
    results=operate(array.at(0),array.at(-2),array.at(-1))
    console.log(results)
    cleardisplay()
    if (Number.isNaN(results)==true){
        filldisplay("Error")
    } else{
    filldisplay(results)
    }
}
