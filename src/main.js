

const numberOfGoal = 3; // number of howmany goals to set
const formTagForGoals = document.querySelector(".formTagForGoals"); //every goalDiv will be appendded into this .formTagForGoals


const alertForPleaseSetAllGoals=document.createElement(`div`);
alertForPleaseSetAllGoals.classList.add(`alertForPleaseSetAllGoals`);
alertForPleaseSetAllGoals.innerText=`Please set all ${numberOfGoal} goals`;

const notifyForHowmanyGoalsCompleted = document.createElement(`div`);
notifyForHowmanyGoalsCompleted.classList.add(`notifyForHowmanyGoalsCompleted`);
document.querySelector(`.progressBar`).append(notifyForHowmanyGoalsCompleted);

 function topOneLinerInnerTextSetter(argu){
 
 if(argu>0 && argu!==(numberOfGoal-1) && argu!==numberOfGoal && document.querySelector(`.topOneLiner`).innerText!==`Raise the bar by completing your goals!`){

    document.querySelector(`.topOneLiner`).innerText=`Raise the bar by completing your goals!`

}
            else if(argu===(numberOfGoal-1)){
                document.querySelector(`.topOneLiner`).innerText=`You are just one step away`
            }
            else if(argu===numberOfGoal){
                document.querySelector(`.topOneLiner`).innerText=`Congrats! you acheived all goals`
            }
        }

const dashboard = document.querySelector(`.dashboard`);


let progressBarColorWidthGrowRatio= document.querySelector(`.progressBar`).offsetWidth / numberOfGoal;//to manage the width of the green color into progress bar


let oneTimeCheckerForEveryGoal = ()=>{

let howmanyUponAllCompleted = localStorage.getItem(`howmanyUponAllCompleted`);//to update the text within progress bar


    if(Number(localStorage.getItem(`numberOfFilledInputs`))<numberOfGoal){
        dashboard.append(alertForPleaseSetAllGoals)
    }

    

    if(howmanyUponAllCompleted){
       notifyForHowmanyGoalsCompleted.innerText=`${howmanyUponAllCompleted}/${numberOfGoal} completed`;
       let width = progressBarColorWidthGrowRatio*(Number(howmanyUponAllCompleted));
       document.querySelector(`.progressBarColor`).style.width= `${width}px`;
       

    }
    else{
       document.querySelector(`.progressBarColor`).style.width= 0;

    }

    let howmanyUponAllCompletedIntoNumber = Number(howmanyUponAllCompleted)
    topOneLinerInnerTextSetter(howmanyUponAllCompletedIntoNumber)

}




oneTimeCheckerForEveryGoal();
oneTimeCheckerForEveryGoal=null;

for(let i=0;i<numberOfGoal;i++){

    let inputOfGoal;// after ending of function checkerForEveryIteration, this variable is still needed and value for this variable can't be stored here so its left undefined;

    let checkerForEveryIteration = ()=>{
        
    const goalDiv = document.createElement("div"); //this is the main div which contains the whole goal input and mark of tick or untick

    goalDiv.classList.add(`goal`, `goal${i}`); // two classNames are added- one common className to set all common proerties for every goal and one different className for separate usecases of every goal

    goalDiv.innerHTML= `<div class="circle circle${i}"></div><input class="goalText goalText${i}" id="goalText${i}" type="text" placeholder="Add new goal...">` // one div with circle shape for mark/ unmark & one input tag for goal texts are injected here into goalDiv


    formTagForGoals.append(goalDiv); //every goalDiv entering above formTagForGoals

    inputOfGoal = document.querySelector(`.goal${i} .goalText${i}`); //the variable which was left undefined outside the function; now the needed input tag is created so value of this variable is stored here; this variable contains the input tag for goal texts which user will  set;



    //below are the variables to provide data from localStorage, when page is reloaded
    const localStorageOfInputValue = localStorage.getItem(`goalText${i}`);// data of the text set as goal
    const markedCircle = localStorage.getItem(`circle${i}-markingStatus`)
    



        
    //below all the data from localStorge is checked and set automatically, every time when the page reloads
    if(localStorageOfInputValue){ //what was written into input tag before closing the page
    inputOfGoal.value= localStorageOfInputValue;
    }

    if(markedCircle){//to check & set according to goal was marked or unmarked before closing the page
        document.querySelector(`.circle${i}`).style.backgroundImage = `url('/focus-on-today/assets/tickicon.png')`;
        document.querySelector(`.circle${i}`).parentElement.querySelector(`.goalText`).style.textDecoration=`line-through`;

    }
}

checkerForEveryIteration()
checkerForEveryIteration=null;

}

formTagForGoals.addEventListener(//if enter is pressed by user; it will unfocus the input
    `submit`,(event)=>{
        event.preventDefault();
        const activeElement = document.activeElement;
        activeElement.blur()
}
)

