if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
};

const express = require('express')
const exphbs = require('express-handlebars');
const app = express();
const {MongoClient} = require('mongodb');
const {ObjectID} = require('mongodb');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport')
const localStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const session = require('express-session'); 
const bcrypt = require('bcryptjs');
const PORT = process.env.PORT || 3000;

const profiel = {
  name:'Arie',
  age: '23',
  img:'Images/Amateur darter.jpg',
}

const profielVrouw = {
  name:'Marjet',
  age: '34',
  img:'Images/marjet_dart.jpg',
}

app.engine('handlebars', exphbs({
  defaultLayout:'main',
  layoutsDir:'views/layouts',
  }),
);

app.use(express.static('public'));
app.set('view engine', 'handlebars');

console.log(process.env.TESTVAR);

app.use(express.urlencoded({ extended: false }));


//Session gebruiken
app.use(session({
  secret: 'wachtwoordGeheim',
  resave: true,
  saveUninitialized: true
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) =>{
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  userModel.findById(id,(err, user) => {
    done(err, user);
  });
});

function checkAuthenticated (req, res, next) {
  if(req.isAuthenticated()){
  return next()
  }
  res.redirect('/')
  };

function checkNotAuthenticated (req, res, next) {
  if(req.isAuthenticated()){
  res.redirect('/home');
  };
  next();
};

//flash
app.use(flash());

//Gebruikers schema databse
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  sport: {
    type: String,
    required: true
  },
  leeftijd: {
    type: String,
    required: true
  },
  niveau: {
    type: String,
    required: true
  }
});

const profielSchema = new mongoose.Schema({
  profielName: {
    type: String,
    required: true
  },
  profielAge: {
    type: String,
    required: true
  },
  profielName: {
    type: String,
    required: true
  },
  profielInfo: {
    type: String,
    required: true
  }
});


const userModel = mongoose.model('users', userSchema);
const profielCollection = mongoose.model('profielen', profielSchema);
const uri = process.env.DB_URI;

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Yess connectie met Database WooHoo'))
.catch(err => console.log(err));

//Routes

app.get('/', checkNotAuthenticated, (req, res) => {
  res.render('login', {title:'Login'})
});

app.post('/', (req, res, next) => {
  passport.use(
    new localStrategy({ usernameField: 'username' }, (username, password, done)=>{
      // Match user
      userModel.findOne({ username: username})
      .then(user => {
        if(!user){
          return done(null, false, {message: 'Email bestaat nog niet'})
        }
  
        // Match Password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if(err) throw err;
          if(isMatch){
          req.session.user = user
            return done(null, user);
          } else{
            return done(null, false, {message:'Wachtwoord fout'})
          }
        });
      })
      .catch(err => console.log(err));
    })
  );
  passport.authenticate('local', {
    successRedirect:'/home',
    failureRedirect: '/',
    failureFlash: true
  })(req, res, next);
});

app.get('/registreer', checkNotAuthenticated, (req, res) => {
  res.render('registreer', {title:'Registreer'})
});

app.post('/registreer', async (req, res) => {
  const { username, password, password2, sport, leeftijd, niveau} = req.body;
  let errors = [];
  
  //Controleer benodigden velden
  if (!username || !password || !password2 ){
    errors.push({message:'please invullen'});
  }

  //Check passwords match
  if(password !== password2) {
  errors.push({ message:'Wachtwoorden komen niet overeen'});
}

  //Wachtwoord lengte instellen
  if(password.length < 6) {
    errors.push({message: 'Wachtwoord te kort'})
  }

  await userModel.findOne({ username: username })
  .then(user =>{
    if(user) {
      //Gebruiker bestaat
      errors.push({message:"Gebruikersnaam is al in gebruik"});
  }});

  if(errors.length){
    console.log(errors);
    res.render('registreer',{
      errors,
      username,
      password,
      sport,
      leeftijd,
      niveau
    })
  } else {
      const newUser = new userModel({
        username,
        password,
        sport,
        leeftijd,
        niveau
      });
    // hashedPassword
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt,(err, hash)=>{
        if(err) throw err;
        // Verander naar Hash password
        newUser.password = hash;
        //save gebruiker
        newUser.save()
          .then(user =>{
            req.flash('succes_msg','geregistreerd');
            res.redirect('/');
          })
          .catch(err => console.log(err));
      })
        });
        }
});

app.get('/home', checkAuthenticated, (req, res) => {
  res.render('home',{title:'home', profiel})
});


app.get('/about', (req, res) => {
    res.render('about',{title:'about', profielVrouw})
  });

  app.listen(PORT, () => {
    console.log(`Gebruikte poort: ${PORT}!`)
  });

app.use(express.static('public'));



