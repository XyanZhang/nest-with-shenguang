import { Injectable } from "@nestjs/common";
import { AppService } from "./app.service";

@Injectable()
export class Kenan {
  constructor(private appService: AppService) {
  }
}