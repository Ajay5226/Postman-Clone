//function to get DOM element from String
function getElementFromString(string){
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

// hiding the parameter box at start
let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = 'none';

//If user click on Custom Parameter, hide json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener("click", ()=>{
    document.getElementById('jsonText').style.display= 'none';
    document.getElementById('parametersBox').style.display= 'block';
});

//If user click on json, hide Custom Parameter box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener("click", ()=>{
    document.getElementById('parametersBox').style.display= 'none';
    document.getElementById('jsonText').style.display= 'block';
});

//Adding more Parameter by clicking + button 
let paramCount = 1;

let addParam = document.getElementById("addParam");
addParam.addEventListener("click", ()=>{
    let params = document.getElementById("params"); 
    let string=`<div class="row my-2">
                <label for="url" class="col-sm-2 col-form-label">Parameter ${paramCount + 1}</label>
                    
                <div class="col-sm-3">
                        <input type="text" class="form-control" placeholder="Enter Parameter ${paramCount +1} key" id="parameterKey${paramCount + 1}">
                    </div>
                    
                    <div class="col-sm-3">
                        <input type="text" class="form-control" placeholder="Enter Parameter ${paramCount +1} value" id="parameterValue${paramCount + 1}">
                    </div>
                    
                    <button class="btn btn-primary deleteParam col-sm-1"> - </button>
                </div>` ;
         
//Convert element string to DOM node        
        let paramElement = getElementFromString(string);
       params.appendChild(paramElement);

//Add eventListener to - button in parameter
    let deleteParam = document.getElementsByClassName("deleteParam");
    for(item of deleteParam){
        item.addEventListener("click", (e)=>{
            e.target.parentElement.remove();
        });
    }

        paramCount++;
});

//Submit button 
let submit = document.getElementById("submit");
submit.addEventListener("click", ()=>{
    document.getElementById("responseJsonBoxText").value = "Fetching Response . . . Please Wait !"

    //Fetching data from fields
    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name= 'requestType']:checked").value;
    let contentType = document.querySelector("input[name= 'contentType']:checked").value;

    //If param is selected then collect all data from param
    if(contentType == 'params'){
        data={};
        for(let i=0; i<paramCount; i++){
            if(document.getElementById('parameterKey' +(i+1)) != undefined){
            let key = document.getElementById('parameterKey' + (i+1)).value;
            let value = document.getElementById('parameterValue' + (i+1)).value;
            data[key]= value;
        }
    }
    data = JSON.stringify(data);  
    }else{
        data = document.getElementById('requestJsonBoxText').value;
    }

        console.log(url);
        console.log(requestType);
        console.log(contentType);
        console.log(data);

    //When request type is GET 
    if(requestType =='GET'){
        fetch(url,{
                method:'GET',
        }).then(response => response.text())
          .then((text) => { document.getElementById('responseJsonBoxText').value = text;
         });
    }else{
        fetch(url,{
            method:'POST',
            body: data,
            headers:{
                "Content-type": "applicaton/json; charset=UTF-8"
            }
    }).then(response => response.text())
      .then((text) => { document.getElementById('responseJsonBoxText').value = text;
        Prism.highlightAll();
    });
    }
    
});
