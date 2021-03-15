import { Injectable } from '@nestjs/common';
import * as normalizeUrl from 'normalize-url';
import * as cheerio from 'cheerio';
import axios from 'axios';
import * as path from 'path';
import { File, Link, TypeFile } from './app.interface';
import { URL } from 'url';

@Injectable()
export class AppService {
  /**
   * Парсинг ресурса, поиск файлов js css
   * @param  {String} url адрес сайта
   * @return {Array} Массив ресурсов файла
   */
  async getSource(url: string): Promise<any> {
    const links = await this.webScraping(url);
    const sources = await this.getSourcesByLink(links);
    return sources;
  }

  /**
   * Парсинг сайта, поиск ресурсов
   * @param  {String} url адрес сайта
   * @return {Array} Массив ресурсов файла
   */
  private async webScraping(url: string): Promise<Link[]> {
    const link = normalizeUrl(url, { forceHttp: true });
    const { data } = await axios.get(link);
    const $ = cheerio.load(data);
    const linkHrefs = $('link')
      .map(function () {
        if ($(this).attr('rel') === 'stylesheet') {
          return {
            type: TypeFile.css,
            url: $(this).attr('href'),
            domain: link,
          } as Link;
        }
      })
      .get();
    const scriptSrcs = $('script')
      .map(function () {
        if ($(this).attr('src')) {
          return {
            type: TypeFile.js,
            url: $(this).attr('src'),
            domain: link,
          } as Link;
        }
      })
      .get();

    return [...linkHrefs, ...scriptSrcs];
  }

  /**
   * Сбор информации о файле
   * @param  {Array} links Ресурсы сайта
   * @return {Array} Информация об файлах
   */
  private async getSourcesByLink(links: Link[]): Promise<File[]> {
    const result = await Promise.all(
      links.map(async (value) => {
        try {
          const link = new URL(value.url, value.domain);
          const file = await axios.get(link.toString(), {});
          const filename = path.parse(value.url).name;
          const size = await this.bytesToSize(file.data.length);
          return {
            filename: `${filename}.${value.type}`,
            size,
            url: value.url,
            type: value.type,
          };
        } catch (error) {
          return {
            url: value.url,
            type: value.type,
          };
        }
      }),
    );
    return result;
  }

  /**
   * Конфертирование в байты
   * @param  {Number} bytes content-length
   * @return {string} Размер файла
   */
  private async bytesToSize(bytes: number): Promise<string> {
    const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return 'n/a';
    const i: number = parseInt(
      Math.floor(Math.log(bytes) / Math.log(1024)).toString(),
    );
    if (i === 0) return `${bytes} ${sizes[i]}`;
    const resultSize = (bytes / Math.pow(1024, i)).toFixed(2);

    return resultSize !== 'NaN' ? `${resultSize} ${sizes[i]}` : '';
  }
}
