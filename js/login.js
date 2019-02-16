//GET all user for login verification 

let get_all_users=()=>{
    return new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest()

        request.addEventListener('readystatechange', (e)=> {
            if (e.target.status === 200 && e.target.readyState === 4) {
                let data = JSON.parse(e.target.responseText)
                resolve(data)
            }
            else if (e.target.readyState === 4) {
                reject('something went wrong')
            }
        })
        request.open('GET', `https://rocky-chamber-58124.herokuapp.com/users `,true)
        request.send()
    })
}

//GET all driver for passenger 

let getDriver=(lap,lop,namep,pnumberp,fromp,top)=>{
    get_all_driver=()=>{
        return new Promise(function (resolve, reject){
            let require = new XMLHttpRequest()
    
            request.addEventListner('readystatechanges',(e)=>{
                if (e.target.status === 200 && e.target.readyState === 4) {
                    let data = JSON.parse(e.target.responseText)
                    resolve(data)
                }
                else if (e.target.readyState === 4) {
                    reject('something went wrong')
                }
            })
            request.open('GET', `https://rocky-chamber-58124.herokuapp.com/driver`,true)
            request.send()
        })
    }

    get_all_driver.then((doc)=>{
        let drive = doc.drivers;
        

        drive.forEach((val,ind)=>{
            let lad= val.latitude;
            let lod = val.longitude;
            
            if (lad<lap+1 && lad>lap-1 && lod<lop+1 && lod>lop-1 )
            {

                let new_div = document.getElementById('a_driver');

                new_div.innerHTML=`<div style="border: solid 5px; box-shadow: 6px 6px 0px rgb(22, 27, 105); border-radius: 5px; width: 26%; margin-left: 8%;margin-bottom: 1% ; padding-right:3%; padding-left:6%; padding-top:1%; padding-bottom:1%; ">
                                        <h5>Name: ${val.name}</h5>
                                        <h6>Phone No: ${val.pnumber}</h6>
                                        <h6>Car Name : ${val.cname}</h6>
                                        <h6>Carnumber: ${val.cnum}</h6>
                                        <h6>From:${val.from}  -> To: ${val.to} 
                                        <button class="req_drive">Request</button>
                                    </div>`

                document.querySelector('.req_drive').addEventListener('click',(e)=>{
                    alert("Your Request has been send succefully !!!")
                    this.disabled=true;
                    sendDriver(namep,pnumberp,fromp,top,val.pnumber,val.name,val.email)
                })
            }
        })

        
    })
}



//Driver to accept the request send by passenger 

let sendDriver=(namep,pnumberp,fromp,top,pnumberd,named,emaild)=>{
    get_all_users().then((docs)=>{
        let user = docs.users
        user.forEach((val,ind)=>{
            if (val.pnumber === pnumberd){                      //aaiya check kar k val.type= driver possible che k nai atariya to hatai didhu che 
                document.querySelector('#request').addEventListener('click',(e)=>{
                    let new_div = document.getElementById('#show_driver');

                    new_div.innerHTML=`<div style="border: solid 5px; box-shadow: 6px 6px 0px rgb(22, 27, 105); border-radius: 5px; width: 26%; margin-left: 8%;margin-bottom: 1% ; padding-right:3%; padding-left:6%; padding-top:1%; padding-bottom:1%; ">
                                        <h5>Name: ${namep}</h5>
                                        <h6>Phone No: ${pnumberp}</h6>
                                        <h6>From:${fromp}  -> To: ${top} 
                                        <button class="accept_driver">Accept</button>
                                    </div>`
                    
                    document.querySelector('.accept_driver').addEventListener('click',(e)=>{
                        alert("You have Accepted the request and he is added to you car");
                        this.disabled=true;

                        
                            let addin = {namep:namep,pnumberp:pnumnerp,named:named,pnumberd:pnumberd,emaild:emaild};
                        
                        //groupInCar(namep,pnumberp,pnumberd,named)
                        
                        let post_groups = () => {
                            return new Promise(function (resolve, reject) {
                                let request = new XMLHttpRequest()
                
                                request.addEventListener('readystatechange', (e) => {
                                    if (e.target.status === 200 && e.target.readyState === 4) {
                                        let data = JSON.parse(e.target.responseText)
                                        resolve(data)
                                    }
                                    else if (e.target.readyState === 4) {
                                        reject('something went wrong')
                                    }
                                })
                                request.open('POST', `https://rocky-chamber-58124.herokuapp.com/ deployed/group`, true)
                
                                request.setRequestHeader('Content-type', 'application/json');
                                let data = JSON.stringify(addin)
                                request.send(data)
                            })

                            
                        }
                        post_groups().then((docs)=>{
                            window.location.href = "inner.html"
                        })
                    })               
                })
            }
            
        })
    })
}

