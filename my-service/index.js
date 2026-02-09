const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(morgan("combined"))
app.use(bodyParser.json())

// Request logging middleware
app.use((req, res, next) => {
    try {
        console.log('\n🔵 ========== NEW REQUEST ==========');
        console.log(`📍 ${req.method} ${req.url}`);
        if (req.method !== 'GET' && req.body && Object.keys(req.body).length > 0) {
            console.log('📦 Body:', JSON.stringify(req.body, null, 2));
        }
        console.log('🔵 ===================================\n');
    } catch (e) {
        console.error("Login Middleware internal error", e);
    }
    next();
});

const path = require("path")
app.use(express.static(path.join(__dirname, "public")))
//create default API (HOME)
app.get("/", (req, res) => {
    res.send("Welcome to K234111E API");
});
app.get("/ping", (req, res) => {
    res.send("pong");
});
app.get("/about", (req, res) => {
    tbl = "<table border='1'>"
    tbl += "<tr>"
    tbl += "<td>STUDENT ID:</td><td>SVK234111419</td>"
    tbl += "</tr>"
    tbl += "<tr>"
    tbl += "<td>STUDENT NAME:</td><td>Nguyễn Thế Thông</td>"
    tbl += "</tr>"
    tbl += "<tr>"
    tbl += "<td colspan='2'><img src='images/avatar.png' width='100' height='100'/></td>"
    tbl += "</tr>"
    tbl += "</table>"
    res.send(tbl)
})
//start server
app.listen(port, () => {
    console.log(`K234111E Server running at http://localhost:${port}`);
});
// Database with exercise 50 structure
let database = [
    {
        id: 1,
        tenSach: "Giáo trình Tin Học Cơ Bản Windows XP",
        giaBan: 26000.00,
        moTa: "Nội dung của cuốn: Tin Học Cơ Bản Windows XP gồm có 7 chương: Chương 1: Một số vấn đề cơ bản. Chương 2: Sử dụng nhanh thành công của và thành thực trong My Computer và Windows Explorer. Chương 3: Các thao tác trong windows XP. Chương 4: Các thiết lập trong Windows XP. Chương 5: Bảo trì máy tính. Chương 6: Các phím tắt Chương 7: Hỏi và đáp các thảo luận mặc định bạn giới thiệu cuốn sách cùng bạn.",
        anhBia: "THCB.jpg",
        ngayCapNhat: "25/10/2014 12:00 SA",
        soLuongTon: 120,
        maCD: 7,
        maNXB: 1
    },
    {
        id: 2,
        tenSach: "Giáo trình Cơ Sở Dữ Liệu",
        giaBan: 12000.00,
        moTa: "Cuốn sách này gồm có phần sau: Phần 1: Xử lý văn bản trong Microsoft hiệu các nội dụng sáu. Chương 1: Căn bản về cơ sở dữ liệu. Chương 2: Các bộ kết nối và tương tác dữ liệu. Chương 3: Bộ chứa dữ liệu DataSet. Chương 4: Bộ điều hợp dữ liệu DataAdapter. Chương 5: Sử dụng các điều khiển ràng buộc dữ liệu. Chương 6: Tạo báo cáo với Crystal Report. Chương 7: ADO.NET và XML. Xin trân trọng giới thiệu cùng các bạn",
        anhBia: "THH04.jpg",
        ngayCapNhat: "23/10/2013 12:00 SA",
        soLuongTon: 25,
        maCD: 3,
        maNXB: 2
    },
    {
        id: 3,
        tenSach: "Visual Basic 2005 Tập 3, Quyển 2: Lập Trình Web Với Cơ Sở Dữ Liệu",
        giaBan: 20000.00,
        moTa: "Visual Basic 2005 Tập 3, Quyển 2: Lập Trình Web Với Cơ Sở Dữ Liệu sẽ cung cấp kỹ thuật và hướng dẫn bạn Tự học xây dựng ứng dụng Web quản lý CSDL toàn diện với ADO.NET 2.0 và ASP.NET. Khai thác các đối tượng và người dùng được dành cho WebForm. Sử dụng các điều khiển dữ liệu đặc thù dành trong ASP.NET và Web. Làm quen với những khái niệm xử lý dữ liệu hoàn toàn mới. Ràng buộc dữ liệu với các thành phần giao diện Web Forms. Thiết kế ứng dụng Web Quản lý CD Shop trực quan và thực tế. Cung cấp một kiến thức hoàn chỉnh về tạo Web cho các bạn yêu thích ngôn ngữ Visual Basic và .NET Framework. Sách có kèm theo CD-ROM bài tập.",
        anhBia: "LTWeb2005.jpg",
        ngayCapNhat: "15/09/2014 12:00 SA",
        soLuongTon: 240,
        maCD: 8,
        maNXB: 4
    }
];

