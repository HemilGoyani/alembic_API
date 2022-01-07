
            var myArray = [{ "name": "Tejas", "email": "Tejas@gmail.com","gender":"male","hobbies":"Traveling","age":"22","country":"India","state":"Delhi","city":"new Delhi"},
                        { "name": "Manish", "email": "Manish@gmail.com","gender":"female","hobbies":"Sport,Reading","age":"25","country":"India","state":"Delhi","city":"new Delhi"},
                        { "name": "Sanjay", "email": "Sanjay@gmail.com","gender":"male","hobbies":"Sport","age":"20","country":"India","state":"Delhi","city":"new Delhi"}];
                        
            var i;// i meance index
            buildTable(myArray);
            console.log(myArray);
            

	function buildTable(data,length = 1){
                var addData = document.getElementById('myTable');
		for (i =length - 1; i < data.length; i++){
                var rows =  `<tr>
                                <td>${data[i].name}</td>
                                <td>${data[i].email}</td>
                                <td>${data[i].gender}</td>
                                <td>${data[i].hobbies}</td>
                                <td>${data[i].age}</td>
                                <td>${data[i].country}</td>
                                <td>${data[i].state}</td>
                                <td>${data[i].city}</td>
                                <td><button onclick='onEdit(`+i+`)'>Edit</button><button onclick='rowDelete(`+i+`)'>Remove</button></td>
                        </tr>`
                addData.innerHTML += rows
		}
	}
    var checkedValue = [];
    var row;
    

        function getRadioValue(theRadioGroup) {
            var elements = document.getElementsByName(theRadioGroup);
    
            for (let i = 0, l = elements.length; i < l; i++) {
                if (elements[i].checked) {
                    return elements[i].value;
                }
            }
        }

        function getCheckBox(thisCheckBoxGroup) {
        
            var inputElements = document.getElementsByName(thisCheckBoxGroup);
            
            for (let i = 0; inputElements[i]; ++i) {
                if (inputElements[i].checked) {
                    checkedValue.push(inputElements[i].value);              
                }

            } return checkedValue;
        }
    function savedata() {
        
        if(document.getElementById("btnSubmit").innerHTML == "Submit")
        {
            let inserData = readData();
            console.log(inserData);  
            myArray.push(inserData);
            buildTable(myArray,myArray.length);
            myResetFun();
            document.getElementById("lblTime").innerHTML = Date();
        }
        else{
            
            let inserData = readData();
            update(inserData,i);
        }
        
       
    }

    function readData(){
        var coutries = document.getElementById("countySel");
        var states = document.getElementById("stateSel");
        var cities = document.getElementById("districtSel");
          var  values = {
                "name": document.getElementById('txtName').value,
                "email": document.getElementById('txtEmail').value,
                "gender": getRadioValue('gender'),
                "hobbies": getCheckBox("hobbies"),
                "age": document.getElementById('txtAge').value,
                "country": coutries.options[coutries.selectedIndex].text,
                "state": states.options[states.selectedIndex].text,
                "city": cities.options[cities.selectedIndex].text
            }
            return values;
    }
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
        window.onload = function() {
                var county = document.getElementById("countySel"),
                stateSel = document.getElementById("stateSel"),
                districtSel = document.getElementById("districtSel");
                for (var country in stateObject) {
                    countySel.options[countySel.options.length] = new Option(country, country);
                }
                countySel.onchange = function () {
                    stateSel.length = 1; 
                    districtSel.length = 1;
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
                    for (let i = 0; i < district.length; i++) {
                        districtSel.options[districtSel.options.length] = new Option(district[i], district[i]);
                    }
                }
            }

            function rowDelete(i) {
                if (confirm('Are you sure to delete this record ?')) {
                    const index = myArray.indexOf(i);
                    if (index > -1) {
                    myArray.splice(index,1);
                    }
                    console.log(myArray);
                }
            }

        function onEdit(i){
           console.log(i);
            document.getElementById("btnSubmit").innerHTML = "Update";

            var selectedRow = myArray[i];
            console.log(selectedRow);
           
            let name = document.getElementById('txtName').value = selectedRow.name;
            let email = document.getElementById('txtEmail').value = selectedRow.email;
            var gen = selectedRow.gender;
            if(gen == "male")
            {
                document.getElementById("male").checked = true;
            }
            else
            {
                document.getElementById("female").checked = true;
            }          
            let hobby = selectedRow.hobbies;
            console.log(hobby);
                if(hobby == "Reading")
                {
                    document.getElementById("chkReading").checked = true;
                }
                if(hobby == "Traveling")
                {
                    document.getElementById("chkTraveling").checked = true;
                }
                if(hobby == "Sport")
                {
                    document.getElementById("chkSport").checked = true;
                }
                
            document.getElementById('txtAge').value = selectedRow.age;
            document.getElementById('countySel').value = selectedRow.country;
            countySel.onchange()
            document.getElementById('stateSel').value = selectedRow.state;
            stateSel.onchange()
            document.getElementById('districtSel').value = selectedRow.city;
        }
        function update(values,i){
            for(let x in myArray[i - 1])
            {
                myArray[i-1][x] = values[x];
                console.log(myArray[i-1][x]);
            }
            console.log(myArray);
            
           myResetFun();
           document.getElementById("myTable").innerHTML = "";
           buildTable(myArray);
        }
        function myResetFun() {
            
            document.getElementById("employeeForm").reset();
        }

