import passport from "passport"


export const passportError = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, (error, user, info) => {
            if (error) {
                return next(error)
            }

            if (!user) {
                return res.status(401).send({ error: info.messages ? info.messages : info.toString() }) //Si me envian info.messages, muestro la respuesta que me enviaron sino muestro el objeto info pasado a string (pueden enviar info.messages = "Usuario no valido" o info = "User no validado")
            }

            req.user = user
            next()
        })(req, res, next) 
    }
}


export const authorization = (rol) => {

    return async (req, res, next) => {
       
        if (!req.user) {
            return res.status(401).send({ error: 'User no autorizado' })
        }

        if (req.user.user.rol != rol) {
            return res.status(403).send({ error: 'User no tiene los privilegios necesarios' })
        }

        next()
    }

}