// Auto-increment ID counter
let nextId = 4;

// GET all books
app.get("/books", (req, res) => {
    res.send(database);
});

// GET single book by id
app.get("/books/:id", cors(), (req, res) => {
    const id = parseInt(req.params["id"]);
    const book = database.find(x => x.id === id);
    if (book) {
        res.send(book);
    } else {
        res.status(404).send({ error: "Book not found" });
    }
});

// POST create new book
app.post("/books", (req, res) => {
    console.log('➕ POST /books - Creating new book');
    console.log('📥 Request body:', req.body);
    const newBook = {
        id: nextId++,
        ...req.body
    };
    database.push(newBook);
    console.log('✅ Created book:', newBook);
    console.log('📊 Database now has', database.length, 'books');
    res.status(201).send(newBook);
});

// PUT update book
app.put("/books/:id", (req, res) => {
    const id = parseInt(req.params["id"]);
    console.log('✏️ PUT /books/' + id + ' - Updating book');
    console.log('📥 Request body:', req.body);
    const index = database.findIndex(x => x.id === id);
    console.log('🔍 Found at index:', index);

    if (index !== -1) {
        const oldBook = { ...database[index] };
        // CRITICAL FIX: Use merge strategy (partial update) instead of replacement
        // This prevents data loss if req.body is incomplete
        database[index] = {
            ...database[index], // Keep existing fields
            ...req.body,        // Overwrite only provided fields
            id: id              // Ensure ID matches URL
        };
        console.log('📝 Old book:', oldBook);
        console.log('✅ Updated book:', database[index]);
        res.send(database[index]);
    } else {
        console.log('❌ Book not found with ID:', id);
        res.status(404).send({ error: "Book not found" });
    }
});

const fs = require('fs');

// DELETE book
app.delete("/books/:id", (req, res) => {
    try {
        const id = parseInt(req.params["id"]);
        console.log('🗑️ DELETE /books/' + id + ' - Deleting book');

        if (typeof database === 'undefined' || !database) {
            const msg = '❌ CRITICAL: database variable is undefined!';
            console.error(msg);
            const fs = require('fs');
            fs.writeFileSync('error.log', msg);
            return res.status(500).send({ error: "Context error: database not defined" });
        }

        const index = database.findIndex(x => x.id === id);
        console.log('🔍 Found at index:', index);

        if (index !== -1) {
            const deletedBook = database.splice(index, 1)[0];
            console.log('✅ Deleted book:', deletedBook);
            console.log('📊 Database now has', database.length, 'books');
            res.send({ message: "Book deleted successfully", book: deletedBook });
        } else {
            console.log('❌ Book not found with ID:', id);
            res.status(404).send({ error: "Book not found" });
        }
    } catch (error) {
        console.error('❌ Exception in DELETE handler:', error);
        const fs = require('fs');
        fs.writeFileSync('error.log', (error.stack || error.message));
        res.status(500).send({ error: "Internal Server Error: " + error.message });
    }
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('❌ GLOBAL ERROR HANDLER:', err);
    const fs = require('fs');
    fs.writeFileSync('global_error.log', (err.stack || err.message));
    res.status(500).json({ error: err.message, stack: err.stack });
});
