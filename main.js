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
            globalError=true
            return "How do you not know to not divide by zero!!!!"
        }
        return Number(divide(number1,number2).toFixed(4))
    }
}
let alpha="789/456*123-=0.+".split("")
alpha.push("clear")
const container=document.querySelector(".container")
let horibox
alpha.forEach((element,index)=>{
    const button=document.createElement("button")
    if ((index%4==0)&&(index<=16)){
        horibox=document.createElement("div")
        horibox.classList.add("HoriBox")
        container.appendChild(horibox)
    }
    button.classList.add("but")
    button.textContent= `${element}`
    horibox.appendChild(button)
    button.addEventListener("click",()=>{
        updatedisplay(element)
    })
})
let globalOperationCount=0
let globalPreviousOperator=false
let globalJustCalculated=false
let globalError=false
let dotcount=0
function filldisplay(sign){
    const display=document.querySelector(".display")
    display.textContent=`${display.textContent}${sign}`
}
function cleardisplay(){
    const display=document.querySelector(".display")
    display.textContent=""
}
function updatedisplay(sign){
    if (globalError==true){
        cleardisplay()
        globalError=false
    }
    if ("1234567890.".includes(sign)){
        if(globalJustCalculated==true){
            cleardisplay()
            globalJustCalculated=false
        }
        if(sign=="."){
            if (dotcount==1){
                return
            }
            else{
                dotcount+=1
            }
        }
        globalPreviousOperator=false
        filldisplay(sign)
    } else if ("+-/*".includes(sign)){
        globalJustCalculated=false
        dotcount=0
        if ((globalOperationCount==0)||(globalPreviousOperator==true)){
            filldisplay(` ${sign} `)
            globalOperationCount+=1
        } else {
            calculate()
            filldisplay(` ${sign} `)
        }
        globalPreviousOperator=true
    } else if (sign=="="){
        dotcount=0
        calculate()
        globalOperationCount=0
        globalPreviousOperator=false
        globalJustCalculated=true
    } else if (sign=="clear"){
        cleardisplay()
        dotcount=0
        globalOperationCount=0
        globalPreviousOperator=false
        globalJustCalculated=false
    }
}
function calculate(){
    const display=document.querySelector(".display")
    equation=display.textContent
    const array=equation.split(" ")
    results=operate(array.at(0),array.at(-2),array.at(-1))
    console.log(results)
    console.log(array)
    cleardisplay()
    if ((Number.isNaN(results)==true)||(results===undefined)){
        filldisplay("Error")
        globalError=true
    } else{
    filldisplay(results)
    }
}
