import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { TagService } from '../../service/tag';

@Component({
  selector: 'my-tag-center',
  styleUrls: ['./tagCenter.component.scss'],
  templateUrl: './tagCenter.component.html',
  providers: [ChangeDetectorRef, TagService]
})
export class TagCenterComponent implements OnInit {
    public tagCollection;

    constructor(
        private tagService: TagService,
        private router: Router, 
        private ref: ChangeDetectorRef
    ) { 
        this.tagService.getLatest()
            .subscribe(
                tagCollection => {
                    this.tagCollection = tagCollection;
                    ref.detectChanges();
                },
                err => console.log(err)
            );
    }

    ngOnInit() {}
}
