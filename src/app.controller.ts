import { Controller, Get, Render, Inject, HttpException, HttpStatus, UseFilters, Session, Ip, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ErrFilter } from './err.filter';
import { AppGuard } from './app.guard';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Inject('Kenan')
  // public readonly kenan: string;
  @UseGuards(AppGuard)
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

  @Get('/session')
  session(@Session() session) {
    if(!session.count) {
      session.count = 0;
    }
    session.count = session.count + 1;
    return session.count;
  }

  @Get('/ip')
  ip(@Ip() ip: string) {
    console.log(ip);
    return ip
  }
}
