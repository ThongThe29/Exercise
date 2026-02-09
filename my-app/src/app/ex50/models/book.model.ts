export interface Book {
    id?: number;
    tenSach: string;      // Tên sách - Book Title
    giaBan: number;       // Giá bán - Selling Price  
    moTa: string;         // Mô tả - Description
    anhBia: string;       // Ảnh bìa - Cover Image
    ngayCapNhat: string;  // Ngày cập nhật - Update Date (format: DD/MM/YYYY HH:MM SA)
    soLuongTon: number;   // Số lượng tồn - Stock Quantity
    maCD: number;         // Mã CD - CD Code
    maNXB: number;        // Mã NXB - Publisher Code
}
