// app.js
require('dotenv').config();
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');
const upload = require('./uploads');
const sendMail = require('./sendMail');
const Razorpay = require('razorpay');
const nodemailer = require('nodemailer');


//Add middleware for form data parsing:

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_ID_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

//Set up session and flash:
app.use(session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false
  }));
  
  app.use(flash());


//getting routes
  app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/report', (req, res) => {
  res.render('report');
});

app.get('/index', (req, res) => {
  res.render('index');
});

app.get('/', (req, res) => {
  res.render('home2');
});
 
app.get('/adidas', (req, res) => {
  res.render('adidas');
});

app.get('/jordan', (req, res) => {
  res.render('jordan');
});

app.get('/new_balance', (req, res) => {
  res.render('new_balance');
});

app.get('/nike', (req, res) => {
  res.render('nike');
});

//Add a middleware function to check if the user is already logged in:
const checkLoggedIn = (req, res, next) => {
  if (req.session.user) {
    return res.render('error', { message: 'You are already logged in.' });
  }
  next();
};
 

app.get('/login', checkLoggedIn, (req, res) => {
  res.render('login', { messages: req.flash('error') });
});


//posting forms get values
//login form
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await getUser(username);

  if (user && await bcrypt.compare(password, user.password)) {
    req.session.user = user;
    res.redirect('/dashboard');
  } else {
    req.flash('error', 'Invalid username or password');
    res.redirect('/login');
  }
});

//signUp Form
app.post('/signup', async (req, res) => {
  const { name, username, phone, password,email } = req.body;
  
  const hashedPassword = await bcrypt.hash(password, 10);
// Server-side validation
if (!name || !username || !phone || !password ||!email) {
  req.flash('error', 'All fields are required');
  return res.redirect('/login');
}

if (!/^[A-Za-z\s]+$/.test(name)) {
  req.flash('error', 'Name must contain only letters and spaces');
  return res.redirect('/login');
}

if (!/^\d{3}-\d{3}-\d{4}$/.test(phone)) {
  req.flash('error', 'Phone number must be in the format XXX-XXX-XXXX');
  return res.redirect('/login');
}
const query = 'INSERT INTO users (name, username, phone_number, password, email) VALUES (?, ?, ?, ?, ?)';
db.query(query, [name, username, phone, hashedPassword, email], (err, results) => {
  if (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      if (err.message.includes('username')) {
        console.log(err)
        req.flash('error', 'Username already exists');
      } else if (err.message.includes('email')) {
        console.log(err)
        req.flash('error', 'Email already exists');
      } else {
        throw err;
      }
      res.redirect('/login');
      
    } else {
      throw err;
    }
  } else {
    req.flash('success', 'Account created successfully');

   // Send email notification
    const subject = '👟 Welcome to SneakUp! 👟';
    const message = `Hey ${name}, \n \n

    We're thrilled to have you join our exclusive Sneaker Reselling App! 🎉 Get ready to step into a world where sneakers aren't just footwear, but a culture, a passion, and an art form. Your journey in the reselling game begins now, and we're here to make it an exciting and rewarding experience for you.
    
    🚀 What to Expect:  
    
    👟 Sneaker Releases: Stay ahead of the game with real-time updates on the latest releases from the hottest brands. Whether it's Nike, Adidas, or Yeezy, we've got you covered.
    
    💰 Market Insights: Unlock valuable insights into the sneaker market. Analyze trends, track prices, and make informed decisions to maximize your reselling potential.
    
    🔥 Exclusive Access: Gain access to limited-edition drops and collaborations. We've curated a platform that connects you with the most sought-after kicks in the sneaker world.
    
    🔄 User-Friendly Interface: Navigate our app effortlessly. Buying, selling, and staying connected with the sneaker community has never been this smooth.
    
    🤝 Community Support: Connect with like-minded sneaker enthusiasts. Share your experiences, trade tips, and be part of a community that shares your passion for sneakers.
    
    
    🔒 Secure Transactions: Trust and security are our top priorities. Rest easy knowing that your transactions are protected, and your sneakers will find their way to fellow enthusiasts.
    
    🌐 Global Marketplace: Connect with sneakerheads from around the world. Our platform transcends borders, bringing the global sneaker community closer together.
    
    Welcome to a world where every sneaker tells a story. Lace up, explore, and enjoy the ride!
    
    If you ever have questions or need assistance, our support team is just a message away. Happy reselling!
    
    Best kicks,
    The SneakUp Team 👟✨`;

    sendMail(email, subject, message);
      res.redirect('/login');
    }
  });
});

//get user from DB for login
const getUser = (username) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]);
      }
    });
  });
};


//   Add a route for the dashboard (you'll create this view later):
app.get('/dashboard', (req, res) => {
  if (req.session.user) {
    res.render('dashboard', { user: req.session.user });
  } else {
    res.redirect('/login');
  }
});

//   Add a route to handle user logout:
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect('/');
  });
});


//form to get reseeling details
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.send('Error uploading files.');
    }
    const { seller_name, mobile_no, address, email, product_name, original_price, resell_price } = req.body;
    const photoPaths = req.files.map(file => file.path);

    const query = 'INSERT INTO cards (seller_name, mobile_no, address, email, product_name, original_price, resell_price, photo_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [seller_name, mobile_no, address, email, product_name, original_price, resell_price, JSON.stringify(photoPaths)];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error saving data to the database');
        }
        res.render('index');
        console.log('Data saved successfully');
    });
  });
});



// payment gateway integration

app.get('/buy', (req, res) => {
  res.render('buy');
});
  

//creating order for buyer
app.post('/create-order', async (req, res) => {
   
  const {amount}= req.body ;
   
    const options = {
      amount: amount * 100, // amount in paise
      currency: 'INR',
    };
    
    try {
      // Create Razorpay order
      const order = await razorpay.orders.create(options);
       // Send email receipt
     // await sendEmailReceipt(name, email, amount);
      
      // Respond with the Razorpay order details
      res.json(order);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
  }
});

  //setting connection using PORT 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//ending connection 
process.on('SIGINT', () => {
  console.log('Received SIGINT. Closing server...');
  server.close(() => {
    console.log('Server closed. Exiting process.');
    process.exit(0);
  });
});