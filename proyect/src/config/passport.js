import local from 'passport-local'
import passport from "passport"; //Manejador de las estrategias
import jwt from "passport-jwt";

import  userModel  from "../models/users.model.js";

//Defino la estrategia a utilizar
const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt; //Extractor de los headers de la consulta

const initializePassport = () => {
  const cookieExtractor = (req) => {
    console.log(req.cookies);
    //{} no hay cookies != no exista mi cookie
    //Si existen cookies, consulte por mi cookie y sino asigno {}
    const token = req.cookies ? req.cookies.jwtCookie : {};
    console.log(token);
    return token;
  };

  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), //Consulto el token de las cookies
        secretOrKey: process.env.JWT_SECRET,
      },
      async (jwt_payload, done) => {
        try {
          console.log(jwt_payload);
          return done(null, jwt_payload); //Retorno el contenido del token
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  
  passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
    try {
        const user = await userModel.findOne({ email: username })

        if (!user) {
            return done(null, false)
        }

        if (validatePassword(password, user.password)) {
            return done(null, user) //Usuario y contraseña validos
        }

        return done(null, false) //Contraseña no valida

    } catch (error) {
        return done(error)
    }

}))
  //Inicializar la session del usr
  passport.serializeUser((user, done) => {
    done(null, user.user._id);
  });

  //Eliminar la session del usr
  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);
    done(null, user);
  });
};
export default initializePassport