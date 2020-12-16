import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-activity-indicator',
  templateUrl: './activity-indicator.component.html',
  styleUrls: ['./activity-indicator.component.scss'],
})
export class ActivityIndicatorComponent implements OnInit {
  @Input() message: string = 'Loading... Please wait.';

  constructor() {}

  ngOnInit(): void {}
}
