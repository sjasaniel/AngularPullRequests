import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pull-request-form',
  templateUrl: './pull-request-form.component.html',
  styleUrls: ['./pull-request-form.component.css']
})
export class PullRequestFormComponent implements OnInit {
  id: string = '';
  form = new FormGroup({
    'numberFormControl': new FormControl(""),
    'titleFormControl': new FormControl(""),
    'stateFormControl': new FormControl(""),
    'createdAtFormControl': new FormControl(""),
    'reviewerFormControl': new FormControl("")
  })

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( (params) => {
      this.id = params.get('number') || '';
    });
    const url = `https://api.github.com/repos/angular/angular/pulls/${this.id}`;
    
    this.getPullRequestDetails(url);
  }

  ngAfterViewInit(): void {
    this.form.setValue({    
      'numberFormControl': "",
      'titleFormControl': "",
      'stateFormControl': "",
      'createdAtFormControl': "",
      'reviewerFormControl': ""
    });
  }

  getPullRequestDetails(url: string) {
    this.httpService.getData(url)
      .pipe(
        map( response => 
          <PullRequest> {
            number: response.number,
            title: response.title,
            createdAt: response['created_at'],
            state: response.state,
            requestedReviewer: response['requested_reviewers']
              .flatMap( (reviewer: PullRequest) => reviewer['login'] )
          }
        ),
        // tap(d => console.log(d))
      ).subscribe((pullRequest: PullRequest) => {
        this.form.setValue({    
          'numberFormControl': pullRequest.number,
          'titleFormControl': pullRequest.title,
          'stateFormControl': pullRequest.state,
          'createdAtFormControl': this.datePipe.transform(pullRequest.createdAt, 'yyyy-MM-dd'),
          'reviewerFormControl': pullRequest.requestedReviewer
        });
      });
  }

}
