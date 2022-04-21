const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const appRoutes = require('./routes/appRoutes');
const outputRoutes = require('./routes/outputRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes')
const kraRoutes = require('./routes/kraRoutes');
const projectRoutes = require('./routes/projectRoutes');
const outcomeRoutes = require('./routes/outcomeRoutes');
const roleRoutes = require('./routes/roleRoutes');
const prexcRoutes = require('./routes/prexcRoutes');

dotenv.config();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/app', appRoutes); 
app.use('/api/output', outputRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/kra', kraRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/outcome', outcomeRoutes);
app.use('/api/prexc', prexcRoutes);
app.use('/api/roles', roleRoutes);

__dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/build')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running .... ');
  });
}

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
