import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { map, catchError } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private http: HttpService) {}
  async getCommits() {
    return this.http
      .get(
        'https://api.github.com/repos/GustavoDeMarinis/github-api-nestjs-reactJs/commits',
        {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          },
        },
      )
      .pipe(
        map((res) => {
          return res?.data;
        }),
      )
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );
  }
}
