document.querySelector('#reg_b').addEventListener('click',(e)=>{
    let fn = document.querySelector('#first_name').value
    let ln = document.querySelector('#last_name').value
    let email = document.querySelector('#email').value
    let acn = document.querySelector('#acn').value
    let phone = document.querySelector('#phone').value
    let password = document.querySelector('#password').value

    //let new_cust = {first_name:fn,last_name:ln,aadhar:acn,pnumber:phone}
    let new_user = {email: email, password:password,pnumber:phone,first_name:fn,last_name:ln,aadhar:acn,balance:'0'}

    
    console.log(new_user) //dont know how to access

    let ge = () => {
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
                request.open('POST', `https://rocky-chamber-58124.herokuapp.com/deployed/users`, true)

                request.setRequestHeader('Content-type', 'application/json');
                let data = JSON.stringify(new_user)
                request.send(data)
            })
        }

        ge().then((doc) => {
            console.log(doc)

            window.location.href = "login.html", (err) => {
                console.log(err)
            }
        }, (err) => {
            console.log(err)
        })
    }
)