
var arrLs = [];
var cAmPm;
var cIn;
var cMin;
var cSec;
var cWait;
var myList = [];
// document.querySelector('#text-9AM').style.height="60px";
// document.querySelector('#text-9AM').style.textAlign="left";
// document.querySelector('#text-9AM').readOnly=false;
// document.querySelector('#text-9AM').style.backgroundColor="lightgray";
// document.querySelector('#button-12PM').disabled=false;
// document.querySelector('#text-12PM').disabled=true;
// document.querySelector('#text-12PM').style.backgroundColor="Azure";


ldScheduler();

function ldScheduler() {
    arrLs = fetchFromLocalStorageObject(moment().format("YYYY-MM-DD"));
    
    cAmPm = moment().format("A"); console.log("cAmPm: "+cAmPm);
    cIn = Number(moment().format("hh")); console.log("cIn: "+cIn);
    cMin = Number(moment().format("mm")); console.log("cMin: "+cMin);
    cSec = Number(moment().format("ss")); console.log("cSec: "+cSec);
    cWait = 3600 - ((cMin*60)+cSec); console.log("cWait: "+cWait);
    //setTimeout(majid, cWait);


    // document.querySelector('#text-9AM').textContent = arrLs[0].split("|")[1];
    document.querySelector('#text-9AM').value = arrLs[0].split("|")[1]; 
    document.querySelector('#text-10AM').value = arrLs[1].split("|")[1];
    document.querySelector('#text-11AM').value = arrLs[2].split("|")[1];
    document.querySelector('#text-12PM').value = arrLs[3].split("|")[1];
    document.querySelector('#text-1PM').value = arrLs[4].split("|")[1];
    document.querySelector('#text-2PM').value = arrLs[5].split("|")[1];
    document.querySelector('#text-3PM').value = arrLs[6].split("|")[1];
    document.querySelector('#text-4PM').value = arrLs[7].split("|")[1];
    document.querySelector('#text-5PM').value = arrLs[8].split("|")[1];


    document.querySelector('#button-9AM').addEventListener('click', saveBtn);
    document.querySelector('#button-10AM').addEventListener('click', saveBtn);
    document.querySelector('#button-11AM').addEventListener('click', saveBtn);
    document.querySelector('#button-12PM').addEventListener('click', saveBtn);
    document.querySelector('#button-1PM').addEventListener('click', saveBtn);
    document.querySelector('#button-2PM').addEventListener('click', saveBtn);
    document.querySelector('#button-3PM').addEventListener('click', saveBtn);
    document.querySelector('#button-4PM').addEventListener('click', saveBtn);
    document.querySelector('#button-5PM').addEventListener('click', saveBtn);

    myList = fetchFromLocalStorageObject("SoccerQuiz");

    // make all colors
    changeColor();

    //document.querySelector('#todayID').textContent = moment();

}

function saveBtn(event) {
    console.log(event.target.parent);
    //console.log(`text-${(event.target.id).split("-")[1]}`);
    //document.querySelector(`#text-${(event.target.id).split("-")[1]}`).value;
    addToLocalStorageObject(moment().format("YYYY-MM-DD"), (event.target.id).split("-")[1], document.querySelector(`#text-${(event.target.id).split("-")[1]}`).value)
    arrLs = fetchFromLocalStorageObject(moment().format("YYYY-MM-DD"), (event.target.id).split("-")[1]);
    //console.log(arrLs[0].split("|")[1]);
}

function addToLocalStorageObject(name, key, value) {
    // Get the existing data
    var existing = localStorage.getItem(name);

    // If no existing data, create an array
    // Otherwise, convert the localStorage string to an array
    existing = existing ? JSON.parse(existing) : { "9AM": "Default 1", "10AM": "Default 2", "11AM": "Default 3", 
                                                    "12PM": "Default 4", "1PM": "Default 5", "2PM": "Default 6",
                                                    "3PM": "Default 7", "4PM": "Default 8", "5PM": "Default 9" };

    // Add new data to localStorage Array
    existing[key] = value;

    // Save back to localStorage
    localStorage.setItem(name, JSON.stringify(existing));
}

function fetchFromLocalStorageObject(name, key = "") {
    // Get the existing data
    var existing = localStorage.getItem(name);

    // If no existing data, create an array
    // Otherwise, convert the localStorage string to an array
    existing = existing ? JSON.parse(existing) : { "9AM": "Default 1", "10AM": "Default 2", "11AM": "Default 3", 
                                                    "12PM": "Default 4", "1PM": "Default 5", "2PM": "Default 6",
                                                    "3PM": "Default 7", "4PM": "Default 8", "5PM": "Default 9" };

    let myArrList = [];

    for (key in existing) {
        var infoJSON = existing[key];
        myArrList.push(key + "|" + infoJSON);
        // console.log(infoJSON.Name);
        // console.log(infoJSON.CorrectAnswers);
        // console.log(infoJSON.TimeLeft);
        // console.log(infoJSON.Date);
        // console.log('--------------');
        //console.log(myArrList);
    }

    return myArrList;
}

