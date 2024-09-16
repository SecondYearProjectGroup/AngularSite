import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedbackService } from '../../../services/feedback.service';
import { UserRoleService } from '../../../services/user-role.service';

@Component({
  selector: 'app-feedback-page',
  templateUrl: './feedback-page.component.html',
  styleUrl: './feedback-page.component.css'
})
export class FeedbackPageComponent implements OnInit{

  userRole: string | null = null;
  userIdId : number = 0;
  
  isFeedbackUploaded: boolean = false;
  isFeedbackFileUploaded: boolean = false;
  id: number = 0;
  feedbackBody: string = '';
  selectedFile: File | null = null;
  submissionId: number = 0;
  examinerId: number = 0;
  

  @Input() mode: 'feedbackReciever' | 'feedbackProvider' = 'feedbackReciever';

  constructor(
    private route: ActivatedRoute,
    private feedbackService: FeedbackService,
    private userRoleService: UserRoleService) { 
      this.userRoleService.userRole$.subscribe(role => {
        this.userRole = role;
      });
      this.userRoleService.userIdId$.subscribe(userIdId => {
        this.userIdId = userIdId || 0;
        this.examinerId = this.userIdId;
      });
    }


  ngOnInit(): void {
    scrollTo(0, 0);
  
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? parseInt(idParam, 10) : 0; // Default to 0 if idParam is null
    console.log('Retrieved tile id from route params:', this.id);

    // Set submissionId and examinerId after values are available
    this.submissionId = this.id;
    this.examinerId = this.userIdId;
  }

  // Handle file selection
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // Handle form submission
  submitFeedback(): void {
    console.log('Submission ID:', this.submissionId, 'Examiner ID:', this.examinerId);
    if (this.selectedFile && this.feedbackBody) {
      this.feedbackService.updateFeedback(this.submissionId, this.examinerId, this.feedbackBody, this.selectedFile)
        .subscribe({
          next: () => {
            console.log('Feedback updated successfully');
          },
          error: (error) => {
            console.error('Error updating feedback:', error);
          }
        });
    } else {
      alert('Please provide feedback and a file.');
    }
  }
  
}
