//declaración de variables y constantes globales
// array de usuarios auxiliar usados para el contraste
const usuario1 = new Usuario("felipe", "boz", "prueba1@gmail.com", "felipe", 123, 0)
const usuario2 = new Usuario("john", "doe", "prueba2@gmail.com", "john", 456, 0)
const usuario3 = new Usuario("mary", "doe", "prueba3@gmail.com", "mary", 789, 0)
const auxiliarArrayUsuarios = [usuario1, usuario2, usuario3]
let usuarios = auxiliarArrayUsuarios
let usuarioIngresado=''
console.log("usuarios = " + usuarios)

//declaración de botones para eventos
let botEntrar = document.getElementById('botEntrar')
botEntrar.addEventListener('click',tieneUsuario)
let botCancelar = document.getElementById('botCancelar')
botCancelar.addEventListener('click',limpiaCajas)

//--------FUNCIONES---------------

function aHome(){
    window.location.href='pages/home.html'
}

//limpia cajas

function limpiaCajas(){
    let inputs = document.getElementsByClassName('input')
    if(inputs.length != 0){
        for (const input of inputs){
            input.value = ""
        }
    }    
}

//destructor de cajas
function destructorDivs(){
    let divs = document.getElementsByClassName('div')
    if(divs.length != 0){
        for (const div of divs){
            div.remove()
        }
    }
}

//constructor de div log
function modificadorMsj(mensaje){
    let div = document.getElementsByClassName('msj')
    console.log(div[0])
    div[0].innerText = mensaje
}

function constructorUsuarioLoginExitoso(usuario){
    let div = document.createElement('div')
    div.className = 'div'
    div.innerHTML = `
                    <p><strong> Nombre: ${usuario.nombre}</strong></p>
                    <p><strong> Apellido: ${usuario.apellido}</strong></p> 
                    <p><strong> Mail: ${usuario.mail}</strong></p> 
                    <p><strong> Usuario: ${usuario.usuario}</strong></p>  
    `
    document.body.append(div)
    
}
//buscador de usuarios
function buscaUsuario(usuarioIngresado){
    for(const i in auxiliarArrayUsuarios){
        if(usuarioIngresado == auxiliarArrayUsuarios[i].usuario ){
            user = auxiliarArrayUsuarios[i]
            console.log("Se encontró al usuario "+ usuarioIngresado)
            break
        }
        else{
            console.log("No se encontró al usuario "+ usuarioIngresado)
            user = [null,null,null,null,null,null]
        }
    }
    return user
}

//constructor de objeto USUARIO
function Usuario(nombre, apellido, mail, usuario, pass, bloqueado){
    this.nombre = nombre
    this.apellido = apellido
    this.mail = mail
    this.usuario = usuario
    this.pass = pass
    this.bloqueado = bloqueado
}

//crea usuario
function creaUsuario(){
    nombre = prompt('Ingrese su nombre')
    apellido = prompt('Ingrese su apellido')
    mail = prompt('Ingrese su mail')
    usuario = prompt('Ingrese el usuario')
    pass = prompt('Ingrese su contraseña')

    const USUARIO = new Usuario(nombre, apellido, mail, usuario, pass)
    usuarios.push(USUARIO)
}

//funcion de login
function login(){
    
    let inputUser = document.getElementById('inputUser')
    let inputPass = document.getElementById('inputPass')
    let passIngresada = ''
    let coincideUsuario = false
    let coincideContraseña = false
    let indiceUsuario = -1
    let indiceContrasenia = -1

    usuarioIngresado = inputUser.value
    passIngresada = inputPass.value
    user = buscaUsuario(usuarioIngresado)
    if(usuarioIngresado == null || usuarioIngresado == ""){
        return 0
    }
    else if(user.bloqueado == 1){
        return 99
    }
    else{
        if (user.usuario != usuarioIngresado){
                console.log('Usuario no coincide '+ user.usuario)                    
            }
            else{
                coincideUsuario = true
                console.log('Usuario coincide '+ user.usuario)
                indiceUsuario = usuarios.indexOf(user)
                
            }
        }
    
    if(passIngresada == null || passIngresada == ""){
        return 0
    }
    else if (passIngresada != user.pass){
        console.log('La contraseña no coincide '+ user.pass)                    
    }
    else{
        coincideContraseña = true
        console.log('La contraseña coincide '+ user.pass)
        indiceContrasenia = usuarios.indexOf(user)
    }
                        
    if(coincideUsuario == false){
        return 1    //el usuario ingresado no está en el array
    }
    if((coincideContraseña == false) || (indiceUsuario != indiceContrasenia)){
        return 99   //contraseña incorrecta
    } 
    else{
        return 2    // ingreso exitoso
    }
    return -1
}

//función inicial que consulta si tiene un usuario. si tiene, logueás, sino, te creás uno y luego logueás
function tieneUsuario(){
    
        let retLogin = login()
        let mensaje = ''
        switch(retLogin){
            case -1:
                mensaje = 'No se hizo nada. ERROR' 
                modificadorMsj(mensaje)
                console.log(mensaje)
                break
            case 0:
                mensaje = 'ESC producido' 
                modificadorMsj(mensaje)
                console.log(mensaje)
                break
            case 1:
                mensaje = 'No se encuentra el usuario!'
                modificadorMsj(mensaje)
                console.log(mensaje)
                break
            case 2:
                user = buscaUsuario(usuarioIngresado)
                destructorDivs()
                console.log(mensaje)
                aHome()
                break           
            case 99:
                mensaje = 'ATENCIÓN. Contraseña incorrecta, intentelo nuevamente'
                modificadorMsj(mensaje)
                console.log(mensaje)
                break
        }
    
}


