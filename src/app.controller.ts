import { Controller, Get, Render, Inject, HttpException, HttpStatus, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { ErrFilter } from './err.filter';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Inject('Kenan')
  // public readonly kenan: string;

  @UseFilters(ErrFilter)
  @Get()
  getHello(): any {
    // console.log(this.kenan);
    // 此处可以使用 appService 的方法 是因为 appService 是在 app.module.ts 中被注入了
    return this.appService.getHello();
  }
  @Render('user')
  @Get('/user')
  getHelloUser(): any {
    return this.appService.renderUser();
  }

  @UseFilters(ErrFilter)
  @Get("/error")
  getError(): any {
    throw new HttpException('倒霉蛋', HttpStatus.BAD_REQUEST);
  }
}
