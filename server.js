const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware để phân tích dữ liệu POST từ form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Cấu hình EJS là engine view
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Đường dẫn tới thư mục views

// Cấu hình thư mục tĩnh để phục vụ file CSS, JS, hình ảnh
app.use(express.static(path.join(__dirname, 'public'))); // Đường dẫn tới public
app.use(express.static(path.join(__dirname, 'views'))); // Đường dẫn tới public


// Định tuyến cho các trang
const indexRouter = require('./routes/index'); // Định tuyến cho các trang chính
const apiRouter = require('./routes/api');     // Định tuyến cho API (nếu có)

// Sử dụng các router
app.use('/', indexRouter);  // Đảm bảo rằng router đã được yêu cầu đúng
app.use('/api', apiRouter); // Đảm bảo rằng router đã được yêu cầu đúng

// Lắng nghe yêu cầu tại cổng
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
