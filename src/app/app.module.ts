import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { WebcamModule } from "ngx-webcam";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule, WebcamModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
