import { Routes } from '@angular/router';
import { Listcustomer } from './listcustomer/listcustomer';
import { Listcustomer2 } from './listcustomer2/listcustomer2';
import { Listcustomer3 } from './listcustomer3/listcustomer3';
import { Notfound } from './notfound/notfound';
import { About } from './about/about';
import { ServiceProductImageEvent } from './ex13/service-product-image-event/service-product-image-event';
import { ServiceProductImageEventDetail } from './ex13/service-product-image-event-detail/service-product-image-event-detail';
import { Exercise14 } from './exercise14/exercise14';
import { Ex18 } from './ex18/ex18';
import { Ex19 } from './ex19/ex19';
import { Productdetail } from './productdetail/productdetail';
import { Product } from './ex19/product/product';
import { Listproduct } from './listproduct/listproduct';
import { FakeProduct } from './fake-product/fake-product';
import { Ex27 } from './ex27/ex27';
import { Ex28 } from './ex28/ex28';
import { TemplateFormComponent } from './template-form/template-form';
import { ReactiveFormComponent } from './reactive-form/reactive-form';
import { Books } from './books/books';
import { BookDetail } from './book-detail/book-detail';
import { BookCreate } from './book-create/book-create';
import { FileUpload } from './file-upload/file-upload';
import { BookNewComponent } from './book-new/book-new';
import { BookUpdate } from './book-update/book-update';
import { BookDelete } from './book-delete/book-delete';
import { FashionComponent } from './fashion.component/fashion.component';
import { FashionDetail } from './fashion-detail/fashion-detail';
import { PaymentComponent } from './payment/payment.component';
import { PaymentResultComponent } from './payment-result/payment-result.component';
import { LoginComponent } from './login/login';
import { Ex63Component } from './ex63/ex63';

export const routes: Routes = [
  // ⭐ Route mặc định - khi vào localhost:4200 sẽ chuyển đến /demo
  { path: "", redirectTo: "demo", pathMatch: "full" },

  // Exercise 19 & associated routes
  { path: "ex19", component: Ex19 },
  { path: "product", component: Product },
  { path: "list-product", component: Listproduct },
  { path: "service-product", component: ServiceProductImageEvent },

  // Các routes khác
  { path: "gioi-thieu", component: About },
  { path: "khach-hang-1", component: Listcustomer },
  { path: "khach-hang-2", component: Listcustomer2 },
  { path: "khach-hang-3", component: Listcustomer3 },

  // Exercise 13 routes
  { path: "service-product-image-event", component: ServiceProductImageEvent },
  { path: "service-product-image-event/:id", component: ServiceProductImageEventDetail },

  // Exercise 14 route
  { path: "exercise14", component: Exercise14 },

  // Exercise 18 route
  { path: "ex18", component: Ex18 },

  // Exercise 26 route
  { path: "ex26", component: FakeProduct },

  // Exercise 27 route
  { path: "ex27", component: Ex27 },

  // Exercise 28 route
  { path: "ex28", component: Ex28 },

  // Forms routes - Template & Reactive
  { path: "template-form", component: TemplateFormComponent },
  { path: "reactive-form", component: ReactiveFormComponent },

  // Books route (Exercise 39)
  { path: "books", component: Books },
  { path: "ex39", component: Books },

  // Book Detail route (Exercise 41)
  { path: "book-detail/:id", component: BookDetail },  // Route with ID parameter
  { path: "ex41", component: BookDetail },  // Ex41 - Book Detail Search
  { path: "ex42", component: BookCreate },  // Ex42 - Create Book
  { path: "ex43", component: BookNewComponent },  // Ex43 - Create Book with Auto-Refresh
  { path: "ex45", component: BookUpdate },  // Ex45 - Update Book (HTTP PUT)
  { path: "ex47", component: BookDelete },  // Ex47 - Delete Book (HTTP DELETE)
  { path: "ex53", component: FashionComponent },  // Ex53 - Fashions (MongoDB)
  { path: "fashions", component: FashionComponent },
  { path: "ex54", component: FashionDetail },  // Ex54 - Fashion Detail (Get by Id)
  { path: "ex49", component: FileUpload },  // Ex49 - File Upload with Progress
  {
    path: "ex50",
    loadComponent: () => import('./ex50/ex50.component').then(m => m.Ex50Component)
  },  // Ex50 - RESTful API Book Management

  // MoMo Payment routes
  { path: "payment", component: PaymentComponent },
  { path: "payment-result", component: PaymentResultComponent },
  { path: "ex61", component: LoginComponent },  // Ex61 - Login with Cookies
  { path: "ex63", component: Ex63Component },  // Ex63 - Shopping Cart with Session

  // ⭐ Route wildcard - phải để cuối cùng
  { path: "**", component: Notfound }
];
