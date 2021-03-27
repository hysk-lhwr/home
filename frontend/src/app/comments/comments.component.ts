import { Component, HostListener, Input, OnInit } from '@angular/core';
import { IpService } from '../service/ip-service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input('targetId') targetId: string;
  newComment: string;
  clientIp: string;

  constructor(private ipService: IpService) { }

  ngOnInit() {
    this.ipService.getClientIp().subscribe(resp => this.clientIp = resp.ip);
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent): void {
    if (e.shiftKey && e.key === 'Enter') {
      console.log('sending comment');
      this.sendComment();
    }
  }

  sendComment(): void {
    if (this.newComment && this.newComment.trim()) {
      console.log(this.clientIp);
      console.log(this.newComment);
    }
    this.newComment = null;
  }
}
