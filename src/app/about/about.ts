import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [], // Add CommonModule if needed, but it seems simple text
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  student_id: string = "K234111419"
  student_name: string = "Nguyễn Thế Thông"
  student_email: string = "thongnt234111e@st.uel.edu.vn"
  my_uni_logo: string = "cach-su-dung-logo-uel-13.jpg"
}