var stateObject = {
    "India": { "Delhi": ["new Delhi", "North Delhi"],
    "Kerala": ["Thiruvananthapuram", "Palakkad"],
    "Goa": ["North Goa", "South Goa"],
    },
    "Australia": {
    "South Australia": ["Dunstan", "Mitchell"],
    "Victoria": ["Altona", "Euroa"]
    },
    "Canada": {
    "Alberta": ["Acadia", "Bighorn"],
    "Columbia": ["Washington", ""]
        },
}
window.onload = function () {
    var county = document.getElementById("countySel"),
    stateSel = document.getElementById("stateSel"),
    districtSel = document.getElementById("districtSel");
    for (var country in stateObject) {
        countySel.options[countySel.options.length] = new Option(country, country);
    }
    countySel.onchange = function () {
        stateSel.length = 1; 
        districtSel.length = 1; // 
        if (this.selectedIndex < 1) return; 
        for (var state in stateObject[this.value]) {
            stateSel.options[stateSel.options.length] = new Option(state, state);
        }   
    }
    countySel.onchange(); 
    stateSel.onchange = function () {
        districtSel.length = 1; 
        if (this.selectedIndex < 1) return;
        var district = stateObject[countySel.value][this.value];
        for (var i = 0; i < district.length; i++) {
            districtSel.options[districtSel.options.length] = new Option(district[i], district[i]);
        }
    }
    var emp = [{ "name": "Tejas", "email": "Tejas@gmail.com","gender":"male","hobbies":"Traveling","age":"22","country":"India","state":"Delhi","city":"new Delhi"},
               { "name": "Manish", "email": "Manish@gmail.com","gender":"female","hobbies":"Sport,Reading","age":"25","country":"India","state":"Delhi","city":"new Delhi"},
               { "name": "Sanjay", "email": "Sanjay@gmail.com","gender":"male","hobbies":"Sport","age":"20","country":"India","state":"Delhi","city":"new Delhi"},];
                
                        var length = emp.length;
                        var htmltext = "";

                        for (var i = 0; i < length; i++) {
                            console.log(emp[i]);
                            htmltext += "<tr id='table"+i+"'><td>"
                            +emp[i].name+
                            "</td><td>"
                            +emp[i].email+
                            "</td><td>"
                            +emp[i].gender+
                            "</td><td>"
                            +emp[i].hobbies+
                            "</td><td>"
                            +emp[i].age+
                            "</td><td>"
                            +emp[i].country+
                            "</td><td>"
                            +emp[i].state+
                            "</td><td>"
                            +emp[i].city+
                            "</td><td><button onclick='edit("+i+")'>Edit</button><button onclick='SomeDeleteRowFunction("+i+")'>Delete</button></td></tr>";  
                        }
                        document.getElementById("tbody").innerHTML = htmltext;
                    
                   
}
var checkedValue = [];
    var row;
    var data;

function getRadioValue(theRadioGroup) {
    var elements = document.getElementsByName(theRadioGroup);
    for (var i = 0, l = elements.length; i < l; i++) {
        if (elements[i].checked) {
            return elements[i].value;
        }
    }
}

function getCheckBox(thisCheckBoxGroup) {
   
     var inputElements = document.getElementsByName(thisCheckBoxGroup);
     for (var i = 0; inputElements[i]; ++i) {
         if (inputElements[i].checked) {
              checkedValue.push(inputElements[i].value);              
         }

     } return checkedValue;
 }

    function savedata() {

        var country = document.getElementById("countySel");
        var state = document.getElementById("stateSel");
        var city = document.getElementById("districtSel");
        data = {
            "name": document.getElementById('txtName').value,
            "email": document.getElementById('txtEmail').value,
            "gender": getRadioValue('gender'),
            "hobbies": getCheckBox("hobbies"),
            "age": document.getElementById('txtAge').value,
            "Countries": country.options[country.selectedIndex].text,
            "State": state.options[state.selectedIndex].text,
            "City": city.options[city.selectedIndex].text
        }
        
        console.log(data);      
        createtablerow();
       
        document.getElementById('creationTime').innerHTML = Date();


    }
    function createtablerow() {
        

        table = document.getElementById('table');    
        var columnCount = table.rows[0].cells.length;

            row = table.insertRow(-1);

            var cell1 = row.insertCell(-1);
            var cell2 = row.insertCell(-1);
            var cell3 = row.insertCell(-1);
            var cell4 = row.insertCell(-1);
            var cell5 = row.insertCell(-1);
            var cell6 = row.insertCell(-1);
            var cell7 = row.insertCell(-1);
            var cell8 = row.insertCell(-1);
            var cell9 = row.insertCell(-1);

            cell1.innerHTML = data.name;;
            cell2.innerHTML = data.email
            cell3.innerHTML = data.gender;
            cell4.innerHTML = data.hobbies;
            cell5.innerHTML = data.age;
            cell6.innerHTML = data.Countries;
            cell7.innerHTML = data.State;
            cell8.innerHTML = data.City;
            cell9.innerHTML = `<button onclick='edit("+i+")'>Edit</button><button onclick='SomeDeleteRowFunction("+i+")'>Delete</button>`;
            
            table.appendChild(row);


    }
    function SomeDeleteRowFunction() {
        var td = event.target.parentNode; 
        var tr = td.parentNode;
        tr.parentNode.removeChild(tr);
  }

  function myResetFun() {
    
    document.getElementById("txtName").value = "";
    document.getElementById("txtEmail").value = "";
    var ele = document.getElementsByName("gender");
    for(var i=0;i<ele.length;i++)
        ele[i].checked = false;
    var clist = document.getElementsByName("hobbies");
    for (var i = 0; i < clist.length; ++i) { clist[i].checked = false; }
    document.getElementById("txtAge").value = "";
    document.getElementById("countySel").value = "";
    document.getElementById("stateSel").value = "";
    document.getElementById("districtSel").value = "";
  }
    