function changeColor(){
        
        let x = document.querySelectorAll(".textBx");
        for (i = 0; i < x.length; i++) {
            x[i].style.backgroundColor="lightgreen";
        }

        if (cAmPm == "AM") { // current time is AM
            if (cIn < 9 || cIn> 11) {
                // do nothing !
            } else if(cIn == 9) {
                document.querySelector(`#text-${cIn+cAmPm}`).style.backgroundColor="pink"; changeControl(cIn+cAmPm);
            } else if (cIn == 10) {
                document.querySelector(`#text-${(cIn-1)+cAmPm}`).style.backgroundColor="lightgray"; changeControl((cIn-1)+cAmPm); // 9AM
                document.querySelector(`#text-${cIn+cAmPm}`).style.backgroundColor="pink"; changeControl(cIn+cAmPm); // 10AM
            } else if (cIn == 11) {
                document.querySelector(`#text-${(cIn-2)+cAmPm}`).style.backgroundColor="lightgray"; changeControl((cIn-2)+cAmPm); // 9AM
                document.querySelector(`#text-${(cIn-1)+cAmPm}`).style.backgroundColor="lightgray"; changeControl((cIn-1)+cAmPm); // 10AM
                document.querySelector(`#text-${cIn+cAmPm}`).style.backgroundColor="pink"; changeControl(cIn+cAmPm); //11AM
            } 
        }
        else{ // current time is PM
            document.querySelector(`#text-9AM`).style.backgroundColor="lightgray"; changeControl("9AM");// 9AM
            document.querySelector(`#text-10AM`).style.backgroundColor="lightgray"; changeControl("10AM");// 10AM
            document.querySelector(`#text-11AM`).style.backgroundColor="lightgray"; changeControl("11AM");// 11AM
            switch (cIn) {
                case 12: 
                    document.querySelector(`#text-${cIn+cAmPm}`).style.backgroundColor="pink"; changeControl(cIn+cAmPm); // 12PM
                    break;
                case 1: 
                    document.querySelector(`#text-12PM`).style.backgroundColor="lightgray"; changeControl("12PM");// 12PM
                    document.querySelector(`#text-${cIn+cAmPm}`).style.backgroundColor="pink"; changeControl(cIn+cAmPm);// 1PM
                    break;
                case 2: 
                    document.querySelector(`#text-12PM`).style.backgroundColor="lightgray"; changeControl("12PM"); // 12PM
                    document.querySelector(`#text-1PM`).style.backgroundColor="lightgray"; changeControl("1PM"); // 1PM
                    document.querySelector(`#text-${cIn+cAmPm}`).style.backgroundColor="pink"; changeControl(cIn+cAmPm);// 2PM
                    break;
                case 3: 
                    document.querySelector(`#text-12PM`).style.backgroundColor="lightgray"; changeControl("12PM");// 12PM
                    document.querySelector(`#text-1PM`).style.backgroundColor="lightgray"; changeControl("1PM");// 1PM
                    document.querySelector(`#text-2PM`).style.backgroundColor="lightgray"; changeControl("2PM");// 2PM
                    document.querySelector(`#text-${cIn+cAmPm}`).style.backgroundColor="pink"; changeControl(cIn+cAmPm);// 3PM
                    break;
                case 4: 
                    document.querySelector(`#text-12PM`).style.backgroundColor="lightgray"; changeControl("12PM");// 12PM
                    document.querySelector(`#text-1PM`).style.backgroundColor="lightgray"; changeControl("1PM");// 1PM
                    document.querySelector(`#text-2PM`).style.backgroundColor="lightgray"; changeControl("2PM");// 2PM
                    document.querySelector(`#text-3PM`).style.backgroundColor="lightgray"; changeControl("3PM");// 3PM
                    document.querySelector(`#text-${cIn+cAmPm}`).style.backgroundColor="pink"; changeControl(cIn+cAmPm);// 4PM
                    break;
                case 5: 
                    document.querySelector(`#text-12PM`).style.backgroundColor="lightgray"; changeControl("12PM");// 12PM
                    document.querySelector(`#text-1PM`).style.backgroundColor="lightgray"; changeControl("1PM");// 1PM
                    document.querySelector(`#text-2PM`).style.backgroundColor="lightgray"; changeControl("2PM");// 2PM
                    document.querySelector(`#text-3PM`).style.backgroundColor="lightgray"; changeControl("3PM");// 3PM
                    document.querySelector(`#text-4PM`).style.backgroundColor="lightgray"; changeControl("4PM");// 4PM
                    document.querySelector(`#text-${cIn+cAmPm}`).style.backgroundColor="pink"; changeControl(cIn+cAmPm);// 4PM
                    break;
                default:
                    let x = document.querySelectorAll(".textBx");
                    for (i = 0; i < x.length; i++) {
                        x[i].style.backgroundColor="lightgray";
                        changeControl(x[i].id.split("-")[1]);
                    }
            }
        }
}

function changeControl(ctrlID){
    document.querySelector(`#text-${ctrlID}`).readOnly = true;
    document.querySelector(`#button-${ctrlID}`).disabled = true;
}

console.log("------------------");
// console.log(moment().format("YYYY-MM-DD"));
// console.log(moment().format("YYYY-MM-DD-HH-MM-SS-A"));
// console.log(moment().format("HHA"));
// console.log(moment().calendar("s")); /////
// console.log(moment().from(moment(today)));
// console.log(moment().format("mm:ss"));
// console.log(moment().add(1, 'h'));
// console.log(moment().add(1, 'seconds'));
// moment().startOf('second')
// moment().toNow()
console.log("------------------");

