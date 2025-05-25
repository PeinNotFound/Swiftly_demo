const freelancersRouter = require('./routes/freelancers');

// Routes
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/freelancers', freelancersRouter);
// ... other routes ... 