// making group in car 

// let drc = 0;

// let groupInCar=(namep,pnumberp,pnumberd,named) =>{

//     post_group

//      get_all_users.then((docs)=>{
//          let user = docs.user
//          document.querySelector('#group_b').addEventListener(('click'),(e)=>{
//              user.forEach((val,ind)=>{
//                  if (drc===0){
//                     let new_div = document.getElementById('#group');
//                     new_div.innerHTML=`<div style="border: solid 5px; box-shadow: 6px 6px 0px rgb(22, 27, 105); border-radius: 5px; width: 28%; margin-left: 8%;margin-bottom: 1% ; padding-right:1%; padding-left:2%;  padding-bottom:0.5%; ">
//                                         <h5>Owner</h5>    
//                                         <h6>Name: ${named} , Phone No: ${pnumberd}</h6>     
//                                     </div>
//                                     <div style="border: solid 5px; box-shadow: 6px 6px 0px rgb(22, 27, 105); border-radius: 5px; width: 28%; margin-left: 8%;margin-bottom: 1% ; padding-right:1%; padding-left:2%;  padding-bottom:0.5%; ">
//                                         <h5>Passenger</h5>    
//                                         <h6>Name: ${namep} , Phone No: ${pnumberp}</h6>     
//                                     </div>`
//                  }
                 
//             })
//          })
//      })
// }


//get groups 

let get_group= () =>{
    return new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest()

        request.addEventListener('readystatechange', (e)=> {
            if (e.target.status === 200 && e.target.readyState === 4) {
                let data = JSON.parse(e.target.responseText)
                resolve(data)
            }
            else if (e.target.readyState === 4) {
                reject('something went wrong')
            }
        })
        request.open('GET', `https://rocky-chamber-58124.herokuapp.com/group `,true)
        request.send()
    })
}

//making change in balance 

// let changeBalance = (pnum, cahnge) =>{
//     get_all_users().then((docs)=>{
//         let use = docs.users
//         use.forEach((val,ind)=>{
//             if (val.pnumber === pnum){
//                 val.balance=change
//             }
//         })
//     })
// } 



