import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CurrencyService {
  private baseUrl: string;
  private apiKey: string;

  constructor(
    private http: HttpService,
    private config: ConfigService,
  ) {
    this.baseUrl = this.config.get<string>('BASE_URL') ?? '';
    this.apiKey = this.config.get<string>('API_KEY') ?? '';
  }

  async getAllCurrencies() {
    const url = `${this.baseUrl}/currencies?apikey=${this.apiKey}`;
    const res = await firstValueFrom(this.http.get(url));
    return res.data;
  }

  async convertCurrency(from: string, to: string, amount: number) {
    const url = `${this.baseUrl}/latest?apikey=${this.apiKey}&base_currency=${from}`;
    const res = await firstValueFrom(this.http.get(url));
    const rate = res.data.data[to];
    const converted = amount * rate;
    return { from, to, amount, rate, converted };
  }

  async getHistoricalRate(from: string, to: string, amount: number, date: string) {
    const url = `${this.baseUrl}/historical?apikey=${this.apiKey}&base_currency=${from}&date=${date}`;
    const res = await firstValueFrom(this.http.get(url));
    const rate = res.data.data[date][to];
    const converted = amount * rate;
    return { from, to, amount, date, rate, converted };
  }
}
