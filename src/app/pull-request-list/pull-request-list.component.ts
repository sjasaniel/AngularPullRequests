import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../services/http.service'
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { map, tap, } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-pull-request-list',
  templateUrl: './pull-request-list.component.html',
  styleUrls: ['./pull-request-list.component.css']
})
export class PullRequestListComponent implements OnInit, AfterViewInit {
  paginator: MatPaginator | undefined;
  fullName: string = '';
  description: string = '';

  pullRequests: PullRequest[] = [];    
  dataSource = [];
  displayedColumns: Array<string> = [];
  prLength = 0;

  constructor(private httpService: HttpService) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.dataSource = [];
    this.displayedColumns = ['title', 'state'];
    this.getTitleAndDescription();
    this.getPullRequests();
    this.getTotalPullRequests();
  }

  getTitleAndDescription() {
    this.httpService.getData("https://api.github.com/repos/angular/angular").subscribe( response => {
      this.fullName = response.full_name;
      this.description = response.description;
    });
  }

  getPullRequests() {
    let params = new HttpParams({})
      .append('page', this.paginator?.pageIndex || 1)
      .append('per_page', 10)
      .append('state', 'open');

    this.httpService.getData('https://api.github.com/repos/angular/angular/pulls', params).pipe(
      map( response => { 
        return response.map(
          (pullRequest: PullRequest) => { 
            return <PullRequest>{ title: pullRequest.title, state: pullRequest.state, number: pullRequest.number }
          }
        )}
      ),
      tap((response) => { console.log(response) }),
    ).subscribe( (pullRequests) => {
      this.pullRequests = pullRequests;
    })
  }
  
  getTotalPullRequests() {
    let params = new HttpParams({})
      .append('page', 1)
      .append('per_page', 1000)
      .append('state', 'open');

    this.httpService.getData('https://api.github.com/repos/angular/angular/pulls', params).pipe(
      map( response => {
        return response.length;
      }),
      tap((response) => { console.log('length ' + response) }),
    ).subscribe((prLength) => {
      this.prLength = prLength;
    })
  }

  onPaginate( event: PageEvent) {
    if (this.paginator?.pageIndex !== event.pageIndex) {
      this.getPullRequests();
    }
  }
}
