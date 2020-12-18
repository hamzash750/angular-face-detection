import { Component, OnInit } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { WebcamImage, WebcamInitError, WebcamUtil } from "ngx-webcam";
import * as fr from "src/assets/js/face-api.min.js";
declare var faceapi: any;
declare var $: any;
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  camera;
  canvas;
  faceDetection;
  public ngOnInit(): void {
    setTimeout(() => {
      $("video").addClass("mirrored");
    }, 300);
    setTimeout(() => {
      this.camera = document.getElementsByClassName("mirrored");
      $(".mirrored").addClass("updateVideo");
      console.log(this.camera);
      this.createCanvas();
    }, 10000);
  }
  createCanvas() {
    let displaySize;
    console.log(faceapi);
    console.log(this.camera[0]);
    if (document.getElementsByTagName("canvas").length == 1) {
      this.canvas = document.getElementsByTagName("canvas");
      // this.canvas = faceapi.createCanvasFromMedia(this.camera);
      // var context = this.canvas[0].getContext("2d");
      // context.drawImage(this.camera[0], 0, 0, 480, 360);
      debugger;
      document.getElementById("webcam-container").append(this.canvas[0]);
      displaySize = {
        width: 480,
        height: 360,
      };
      faceapi.matchDimensions(this.canvas[0], displaySize);
      faceapi.nets.tinyFaceDetector.load("assets/models/");
      faceapi.nets.faceLandmark68TinyNet.load("assets/models/");
      faceapi.nets.faceRecognitionNet.load("assets/models/");
      faceapi.nets.faceExpressionNet.load("assets/models/");
      faceapi.nets.ageGenderNet.load("assets/models/");

      setTimeout(() => {
        this.faceDetection = setInterval(async () => {
          const detections = await faceapi
            .detectAllFaces(
              this.camera[0],
              new faceapi.TinyFaceDetectorOptions()
            )
            .withFaceLandmarks(true);
          const resizedDetections = faceapi.resizeResults(
            detections,
            displaySize
          );
          this.canvas[0]
            .getContext("2d")
            .clearRect(0, 0, this.canvas[0].width, this.canvas[0].height);
          faceapi.draw.drawDetections(this.canvas[0], resizedDetections);
          faceapi.draw.drawFaceLandmarks(this.canvas[0], resizedDetections);
        }, 50);
      }, 500);
    }
  }
}