document.querySelector('#login_b').addEventListener('click',(e)=>{
    let flag=0

    get_all_users().then((doc) => {
        let user=doc.users
        let u = document.querySelector('#emaill').value
        let p = document.querySelector('#passwordl').value
        
        user.forEach((val, ind) => {
            if (val.username === u && val.password === p ) {
                flag = 1
                
                let user_name =val.first_name + val.last_name 
                let user_pnum = val.pnumber

                window.location.href = "inner.html";

                let dr = document.querySelector('#driver_b')
                let pa = document.querySelector('#passenger_b')

                dr.addEventListener('click',(e)=>{
                    window.location.href = "driver.html";
                })
                pa.addEventListener('click',(e)=>{
                    window.location.href = "passenger.html";
                })
                let newpa
                let newdr

                document.querySelector('#drive_r_b').addEventListener('click',(e)=>{
                    let fromd = document.querySelector('#fromd').value
                    let tod = document.querySelector('#tod').value
                    let cnum = document.querySelector('#cnum').value
                    let cname = document.querySelector('#cname').value
                    let timed = document.querySelector('#timed').value
                    let ms = document.querySelector('#maxs').value
                    let latituded
                    let longituded
                    
                    if (!navigator.location){
                        return aletr('Not able to featch your location, so we are taking your manual location');
                    }
                    else {
                        navigator.geolocation.getCurrentPosition(function(position){
                            latituded = position.coords.latitude
                            longituded = position.coords.longitude
                            console.log(latitude,longitude)
                        },function(){
                            alert('Not able to featch your location, so we are taking your manual location')
                        })
                    }

                    newdr= {name:user_name, pnumber:user_pnum,from:fromd,to:tod,cnum:cnum,cname:cname,time:timed,maxs:ms,latitude:latituded,longitude:longituded,type:"driver"}
                    //POSTing driver request

                    let post_driver = () => {
                        return new Promise(function (resolve, reject) { 
                            let request = new XMLHttpRequest()

                            request.addEventListener('readystatechange', (e) => {
                                if (e.target.status === 200 && e.target.readyState === 4) {
                                    let data = JSON.parse(e.target.responseText)
                                    resolve(data)
                                }
                                else if (e.target.readyState === 4) {
                                    reject('something went wrong')
                                }
                            })
                            request.open('POST', `https://rocky-chamber-58124.herokuapp.com/driver`, true)

                            request.setRequestHeader('Content-type', 'application/json');
                            let data = JSON.stringify(newdr)
                            request.send(data)
                        })
                    }


                    post_driver().then((docs)=>{
                        window.location.href="inner.html"
                    })
                })
                document.querySelector('#passenger_r_b').addEventListener('click',(e)=>{
                    let fromp = document.querySelector('#fromp').value
                    let top = document.querySelector('#top').value
                    let timep = document.querySelector('#timep').value
                    let latitudep
                    let longitudep

                    if (!navigator.location){
                        return aletr('Not able to featch your location, so we are taking your manual location');
                    }
                    else {
                        navigator.geolocation.getCurrentPosition(function(position){
                            latitudep = position.coords.latitude
                            longitudep = position.coords.longitude
                        },function(){
                            aletrt('Not able to featch your location, so we are taking your manual location')
                        })
                    }

                    newpa= {name:user_name, pnumber:user_pnum,from:fromp,to:top,time:timep,latitude:latitudep,longitude:longitudep,type:"passenger"}

                    //POSTing passenger request

                    let post_passenger = () => {
                        return new Promise(function (resolve, reject) { 
                            let request = new XMLHttpRequest()

                            request.addEventListener('readystatechange', (e) => {
                                if (e.target.status === 200 && e.target.readyState === 4) {
                                    let data = JSON.parse(e.target.responseText)
                                    resolve(data)
                                }
                                else if (e.target.readyState === 4) {
                                    reject('something went wrong')
                                }
                            })
                            request.open('POST', `https://rocky-chamber-58124.herokuapp.com/passenger`, true)

                            request.setRequestHeader('Content-type', 'application/json');
                            let data = JSON.stringify(newpa)
                            request.send(data)
                        })
                    }
                    
                    post_passenger().then((docs)=>{
                        window.location.href="after_passenger.html"
                    })

                    getDriver(newpa.latitude,newpa.longitude,newpa.name,newpa.pnumber,newpa.from, newpa.to)
                })
                
                document.querySelector('#available_driver').addEventListener('click',(e)=>{
                    window.location.href="after_passenger.html";
                    getDriver(newpa.latitude,newpa.longitude,newpa.name,newpa.pnumber,newpa.from, newpa.to)
                })

                

                document.querySelector('#group_b').addEventListener('click',(e)=>{
                    let drc = 0;
                    windows.location.href="group.html";
                    get_group().then((docs)=>{
                        let gp = docs.groups;
                        gp.forEach((valg,indx)=>{
                            if (val.pnumber === valg.pnumberd || val.pnumber === valg.pnumberp){
                                if(drc===0){
                                    drc=1;
                                    
                                    if (val.pnumber === valg.pnumberd){
                                        let another_div = document.getElementById('sne_b');
                                        another_div.innerHTML=`<button id="startj" class="btn waves-effect waves-light green darken-3 btn-medium" data-target="modal1" style="margin-left: 15.5%; margin-top: 0%; margin-bottom: 1%">Start</button>
                                                            <button id="endj" class="btn waves-effect waves-light red darken-3 btn-medium" data-target="modal2" style="margin-left: 2%; margin-top: 0%;margin-bottom: 1%">End</button>`
                                    }
                                    
                                    let new_div = document.getElementById('group');
                                    new_div.innerHTML=`<div style="border: solid 5px; box-shadow: 6px 6px 0px rgb(22, 27, 105); border-radius: 5px; width: 28%; margin-left: 8%;margin-bottom: 1% ; padding-right:1%; padding-left:2%;  padding-bottom:0.5%; ">
                                                        <h5>Owner</h5>    
                                                        <h6>Name: ${named} , Phone No: ${pnumberd}</h6>     
                                                    </div>
                                                    <div style="border: solid 5px; box-shadow: 6px 6px 0px rgb(22, 27, 105); border-radius: 5px; width: 28%; margin-left: 8%;margin-bottom: 1% ; padding-right:1%; padding-left:2%;  padding-bottom:0.5%; ">
                                                        <h5>Passenger</h5>    
                                                        <h6>Name: ${namep} , Phone No: ${pnumberp}</h6>     
                                                    </div>`
                                }
                                else {
                                    let new_div = document.getElementById('#group');
                                    new_div.innerHTML=`<div style="border: solid 5px; box-shadow: 6px 6px 0px rgb(22, 27, 105); border-radius: 5px; width: 28%; margin-left: 8%;margin-bottom: 1% ; padding-right:1%; padding-left:2%;  padding-bottom:0.5%; ">
                                                        <h5>Passenger</h5>    
                                                        <h6>Name: ${namep} , Phone No: ${pnumberp}</h6>     
                                                    </div>`
                                }

                                let latitudee
                                let longitudee
                                let latitudes
                                let longitudes
                                
                                document.getElementById('startj').addEventListener('click',(e)=>{
                                   
                                    
                                    if (!navigator.location){
                                        return aletr('Not able to featch your location, so we are taking your manual location');
                                    }
                                    else {
                                        navigator.geolocation.getCurrentPosition(function(position){
                                            latitudes = position.coords.latitude
                                            longitudes = position.coords.longitude
                                            console.log(latitude,longitude)
                                        },function(){
                                            alert('Not able to featch your location, so we are taking your manual location')
                                        })
                                    }

                                    alert('your journey has started')
                                })
                                document.getElementById('endj').addEventListener('click',(e)=>{
                                   
                                    
                                    if (!navigator.location){
                                        return aletr('Not able to featch your location, so we are taking your manual location');
                                    }
                                    else {
                                        navigator.geolocation.getCurrentPosition(function(position){
                                            latitudee = position.coords.latitude
                                            longitudee = position.coords.longitude
                                            console.log(latitude,longitude)
                                        },function(){
                                            alert('Not able to featch your location, so we are taking your manual location')
                                        })
                                    }
                                    let dla= Math.abs(latitudes-latitudee);
                                    let dlo= Math.abs(longitudes-longitudee);
                                    let dis= Math.sqrt((dla*dla)+(dlo*dlo))
                                    let costp=dis*350;
                                    let costd=dis*250;

                                    alert(`your journey has ended, total cost of all passenger is ${costp} and for driver is ${costd}.  Thanks for using our application`)
                                })
                                if (val.pnumber===pnumberd){
                                    val.balance= parseFloat(val.balance)-costd;
                                }
                                else {
                                    val.balance= parseFloat(val.balance)-costp;
                                }
                                
                                
                            }
                        })
                    })
                })

                //balace change karva mate 

                document.querySelector('#balance').addEventListener('click',(e)=>{
                    let curr= document.getElementById('curr_balance')
                    let mon= document.getElementById('add_balance')
                    curr.textContent= val.balance
                    document.getElementById('add_100').addEventListener('click',(e)=>{
                        let ncurr= parseInt(curr.textContent);
                        ncurr =ncurr + 100;
                        curr.textContent= ncurr;
                        val.balance=ncurr
                        //changeBalance(val.pnumber,100)

                    })
                    document.getElementById('add_500').addEventListener('click',(e)=>{
                        let ncurr= parseInt(curr.textContent);
                        ncurr =ncurr + 500;
                        curr.textContent= ncurr;
                        val.balance=ncurr
                        //changeBalance(val.pnumber,500)
                    })
                    document.getElementById('add_1000').addEventListener('click',(e)=>{
                        let ncurr= parseInt(curr.textContent);
                        ncurr =ncurr + 1000;
                        curr.textContent= ncurr;
                        val.balance=ncurr
                        //changeBalance(val.pnumber,1000)
                    })
                    document.getElementById('driver_b').addEventListener('click',(e)=>{
                        let ncurr= parseInt(curr.textContent);
                        ncurr =ncurr + parseInt(mon.value);
                        curr.textContent= ncurr;
                        val.balance=ncurr
                        //changeBalance(val.pnumber,mon.value)
                    })
                    curr.textContent= val.balance

                })
            }
        })
        if (flag === 0) {
            alert("You don't have an account. Please sign up.")
        }
    }, (err) => {
    })
})
