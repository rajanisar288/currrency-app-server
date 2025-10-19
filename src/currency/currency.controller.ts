import { Controller, Get, Query } from '@nestjs/common';
import { CurrencyService } from './currency.service';

@Controller('api')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('currencies')
  getAllCurrencies() {
    return this.currencyService.getAllCurrencies();
  }

  @Get('convert')
  convertCurrency(
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('amount') amount: number,
  ) {
    return this.currencyService.convertCurrency(from, to, amount);
  }

  @Get('historical')
  getHistoricalRate(
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('amount') amount: number,
    @Query('date') date: string,
  ) {
    return this.currencyService.getHistoricalRate(from, to, amount, date);
  }
}