formTagForGoals.addEventListener(
    `click`, (event)=>{
        //after every click the below eventListener will be attached to input and the below eventListener will act only once;
        const targetedEvent = event.target;
        if(targetedEvent.classList[0]===`goalText`){
        targetedEvent.addEventListener(
            `blur`, ()=>{// this function will run after input is unfocused
                if(targetedEvent.value){

                
                //below if else block helps to remove or insert the alert of "Please set all goals" by managing numberOfFilledInputs in localStorage

                    let numberOfFilledInputs = localStorage.getItem(`numberOfFilledInputs`);

                if(numberOfFilledInputs){

                    if(!localStorage.getItem(targetedEvent.id)){
                    numberOfFilledInputs=Number(numberOfFilledInputs)
                    localStorage.setItem(`numberOfFilledInputs`,++numberOfFilledInputs);

                    if(numberOfFilledInputs===numberOfGoal && document.querySelector(`.dashboard .alertForPleaseSetAllGoals`)){
                        document.querySelector(`.dashboard .alertForPleaseSetAllGoals`).remove()
                    }}

                     localStorage.setItem(targetedEvent.id, targetedEvent.value);//input value will be saved to localStorage with the keyname as input ID
                }
                else if(!numberOfFilledInputs){///this is else of if(localStorage.getItem(`numberOfFilledInputs`))

                    localStorage.setItem(targetedEvent.id, targetedEvent.value);//input value will be saved to localStorage with the keyname as input ID
                    localStorage.setItem(`numberOfFilledInputs`,`1`)
                }

            }




                else if(!targetedEvent.value){////this is else if of if(targetedEvent.value), this will run if input value is null

                    for(let i=0; i<numberOfGoal; i++){//if any goal is marked, that will be unmarked
                       if(document.querySelector(`.circle${i}`).style.backgroundImage){
                        document.querySelector(`.circle${i}`).style.backgroundImage=``;
                       document.querySelector(`.circle${i}`).parentElement.querySelector(`.goalText`).style.textDecoration=`none`;
                        localStorage.removeItem(`circle${i}-markingStatus`);
                        

                       }


                    }
                        notifyForHowmanyGoalsCompleted.innerText=``;
                        localStorage.removeItem(`howmanyUponAllCompleted`);
                        document.querySelector(`.progressBarColor`).style.width=`0px`;
                        document.querySelector(`.topOneLiner`).innerText=`Raise the bar by completing your goals!`
                    if(localStorage.getItem(targetedEvent.id)){//remove targeted Event's id from localStorage if exists
                    localStorage.removeItem(targetedEvent.id)
                    
                     numberOfFilledInputs = Number(localStorage.getItem(`numberOfFilledInputs`));

                    if(numberOfFilledInputs>1){//numberOfFilledInputs will decrease  & at last gets deleted
                        localStorage.setItem(`numberOfFilledInputs`,--numberOfFilledInputs)}
                        else{localStorage.removeItem(`numberOfFilledInputs`);}


                        if(!document.querySelector(`.dashboard .alertForPleaseSetAllGoals`)){//appending red colored alertForPleaseSetAllGoals if not exists
                        dashboard.append(alertForPleaseSetAllGoals)
                    }


                    }
                }
                

                


            
            },{once:true}
        )
    }

    else if(targetedEvent.classList[0]===`circle`){//if circle is clicked to mark/unmark by user
       if(!document.querySelector(`.dashboard .alertForPleaseSetAllGoals`)){//only marks if alertForPleaseSetAllGoals not exist
           let howmanyUponAllCompletedIntoNumber=Number(localStorage.getItem(`howmanyUponAllCompleted`))
         

        if(!targetedEvent.style.backgroundImage){//will be marked if was unmarked
        targetedEvent.style.backgroundImage=`url('/focus-on-today/assets/tickicon.png')`;
        targetedEvent.parentElement.querySelector(`.goalText`).style.textDecoration=`line-through`;
        localStorage.setItem(`${targetedEvent.classList[1]}-markingStatus`,`marked`);//marking will be also registered into localStorage
        if(localStorage.getItem(`howmanyUponAllCompleted`)){//in local storage it will be set that howmany goals upon all goals are completed(marked)
            localStorage.setItem(`howmanyUponAllCompleted`,++howmanyUponAllCompletedIntoNumber);
        }

        else{
            localStorage.setItem(`howmanyUponAllCompleted`,`1`)
        }

        }




        else if(targetedEvent.style.backgroundImage){//will be unmarked if was marked
            targetedEvent.style.backgroundImage=``;
        
        localStorage.removeItem(`${targetedEvent.classList[1]}-markingStatus`);//marking status will be removed from localStorage;
        targetedEvent.parentElement.querySelector(`.goalText`).style.textDecoration=`none`;

        if(howmanyUponAllCompletedIntoNumber>1){//when unmarking ,will be decreased in localStorage
            localStorage.setItem(`howmanyUponAllCompleted`,--howmanyUponAllCompletedIntoNumber);

        }

            else{
                localStorage.removeItem(`howmanyUponAllCompleted`);
                notifyForHowmanyGoalsCompleted.innerText=``;
            }

        }
    
            let progressBarColorFinalWidth;
         if(localStorage.getItem(`howmanyUponAllCompleted`)){
       notifyForHowmanyGoalsCompleted.innerText=`${localStorage.getItem(`howmanyUponAllCompleted`)}/${numberOfGoal} completed`;
       progressBarColorFinalWidth=progressBarColorWidthGrowRatio*Number(localStorage.getItem(`howmanyUponAllCompleted`));

topOneLinerInnerTextSetter(howmanyUponAllCompletedIntoNumber)

         }
         else{
       notifyForHowmanyGoalsCompleted.innerText=``;
       progressBarColorFinalWidth=0;

         }

progressBarColorFinalWidth=(progressBarColorFinalWidth<0) ? 0 : progressBarColorFinalWidth
         document.querySelector(`.progressBarColor`).style.width=`${progressBarColorFinalWidth}px`;

       }
    }
}
)


